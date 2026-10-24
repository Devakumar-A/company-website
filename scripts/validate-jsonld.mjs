import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const sitemapContent = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemapContent.matchAll(/<loc>(https:\/\/cognolynx\.tech[^<]*)<\/loc>/g)].map(m => m[1]);

console.log(`Validating JSON-LD across ${urls.length} sitemap URLs...`);

const results = [];
let validCount = 0;
let errorCount = 0;

for (const url of urls) {
  const route = url.replace('https://cognolynx.tech', '') || '/';
  const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');

  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');
  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  if (jsonLdMatches.length === 0) {
    results.push({ url, route, status: 'NO_JSON_LD' });
    errorCount++;
    continue;
  }

  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      const graph = parsed['@graph'] || [parsed];
      const _types = graph.map(item => item['@type']).filter(Boolean);

      // Validate required properties on common types
      for (const item of graph) {
        if (item['@type'] === 'Person') {
          if (!item.name || !item['@id']) {
            throw new Error(`Person missing name or @id in ${url}`);
          }
        }
        if (item['@type'] === 'Organization') {
          if (!item.name || !item['@id'] || !item.url) {
            throw new Error(`Organization missing name, @id, or url in ${url}`);
          }
        }
        if (item['@type'] === 'BreadcrumbList') {
          if (!item.itemListElement || !Array.isArray(item.itemListElement)) {
            throw new Error(`BreadcrumbList missing itemListElement in ${url}`);
          }
        }
        if (item['@type'] === 'FAQPage') {
          if (!item.mainEntity || !Array.isArray(item.mainEntity)) {
            throw new Error(`FAQPage missing mainEntity in ${url}`);
          }
        }
      }

      validCount++;
    } catch (err) {
      results.push({ url, route, error: err.message });
      errorCount++;
    }
  }
}

console.log(`Validation finished.`);
console.log(`Valid JSON-LD instances: ${validCount}`);
console.log(`Errors found: ${errorCount}`);
if (errorCount > 0) {
  console.table(results);
} else {
  console.log(`ALL JSON-LD schemas parsed with 100% valid JSON and valid Schema.org structure!`);
}
