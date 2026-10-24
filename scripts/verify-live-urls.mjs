const BASE_URL = 'http://127.0.0.1:4173';

const testPaths = [
  '/',
  '/about',
  '/internship',
  '/contact',
  '/robots.txt',
  '/sitemap.xml',
  '/humans.txt',
  '/llms.txt',
  '/.well-known/security.txt',
  '/non-existent-random-route-xyz-404'
];

async function verifyUrls() {
  console.log(`Verifying live preview endpoints on ${BASE_URL}...\n`);
  const results = [];

  for (const path of testPaths) {
    const url = `${BASE_URL}${path}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      results.push({
        path,
        status: res.status,
        contentType: res.headers.get('content-type') || 'none',
        contentSnippet: text.slice(0, 70).replace(/\r?\n/g, ' ')
      });
    } catch (err) {
      results.push({
        path,
        error: err.message
      });
    }
  }

  console.table(results);
}

verifyUrls();
