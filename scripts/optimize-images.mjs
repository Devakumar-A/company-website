import sharp from "sharp";
import fs from "fs";

async function optimizeImages() {
  console.log("Starting safe image optimization...");

  // 1. Favicon: 128x128 high-res PNG (from 320 KB to ~1 KB)
  if (fs.existsSync("public/assets/favions.png")) {
    const inputBuf = fs.readFileSync("public/assets/favions.png");
    const favBuffer = await sharp(inputBuf)
      .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync("public/assets/favions.png", favBuffer);
    console.log(`Optimized favions.png: ${favBuffer.length} bytes`);
  }

  // 2. Logos: Navbar and About section shards
  const logoFiles = [
    { src: "public/assets/logo.png", maxDim: 800 },
    { src: "public/assets/logo-purple.png", maxDim: 800 },
    { src: "public/assets/logo-black.png", maxDim: 800 },
    { src: "public/logo.png", maxDim: 800 },
    { src: "public/logo-purple.png", maxDim: 800 },
    { src: "public/logo-black.png", maxDim: 800 },
  ];

  for (const item of logoFiles) {
    if (!fs.existsSync(item.src)) continue;
    const inputBuf = fs.readFileSync(item.src);
    const meta = await sharp(inputBuf).metadata();
    const width = meta.width > item.maxDim ? item.maxDim : meta.width;

    // WebP version
    const webpPath = item.src.replace(/\.png$/, ".webp");
    await sharp(inputBuf)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(webpPath);

    // Optimized PNG in-place
    const optPngBuffer = await sharp(inputBuf)
      .resize(width, null, { withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9, effort: 8 })
      .toBuffer();
    fs.writeFileSync(item.src, optPngBuffer);

    console.log(`Optimized ${item.src}: PNG ${optPngBuffer.length} bytes, WebP ${fs.statSync(webpPath).size} bytes`);
  }

  // 3. Hero video posters
  const posters = [
    { src: "public/assets/hero-video-poster-desktop.jpg", width: 1920, height: 1080 },
    { src: "public/assets/hero-video-poster-mobile.jpg", width: 1080, height: 1920 },
  ];

  for (const item of posters) {
    if (!fs.existsSync(item.src)) continue;
    const inputBuf = fs.readFileSync(item.src);

    // WebP version
    const webpPath = item.src.replace(/\.jpg$/, ".webp");
    await sharp(inputBuf)
      .resize(item.width, item.height, { fit: "cover" })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    // Optimized JPEG in-place
    const optJpgBuffer = await sharp(inputBuf)
      .resize(item.width, item.height, { fit: "cover" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(item.src, optJpgBuffer);

    console.log(`Optimized ${item.src}: JPG ${optJpgBuffer.length} bytes, WebP ${fs.statSync(webpPath).size} bytes`);
  }

  // 4. Solutions images
  const solutions = [
    "public/assets/solutions/digital-products.jpg",
    "public/assets/solutions/ai-systems.jpg",
    "public/assets/solutions/mobile-experiences.jpg",
    "public/assets/solutions/design-brand.jpg",
    "public/assets/solutions/growth-marketing.jpg",
  ];

  for (const file of solutions) {
    if (!fs.existsSync(file)) continue;
    const inputBuf = fs.readFileSync(file);

    // WebP version
    const webpPath = file.replace(/\.jpg$/, ".webp");
    await sharp(inputBuf)
      .resize(1200, 896, { fit: "cover" })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    // Optimized JPEG in-place
    const optBuffer = await sharp(inputBuf)
      .resize(1200, 896, { fit: "cover" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(file, optBuffer);

    console.log(`Optimized ${file}: JPG ${optBuffer.length} bytes, WebP ${fs.statSync(webpPath).size} bytes`);
  }

  // 5. Hero backgrounds (if any)
  const heroBgs = [
    "public/assets/hero-background-desktop.png",
    "public/assets/hero-background-mobile.png",
  ];
  for (const file of heroBgs) {
    if (!fs.existsSync(file)) continue;
    const inputBuf = fs.readFileSync(file);

    const webpPath = file.replace(/\.png$/, ".webp");
    await sharp(inputBuf)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    const optBuffer = await sharp(inputBuf)
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(file, optBuffer);

    console.log(`Optimized ${file}: PNG ${optBuffer.length} bytes, WebP ${fs.statSync(webpPath).size} bytes`);
  }

  console.log("Image optimization complete!");
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
