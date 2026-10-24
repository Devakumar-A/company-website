import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const sitemapContent = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemapContent.matchAll(/<loc>(https:\/\/cognolynx\.tech[^<]*)<\/loc>/g)].map(m => m[1]);

console.log(`Auditing all ${urls.length} sitemap URLs in dist/...`);

const titles = new Map();
const descriptions = new Map();
const issues = [];

for (const url of urls) {
  const route = url.replace('https://cognolynx.tech', '') || '/';
  const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');

  if (!fs.existsSync(filePath)) {
    issues.push({ url, issue: 'HTML file missing' });
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Title check
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    issues.push({ url, issue: 'Missing title tag' });
  } else if (title.length > 65) {
    issues.push({ url, issue: `Title too long: ${title.length} chars ("${title}")` });
  } else {
    if (titles.has(title)) {
      issues.push({ url, issue: `Duplicate title with ${titles.get(title)}: "${title}"` });
    } else {
      titles.set(title, url);
    }
  }

  // Meta description check
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (!desc) {
    issues.push({ url, issue: 'Missing meta description' });
  } else if (desc.length > 165) {
    issues.push({ url, issue: `Meta description too long: ${desc.length} chars` });
  } else {
    if (descriptions.has(desc)) {
      issues.push({ url, issue: `Duplicate description with ${descriptions.get(desc)}` });
    } else {
      descriptions.set(desc, url);
    }
  }

  // H1 check
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    issues.push({ url, issue: 'Missing H1 tag' });
  } else if (h1Matches.length > 1) {
    issues.push({ url, issue: `Multiple H1 tags (${h1Matches.length})` });
  }

  // Canonical self-referencing check
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  if (canonical !== url) {
    issues.push({ url, issue: `Canonical mismatch: expected "${url}", got "${canonical}"` });
  }

  // OG Image check
  const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  if (!ogImgMatch || !ogImgMatch[1].includes('og-image.png')) {
    issues.push({ url, issue: 'Missing or invalid og:image tag' });
  }

  // Images without alt check
  const imgMatches = [...html.matchAll(/<img([^>]*)\/?>/gi)];
  for (const img of imgMatches) {
    const attrs = img[1];
    if (!attrs.includes('alt=')) {
      issues.push({ url, issue: `Image missing alt attribute: ${img[0].slice(0, 50)}...` });
    }
  }
}

console.log(`Audit complete.`);
console.log(`Total URLs audited: ${urls.length}`);
console.log(`Issues found: ${issues.length}`);
if (issues.length > 0) {
  console.table(issues);
} else {
  console.log('PERFECT: Every single route has unique title (<65), unique description (<165), single H1, exact canonical, valid OG image, and all images have alt attributes!');
}
