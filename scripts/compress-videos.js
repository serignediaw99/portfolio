const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Set the ffmpeg path
ffmpeg.setFfmpegPath('/opt/homebrew/bin/ffmpeg');

// Get the video name from command line arguments if provided
const videoName = process.argv[2];

// Define input and output directories
const inputDir = '/Users/serignediaw/Documents/Personal-Projects/music-visualizer/viz';
const outputDir = '/Users/serignediaw/Documents/Personal-Projects/music-visualizer/compressed-viz';

// Target file size in bytes (100MB)
const TARGET_FILE_SIZE = 100 * 1024 * 1024;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to get file size in MB
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / (1024 * 1024);
}

// Function to compress a single video
function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const inputSize = getFileSizeInMB(inputPath);
    console.log(`📊 Original file size: ${inputSize.toFixed(2)}MB`);

    // Use less aggressive settings to target ~100MB
    const crf = 20; // Lower CRF for better quality

    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',     // Use H.264 codec
        `-crf ${crf}`,      // Constant Rate Factor (lower = better quality)
        '-preset medium',   // Encoding preset
        '-c:a aac',         // Audio codec
        '-b:a 192k',        // Higher audio bitrate
        '-movflags +faststart' // Enable fast start for web playback
      ])
      .output(outputPath)
      .on('end', () => {
        const outputSize = getFileSizeInMB(outputPath);
        console.log(`✅ Compressed: ${path.basename(inputPath)}`);
        console.log(`📊 Compressed size: ${outputSize.toFixed(2)}MB`);
        
        // If still too large, try again with slightly more aggressive settings
        if (outputSize > TARGET_FILE_SIZE) {
          console.log('⚠️ File still too large, trying slightly more aggressive compression...');
          fs.unlinkSync(outputPath); // Delete the too-large file
          compressVideo(inputPath, outputPath).then(resolve).catch(reject);
        } else {
          resolve();
        }
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