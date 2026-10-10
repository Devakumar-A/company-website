import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
process.env.CHROME_PATH = CHROME_PATH;

const routes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/services/web-digital/ecommerce',
];

const results = [];

console.log('Running mobile Lighthouse audits on preview server (http://localhost:4173)...\n');

for (const route of routes) {
  const url = `http://localhost:4173${route}`;
  console.log(`Auditing: ${url}...`);

  const tmpFile = path.resolve(`.lh-${Date.now()}.json`);

  try {
    execSync(
      `npx -y lighthouse "${url}" --output=json --output-path="${tmpFile}" --chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance,accessibility,seo --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        encoding: 'utf8',
        timeout: 90000,
      }
    );

    const reportJson = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));

    const perfScore = Math.round((reportJson.categories.performance?.score || 0) * 100);
    const a11yScore = Math.round((reportJson.categories.accessibility?.score || 0) * 100);
    const seoScore = Math.round((reportJson.categories.seo?.score || 0) * 100);

    const lcp = reportJson.audits['largest-contentful-paint']?.displayValue || `${reportJson.audits['largest-contentful-paint']?.numericValue} ms`;
    const cls = reportJson.audits['cumulative-layout-shift']?.displayValue || `${reportJson.audits['cumulative-layout-shift']?.numericValue}`;
    const tbt = reportJson.audits['total-blocking-time']?.displayValue || `${reportJson.audits['total-blocking-time']?.numericValue} ms`;

    results.push({
      route,
      url,
      performance: perfScore,
      accessibility: a11yScore,
      seo: seoScore,
      lcp,
      cls,
      tbt,
    });

    console.log(`  -> Perf: ${perfScore} | A11y: ${a11yScore} | SEO: ${seoScore} | LCP: ${lcp} | CLS: ${cls} | TBT: ${tbt}`);
  } catch (err) {
    console.error(`  Failed on ${route}:`, err.message);
  } finally {
    if (fs.existsSync(tmpFile)) {
      try { fs.unlinkSync(tmpFile); } catch {}
    }
  }
}

console.log('\n=== LIGHTHOUSE MOBILE AUDIT SUMMARY ===');
console.table(results);

fs.writeFileSync('lighthouse-summary.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved to lighthouse-summary.json');
