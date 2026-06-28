import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = (process.env.NETLIFY_ORIGIN || "https://365dailysnap.netlify.app").replace(/\/$/, "");
const SITE_DIR = "site";
const PORTFOLIO_PATH = "portfolio/portfolio.json";
const IMAGE_PATTERN = /\.(?:avif|gif|jpe?g|png|webp)(?:\?|$)/i;
const INSTAGRAM_CARD_SIZE = 3;

const FALLBACK_CONTENT = {
  projects: [],
  testimonials: [
    { name: "@ooonllii", date: "2월 8일", type: "카페 인물 스냅", content: "저도 오늘 촬영 너무 즐거웠어요. 다음에 기회되면 또 촬영해요. 모델 필요하시면 또 연락주시고요. 100점짜리 작가님이 불러주시면 언제든 달려가겠습니다." },
    { name: "@kylieyouk", date: "2월 17일", type: "야외 인물 스냅", content: "작가님 너무 고생 많으셨습니다. 추운 날씨에 촬영하시느라 정말 고생 많으셨어요. 덕분에 즐겁고 좋은 시간 보냈고, 다음 촬영도 언제든지 환영입니다." },
    { name: "@new_.too", date: "3월 9일", type: "프로필 협업 촬영", content: "오늘 수고 많으셨습니다. 즐거운 촬영 시간이었습니다. 사진 전달과 확인 과정도 편하게 안내해주셔서 좋았습니다." },
    { name: "분다버그", date: "3월 2일", type: "야외 인물 스냅", content: "잘 찍어주셔서 감사합니다. 추운 날씨에 늦은 시간까지 함께해주셔서 정말 감사했어요. 덕분에 분위기 좋은 컷 많이 나왔습니다." }
  ]
};

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "365-daily-snap-pages-sync" }, redirect: "follow" });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
}

function selectMedia(project) {
  return (Array.isArray(project.media) ? project.media : [])
    .filter((item) => item?.src && IMAGE_PATTERN.test(item.src))
    .slice(0, 60);
}

function unique(values = []) {
  return Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean)));
}

function sceneLabel(tags = []) {
  const labels = [
    ["웨딩무드", "웨딩 무드"],
    ["한복", "한복 스냅"],
    ["반려동물", "반려동물 스냅"],
    ["동물스냅", "동물 스냅"],
    ["바다", "바다 인물 스냅"],
    ["카페", "카페 포트레이트"],
    ["네온", "야간 네온 스냅"],
    ["밤", "야간 인물 스냅"],
    ["플라워", "플라워 포트레이트"],
    ["거리", "거리 인물 스냅"],
    ["프로필", "프로필 포트레이트"]
  ];
  return labels.find(([tag]) => tags.includes(tag))?.[1] || "인물 스냅";
}

function splitInstagramArchive(project, media, projectIndex) {
  const groups = [];
  for (let start = 0; start < media.length; start += INSTAGRAM_CARD_SIZE) {
    const chunk = media.slice(start, start + INSTAGRAM_CARD_SIZE);
    if (!chunk.length) continue;
    const models = unique(chunk.flatMap((item) => item.models || []));
    const tags = unique(chunk.flatMap((item) => item.tags || []));
    const label = sceneLabel(tags);
    const owner = models[0] ? `@${String(models[0]).replace(/^@/, "")} · ` : "";
    const part = String(Math.floor(start / INSTAGRAM_CARD_SIZE) + 1).padStart(2, "0");
    groups.push({
      ...project,
      id: `${project.id || `instagram-${projectIndex}`}-grid-${part}`,
      title: `${owner}${label}`,
      subtitle: "@365daily.snap",
      description: "Instagram 메인 그리드 순서에 맞춰 구성한 촬영 시리즈입니다.",
      category: "Instagram",
      tags,
      models,
      cover: chunk[0]?.src || "",
      media: chunk
    });
  }
  return groups;
}

function prepareContent(raw) {
  const projects = [];
  (Array.isArray(raw.projects) ? raw.projects : []).forEach((project, projectIndex) => {
    const media = selectMedia(project);
    if (!media.length) return;
    const isArchive = /archive|아카이브/i.test(`${project.title || ""} ${project.category || ""}`) && media.length > 8;
    if (isArchive) {
      projects.push(...splitInstagramArchive(project, media, projectIndex));
      return;
    }
    projects.push({ ...project, cover: project.cover || media[0]?.src || "", media });
  });
  return { ...raw, projects, portfolioItems: [] };
}

function collectAssets(value, output = new Set()) {
  if (typeof value === "string") {
    if (value.startsWith("/") && IMAGE_PATTERN.test(value)) output.add(value.split("?")[0]);
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectAssets(item, output));
    return output;
  }
  if (value && typeof value === "object") Object.values(value).forEach((item) => collectAssets(item, output));
  return output;
}

async function saveContent(destination, content) {
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

async function loadPortfolio() {
  const destination = join(SITE_DIR, PORTFOLIO_PATH);
  try {
    const response = await fetchWithRetry(`${ORIGIN}/portfolio/portfolio.json`);
    const raw = JSON.parse(await response.text());
    const content = prepareContent(raw);
    await saveContent(destination, content);
    console.log(`Prepared ${content.projects.length} projects from the source.`);
    return content;
  } catch (error) {
    if (await exists(destination)) {
      console.warn(`Source unavailable; using local portfolio.json: ${error.message}`);
      const raw = JSON.parse(await readFile(destination, "utf8"));
      const content = prepareContent(raw);
      await saveContent(destination, content);
      return content;
    }
    console.warn(`Source unavailable; using Instagram fallback: ${error.message}`);
    await saveContent(destination, FALLBACK_CONTENT);
    return FALLBACK_CONTENT;
  }
}

async function downloadAsset(pathname) {
  const destination = join(SITE_DIR, pathname.replace(/^\/+/, ""));
  if (await exists(destination)) return { status: "cached", pathname };
  try {
    const response = await fetchWithRetry(`${ORIGIN}${pathname}`, 2);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > 12 * 1024 * 1024) throw new Error("file exceeds 12MB public limit");
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, buffer);
    return { status: "downloaded", pathname };
  } catch (error) {
    console.warn(`Asset warning: ${pathname} (${error.message})`);
    return { status: "failed", pathname };
  }
}

await mkdir(".git/info", { recursive: true });
await appendFile(".git/info/exclude", "\n/site/portfolio/\n/site/reviews/\n", "utf8");

const content = await loadPortfolio();
const assets = [...collectAssets(content)];
let downloaded = 0;
let cached = 0;
let failed = 0;

for (let index = 0; index < assets.length; index += 8) {
  const results = await Promise.all(assets.slice(index, index + 8).map(downloadAsset));
  results.forEach((result) => {
    if (result.status === "downloaded") downloaded += 1;
    if (result.status === "cached") cached += 1;
    if (result.status === "failed") failed += 1;
  });
}

console.log(`Portfolio build complete: ${downloaded} downloaded, ${cached} cached, ${failed} unavailable.`);
