import fs from 'node:fs';

const sampleFiles = [
  { path: 'dist/index.html', name: 'Homepage' },
  { path: 'dist/about/index.html', name: 'About Page' },
  { path: 'dist/contact/index.html', name: 'Contact Page' },
  { path: 'dist/blog/index.html', name: 'Blog Page' },
  { path: 'dist/services/web-digital/ecommerce/index.html', name: 'Service: Ecommerce' },
  { path: 'dist/careers/apply/index.html', name: 'Private: Careers Apply (noindex)' },
  { path: 'dist/404.html', name: 'Utility: 404 Error (noindex)' },
];

for (const sample of sampleFiles) {
  console.log('======================================================================');
  console.log(`PAGE: ${sample.name} (${sample.path})`);
  const html = fs.readFileSync(sample.path, 'utf8');

  const scriptMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  if (!scriptMatch) {
    console.log('JSON-LD script present: false (Expected for noindex pages)');
    continue;
  }

  console.log('JSON-LD script present: true');
  try {
    const parsed = JSON.parse(scriptMatch[1]);
    console.log('JSON Parses cleanly: true');
    console.log('@context:', parsed['@context']);

    const graph = parsed['@graph'] || [parsed];
    const types = graph.map((item) => item['@type']);
    console.log('@types in @graph:', types.join(', '));

    for (const item of graph) {
      if (item['@type'] === 'BreadcrumbList') {
        console.log('Breadcrumb Trail:');
        item.itemListElement.forEach((el) => {
          console.log(`  ${el.position}. ${el.name} -> ${el.item}`);
        });
      }
      if (item['@type'] === 'Service') {
        console.log(`Service Name: "${item.name}"`);
        console.log(`Service URL: "${item.url}"`);
        console.log(`Service Provider: "${item.provider?.name}"`);
        console.log(`Service Provider Object: ${JSON.stringify(item.provider)}`);
      }
      if (item['@type'] === 'Organization') {
        console.log(`Organization Name: "${item.name}"`);
        console.log(`Organization Logo: "${item.logo}"`);
        console.log(`Organization sameAs: ${JSON.stringify(item.sameAs)}`);
      }
      if (item['@type'] === 'WebSite') {
        console.log(`WebSite Name: "${item.name}"`);
        console.log(`WebSite URL: "${item.url}"`);
      }
    }
  } catch (err) {
    console.error('JSON parsing failed:', err);
  }
}
