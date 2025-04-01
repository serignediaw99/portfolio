'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PredictionTable from './PredictionTable';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  videoUrl?: string;
  isVideo?: boolean;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  technologies,
  githubUrl,
  videoUrl,
  isVideo = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-stone-50 dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full aspect-video bg-stone-100 dark:bg-stone-700">
        {title === 'Premier League Match Prediction' ? (
          <div className="absolute inset-0">
            <PredictionTable />
          </div>
        ) : videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover ${title === 'arXiv Research Tool' ? 'object-top' : ''}`}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2 flex items-center gap-2">
          {title}
          {title === 'Premier League Match Prediction' && (
            <Image
              src="/logos/premier-league.png"
              alt="Premier League"
              width={36}
              height={36}
              className="inline-block"
            />
          )}
        </h3>
        <p className="text-stone-600 dark:text-stone-300 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 dark:text-stone-300 hover:text-stone-800 dark:hover:text-stone-100 transition-colors duration-300"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
} 