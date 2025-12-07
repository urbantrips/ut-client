const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets/videos');
const OUTPUT_DIR = path.join(ASSETS_DIR, 'compressed');

// Video compression settings
const VIDEO_SETTINGS = {
  // For hero video (larger, needs better quality)
  hero: {
    crf: 28, // Quality (18-28, lower = better quality but larger file)
    preset: 'medium', // Encoding speed
    maxWidth: 1920,
    maxHeight: 1080,
  },
  // For reels (smaller, can be more compressed)
  reel: {
    crf: 30,
    preset: 'medium',
    maxWidth: 1080,
    maxHeight: 1920,
  },
};

function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function compressVideo(inputPath, outputPath, settings) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;

    // Get video dimensions using ffprobe
    const probeOutput = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${inputPath}"`,
      { encoding: 'utf-8' }
    );
    const [width, height] = probeOutput.trim().split('x').map(Number);

    // Calculate new dimensions
    let newWidth = width;
    let newHeight = height;
    
    if (width > settings.maxWidth || height > settings.maxHeight) {
      const scale = Math.min(settings.maxWidth / width, settings.maxHeight / height);
      newWidth = Math.round(width * scale);
      newHeight = Math.round(height * scale);
      // Ensure even dimensions (required by some codecs)
      newWidth = newWidth % 2 === 0 ? newWidth : newWidth - 1;
      newHeight = newHeight % 2 === 0 ? newHeight : newHeight - 1;
    }

    // Compress video
    const command = `ffmpeg -i "${inputPath}" -vcodec libx264 -crf ${settings.crf} -preset ${settings.preset} -vf "scale=${newWidth}:${newHeight}" -movflags +faststart -an "${outputPath}"`;
    
    execSync(command, { stdio: 'inherit' });

    const newStats = await fs.promises.stat(outputPath);
    const newSize = newStats.size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% saved)`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting video compression...\n');

  if (!checkFFmpeg()) {
    console.error('✗ FFmpeg is not installed or not in PATH.');
    console.error('\nPlease install FFmpeg:');
    console.error('  Windows: https://ffmpeg.org/download.html');
    console.error('  macOS: brew install ffmpeg');
    console.error('  Linux: sudo apt-get install ffmpeg');
    process.exit(1);
  }

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Videos directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = await fs.promises.readdir(ASSETS_DIR);
  const videoFiles = files.filter(f => /\.(mp4|mov|avi)$/i.test(f));

  if (videoFiles.length === 0) {
    console.log('No video files found.');
    return;
  }

  for (const file of videoFiles) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    
    // Determine settings based on filename
    const settings = file.includes('hero') ? VIDEO_SETTINGS.hero : VIDEO_SETTINGS.reel;
    
    await compressVideo(inputPath, outputPath, settings);
  }

  console.log('\n✓ Video compression complete!');
  console.log(`\nCompressed videos are in: ${OUTPUT_DIR}`);
  console.log('Review the compressed videos and replace the originals if satisfied.');
}

main().catch(console.error);

