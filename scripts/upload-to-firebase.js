const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Log config for debugging (remove in production)
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? 'PRESENT' : 'MISSING',
  authDomain: firebaseConfig.authDomain ? 'PRESENT' : 'MISSING',
  projectId: firebaseConfig.projectId ? 'PRESENT' : 'MISSING',
  storageBucket: firebaseConfig.storageBucket ? 'PRESENT' : 'MISSING',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'PRESENT' : 'MISSING',
  appId: firebaseConfig.appId ? 'PRESENT' : 'MISSING',
  measurementId: firebaseConfig.measurementId ? 'PRESENT' : 'MISSING'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Define input directory
const inputPath = process.argv[2] || '/Users/serignediaw/Documents/Personal-Projects/music-visualizer/viz';

// Function to upload a single video
async function uploadVideo(filePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const storageRef = ref(storage, `videos/${fileName}`);
    
    // Get file data
    const fileData = fs.readFileSync(filePath);
    
    console.log(`📤 Uploading: ${fileName}`);
    
    // Upload file with content type for better streaming
    const metadata = {
      contentType: 'video/mp4'
    };
    
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);
    
    // Register observers
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress.toFixed(2)}% done`);
      }, 
      (error) => {
        // Error
        console.error(`❌ Error uploading ${fileName}:`, error);
        reject(error);
      }, 
      () => {
        // Complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(`✅ File ${fileName} available at:`, downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

// Main function to handle uploads
async function main() {
  try {
    // Check if path is a file or directory
    const stats = fs.statSync(inputPath);
    
    if (stats.isFile()) {
      // Upload a single file
      if (inputPath.endsWith('.mp4')) {
        console.log(`🎥 Processing single file: ${inputPath}`);
        await uploadVideo(inputPath);
      } else {
        console.log(`❌ File must be an .mp4: ${inputPath}`);
      }
    } else if (stats.isDirectory()) {
      // Process directory
      // Check if directory exists
      if (!fs.existsSync(inputPath)) {
        console.error(`❌ Directory not found: ${inputPath}`);
        process.exit(1);
      }
      
      // Get all mp4 files
      const files = fs.readdirSync(inputPath)
        .filter(file => file.endsWith('.mp4'));
      
      if (files.length === 0) {
        console.log('No videos found to upload.');
        return;
      }
      
      console.log(`🎥 Found ${files.length} videos to upload`);
      
      // Upload all videos
      for (const file of files) {
        const filePath = path.join(inputPath, file);
        await uploadVideo(filePath);
      }
    } else {
      console.error(`❌ Invalid path: ${inputPath}`);
      process.exit(1);
    }
    
    console.log('✨ All videos uploaded successfully!');
  } catch (error) {
    console.error('❌ Error during upload:', error);
    process.exit(1);
  }
}

main(); 