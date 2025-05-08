'use client';

import { useEffect, useState, useRef } from "react";
import { motion, stagger, useAnimate } from "motion/react";
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
    title: "Calling On",
    artist: "Swedish House Mafia",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676376/calling_on_viz_hacdod.mp4",
    depth: 0.5,
    position: "top-[30%] left-[25%]",
    size: "w-24 h-24 md:w-32 md:h-32"
  },
  {
    title: "Don't Go Mad (feat. Seinabo Sey)",
    artist: "Swedish House Mafia",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676375/dont_go_mad_viz_nnwsny.mp4",
    depth: 1,
    position: "top-[25%] left-[45%]",
    size: "w-28 h-28 md:w-36 md:h-36"
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
    position: "top-[50%] left-[20%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "Sun Phase",
    artist: "Pretty Girl",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746677375/sun_phase_viz_tlafr8.mp4",
    depth: 1,
    position: "top-[45%] left-[50%]",
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
    position: "top-[10%] left-[35%]",
    size: "w-32 h-32 md:w-40 md:h-40"
  },
  {
    title: "Vale",
    artist: "BICEP",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676395/vale_viz_gmakrf.mp4",
    depth: 2,
    position: "top-[15%] left-[75%]",
    size: "w-28 h-28 md:w-36 md:h-36"
  },
  {
    title: "iluv",
    artist: "Effy, Mall Grab",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676393/iluv_viz_uax85b.mp4",
    depth: 1,
    position: "top-[65%] left-[35%]",
    size: "w-32 h-40 md:w-40 md:h-52"
  },
  {
    title: "Hyperreal",
    artist: "Flume, KUČKA",
    publicId: "https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746676385/hyperreal_viz_xoasl5.mp4",
    depth: 1.5,
    position: "top-[70%] left-[60%]",
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

  const handleVideoClick = (video: typeof visualizations[0]) => {
    setIsVideoLoading(true);
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
        <div className="fixed -bottom-0 left-40 z-50">
          <TrackSuggestionsForm />
        </div>

        <div
          className="flex w-full h-screen justify-center items-center overflow-hidden"
          ref={scope}
        >
          <Floating sensitivity={-1} className="overflow-hidden w-full h-full">
            {visualizations.map((viz, index) => (
              <FloatingElement key={index} depth={viz.depth} className={viz.position}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${viz.size} hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg bg-gray-100 overflow-hidden relative ${styles.animateFloat}`}
                  onClick={() => handleVideoClick(viz)}
                >
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
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </FloatingElement>
            ))}
          </Floating>
        </div>
      </div>

      {/* Loading indicator */}
      {loadingVideos.size > 0 && loadedVideos.size === 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20">
          <p className="text-gray-800/60 text-base font-medium tracking-wide">
            Loading videos... ({loadingVideos.size} remaining)
          </p>
        </div>
      )}

      {/* Click hint text */}
      {!selectedVideo && loadingVideos.size === 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <Typewriter
            text={["choose your track", "turn up the volume"]}
            speed={50}
            loop={true}
            className="text-gray-800/60 text-xl font-mono tracking-wider"
          />
        </div>
      )}

      {/* Video Modal */}
      {mounted && selectedVideo && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={handleCloseModal}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[700px] bg-white rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <video
                id={`modal-${selectedVideo.publicId}`}
                width="100%"
                height="100%"
                src={selectedVideo.publicId}
                autoPlay
                playsInline
                loop
                controls
                preload="auto"
                onPlay={() => {
                  console.log('Modal video started playing:', selectedVideo.publicId);
                  setIsVideoLoading(false);
                }}
                onLoadedData={() => {
                  console.log('Modal video loaded:', selectedVideo.publicId);
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
              />
            </div>
            <div className="mt-6">
              <MorphingText 
                texts={[selectedVideo.title, selectedVideo.artist]} 
                className="text-gray-800 text-2xl font-bold tracking-wide h-12"
              />
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </AuroraBackground>
  );
} 