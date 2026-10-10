import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const { seoData } = await import('../src/data/seoData.js');

const indexableRoutes = Object.keys(seoData).filter((r) => !seoData[r].noindex);

console.log(`Auditing ${indexableRoutes.length} indexable pages...`);

const genericAnchorPatterns = [
  /^click here$/i,
  /^here$/i,
  /^read more$/i,
  /^learn more$/i,
  /^more$/i,
  /^link$/i,
  /^view$/i,
  /^details$/i,
  /^see more$/i,
];

const auditResults = {
  h1Issues: [], // { route, count, h1s }
  headingOrderIssues: [], // { route, issues }
  imagesMissingAlt: [], // { route, src }
  imagesMissingDimensions: [], // { route, src }
  genericAnchorText: [], // { route, text, href }
  onClickNavigation: [], // checked in source files
};

// Check HTML files for rendered on-page issues
for (const route of indexableRoutes) {
  let htmlPath;
  if (route === '/') {
    htmlPath = path.resolve(distDir, 'index.html');
  } else {
    const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '');
    htmlPath = path.resolve(distDir, `${cleanRoute}.html`);
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.resolve(distDir, cleanRoute, 'index.html');
    }
  }

  if (!fs.existsSync(htmlPath)) {
    console.warn(`File missing for route ${route}: ${htmlPath}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract body content inside #root
  const start = html.indexOf('<div id="root">') + '<div id="root">'.length;
  const end = html.lastIndexOf('</div>');
  const bodyContent = start > -1 && end > start ? html.slice(start, end) : html;

  // 1. H1 count
  const h1Matches = [...bodyContent.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length !== 1) {
    auditResults.h1Issues.push({
      route,
      count: h1Matches.length,
      h1s: h1Matches.map((m) => m[1].replace(/<[^>]*>/g, '').trim()),
    });
  }

  // 2. Heading order (h1 -> h2 -> h3 -> etc.)
  const headings = [...bodyContent.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    level: parseInt(m[1].slice(1), 10),
    tag: m[1].toLowerCase(),
    text: m[2].replace(/<[^>]*>/g, '').trim().slice(0, 40),
  }));

  const orderIssues = [];
  let prevLevel = 0;
  for (const h of headings) {
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      orderIssues.push(`Skipped heading level: <${prevLevel}> followed directly by <${h.tag}> ("${h.text}")`);
    }
    prevLevel = h.level;
  }
  if (orderIssues.length > 0) {
    auditResults.headingOrderIssues.push({ route, issues: orderIssues });
  }

  // 3. Images missing alt & 4. Images missing dimensions
  const imgMatches = [...bodyContent.matchAll(/<img([^>]*)\/?>/gi)];
  for (const match of imgMatches) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src="([^"]*)"/i);
    const altMatch = attrs.match(/alt="([^"]*)"/i);
    const widthMatch = attrs.match(/width="([^"]*)"/i);
    const heightMatch = attrs.match(/height="([^"]*)"/i);

    const src = srcMatch ? srcMatch[1] : 'unknown';
    const alt = altMatch ? altMatch[1] : null;

    if (alt === null) {
      auditResults.imagesMissingAlt.push({ route, src, tag: match[0] });
    }
    if (!widthMatch || !heightMatch) {
      auditResults.imagesMissingDimensions.push({ route, src, tag: match[0] });
    }
  }

  // 5. Generic anchor text
  const linkMatches = [...bodyContent.matchAll(/<a([^>]*)>([\s\S]*?)<\/a>/gi)];
  for (const match of linkMatches) {
    const attrs = match[1];
    const rawText = match[2].replace(/<[^>]*>/g, '').trim();
    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    const href = hrefMatch ? hrefMatch[1] : '';

    if (rawText && genericAnchorPatterns.some((pattern) => pattern.test(rawText))) {
      auditResults.genericAnchorText.push({ route, text: rawText, href });
    }
  }
}

// 6. Check source code for onClick navigation (e.g. useNavigate, window.location, navigate())
const srcDir = path.resolve(rootDir, 'src');
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const code = fs.readFileSync(full, 'utf8');
      const lines = code.split('\n');
      lines.forEach((line, idx) => {
        if (/onClick\s*=\s*\{.*navigate\(/.test(line) || /onClick\s*=\s*\{.*window\.location/.test(line)) {
          auditResults.onClickNavigation.push({
            file: path.relative(rootDir, full),
            line: idx + 1,
            code: line.trim(),
          });
        }
      });
    }
  }
}
scanDir(srcDir);

console.log('\n=== AUDIT RESULTS SUMMARY ===');
console.log(`Pages with H1 issues: ${auditResults.h1Issues.length}`);
console.log(`Pages with broken heading order: ${auditResults.headingOrderIssues.length}`);
console.log(`Images missing alt attribute: ${auditResults.imagesMissingAlt.length}`);
console.log(`Images missing width/height attributes: ${auditResults.imagesMissingDimensions.length}`);
console.log(`Generic anchor text found: ${auditResults.genericAnchorText.length}`);
console.log(`Navigation via onClick found in source: ${auditResults.onClickNavigation.length}`);

fs.writeFileSync(path.resolve(rootDir, 'audit-results.json'), JSON.stringify(auditResults, null, 2), 'utf8');
console.log('Detailed results written to audit-results.json');
