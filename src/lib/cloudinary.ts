import { CldVideoPlayer } from 'next-cloudinary';

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

// Video transformation options
export const videoTransformation = {
  width: 700,
  height: 700,
  crop: 'fill',
  quality: 'auto',
  format: 'auto',
};

// Function to get Cloudinary video URL
export const getCloudinaryUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${publicId}`;
};

// Function to get Cloudinary video URL with transformations
export const getCloudinaryUrlWithTransformations = (publicId: string, customTransformations?: Record<string, string | number>) => {
  const transformations = {
    ...videoTransformation,
    ...customTransformations
  };
  
  const transformationString = Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
    
  // Split the publicId into version and filename
  const [version, filename] = publicId.split('/');
  
  // If there's no version, use the publicId as is
  if (!filename) {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${transformationString}/${publicId}`;
  }
  
  // If there is a version, place transformations between version and filename
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${version}/${transformationString}/${filename}`;
}; 