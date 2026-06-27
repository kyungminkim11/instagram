import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = (process.env.NETLIFY_ORIGIN || "https://365dailysnap.netlify.app").replace(/\/$/, "");
const SITE_DIR = "site";
const downloaded = new Set();
const pending = [];

await rm(SITE_DIR, { recursive: true, force: true });
await mkdir(SITE_DIR, { recursive: true });

function localPathname(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Keep the encoded pathname when it cannot be decoded safely.
  }
  return decoded.replace(/^\/+/, "");
}

function shouldMirror(rawValue) {
  if (!rawValue || rawValue.startsWith("#") || rawValue.startsWith("data:") || rawValue.startsWith("mailto:") || rawValue.startsWith("tel:")) {
    return false;
  }

  const url = new URL(rawValue, ORIGIN);
  if (url.origin !== ORIGIN) return false;
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/manager")) return false;
  if (url.pathname.startsWith("/api/") && !url.pathname.startsWith("/api/media/")) return false;
  if (["/", "/ko", "/ja", "/en"].includes(url.pathname)) return false;
  return true;
}

function enqueue(rawValue) {
  if (!shouldMirror(rawValue)) return;
  const url = new URL(rawValue, ORIGIN);
  url.hash = "";
  const key = `${url.pathname}${url.search}`;
  if (downloaded.has(key) || pending.some((item) => item.key === key)) return;
  pending.push({ key, url });
}

function discoverHtml(text) {
  for (const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) enqueue(match[1]);
  for (const match of text.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) enqueue(candidate.trim().split(/\s+/)[0]);
  }
}

function discoverCss(text) {
  for (const match of text.matchAll(/url\((?:["']?)([^"')]+)(?:["']?)\)/gi)) enqueue(match[1]);
}

function discoverJavaScript(text) {
  const assetPattern = /["'`](\/(?!\/)[^"'`?#]+\.(?:avif|css|gif|ico|jpe?g|json|m4v|mov|mp4|ogg|png|svg|webm|webp|woff2?|ttf))(?:\?[^"'`]*)?["'`]/gi;
  for (const match of text.matchAll(assetPattern)) enqueue(match[1]);
}

function discoverJson(value) {
  if (typeof value === "string") {
    if (value.startsWith("/")) enqueue(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(discoverJson);
    return;
  }
  if (value && typeof value === "object") Object.values(value).forEach(discoverJson);
}

async function saveResponse(url, destination) {
  const response = await fetch(url, {
    headers: { "user-agent": "365-daily-snap-github-pages-mirror" },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, buffer);

  const contentType = response.headers.get("content-type") || "";
  if (/text|javascript|json|svg|xml/.test(contentType)) {
    const text = buffer.toString("utf8");
    if (contentType.includes("text/html")) discoverHtml(text);
    if (contentType.includes("text/css")) discoverCss(text);
    if (contentType.includes("javascript")) discoverJavaScript(text);
    if (contentType.includes("json")) {
      try {
        discoverJson(JSON.parse(text));
      } catch {
        // Ignore malformed or non-JSON responses.
      }
    }
  }

  return buffer;
}

const entryResponse = await fetch(`${ORIGIN}/ko`, { redirect: "follow" });
if (!entryResponse.ok) throw new Error(`Could not load Netlify origin: ${entryResponse.status}`);
let html = await entryResponse.text();
discoverHtml(html);

const shimTag = '    <script src="/github-pages-shim.js"></script>\n';
if (!html.includes("/github-pages-shim.js")) html = html.replace("  </head>", `${shimTag}  </head>`);

for (const path of ["index.html", "ko/index.html", "ja/index.html", "en/index.html", "404.html"]) {
  const destination = join(SITE_DIR, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

const shim = `(() => {
  const backendOrigin = ${JSON.stringify(ORIGIN)};
  const nativeFetch = window.fetch.bind(window);

  window.fetch = (input, init = {}) => {
    const rawUrl = typeof input === "string" ? input : input?.url;
    if (!rawUrl) return nativeFetch(input, init);

    const url = new URL(rawUrl, window.location.href);
    const method = String(init.method || (typeof input !== "string" && input?.method) || "GET").toUpperCase();

    if (url.origin === window.location.origin && url.pathname === "/api/content" && method === "GET") {
      return nativeFetch(`/portfolio/portfolio.json?updated=${Date.now()}`, { ...init, cache: "no-store" });
    }

    if (url.origin === window.location.origin && url.pathname.startsWith("/api/")) {
      return nativeFetch(backendOrigin + url.pathname + url.search, init);
    }

    return nativeFetch(input, init);
  };
})();
`;
await writeFile(join(SITE_DIR, "github-pages-shim.js"), shim, "utf8");

const portfolioUrl = new URL("/portfolio/portfolio.json", ORIGIN);
try {
  const portfolioBuffer = await saveResponse(portfolioUrl, join(SITE_DIR, "portfolio/portfolio.json"));
  discoverJson(JSON.parse(portfolioBuffer.toString("utf8")));
} catch (error) {
  console.warn("Portfolio JSON mirror warning:", error.message);
}

while (pending.length) {
  const item = pending.shift();
  if (downloaded.has(item.key)) continue;
  downloaded.add(item.key);
  const destination = join(SITE_DIR, localPathname(item.url.pathname));
  try {
    await saveResponse(item.url, destination);
  } catch (error) {
    console.warn("Asset mirror warning:", error.message);
  }
}

const adminTarget = `${ORIGIN}/admin-v2.html`;
const adminRedirect = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="0; url=${adminTarget}" />
    <title>365 Daily Snap 관리자 이동</title>
  </head>
  <body>
    <p>보호된 관리자 페이지로 이동 중입니다. <a href="${adminTarget}">바로 이동</a></p>
    <script>window.location.replace(${JSON.stringify(adminTarget)});</script>
  </body>
</html>
`;

for (const path of ["admin/index.html", "manager/index.html", "admin.html", "admin-v2.html"]) {
  const destination = join(SITE_DIR, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, adminRedirect, "utf8");
}

await writeFile(join(SITE_DIR, "CNAME"), "snap.lavalabs.co.kr\n", "utf8");
await writeFile(join(SITE_DIR, ".nojekyll"), "", "utf8");

console.log(`Mirrored ${downloaded.size} public assets from ${ORIGIN}.`);
