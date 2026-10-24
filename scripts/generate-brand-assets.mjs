import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const assetsDir = path.resolve(publicDir, 'assets');

// Helper to assemble standard Windows/Browser ICO container with PNG payloads
function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const entries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // 32 bpp
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // file offset

    entries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...buffers]);
}

async function generateBrandAssets() {
  console.log('Generating favicon and branding assets for Cognolynx...');

  const sourceLogo = path.resolve(assetsDir, 'logo.png');
  if (!fs.existsSync(sourceLogo)) {
    throw new Error(`Source logo not found at ${sourceLogo}`);
  }

  // 1. Extract trimmed mark (width 471, height 569 from public/assets/logo.png)
  const trimmedMark = await sharp(sourceLogo)
    .extract({ left: 165, top: 67, width: 471, height: 569 })
    .toBuffer();

  // Helper to create square icon of size S x S
  // Uses gentle outer violet glow to ensure the dark shard is crisp on dark mode tabs
  // and stays perfectly sharp and natural on light mode / Google Search results.
  async function renderSquareIcon(size, options = {}) {
    const { opaqueBackground = null, paddingRatio = 0.82 } = options;

    const targetHeight = Math.round(size * paddingRatio);
    const targetWidth = Math.round(targetHeight * (471 / 569));

    const resizedMark = await sharp(trimmedMark)
      .resize(targetWidth, targetHeight, { fit: 'contain' })
      .png()
      .toBuffer();

    // Generate subtle violet aura behind the mark
    const { data, info } = await sharp(resizedMark).raw().toBuffer({ resolveWithObject: true });
    const glowRaw = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        glowRaw[i] = 139; // R
        glowRaw[i + 1] = 92; // G
        glowRaw[i + 2] = 246; // B
        glowRaw[i + 3] = Math.round(alpha * 0.42); // subtle glow intensity
      }
    }

    const blurRadius = Math.max(1, Math.round(size * 0.016));
    const glowBlurred = await sharp(glowRaw, { raw: info })
      .blur(blurRadius)
      .png()
      .toBuffer();

    const top = Math.round((size - targetHeight) / 2);
    const left = Math.round((size - targetWidth) / 2);

    const baseBackground = opaqueBackground
      ? { r: 0, g: 0, b: 9, alpha: 1 } // #000009 brand dark
      : { r: 0, g: 0, b: 0, alpha: 0 }; // transparent

    return await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: baseBackground,
      },
    })
      .composite([
        { input: glowBlurred, top, left },
        { input: resizedMark, top, left },
      ])
      .png()
      .toBuffer();
  }

  // Generate individual PNG sizes
  console.log('Rendering square icon sizes...');
  const png16 = await renderSquareIcon(16, { paddingRatio: 0.84 });
  const png32 = await renderSquareIcon(32, { paddingRatio: 0.84 });
  const png48 = await renderSquareIcon(48, { paddingRatio: 0.84 });
  const png96 = await renderSquareIcon(96, { paddingRatio: 0.84 });
  const png180Opaque = await renderSquareIcon(180, { opaqueBackground: true, paddingRatio: 0.78 });
  const png192 = await renderSquareIcon(192, { paddingRatio: 0.82 });
  const png512 = await renderSquareIcon(512, { paddingRatio: 0.82 });

  // 1. favicon.ico (multi-resolution container with 48x48, 32x32, 16x16)
  const icoBuffer = createIco([
    { width: 48, height: 48, buffer: png48 },
    { width: 32, height: 32, buffer: png32 },
    { width: 16, height: 16, buffer: png16 },
  ]);
  fs.writeFileSync(path.resolve(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created: public/favicon.ico (48x48, 32x32, 16x16)');

  // 2. favicon-96x96.png
  fs.writeFileSync(path.resolve(publicDir, 'favicon-96x96.png'), png96);
  console.log('Created: public/favicon-96x96.png');

  // 3. apple-touch-icon.png (180x180, opaque #000009 background per Apple guidelines)
  fs.writeFileSync(path.resolve(publicDir, 'apple-touch-icon.png'), png180Opaque);
  console.log('Created: public/apple-touch-icon.png');

  // 4. icon-192.png & icon-512.png
  fs.writeFileSync(path.resolve(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.resolve(publicDir, 'icon-512.png'), png512);
  console.log('Created: public/icon-192.png, public/icon-512.png');

  // Fallback copies for site.webmanifest
  fs.writeFileSync(path.resolve(publicDir, 'favicon-192.png'), png192);
  fs.writeFileSync(path.resolve(publicDir, 'favicon-512.png'), png512);
  console.log('Created: public/favicon-192.png, public/favicon-512.png');

  // 5. favicon.svg
  const svg512Base64 = png512.toString('base64');
  const faviconSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <title>Cognolynx Favicon</title>
  <image href="data:image/png;base64,${svg512Base64}" width="512" height="512" />
</svg>
`;
  fs.writeFileSync(path.resolve(publicDir, 'favicon.svg'), faviconSvgContent, 'utf8');
  console.log('Created: public/favicon.svg');

  // 6. 1200x630 Open Graph & Twitter preview image (og-image.png)
  console.log('Generating 1200x630 Open Graph preview image...');
  const ogMarkResized = await sharp(trimmedMark)
    .resize(Math.round(180 * (471 / 569)), 180, { fit: 'contain' })
    .png()
    .toBuffer();
  const ogMarkBase64 = ogMarkResized.toString('base64');

  const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#2e1065" stop-opacity="0.75" />
      <stop offset="42%" stop-color="#14052e" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#000009" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="65%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.45" />
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.3" />
    </linearGradient>
    <filter id="haloGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="24" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Deep Obsidian Brand Background -->
  <rect width="1200" height="630" fill="#000009" />
  <rect width="1200" height="630" fill="url(#bgGlow)" />

  <!-- Subtle Precision Frame -->
  <rect x="28" y="28" width="1144" height="574" rx="22" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" />

  <!-- Domain Eyebrow Badge -->
  <g transform="translate(600, 72)">
    <rect x="-115" y="0" width="230" height="34" rx="17" fill="url(#badgeGrad)" stroke="rgba(139, 92, 246, 0.45)" stroke-width="1" />
    <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#c084fc" text-anchor="middle" letter-spacing="2">COGNOLYNX.TECH</text>
  </g>

  <!-- Ambient Light Circle behind Logo -->
  <circle cx="600" cy="226" r="115" fill="#7c3aed" opacity="0.28" filter="url(#haloGlow)" />

  <!-- Cognolynx Logo Mark -->
  <image href="data:image/png;base64,${ogMarkBase64}" x="526" y="136" width="148" height="180" />

  <!-- Brand Wordmark -->
  <text x="600" y="385" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="url(#titleGrad)" text-anchor="middle" letter-spacing="6">COGNOLYNX</text>

  <!-- Tagline -->
  <text x="600" y="434" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="23" font-weight="500" fill="#cbd5e1" text-anchor="middle" letter-spacing="0.4">Custom Software &amp; AI Product Engineering</text>

  <!-- Pillar Services / Highlights -->
  <g transform="translate(600, 508)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="500" fill="#94a3b8" text-anchor="middle" letter-spacing="1.2">CUSTOM SOFTWARE  •  AI SYSTEMS  •  CLOUD ARCHITECTURE  •  WEB PLATFORMS</text>
  </g>
</svg>
`;

  const ogPngBuffer = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  fs.writeFileSync(path.resolve(publicDir, 'og-image.png'), ogPngBuffer);
  fs.writeFileSync(path.resolve(assetsDir, 'og-image.png'), ogPngBuffer);
  console.log('Created: public/og-image.png & public/assets/og-image.png (1200x630)');

  console.log('All brand assets successfully generated!');
}

generateBrandAssets().catch((err) => {
  console.error('Failed to generate brand assets:', err);
  process.exit(1);
});
