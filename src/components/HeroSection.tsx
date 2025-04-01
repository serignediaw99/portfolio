'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 via-stone-50 to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
            className="text-center md:text-left space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 dark:text-stone-100">
              Hi, I'm <span className="text-stone-600 dark:text-stone-400">Serigne</span>
            </h1>
            <p className="text-xl sm:text-2xl text-stone-600 dark:text-stone-300 max-w-2xl">
              A data scientist with expertise in machine learning, AI engineering, and natural language processing, with experience applying advanced techniques to real-world problems in healthcare, neuroscience, and sports analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => handleScroll('projects')}
                className="bg-stone-50 border-2 border-stone-600 text-stone-600 dark:bg-stone-800 dark:border-stone-400 dark:text-stone-400 rounded-lg px-8 py-3 hover:bg-stone-100 dark:hover:bg-stone-900/20 transition-colors text-center"
              >
                View Projects
              </button>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-50 border-2 border-stone-600 text-stone-600 dark:bg-stone-800 dark:border-stone-400 dark:text-stone-400 rounded-lg px-8 py-3 hover:bg-stone-100 dark:hover:bg-stone-900/20 transition-colors text-center"
              >
                Resume
              </Link>
              <button
                onClick={() => handleScroll('contact')}
                className="bg-stone-50 border-2 border-stone-600 text-stone-600 dark:bg-stone-800 dark:border-stone-400 dark:text-stone-400 rounded-lg px-8 py-3 hover:bg-stone-100 dark:hover:bg-stone-900/20 transition-colors text-center"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 