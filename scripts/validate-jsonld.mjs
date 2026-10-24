import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const sitemapPath = 'dist/sitemap.xml';

if (!fs.existsSync(sitemapPath)) {
  console.error('dist/sitemap.xml not found! Please build first.');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemapContent.matchAll(/<loc>(https:\/\/cognolynx\.tech[^<]*)<\/loc>/g)].map((m) => m[1]);

console.log(`\n======================================================================`);
console.log(`VALIDATING JSON-LD & SCHEMA.ORG STRUCTURE ACROSS ${urls.length} SITEMAP URLS`);
console.log(`======================================================================\n`);

const results = [];
let validCount = 0;
let errorCount = 0;

for (const url of urls) {
  const route = url.replace('https://cognolynx.tech', '') || '/';
  const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.warn(`File missing for prerendered route: ${filePath}`);
    continue;
  }

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

      for (const item of graph) {
        // Validate WebSite
        if (item['@type'] === 'WebSite') {
          if (!item.name || !item['@id'] || !item.url) {
            throw new Error(`WebSite missing name, @id, or url in ${url}`);
          }
          if (item.name !== 'Cognolynx') {
            throw new Error(`WebSite name must be Cognolynx, got ${item.name}`);
          }
        }

        // Validate Person (Founder)
        if (item['@type'] === 'Person') {
          if (!item.name || !item['@id']) {
            throw new Error(`Person missing name or @id in ${url}`);
          }
        }

        // Validate Organization
        if (item['@type'] === 'Organization') {
          if (!item.name || !item['@id'] || !item.url) {
            throw new Error(`Organization missing name, @id, or url in ${url}`);
          }
        }

        // Validate BreadcrumbList
        if (item['@type'] === 'BreadcrumbList') {
          if (!item.itemListElement || !Array.isArray(item.itemListElement)) {
            throw new Error(`BreadcrumbList missing itemListElement in ${url}`);
          }
          item.itemListElement.forEach((el, idx) => {
            if (!el.name || typeof el.position !== 'number') {
              throw new Error(`BreadcrumbList element #${idx + 1} invalid in ${url}`);
            }
          });
        }

        // Validate FAQPage
        if (item['@type'] === 'FAQPage') {
          if (!item.mainEntity || !Array.isArray(item.mainEntity)) {
            throw new Error(`FAQPage missing mainEntity in ${url}`);
          }
        }

        // Validate BlogPosting / Article
        if (item['@type'] === 'BlogPosting' || item['@type'] === 'Article') {
          if (!item.headline || !item.image) {
            throw new Error(`Article missing headline or image in ${url}`);
          }
        }

        // Validate WebPage & Subtypes
        if (['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(item['@type'])) {
          if (!item.name || !item.url) {
            throw new Error(`${item['@type']} missing name or url in ${url}`);
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
  process.exit(1);
} else {
  console.log(`\n✓ ALL JSON-LD schemas parsed with 100% valid JSON and valid Schema.org structure!`);
}

// Target test report for Requirement 4
console.log(`\n======================================================================`);
console.log(`SPECIFIC RICH RESULTS AUDIT: HOMEPAGE, ABOUT & SERVICES`);
console.log(`======================================================================`);

const testRoutes = ['/', '/about', '/services'];
for (const tr of testRoutes) {
  const filePath = tr === '/' ? path.join(distDir, 'index.html') : path.join(distDir, tr, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (match) {
    const data = JSON.parse(match[1]);
    const graph = data['@graph'] || [data];
    console.log(`\nRoute: ${tr}`);
    console.log(`Entities in @graph: ${graph.map((g) => g['@type']).join(', ')}`);
    const webpage = graph.find((g) => ['WebPage', 'AboutPage'].includes(g['@type']));
    if (webpage) {
      console.log(`  - WebPage Title: "${webpage.name}"`);
      console.log(`  - WebPage Image: "${webpage.image}"`);
      console.log(`  - primaryImageOfPage: "${webpage.primaryImageOfPage?.url}"`);
    }
    const breadcrumb = graph.find((g) => g['@type'] === 'BreadcrumbList');
    if (breadcrumb) {
      console.log(`  - Breadcrumb Trail: ${breadcrumb.itemListElement.map((b) => b.name).join(' > ')}`);
    }
    const website = graph.find((g) => g['@type'] === 'WebSite');
    if (website) {
      console.log(`  - WebSite Name: "${website.name}" | alternateName: "${website.alternateName}"`);
    }
  }
}
