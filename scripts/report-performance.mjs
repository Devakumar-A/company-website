import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const distAssetsDir = path.resolve('dist', 'assets');
const chunks = [];

if (fs.existsSync(distAssetsDir)) {
  for (const file of fs.readdirSync(distAssetsDir)) {
    if (file.endsWith('.js') || file.endsWith('.css')) {
      const full = path.join(distAssetsDir, file);
      const raw = fs.readFileSync(full);
      const gz = zlib.gzipSync(raw);
      chunks.push({
        file,
        type: file.endsWith('.js') ? 'js' : 'css',
        rawBytes: raw.length,
        rawKb: (raw.length / 1024).toFixed(2),
        gzBytes: gz.length,
        gzKb: (gz.length / 1024).toFixed(2),
      });
    }
  }
}

chunks.sort((a, b) => b.rawBytes - a.rawBytes);

console.log('=== PER-CHUNK BUNDLE SIZES ===');
console.log('Top JS Chunks:');
chunks.filter((c) => c.type === 'js').slice(0, 15).forEach((c) => {
  console.log(`  ${c.file.padEnd(40)} ${c.rawKb.padStart(8)} kB (gz: ${c.gzKb.padStart(6)} kB)`);
});

console.log('\nTop CSS Chunks:');
chunks.filter((c) => c.type === 'css').slice(0, 10).forEach((c) => {
  console.log(`  ${c.file.padEnd(40)} ${c.rawKb.padStart(8)} kB (gz: ${c.gzKb.padStart(6)} kB)`);
});

// Images
const images = [];

function scanImages(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanImages(full);
    } else if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(item)) {
      const ext = path.extname(item).toLowerCase().slice(1);
      images.push({
        name: path.relative(path.resolve('public'), full).replace(/\\/g, '/'),
        format: ext,
        bytes: stat.size,
        kb: (stat.size / 1024).toFixed(2),
      });
    }
  }
}
scanImages(path.resolve('public'));

images.sort((a, b) => b.bytes - a.bytes);

console.log('\n=== LARGEST IMAGES & FORMATS ===');
images.slice(0, 15).forEach((img) => {
  console.log(`  ${img.name.padEnd(45)} [${img.format.toUpperCase().padEnd(4)}] ${img.kb.padStart(8)} kB`);
});

fs.writeFileSync(
  'performance-report.json',
  JSON.stringify({ chunks, images }, null, 2),
  'utf8'
);
