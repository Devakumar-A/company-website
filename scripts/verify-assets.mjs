import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir) {
  let res = [];
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(getHtmlFiles(full));
    } else if (f.endsWith('.html')) {
      res.push(full);
    }
  }
  return res;
}

const htmlFiles = getHtmlFiles('dist');
console.log(`Checking ${htmlFiles.length} HTML pages for image/video references...`);

let missing = 0;
const checked = new Set();

for (const page of htmlFiles) {
  const content = fs.readFileSync(page, 'utf8');
  const regex = /(?:src|href|poster|srcSet)=["']([^"']+\.(?:png|jpg|jpeg|webp|avif|svg|ico|mp4|webm))["']/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let url = match[1];
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (url.includes('cognolynx.tech/')) {
        url = url.split('cognolynx.tech')[1];
      } else {
        continue;
      }
    }
    
    url = url.split('?')[0].split('#')[0];
    if (!url.startsWith('/')) continue;
    
    const localPath = path.join('dist', url);
    if (!checked.has(localPath)) {
      checked.add(localPath);
      if (!fs.existsSync(localPath)) {
        console.error('MISSING ASSET:', url, 'referenced in', page);
        missing++;
      }
    }
  }
}

if (missing === 0) {
  console.log(`SUCCESS: All ${checked.size} unique media references exist in dist/. Zero broken assets!`);
  for (const item of checked) {
    console.log(` - ${item}`);
  }
} else {
  console.error(`FAILED: Found ${missing} missing assets!`);
  process.exit(1);
}
