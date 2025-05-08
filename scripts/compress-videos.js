const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Get the video name from command line arguments if provided
const videoName = process.argv[2];

// Define input and output directories
const inputDir = '/Users/serignediaw/Documents/Personal-Projects/music-visualizer/viz';
const outputDir = '/Users/serignediaw/Documents/Personal-Projects/music-visualizer/compressed-viz';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compress a single video
function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',  // Use H.264 codec
        '-crf 23',       // Constant Rate Factor (18-28 is good, lower = better quality)
        '-preset medium', // Encoding preset (slower = better compression)
        '-c:a aac',      // Audio codec
        '-b:a 128k'      // Audio bitrate
      ])
      .output(outputPath)
      .on('end', () => {
        console.log(`✅ Compressed: ${path.basename(inputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error compressing ${path.basename(inputPath)}:`, err);
        reject(err);
      })
      .run();
  });
}

// Main function to handle compression
async function main() {
  try {
    if (videoName) {
      // Single video compression
      const inputPath = path.join(inputDir, videoName);
      const outputPath = path.join(outputDir, videoName);

      if (!fs.existsSync(inputPath)) {
        console.error(`❌ Video not found: ${videoName}`);
        process.exit(1);
      }

      console.log(`🎥 Compressing single video: ${videoName}`);
      await compressVideo(inputPath, outputPath);
      console.log('✨ Single video compression completed!');
    } else {
      // Batch compression
      const files = fs.readdirSync(inputDir)
        .filter(file => file.endsWith('.mp4') && !file.includes('compressed'));

      if (files.length === 0) {
        console.log('No videos found to compress.');
        return;
      }

      console.log(`🎥 Found ${files.length} videos to compress`);
      
      for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        await compressVideo(inputPath, outputPath);
      }
      
      console.log('✨ All videos compressed successfully!');
    }
  } catch (error) {
    console.error('❌ Error during compression:', error);
    process.exit(1);
  }
}

main(); 