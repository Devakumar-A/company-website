import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const { seoData } = await import('../src/data/seoData.js');

const allRoutes = Object.keys(seoData);
const indexableRoutes = allRoutes.filter((r) => !seoData[r].noindex);

// Normalize path to clean canonical format (no trailing slash, e.g. /about)
function normalizePath(rawHref) {
  if (!rawHref) return null;
  let href = rawHref.trim();
  // Strip protocol / domain if internal
  if (href.startsWith('https://cognolynx.tech')) {
    href = href.replace('https://cognolynx.tech', '');
  } else if (href.startsWith('https://cognolynx.com')) {
    href = href.replace('https://cognolynx.com', '');
  } else if (href.startsWith('http://localhost:4173')) {
    href = href.replace('http://localhost:4173', '');
  }
  // Ignore external links or anchor only / mailto / tel
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }
  // Remove hash and query
  href = href.split('#')[0].split('?')[0];
  if (!href) return null;
  if (!href.startsWith('/')) href = `/${href}`;
  href = href.replace(/\/+$/, '') || '/';
  return href;
}

// Inbound link count map: { [route]: Set<sourceRoute> }
const inboundLinks = {};
for (const route of indexableRoutes) {
  inboundLinks[route] = new Set();
}

// Read all rendered HTML pages in dist
const allHtmlFiles = [];
function findHtmlFiles(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      findHtmlFiles(full);
    } else if (item.endsWith('.html')) {
      allHtmlFiles.push(full);
    }
  }
}
findHtmlFiles(distDir);

for (const filePath of allHtmlFiles) {
  const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
  // Determine source route
  let sourceRoute;
  if (rel === 'index.html') {
    sourceRoute = '/';
  } else if (rel.endsWith('/index.html')) {
    sourceRoute = `/${rel.replace(/\/index\.html$/, '')}`;
  } else if (rel.endsWith('.html')) {
    sourceRoute = `/${rel.replace(/\.html$/, '')}`;
  } else {
    continue;
  }

  // Deduplicate: only process each source route once
  // E.g. skip .html if /index.html already processed or vice versa
  if (filePath.endsWith('.html') && !filePath.endsWith('index.html')) {
    const dirIndex = filePath.replace(/\.html$/, path.sep + 'index.html');
    if (fs.existsSync(dirIndex)) {
      continue;
    }
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const linkMatches = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>/gi)];

  for (const match of linkMatches) {
    const target = normalizePath(match[1]);
    if (target && inboundLinks[target] && target !== sourceRoute) {
      inboundLinks[target].add(sourceRoute);
    }
  }
}

const orphanPages = []; // 0 inbound links
const lowInboundPages = []; // < 3 inbound links

for (const route of indexableRoutes) {
  const sources = Array.from(inboundLinks[route]);
  const count = sources.length;
  if (count === 0) {
    orphanPages.push({ route, count: 0, sources: [] });
  } else if (count < 3) {
    lowInboundPages.push({ route, count, sources });
  }
}

console.log('=== INTERNAL LINK AUDIT ===');
console.log(`Total indexable pages: ${indexableRoutes.length}`);
console.log(`Orphan pages (0 inbound links): ${orphanPages.length}`);
orphanPages.forEach((p) => console.log(`  - ${p.route}`));

console.log(`\nPages with fewer than 3 inbound links: ${lowInboundPages.length}`);
lowInboundPages.forEach((p) => console.log(`  - ${p.route} (${p.count} inbound from: ${p.sources.join(', ')})`));

fs.writeFileSync(
  path.resolve(rootDir, 'internal-links-report.json'),
  JSON.stringify({ orphanPages, lowInboundPages, inboundCounts: Object.fromEntries(Object.entries(inboundLinks).map(([k, v]) => [k, Array.from(v)])) }, null, 2),
  'utf8'
);
