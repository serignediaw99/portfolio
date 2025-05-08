'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 p-8 md:p-12">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-stone-400 dark:border-stone-600 shadow-lg"
          >
            <Image
              src="/profile.jpg"
              alt="Serigne Diaw"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-6 flex-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 dark:text-stone-100">
              Hi, I'm <span className="text-stone-600 dark:text-stone-400">Serigne</span>
            </h1>
            <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-300 max-w-2xl">
              A data scientist with expertise in machine learning, AI engineering, and natural language processing, with experience applying advanced techniques to real-world problems in healthcare, neuroscience, and sports analytics.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="mailto:serigne_diaw@yahoo.com" 
                className="text-lg text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </a>
              <a 
                href="https://www.linkedin.com/in/serigne-diaw-11291b173/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 