export interface VisualizerVideo {
  id: string;
  title: string;
  artist: string;
  publicId: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
}

// Firebase Storage URLs for videos
const firebaseStorageBaseUrl = 'https://firebasestorage.googleapis.com/v0/b/portfolio-4029a.firebasestorage.app/o/videos%2F';
const urlSuffix = '?alt=media';

// Add cache control and support for chunked transfer
const cacheParam = '&max-age=86400'; // Cache for 24 hours
const chunkParam = '&chunked=true'; // Request chunked transfer for better streaming

// Optimize for both high quality and low quality versions
interface FirebaseUrlOptions {
  useLowQuality?: boolean;
  fastStreaming?: boolean;
  highCache?: boolean;
}

// Helper function to format the Firebase Storage URL with options
const getFirebaseUrl = (fileName: string, options: FirebaseUrlOptions = {}): string => {
  if (!fileName) {
    console.error("Empty file name provided to getFirebaseUrl");
    return "";
  }

  const {
    useLowQuality = false,
    fastStreaming = true, 
    highCache = true
  } = options;
  
  try {
    // Check if we should use a low quality version for thumbnails
    let fileToUse = fileName;
    
    // Build the URL with parameters
    const encodedFileName = encodeURIComponent(fileToUse);
    let url = `${firebaseStorageBaseUrl}${encodedFileName}${urlSuffix}`;
    
    // Add chunked transfer for streaming if requested
    if (fastStreaming) {
      url += chunkParam;
    }
    
    // Add caching parameters
    if (highCache) {
      url += cacheParam;
    }
    
    return url;
  } catch (error) {
    console.error("Error formatting Firebase URL:", error);
    return "";
  }
};

// Helper function specifically for low resolution thumbnails
export const getThumbnailUrl = (videoId: string): string => {
  const video = visualizerVideos.find(v => v.id === videoId);
  if (!video) return '';
  
  // If there's a specific thumbnail, use it
  if (video.thumbnail) {
    return getFirebaseUrl(video.thumbnail);
  }
  
  // Otherwise use the video itself with low quality option
  return getFirebaseUrl(video.publicId.split('/').pop()?.split('?')[0] || '', { useLowQuality: true });
};

// Helper to get the highest quality version for modal viewing
export const getHighQualityUrl = (videoId: string): string => {
  const video = visualizerVideos.find(v => v.id === videoId);
  if (!video) return '';
  
  return video.publicId;
};

export const visualizerVideos: VisualizerVideo[] = [
  {
    id: 'vale',
    title: 'Vale',
    artist: 'BICEP',
    publicId: getFirebaseUrl('vale_viz.mp4'),
    description: 'A visualizer for the song "Vale" by BICEP',
    tags: ['electronic', 'ambient', 'chillwave']
  },
  {
    id: 'sun-phase',
    title: 'Sun Phase',
    artist: 'Pretty Girl',
    publicId: getFirebaseUrl('sun_phase_viz.mp4'),
    description: 'A visualizer for the song "Sun Phase" by Pretty Girl',
    tags: ['electronic', 'ambient', 'chillwave']
  },
  {
    id: 'lights-out',
    title: 'Lights Out',
    artist: 'Fred Again.. x Romy x HAAi',
    publicId: getFirebaseUrl('lights_out_viz.mp4'),
    description: 'A visualizer for the track "Lights Out" by Fred Again.., Romy, and HAAi',
    tags: ['electronic', 'dance', 'house']
  },
  {
    id: 'apricots',
    title: 'Apricots',
    artist: 'Bicep',
    publicId: getFirebaseUrl('BICEP  APRICOTS (Official Video).mp4'),
    description: 'A visualizer for "Apricots" by Bicep',
    tags: ['electronic', 'dance', 'IDM']
  },
  {
    id: 'weekend',
    title: 'Weekend',
    artist: 'Flume feat. Moses Sumney',
    publicId: getFirebaseUrl('Flume - Weekend feat. Moses Sumney.mp4'),
    description: 'A visualizer for "Weekend" by Flume featuring Moses Sumney',
    tags: ['electronic', 'future bass', 'experimental']
  },
  {
    id: 'flex-fm',
    title: 'flex fm (freddit)',
    artist: 'Joy Orbison feat. Lil Yachty, Future, Playboi Carti',
    publicId: getFirebaseUrl('Joy Orbison  flex fm (freddit) feat. Lil Yachty, Future, Playboi Carti_16x9.mp4'),
    description: 'A visualizer for "flex fm (freddit)" by Joy Orbison featuring Lil Yachty, Future, and Playboi Carti',
    tags: ['electronic', 'UK garage', 'rap']
  },
  {
    id: 'what-else-is-there',
    title: 'What Else Is There?',
    artist: 'Röyksopp ft. Fever Ray (DJ Tennis Remix)',
    publicId: getFirebaseUrl('Röyksopp - \'What Else Is There_\' (ft. Fever Ray) [DJ Tennis Remix]  Official Audio.mp4'),
    description: 'A visualizer for the DJ Tennis remix of "What Else Is There?" by Röyksopp featuring Fever Ray',
    tags: ['electronic', 'techno', 'remix']
  },
  {
    id: 'track-uno',
    title: 'Track Uno',
    artist: 'Kaytranada',
    publicId: getFirebaseUrl('TRACK UNO.mp4'),
    description: 'A visualizer for "Track Uno" by Kaytranada',
    tags: ['electronic', 'house', 'hip-hop']
  },
  {
    id: 'calling-on',
    title: 'Calling On',
    artist: 'Drake',
    publicId: getFirebaseUrl('calling_on_viz.mp4'),
    description: 'A visualizer for "Calling On" by Drake',
    tags: ['hip-hop', 'rap', 'rnb']
  },
  {
    id: 'dont-go-mad',
    title: 'Don\'t Go Mad',
    artist: 'Fraxiom, Teals, Gupi',
    publicId: getFirebaseUrl('dont_go_mad_viz.mp4'),
    description: 'A visualizer for "Don\'t Go Mad" by Fraxiom, Teals, and Gupi',
    tags: ['hyperpop', 'electronic', 'experimental']
  },
  {
    id: 'hyperreal',
    title: 'Hyperreal',
    artist: 'Flume feat. Kučka',
    publicId: getFirebaseUrl('hyperreal_viz.mp4'),
    description: 'A visualizer for "Hyperreal" by Flume featuring Kučka',
    tags: ['electronic', 'future bass', 'experimental']
  },
  {
    id: 'iluv',
    title: 'iluv',
    artist: 'Sophie',
    publicId: getFirebaseUrl('iluv_viz.mp4'),
    description: 'A visualizer for "iluv" by Sophie',
    tags: ['electronic', 'hyperpop', 'experimental']
  },
  {
    id: 'innerbloom',
    title: 'Innerbloom',
    artist: 'RÜFÜS DU SOL',
    publicId: getFirebaseUrl('innerbloom_viz.mp4'),
    description: 'A visualizer for "Innerbloom" by RÜFÜS DU SOL',
    tags: ['electronic', 'house', 'indie dance']
  },
  {
    id: 'liverpool-street',
    title: 'Liverpool Street In the Rain',
    artist: 'Mall Grab',
    publicId: getFirebaseUrl('liverpool_viz.mp4'),
    description: 'A visualizer for "Liverpool Street In the Rain" by Mall Grab',
    tags: ['electronic', 'house', 'lo-fi house']
  },
  {
    id: 'two-thousand-seventeen',
    title: 'Two Thousand and Seventeen',
    artist: 'Four Tet',
    publicId: getFirebaseUrl('two_thousand_seventeen_viz.mp4'),
    description: 'A visualizer for "Two Thousand and Seventeen" by Four Tet',
    tags: ['electronic', 'experimental', 'ambient']
  },
  {
    id: 'porco-rosso',
    title: 'Porco Rosso',
    artist: 'sunflwr',
    publicId: getFirebaseUrl('porco rosso.mp4'),
    description: 'A visualizer for "Porco Rosso" by sunflwr',
    tags: ['electronic', 'lofi', 'ambient']
  }
]; 