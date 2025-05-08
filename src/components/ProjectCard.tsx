'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PredictionTable from './PredictionTable';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  index: number;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  videoUrl,
  githubUrl,
  technologies,
  index,
}: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);
  const projectUrl = `/projects/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link href={projectUrl}>
        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full aspect-video bg-stone-100 dark:bg-stone-700">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">{title}</h3>
            <p className="text-stone-600 dark:text-stone-300 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {title === "Electronic Music Visualizer" ? (
        <Link href="/projects/electronic-music-visualizer" className="block">
          <div className="relative overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative w-full aspect-video bg-stone-100 dark:bg-stone-700">
              {title.includes('Premier League') ? (
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
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className={`object-cover ${title.includes('arXiv') ? 'object-top' : ''}`}
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2 flex items-center gap-2">
                {title}
                {title.includes('Premier League') && (
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800 shadow-lg">
          <div className="relative w-full aspect-video bg-stone-100 dark:bg-stone-700">
            {title.includes('Premier League') ? (
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
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover ${title.includes('arXiv') ? 'object-top' : ''}`}
              />
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2 flex items-center gap-2">
              {title}
              {title.includes('Premier League') && (
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
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
} 