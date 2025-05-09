'use client';

import { useEffect, useState, useRef } from "react";
import { motion, stagger, useAnimate, AnimatePresence } from "motion/react";
import { AuroraBackground } from '@/components/ui/aurora-background';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { createPortal } from 'react-dom';
import { MorphingText } from '@/components/ui/liquid-text';
import { CldVideoPlayer } from 'next-cloudinary';
import { getCloudinaryUrlWithTransformations } from '@/lib/cloudinary';
import { Typewriter } from '@/components/ui/typewriter-text';
import styles from './styles.module.css';
import { TrackSuggestionsForm } from '@/components/track-suggestions-form';

const visualizations = [
  {
    title: "What Else Is There? - DJ Tennis Remix",
    artist: "Röyksopp",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746773037/Ro%CC%88yksopp_-_What_Else_Is_There__ft._Fever_Ray_DJ_Tennis_Remix_Official_Audio_oauqug.mp4",
    depth: 1.0,
    position: "top-[40%] left-[80%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "TRACK UNO",
    artist: "KAYTRANADA",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746762356/TRACK_UNO_urnw6k.mp4",
    depth: 1.5,
    position: "top-[30%] left-[3%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Apricots",
    artist: "BICEP",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746755306/BICEP_APRICOTS_Official_Video_io19ld.mp4",
    depth: 1.5,
    position: "top-[16%] left-[48%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "porco rosso",
    artist: "sunflwr",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746738227/porco_rosso_wnotmc.mp4",
    depth: 1.5,
    position: "top-[40%] left-[33%]",
    size: "w-32 h-32 md:w-40 md:h-22"
  },
  {
    title: "Calling On",
    artist: "Swedish House Mafia",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676376/calling_on_viz_hacdod.mp4",
    depth: 0.5,
    position: "top-[20%] left-[18%]",
    size: "w-24 h-24 md:w-32 md:h-32"
  },
  {
    title: "Lights Out",
    artist: "Fred again..., Romy, HAAi",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676395/lights_out_viz_c4ba2p.mp4",
    depth: 2,
    position: "top-[20%] left-[65%]",
    size: "w-32 h-40 md:w-40 md:h-52"
  },
  {
    title: "Liverpool Street In The Rain",
    artist: "Mall Grab",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676398/liverpool_viz_mei4gs.mp4",
    depth: 1,
    position: "top-[46%] left-[18%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Sun Phase",
    artist: "Pretty Girl",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746677375/sun_phase_viz_tlafr8.mp4",
    depth: 1,
    position: "top-[40%] left-[50%]",
    size: "w-32 h-32 md:w-40 md:h-40"
  },
  {
    title: "Two Thousand and Seventeen",
    artist: "Four Tet",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676383/two_thousand_seventeen_viz_hjbvnf.mp4",
    depth: 2,
    position: "top-[55%] left-[70%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Innerbloom",
    artist: "RÜFÜS DU SOL",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676394/innerbloom_viz_evm3fv.mp4",
    depth: 1.5,
    position: "top-[8%] left-[35%]",
    size: "w-32 h-32 md:w-40 md:h-40"
  },
  {
    title: "Vale",
    artist: "BICEP",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676395/vale_viz_gmakrf.mp4",
    depth: 2,
    position: "top-[15%] left-[80%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "iluv",
    artist: "Effy, Mall Grab",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676393/iluv_viz_uax85b.mp4",
    depth: 1,
    position: "top-[62%] left-[35%]",
    size: "w-32 h-36 md:w-40 md:h-50"
  },
  {
    title: "Hyperreal",
    artist: "Flume, KUČKA",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676385/hyperreal_viz_xoasl5.mp4",
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    animate("video", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
  }, []);

  const handleVideoError = (publicId: string, error: any) => {
    console.error(`Error loading video ${publicId}:`, {
      error,
      errorType: error?.type,
      errorCode: error?.target?.error?.code,
      errorMessage: error?.target?.error?.message,
      networkState: error?.target?.networkState,
      readyState: error?.target?.readyState,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      fullUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}`,
      attemptedPublicId: publicId
    });
    setLoadingVideos(prev => {
      const next = new Set(prev);
      next.delete(publicId);
      return next;
    });
  };

  const handleVideoLoad = (publicId: string) => {
    console.log(`Video loaded successfully: ${publicId}`, {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      fullUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}`,
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

  const handleVideoClick = (video: typeof visualizations[0], event: React.MouseEvent) => {
    setIsVideoLoading(true);
    setIsVideoReady(false);
    
    // Store the clicked position
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    
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
  };

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
    };
  }, []);

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
                    className={`${viz.size} hover:scale-105 duration-200 cursor-pointer transition-all rounded-lg overflow-hidden relative ${styles.animateFloat}`}
                    onClick={(e) => handleVideoClick(viz, e)}
                    style={{ 
                      zIndex: 1,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                      background: '#1a1a1a'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none" />
                    <video
                      id={`thumbnail-${index}`}
                      width="100%"
                      height="100%"
                      src={viz.publicId}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
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
                      onError={(e) => {
                        console.error(`Error loading video ${index}:`, {
                          error: e,
                          url: viz.publicId,
                          element: e.target
                        });
                        handleVideoError(viz.publicId, e);
                      }}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      style={{ zIndex: 1 }}
                    />
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
      {!selectedVideo && loadingVideos.size === 0 && (
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
              </div>
              <motion.div 
                className="mt-6"
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
                  className="text-gray-800 text-2xl font-bold tracking-wide h-12 [&_span.italic]:text-gray-400"
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