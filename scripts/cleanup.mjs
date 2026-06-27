import { readFile, writeFile } from 'node:fs/promises';
const file = 'site/portfolio/portfolio.json';
const data = JSON.parse(await readFile(file, 'utf8'));
data.projects = (data.projects || []).slice(2);
await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
