import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = (process.env.NETLIFY_ORIGIN || "https://365dailysnap.netlify.app").replace(/\/$/, "");
const SITE_DIR = "site";
const PORTFOLIO_PATH = "portfolio/portfolio.json";
const ASSET_PATTERN = /\.(?:avif|gif|jpe?g|m4v|mov|mp4|png|svg|webm|webp)(?:\?|$)/i;

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "365-daily-snap-pages-sync" },
        redirect: "follow",
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
  throw lastError;
}

function collectAssets(value, output = new Set()) {
  if (typeof value === "string") {
    if (value.startsWith("/") && ASSET_PATTERN.test(value)) output.add(value.split("?")[0]);
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
    const text = await response.text();
    JSON.parse(text);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, `${text.trim()}\n`, "utf8");
    console.log("Updated portfolio.json from the protected source.");
    return JSON.parse(text);
  } catch (error) {
    if (await exists(destination)) {
      console.warn(`Origin unavailable; using committed portfolio.json: ${error.message}`);
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
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, buffer);
    return { status: "downloaded", pathname };
  } catch (error) {
    console.warn(`Asset warning: ${pathname} (${error.message})`);
    return { status: "failed", pathname };
  }
}

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
