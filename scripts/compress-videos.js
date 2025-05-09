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

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compress a single video
function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',     // Use H.264 codec
        '-crf 32',          // Even more aggressive compression (28 -> 32)
        '-preset veryslow', // Slowest preset for best compression
        '-vf scale=640:-2', // Scale down to 640p width, maintain aspect ratio
        '-c:a aac',         // Audio codec
        '-b:a 64k',         // Further reduced audio bitrate (96k -> 64k)
        '-movflags +faststart', // Enable fast start for web playback
        '-profile:v baseline', // Use baseline profile for better compatibility
        '-level 3.0',        // Set H.264 level
        '-maxrate 1000k',    // Lower maximum bitrate (1500k -> 1000k)
        '-bufsize 1500k',    // Adjusted buffer size
        '-tune fastdecode',  // Optimize for fast decoding
        '-pix_fmt yuv420p',  // Use more compatible pixel format
        '-g 30'             // Keyframe every 30 frames
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