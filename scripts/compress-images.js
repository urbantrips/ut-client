const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const QUALITY = 80; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Max width for images

async function compressImage(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate new dimensions (maintain aspect ratio)
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }

    // Convert to WebP format
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newStats = await fs.promises.stat(outputPath);
    const newSize = newStats.size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${savings}% saved)`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      // Process PNG, JPG, JPEG images
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputPath = fullPath.replace(ext, '.webp');
        
        // Skip if WebP already exists
        if (await fs.promises.access(outputPath).then(() => true).catch(() => false)) {
          console.log(`⊘ Skipping ${entry.name} (WebP already exists)`);
          continue;
        }
        
        await compressImage(fullPath, outputPath);
      }
    }
  }
}

async function main() {
  console.log('Starting image compression...\n');
  
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  let totalOriginal = 0;
  let totalNew = 0;

  await processDirectory(ASSETS_DIR);

  console.log('\n✓ Image compression complete!');
  console.log('\nNote: Original files are preserved. Update your code to use .webp extensions.');
  console.log('You can delete the original PNG/JPG files after verifying the WebP versions work correctly.');
}

main().catch(console.error);

