'use client';

import { useEffect, useState, useRef } from "react";
import { motion, stagger, useAnimate, AnimatePresence } from "motion/react";
import { AuroraBackground } from '@/components/ui/aurora-background';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { createPortal } from 'react-dom';
import { MorphingText } from '@/components/ui/liquid-text';
import { Typewriter } from '@/components/ui/typewriter-text';
import styles from './styles.module.css';
import { TrackSuggestionsForm } from '@/components/track-suggestions-form';
import { visualizerVideos, VisualizerVideo, getThumbnailUrl, getHighQualityUrl } from '@/data/visualizer-videos';

// Original visualization data structure with Firebase URLs
const visualizations = [
  {
    title: "Vale",
    artist: "BICEP",
    publicId: visualizerVideos.find(v => v.id === 'vale')?.publicId || "",
    depth: 2.5,
    position: "top-[10%] left-[80%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Weekend",
    artist: "Flume",
    publicId: visualizerVideos.find(v => v.id === 'weekend')?.publicId || "",
    depth: 2.5,
    position: "top-[75%] left-[85%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "What Else Is There? - DJ Tennis Remix",
    artist: "Röyksopp",
    publicId: visualizerVideos.find(v => v.id === 'what-else-is-there')?.publicId || "",
    depth: 1.0,
    position: "top-[40%] left-[80%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "TRACK UNO",
    artist: "KAYTRANADA",
    publicId: visualizerVideos.find(v => v.id === 'track-uno')?.publicId || "",
    depth: 1.5,
    position: "top-[30%] left-[3%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Apricots",
    artist: "BICEP",
    publicId: visualizerVideos.find(v => v.id === 'apricots')?.publicId || "",
    depth: 1.5,
    position: "top-[16%] left-[48%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "porco rosso",
    artist: "sunflwr",
    publicId: visualizerVideos.find(v => v.id === 'porco-rosso')?.publicId || "",
    depth: 1.5,
    position: "top-[40%] left-[33%]",
    size: "w-32 h-32 md:w-40 md:h-22"
  },
  {
    title: "Calling On",
    artist: "Swedish House Mafia",
    publicId: visualizerVideos.find(v => v.id === 'calling-on')?.publicId || "",
    depth: 0.5,
    position: "top-[20%] left-[18%]",
    size: "w-24 h-24 md:w-32 md:h-32"
  },
  {
    title: "Lights Out",
    artist: "Fred again..., Romy, HAAi",
    publicId: visualizerVideos.find(v => v.id === 'lights-out')?.publicId || "",
    depth: 2,
    position: "top-[20%] left-[65%]",
    size: "w-32 h-40 md:w-40 md:h-52"
  },
  {
    title: "Liverpool Street In The Rain",
    artist: "Mall Grab",
    publicId: visualizerVideos.find(v => v.id === 'liverpool-street')?.publicId || "",
    depth: 1,
    position: "top-[46%] left-[18%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Sun Phase",
    artist: "Pretty Girl",
    publicId: visualizerVideos.find(v => v.id === 'sun-phase')?.publicId || "",
    depth: 1,
    position: "top-[40%] left-[50%]",
    size: "w-32 h-32 md:w-40 md:h-40"
  },
  {
    title: "Two Thousand and Seventeen",
    artist: "Four Tet",
    publicId: visualizerVideos.find(v => v.id === 'two-thousand-seventeen')?.publicId || "",
    depth: 2,
    position: "top-[55%] left-[70%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Innerbloom",
    artist: "RÜFÜS DU SOL",
    publicId: visualizerVideos.find(v => v.id === 'innerbloom')?.publicId || "",
    depth: 1.5,
    position: "top-[8%] left-[35%]",
    size: "w-32 h-32 md:w-40 md:h-40"
  },
  {
    title: "iluv",
    artist: "Effy, Mall Grab",
    publicId: visualizerVideos.find(v => v.id === 'iluv')?.publicId || "",
    depth: 1,
    position: "top-[62%] left-[35%]",
    size: "w-32 h-36 md:w-40 md:h-50"
  },
  {
    title: "Hyperreal",
    artist: "Flume, KUČKA",
    publicId: visualizerVideos.find(v => v.id === 'hyperreal')?.publicId || "",
    depth: 1.5,
    position: "top-[67%] left-[55%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  }
];

export default function MusicVisualizerPage() {
  const [scope, animate] = useAnimate();
  const [selectedVideo, setSelectedVideo] = useState<typeof visualizations[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set([0]));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [preloadedVideos, setPreloadedVideos] = useState<Set<number>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set([0]));
  const [highQualityMode, setHighQualityMode] = useState(false);
  // Track buffered videos
  const [bufferedVideos, setBufferedVideos] = useState<Set<number>>(new Set());
  // Set minimum buffer before playback (3 seconds)
  const MIN_BUFFER_SECONDS = 3;
  // Track buffering state for each video
  const [bufferingVideos, setBufferingVideos] = useState<Set<number>>(new Set());
  // Manage video playback rate
  const [playbackRate, setPlaybackRate] = useState(0.9); // Slightly slower to allow buffer to build
  // Keep track of current modal video index
  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(null);
  // Keep track of preloaded modal videos
  const [preloadedModalVideos, setPreloadedModalVideos] = useState<Set<string>>(new Set());
  // Reference for hidden video element for preloading
  const hiddenPreloadRef = useRef<HTMLVideoElement | null>(null);

  // Debug: Log all video URLs at start
  useEffect(() => {
    console.log("Available video URLs:");
    visualizations.forEach((viz, index) => {
      console.log(`${index}. ${viz.title} - ${viz.artist}: ${viz.publicId}`);
    });
  }, []);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = Array(visualizations.length).fill(null);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Add priority hints to resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // @ts-ignore - newer API may not be in TypeScript defs
        if (entry.initiatorType === 'video' || entry.initiatorType === 'media') {
          console.log('Video resource loaded:', entry.name, 'Duration:', entry.duration);
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.log('PerformanceObserver not supported');
    }
    
    return () => {
      try {
        observer.disconnect();
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    animate("video", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
    
    // Load only first video immediately
    const initialVideosToPreload = [0];
    initialVideosToPreload.forEach(index => {
      setPreloadedVideos(prev => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      setPlayingVideos(prev => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
    });
    
    // Add a small delay before loading more videos to prioritize first paint
    setTimeout(() => {
      if (visibleVideos.has(0)) {
        const nextToLoad = [1, 2];
        nextToLoad.forEach(index => {
          setVisibleVideos(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
        });
      }
    }, 1000);
    
    // Set up intersection observer to load videos only when they come into view
    const options = {
      root: null,
      rootMargin: '400px', // Increased margin to load earlier
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (!id || !id.includes('video-container-')) return;
        
        const index = parseInt(id.split('-')[2]);
        if (isNaN(index)) return;
        
        if (entry.isIntersecting) {
          console.log(`Video container ${index} is now visible`);
          // Mark video as visible
          setVisibleVideos(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
          
          // Start playing when in viewport
          setPlayingVideos(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
          
          // Mark for preloading (will handle in useEffect below)
          setPreloadedVideos(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
          
          // Set higher priority for this video
          if (videoRefs.current[index]) {
            try {
              // @ts-ignore - fetchpriority is newer API
              videoRefs.current[index].fetchPriority = "high";
            } catch (e) {}
          }
          
          // Preload next videos if they exist (predictive loading)
          if (index + 1 < visualizations.length) {
            setPreloadedVideos(prev => {
              const newSet = new Set(prev);
              newSet.add(index + 1);
              return newSet;
            });
          }
        } else {
          // When out of view, pause video to save resources
          if (videoRefs.current[index] && !highQualityMode) {
            setPlayingVideos(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        }
      });
    }, options);
    
    // Observe all video containers
    const videoContainers = document.querySelectorAll('.video-container');
    console.log(`Found ${videoContainers.length} video containers to observe`);
    videoContainers.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [highQualityMode]);

  // Apply playback state based on visibility
  useEffect(() => {
    visualizations.forEach((_, index) => {
      const videoElement = videoRefs.current[index];
      if (!videoElement) return;
      
      if (playingVideos.has(index)) {
        if (videoElement.paused) {
          try {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.error(`Error playing video ${index}:`, error);
              });
            }
          } catch (e) {
            console.error(`Error playing video ${index}:`, e);
          }
        }
      } else {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    });
  }, [playingVideos]);

  // Handle preloading videos separately to avoid too many state updates
  useEffect(() => {
    if (preloadedVideos.size === 0) return;
    
    // Create link preload tags for videos that are marked for preloading
    preloadedVideos.forEach(index => {
      if (!visualizations[index]?.publicId) return;
      
      // If not already in DOM, create preload link
      const videoUrl = visualizations[index].publicId;
      const existingPreload = document.querySelector(`link[href="${videoUrl}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'video';
        preloadLink.href = videoUrl;
        
        // Set higher priority for visible videos
        if (visibleVideos.has(index)) {
          // @ts-ignore - fetchpriority is newer API
          preloadLink.fetchPriority = "high";
        }
        
        document.head.appendChild(preloadLink);
        console.log(`Preloading video ${index}: ${videoUrl}`);
      }
    });
  }, [preloadedVideos, visibleVideos]);

  const handleVideoError = (publicId: string, error: any) => {
    console.error(`Error loading video ${publicId}:`, {
      error,
      errorType: error?.type,
      errorCode: error?.target?.error?.code,
      errorMessage: error?.target?.error?.message,
      networkState: error?.target?.networkState,
      readyState: error?.target?.readyState,
      fullUrl: publicId,
      attemptedPublicId: publicId
    });
    
    // Try to fetch the URL to see if it's accessible
    fetch(publicId, { method: 'HEAD' })
      .then(response => {
        console.log(`Fetch test for ${publicId}: ${response.status} ${response.statusText}`);
      })
      .catch(fetchError => {
        console.error(`Fetch test failed for ${publicId}:`, fetchError);
      });
      
    setLoadingVideos(prev => {
      const next = new Set(prev);
      next.delete(publicId);
      return next;
    });
  };

  const handleVideoLoad = (publicId: string) => {
    console.log(`Video loaded successfully: ${publicId}`, {
      fullUrl: publicId,
      successfulPublicId: publicId
    });
    setLoadingVideos(prev => {
      const next = new Set(prev);
      next.delete(publicId);
      return next;
    });
    setLoadedVideos(prev => {
      const next = new Set(prev);
      next.add(publicId);
      return next;
    });
  };

  // Handle video switching in modal
  const handleVideoClick = (video: typeof visualizations[0], event: React.MouseEvent, index: number) => {
    setIsVideoLoading(true);
    setIsVideoReady(false);
    
    // Store the clicked position and index
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    
    // Set current modal index
    setCurrentModalIndex(index);
    
    // Clean up previous video if it exists
    if (previousVideoRef.current) {
      previousVideoRef.current.pause();
      previousVideoRef.current.src = '';
      previousVideoRef.current.load();
      previousVideoRef.current = null;
    }
    
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      previousVideoRef.current = videoRef.current;
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.load();
    }
    setSelectedVideo(null);
    setClickedPosition(null);
    setIsVideoLoading(false);
    setCurrentModalIndex(null);
  };

  // Generate placeholder images for unloaded videos
  const getPlaceholderBackground = (index: number) => {
    const hue = (index * 40) % 360;
    return `hsla(${hue}, 70%, 30%, 1)`;
  };

  // Add a buffer status check function
  const checkBufferStatus = (videoElement: HTMLVideoElement, index: number) => {
    if (!videoElement) return false;
    
    try {
      // Check if we have enough buffer ahead
      const buffered = videoElement.buffered;
      const currentTime = videoElement.currentTime;
      let hasEnoughBuffer = false;
      
      for (let i = 0; i < buffered.length; i++) {
        // Check if current time is within this buffer range
        if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
          // Calculate how many seconds are buffered ahead
          const bufferedAhead = buffered.end(i) - currentTime;
          
          if (bufferedAhead >= MIN_BUFFER_SECONDS) {
            hasEnoughBuffer = true;
            
            // If previously buffering, now we have enough buffer
            if (bufferingVideos.has(index)) {
              setBufferingVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
              console.log(`Video ${index} has enough buffer (${bufferedAhead.toFixed(1)}s), resuming playback`);
            }
            
            // Add to buffered videos set
            setBufferedVideos(prev => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          } else {
            // Not enough buffer, mark as buffering
            if (!bufferingVideos.has(index)) {
              setBufferingVideos(prev => {
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
              });
              console.log(`Video ${index} doesn't have enough buffer (${bufferedAhead.toFixed(1)}s), pausing to buffer`);
            }
          }
          
          break;
        }
      }
      
      return hasEnoughBuffer;
    } catch (e) {
      console.error('Error checking buffer status:', e);
      return false;
    }
  };

  // Check buffer status periodically
  useEffect(() => {
    const bufferCheckInterval = setInterval(() => {
      visualizations.forEach((_, index) => {
        const videoElement = videoRefs.current[index];
        if (!videoElement || !playingVideos.has(index)) return;
        
        // Only check videos that are supposed to be playing
        checkBufferStatus(videoElement, index);
      });
    }, 1000); // Check every second
    
    return () => clearInterval(bufferCheckInterval);
  }, [bufferingVideos, playingVideos]);

  // Apply buffer-based playback control
  useEffect(() => {
    visualizations.forEach((_, index) => {
      const videoElement = videoRefs.current[index];
      if (!videoElement) return;
      
      // If we're buffering, pause the video
      if (bufferingVideos.has(index)) {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      } 
      // If we're supposed to be playing and not buffering, play the video
      else if (playingVideos.has(index) && !bufferingVideos.has(index)) {
        if (videoElement.paused) {
          try {
            // Set a slower playback rate to give buffer time to build up
            videoElement.playbackRate = playbackRate;
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.error(`Error playing video ${index}:`, error);
              });
            }
          } catch (e) {
            console.error(`Error playing video ${index}:`, e);
          }
        } else {
          // Ensure playback rate is set correctly
          videoElement.playbackRate = playbackRate;
        }
      }
    });
  }, [playingVideos, bufferingVideos, playbackRate]);

  // New function to optimize video loading
  const optimizeVideoForPlayback = (videoElement: HTMLVideoElement | null, index: number) => {
    if (!videoElement) return;
    
    // Set lower quality for thumbnails
    videoElement.playbackRate = playbackRate;
    
    // Set initial playback position
    if (videoElement.currentTime === 0 && videoElement.duration > 0) {
      // Start at 0.5 seconds in to avoid initial buffering delays on some videos
      videoElement.currentTime = 0.5;
    }
    
    // Use hardware acceleration when available
    if (typeof videoElement.style.transform !== 'undefined') {
      videoElement.style.transform = 'translateZ(0)';
    }
    
    // Disable audio for thumbnails to save bandwidth
    videoElement.muted = true;
    
    // Control playback based on visibility and buffer status
    if (playingVideos.has(index) && !bufferingVideos.has(index)) {
      if (videoElement.paused) {
        // Add buffer check before playing
        const hasEnoughBuffer = checkBufferStatus(videoElement, index);
        
        if (hasEnoughBuffer || bufferedVideos.has(index)) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error(`Error playing video ${index}:`, error);
            });
          }
        }
      }
    } else {
      if (!videoElement.paused) {
        videoElement.pause();
      }
    }
  };

  // Apply optimization to visible videos
  useEffect(() => {
    visibleVideos.forEach(index => {
      optimizeVideoForPlayback(videoRefs.current[index], index);
    });
  }, [visibleVideos]);

  // Handle device capability detection
  useEffect(() => {
    // Check if the device can handle multiple video streams
    const isLowPowerDevice = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
    
    if (isLowPowerDevice) {
      // On low-power devices, limit visible videos to 3 max
      console.log("Low power device detected - limiting video playback");
      
      // Use picture-in-picture or poster images for not-currently-visible videos
      document.querySelectorAll('video').forEach((video, index) => {
        if (index > 2) {
          video.pause();
          video.preload = 'none';
        }
      });
    }
  }, []);

  // Cleanup videos when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
      if (previousVideoRef.current) {
        previousVideoRef.current.pause();
        previousVideoRef.current.src = '';
        previousVideoRef.current.load();
      }
      // Clean up all video references
      videoRefs.current.forEach(ref => {
        if (ref) {
          ref.pause();
          ref.src = '';
          ref.load();
        }
      });
    };
  }, []);

  // Add hidden video element for preloading
  useEffect(() => {
    if (mounted && !hiddenPreloadRef.current) {
      const hiddenVideo = document.createElement('video');
      hiddenVideo.style.display = 'none';
      hiddenVideo.preload = 'auto';
      hiddenVideo.muted = true;
      document.body.appendChild(hiddenVideo);
      hiddenPreloadRef.current = hiddenVideo;
      
      return () => {
        hiddenVideo.remove();
      };
    }
  }, [mounted]);

  // Preload initial videos
  useEffect(() => {
    // Preload first few videos for faster initial modal opening
    const initialModalPreloads = [0, 1, 2];
    initialModalPreloads.forEach(index => {
      const videoUrl = visualizations[index].publicId;
      setPreloadedModalVideos(prev => {
        const newSet = new Set(prev);
        newSet.add(videoUrl);
        return newSet;
      });
      
      // Create preload links
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'video';
      preloadLink.href = videoUrl;
      document.head.appendChild(preloadLink);
    });
  }, []);

  // Remove keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVideo) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  // Store video progress when switching videos
  const videoProgressMap = useRef<Map<string, number>>(new Map());

  // Preload and cache videos that have been viewed
  useEffect(() => {
    if (selectedVideo) {
      const videoUrl = selectedVideo.publicId;
      const videoElement = modalVideoRef.current;
      
      // When closing the modal, remember the playback position
      return () => {
        if (videoElement && videoUrl) {
          videoProgressMap.current.set(videoUrl, videoElement.currentTime);
        }
      };
    }
  }, [selectedVideo]);

  // Restore playback position when reopening a video
  useEffect(() => {
    if (selectedVideo && modalVideoRef.current && isVideoReady) {
      const videoUrl = selectedVideo.publicId;
      const savedProgress = videoProgressMap.current.get(videoUrl);
      
      if (savedProgress) {
        modalVideoRef.current.currentTime = savedProgress;
      }
    }
  }, [selectedVideo, isVideoReady]);

  return (
    <AuroraBackground className="min-h-screen bg-transparent">
      <div className="relative z-10">
        {/* Track Suggestions Form */}
        <div className="fixed -bottom-0 left-1/2 -translate-x-1/2 md:left-40 md:translate-x-0 z-50">
          <TrackSuggestionsForm />
        </div>

        <div
          className="flex w-full h-screen justify-center items-center overflow-hidden px-4 md:px-0"
          ref={scope}
        >
          <Floating sensitivity={-1} className="overflow-hidden w-full h-full">
            {visualizations.map((viz, index) => (
              <FloatingElement key={index} depth={viz.depth} className={`${viz.position} scale-75 md:scale-100`}>
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${viz.size} hover:scale-105 duration-200 cursor-pointer transition-all rounded-lg overflow-hidden relative ${styles.animateFloat} video-container`}
                    onClick={(e) => handleVideoClick(viz, e, index)}
                    style={{ 
                      zIndex: 1,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      background: getPlaceholderBackground(index)
                    }}
                    id={`video-container-${index}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none" />
                    {visibleVideos.has(index) ? (
                      <video
                        ref={el => {
                          videoRefs.current[index] = el;
                          if (el) {
                            optimizeVideoForPlayback(el, index);
                          }
                        }}
                        id={`thumbnail-${index}`}
                        width="100%"
                        height="100%"
                        src={viz.publicId}
                        autoPlay={false} // Don't autoplay - let our buffer logic control this
                        loop
                        muted
                        playsInline
                        preload={index < 3 ? "auto" : "metadata"}
                        // @ts-ignore - fetchpriority is newer API not in TS defs yet
                        fetchpriority={index < 3 ? "high" : "auto"}
                        onPlay={() => {
                          console.log(`Video ${index} started playing:`, viz.publicId);
                          if (!loadedVideos.has(viz.publicId)) {
                            setLoadingVideos(prev => new Set(prev).add(viz.publicId));
                          }
                        }}
                        onLoadedData={() => {
                          console.log(`Video ${index} loaded:`, viz.publicId);
                          handleVideoLoad(viz.publicId);
                        }}
                        onLoadedMetadata={() => {
                          // Check buffer status when metadata is loaded
                          if (videoRefs.current[index]) {
                            videoRefs.current[index]!.currentTime = 0.5; // Start at 0.5s to avoid initial frame issues
                          }
                        }}
                        onWaiting={() => {
                          // Video is waiting for more data - buffer is empty
                          console.log(`Video ${index} is waiting for more data (buffering)`);
                          setBufferingVideos(prev => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                          });
                        }}
                        onCanPlayThrough={() => {
                          // We have enough data to play through without buffering
                          console.log(`Video ${index} can play through without buffering`);
                          setBufferedVideos(prev => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                          });
                          setBufferingVideos(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(index);
                            return newSet;
                          });
                          
                          // Start playing if this video is supposed to be playing
                          if (playingVideos.has(index) && videoRefs.current[index]) {
                            const playPromise = videoRefs.current[index]!.play();
                            if (playPromise !== undefined) {
                              playPromise.catch(error => {
                                console.error(`Error playing video ${index} after canplaythrough:`, error);
                              });
                            }
                          }
                        }}
                        onError={(e) => {
                          console.error(`Error loading video ${index}:`, {
                            error: e,
                            url: viz.publicId,
                            element: e.target
                          });
                          handleVideoError(viz.publicId, e);
                        }}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        style={{ 
                          zIndex: 1,
                          transform: 'translateZ(0)' // Force hardware acceleration
                        }}
                      />
                    ) : (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: getPlaceholderBackground(index) }}
                      >
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </motion.div>
                  <div className="text-center">
                    <p className="text-gray-800 font-medium text-xs md:text-sm">{viz.title}</p>
                    <p className="text-gray-600 text-[10px] md:text-xs">{viz.artist}</p>
                  </div>
                </div>
              </FloatingElement>
            ))}
          </Floating>
        </div>
      </div>

      {/* Loading indicator */}
      {loadingVideos.size > 0 && loadedVideos.size === 0 && (
        <div className="fixed bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-20">
          <p className="text-gray-800/60 text-sm md:text-base font-medium tracking-wide">
            Loading videos... ({loadingVideos.size} remaining)
          </p>
        </div>
      )}

      {/* Click hint text */}
      {!selectedVideo && (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
          <Typewriter
            text={["choose a track", "turn up the volume"]}
            speed={50}
            loop={true}
            className="text-gray-800/60 text-base md:text-xl font-mono tracking-wider"
          />
        </div>
      )}

      {/* Video Modal */}
      {mounted && selectedVideo && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 md:p-0"
            onClick={handleCloseModal}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
              }}
              className="relative w-full md:w-[700px] bg-white rounded-lg p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
              layoutId={`container-${selectedVideo.publicId}`}
            >
              <div className="relative group">
                {isVideoLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-white text-sm">Loading video...</p>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVideoReady ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <video
                    ref={modalVideoRef}
                    width="100%"
                    height="100%"
                    src={selectedVideo.publicId}
                    autoPlay
                    playsInline
                    loop
                    controls
                    preload="auto"
                    // @ts-ignore - fetchpriority is newer API not in TS defs yet
                    fetchpriority="high"
                    onLoadStart={() => {
                      console.log('Modal video load started:', selectedVideo.publicId);
                    }}
                    onCanPlay={() => {
                      console.log('Modal video can play:', selectedVideo.publicId);
                      setIsVideoReady(true);
                      setIsVideoLoading(false);
                    }}
                    onLoadedData={() => {
                      console.log('Modal video loaded:', selectedVideo.publicId);
                      setIsVideoReady(true);
                      setIsVideoLoading(false);
                    }}
                    onError={(e) => {
                      console.error('Error loading modal video:', {
                        error: e,
                        url: selectedVideo.publicId,
                        element: e.target
                      });
                      setIsVideoLoading(false);
                    }}
                    style={{ objectFit: 'contain' }}
                    className="pointer-events-auto"
                  />
                </motion.div>
                
                {/* Remove the keyboard shortcut hint */}
              </div>

              <motion.div 
                className="mt-6 w-full text-center" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.2 
                }}
              >
                <MorphingText 
                  texts={[selectedVideo.title, selectedVideo.artist]} 
                  className="text-gray-800 text-2xl font-bold tracking-wide h-12 [&_span.italic]:text-gray-400 mx-auto"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </AuroraBackground>
  );
} 