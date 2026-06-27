import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const siteDir = "site";
const portfolioPath = join(siteDir, "portfolio/portfolio.json");
const content = JSON.parse(await readFile(portfolioPath, "utf8"));

for (let projectIndex = 0; projectIndex < (content.projects || []).length; projectIndex += 1) {
  const project = content.projects[projectIndex];
  for (let mediaIndex = 0; mediaIndex < (project.media || []).length; mediaIndex += 1) {
    const item = project.media[mediaIndex];
    const source = String(item.src || "");
    if (!/^https:\/\/(?:www\.)?instagram\.com\/p\/[^/]+\/media\//i.test(source)) continue;

    const fileName = `instagram-${String(projectIndex + 1).padStart(2, "0")}-${String(mediaIndex + 1).padStart(2, "0")}.jpg`;
    const publicPath = `/portfolio/local/${fileName}`;
    const destination = join(siteDir, publicPath.replace(/^\/+/, ""));

    try {
      const response = await fetch(source, {
        redirect: "follow",
        headers: {
          "user-agent": "Mozilla/5.0 AppleWebKit/537.36 Chrome/149 Safari/537.36",
          accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          referer: "https://www.instagram.com/",
        },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const type = response.headers.get("content-type") || "";
      if (!type.startsWith("image/")) throw new Error(`unexpected content type ${type}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, buffer);
      item.src = publicPath;
      if (mediaIndex === 0) project.cover = publicPath;
    } catch (error) {
      console.warn(`Could not save ${source}: ${error.message}`);
    }
  }
}

await writeFile(portfolioPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");

const indexPath = join(siteDir, "index.html");
let html = await readFile(indexPath, "utf8");
html = html
  .replace('<span>K<br />M</span>', '<span>365<br />DS</span>')
  .replace('안녕하세요. 365 Daily Snap의 김경민입니다.', '안녕하세요. 365 Daily Snap입니다.')
  .replace(',"founder":{"@type":"Person","name":"Kim Kyungmin"}', '');
await writeFile(indexPath, html, "utf8");

const appPath = join(siteDir, "app.js");
let app = await readFile(appPath, "utf8");
app = app
  .replace('aboutTitle: "안녕하세요. 365 Daily Snap의 김경민입니다."', 'aboutTitle: "안녕하세요. 365 Daily Snap입니다."')
  .replace('aboutTitle: "365 Daily SnapのKim Kyungminです。"', 'aboutTitle: "365 Daily Snapです。"')
  .replace('aboutTitle: "Hi, I’m Kim Kyungmin of 365 Daily Snap."', 'aboutTitle: "Hi, this is 365 Daily Snap."');
await writeFile(appPath, app, "utf8");

console.log("Public site images and photographer identity were updated.");
