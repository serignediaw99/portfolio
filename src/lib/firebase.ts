// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, StorageReference } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Upload a video file to Firebase Storage
 * @param file The file to upload
 * @param fileName The name to save the file as
 * @returns The download URL for the uploaded file
 */
export async function uploadVideo(file: File, fileName: string): Promise<string> {
  const storageRef = ref(storage, `videos/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/**
 * Get the download URL for a video
 * @param fileName The name of the file to get the URL for
 * @returns The download URL for the file
 */
export async function getVideoUrl(fileName: string): Promise<string> {
  const storageRef = ref(storage, `videos/${fileName}`);
  return getDownloadURL(storageRef);
}

/**
 * List all videos in the videos folder
 * @returns An array of file names and download URLs
 */
export async function listVideos(): Promise<{ name: string; url: string }[]> {
  const storageRef = ref(storage, 'videos');
  const result = await listAll(storageRef);
  
  const videos = await Promise.all(
    result.items.map(async (itemRef: StorageReference) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url: url
      };
    })
  );
  
  return videos;
}

export { storage }; 