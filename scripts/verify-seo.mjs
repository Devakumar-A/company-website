import fs from 'node:fs';

const testRoutes = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/services/index.html',
  'dist/solutions/digital-products/index.html',
  'dist/services/web-digital/ecommerce/index.html',
  'dist/contact/index.html',
  'dist/careers/apply/index.html',
  'dist/404.html'
];

for (const file of testRoutes) {
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="(.*?)"/)?.[1];
  const rootIndex = html.indexOf('<div id="root">');
  const rootSnippet = html.slice(rootIndex, rootIndex + 250).replace(/\s+/g, ' ');

  console.log('====================================================');
  console.log(`FILE: ${file}`);
  console.log(`TITLE: (${title?.length} chars) ${title}`);
  console.log(`DESC: (${desc?.length} chars) ${desc}`);
  console.log(`CANONICAL: ${canonical}`);
  console.log(`ROBOTS: ${robots}`);
  console.log(`ROOT SNIPPET: ${rootSnippet}`);
}
