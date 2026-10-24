import sharp from "sharp";
import fs from "fs";

async function optimizeImages() {
  console.log("Starting safe image optimization...");

  // 1. Logos: Navbar and brand mark assets
  const logoFiles = [
    { src: "public/assets/logo.png", maxDim: 800 },
    { src: "public/assets/logo-purple.png", maxDim: 800 },
    { src: "public/assets/logo-black.png", maxDim: 800 },
    { src: "public/logo.png", maxDim: 800 },
    { src: "public/logo-purple.png", maxDim: 800 },
    { src: "public/logo-black.png", maxDim: 800 },
  ];

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
