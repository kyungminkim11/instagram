import { readFile, writeFile } from 'node:fs/promises';

const file = 'site/portfolio/portfolio.json';
const data = JSON.parse(await readFile(file, 'utf8'));
const projects = Array.isArray(data.projects) ? data.projects : [];
data.projects = projects.filter((project) => Array.isArray(project.media) && project.media.some((item) => item && item.src));
await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Kept ' + data.projects.length + ' valid public portfolio projects.');
