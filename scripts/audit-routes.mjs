import fs from 'node:fs';
import path from 'node:path';

const sitemapContent = fs.readFileSync('dist/sitemap.xml', 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>(https:\/\/cognolynx\.tech[^<]*)<\/loc>/g)].map(m => m[1]);

const results = [];

for (const url of locMatches) {
  const route = url.replace('https://cognolynx.tech', '') || '/';
  const filePath = route === '/' ? 'dist/index.html' : path.join('dist', route, 'index.html');
  
  if (!fs.existsSync(filePath)) {
    results.push({ url, route, status: 404, error: 'File missing' });
    continue;
  }
  
  const html = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';
  
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';
  
  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  results.push({
    route,
    url,
    status: 200,
    canonical,
    canonicalMatches: canonical === url,
    title,
    titleLen: title.length,
    description,
    descLen: description.length,
    h1Count: h1Matches.length,
    h1: h1Matches[0] || 'NONE',
    indexable: !robots.includes('noindex')
  });
}

console.log('Total checked routes:', results.length);
const issues = results.filter(r => !r.canonicalMatches || !r.indexable || r.h1Count !== 1 || r.titleLen > 65 || r.descLen > 165 || !r.title || !r.description);
console.log('Issues found:', issues.length);
if (issues.length > 0) {
  for (const i of issues) {
    console.log('Issue in', i.route, ':', {
      canonicalMatches: i.canonicalMatches,
      canonical: i.canonical,
      url: i.url,
      h1Count: i.h1Count,
      titleLen: i.titleLen,
      descLen: i.descLen
    });
  }
} else {
  console.log('SUCCESS: All 45 sitemap routes have perfect self-referencing canonicals, 1 H1, valid length titles/descriptions, and indexable robots!');
}

fs.writeFileSync('route-audit-report.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved route audit to route-audit-report.json');
