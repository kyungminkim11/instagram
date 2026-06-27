import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = (process.env.NETLIFY_ORIGIN || "https://365dailysnap.netlify.app").replace(/\/$/, "");
const SITE_DIR = "site";
const PORTFOLIO_PATH = "portfolio/portfolio.json";
const IMAGE_PATTERN = /\.(?:avif|gif|jpe?g|png|webp)(?:\?|$)/i;

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
  const media = Array.isArray(project.media)
    ? project.media.filter((item) => item?.src && IMAGE_PATTERN.test(item.src))
    : [];
  if (media.length <= 24) return media;
  const grouped = new Map();
  media.forEach((item) => {
    const key = item.models?.[0] || "365daily.snap";
    if (!grouped.has(key)) grouped.set(key, []);
    if (grouped.get(key).length < 8) grouped.get(key).push(item);
  });
  return [...grouped.values()].flat().slice(0, 48);
}

function prepareContent(raw) {
  const projects = (Array.isArray(raw.projects) ? raw.projects : [])
    .map((project) => {
      const media = selectMedia(project);
      return { ...project, cover: media[0]?.src || "", media };
    })
    .filter((project) => project.media.length > 0);
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

async function loadPortfolio() {
  const destination = join(SITE_DIR, PORTFOLIO_PATH);
  try {
    const response = await fetchWithRetry(`${ORIGIN}/portfolio/portfolio.json`);
    const raw = JSON.parse(await response.text());
    const content = prepareContent(raw);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, `${JSON.stringify(content, null, 2)}\n`, "utf8");
    console.log(`Prepared ${content.projects.length} projects for public deployment.`);
    return content;
  } catch (error) {
    if (await exists(destination)) {
      console.warn(`Origin unavailable; using local portfolio.json: ${error.message}`);
      return JSON.parse(await readFile(destination, "utf8"));
    }
    throw new Error(`Portfolio sync failed and no local fallback exists: ${error.message}`);
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

console.log(`Portfolio asset sync complete: ${downloaded} downloaded, ${cached} cached, ${failed} unavailable.`);
