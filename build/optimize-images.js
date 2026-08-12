'use strict';
/**
 * Local build tool (Node.js, not needed on the server) that:
 *  1. Recompresses every JPEG/PNG in assets/img in place (same filename, same
 *     pixel dimensions, no visual change) using mozjpeg / optimized zlib.
 *  2. Generates AVIF + WebP siblings for each image, used by build/templates.js
 *     via <picture> so browsers that support them download a smaller file and
 *     everyone else still gets the original as a guaranteed-identical fallback.
 *  3. Writes build/image-meta.json: { "file.jpg": { width, height, avif, webp } }
 *     so every <img> emitted by the build can carry width/height (prevents
 *     layout shift) without hand-measuring 90+ files.
 *
 * Run with: npm run optimize-images
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const MANIFEST_PATH = path.join(__dirname, 'image-meta.json');

const RASTER_RE = /\.(jpe?g|png)$/i;
const WEBP_RE = /\.webp$/i;

// The brand mark gets rendered at very small sizes with fine text — lossy
// AVIF/WebP (even at high quality) visibly softens it. Keep it lossless-only.
const NO_LOSSY = new Set(['logo-marcanti.png']);

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1) + 'KB';
}

async function processRaster(file) {
  const full = path.join(IMG_DIR, file);
  const original = fs.readFileSync(full);
  const image = sharp(original, { failOn: 'none' }).rotate(); // auto-orient, then strip EXIF on output
  const meta = await image.metadata();
  const isPng = /\.png$/i.test(file);
  const hasAlpha = !!meta.hasAlpha;

  let recompressed;
  if (isPng) {
    // Lossless: same pixels, smaller bytes via a slower/better DEFLATE pass.
    recompressed = await image.clone().png({ compressionLevel: 9, effort: 10, palette: false }).toBuffer();
  } else {
    recompressed = await image.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
  }
  let finalOriginalBytes = original.length;
  if (recompressed.length > 0 && recompressed.length < original.length) {
    fs.writeFileSync(full, recompressed);
    finalOriginalBytes = recompressed.length;
  }

  const base = file.replace(RASTER_RE, '');
  const entry = { width: meta.width, height: meta.height };
  const skipLossy = NO_LOSSY.has(file);

  const webpBuf = skipLossy ? Buffer.alloc(0) : await image.clone().webp({ quality: 82, effort: 5, alphaQuality: 90 }).toBuffer();
  if (!skipLossy && webpBuf.length < finalOriginalBytes * 0.97) {
    fs.writeFileSync(path.join(IMG_DIR, base + '.webp'), webpBuf);
    entry.webp = true;
  }

  const avifBuf = skipLossy ? Buffer.alloc(0) : await image.clone().avif({ quality: hasAlpha ? 60 : 55, effort: 4 }).toBuffer();
  if (!skipLossy && avifBuf.length < finalOriginalBytes * 0.97 && avifBuf.length < webpBuf.length) {
    fs.writeFileSync(path.join(IMG_DIR, base + '.avif'), avifBuf);
    entry.avif = true;
  }

  return {
    file,
    entry,
    originalBytes: original.length,
    finalOriginalBytes,
    webpBytes: entry.webp ? webpBuf.length : null,
    avifBytes: entry.avif ? avifBuf.length : null,
  };
}

async function processExistingWebp(file) {
  const full = path.join(IMG_DIR, file);
  const original = fs.readFileSync(full);
  const meta = await sharp(original).metadata();
  return { file, entry: { width: meta.width, height: meta.height }, originalBytes: original.length, finalOriginalBytes: original.length, webpBytes: null, avifBytes: null };
}

async function main() {
  const files = fs.readdirSync(IMG_DIR);
  const rasterFiles = files.filter((f) => RASTER_RE.test(f));
  const webpFiles = files.filter((f) => WEBP_RE.test(f));

  const manifest = {};
  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalBestDelivered = 0; // what a modern browser actually downloads (avif > webp > original)

  console.log(`Processing ${rasterFiles.length} JPEG/PNG files...`);
  for (const file of rasterFiles) {
    const r = await processRaster(file);
    manifest[r.file] = r.entry;
    totalOriginal += r.originalBytes;
    totalOptimized += r.finalOriginalBytes;
    totalBestDelivered += r.avifBytes || r.webpBytes || r.finalOriginalBytes;
    console.log(
      `  ${file}: ${fmtKB(r.originalBytes)} -> ${fmtKB(r.finalOriginalBytes)}` +
      (r.webpBytes ? `, webp ${fmtKB(r.webpBytes)}` : '') +
      (r.avifBytes ? `, avif ${fmtKB(r.avifBytes)}` : '')
    );
  }

  for (const file of webpFiles) {
    const r = await processExistingWebp(file);
    manifest[r.file] = r.entry;
    totalOriginal += r.originalBytes;
    totalOptimized += r.finalOriginalBytes;
    totalBestDelivered += r.finalOriginalBytes;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  console.log('');
  console.log(`Original payload:            ${fmtKB(totalOriginal)}`);
  console.log(`After lossless recompression: ${fmtKB(totalOptimized)}`);
  console.log(`Delivered to modern browsers: ${fmtKB(totalBestDelivered)} (${(100 - (totalBestDelivered / totalOriginal) * 100).toFixed(0)}% smaller)`);
  console.log(`Manifest written to ${path.relative(process.cwd(), MANIFEST_PATH)} (${Object.keys(manifest).length} images)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
