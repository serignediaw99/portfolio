'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import SkillsSection from '@/components/SkillsSection';
import ContactForm from '@/components/ContactForm';
import Timeline from '@/components/Timeline';
import EducationTimeline from '@/components/EducationTimeline';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { TrackSuggestionsForm } from "@/components/track-suggestions-form"

const projects = [
  {
    title: 'Electronic Music Visualizer',
    description: 'A dynamic visualizer that leverages StyleGAN2‑ADA to translate musical features—beats, harmony, timbre—into smoothly evolving GAN‑generated imagery. By mapping onset, chroma, and RMS envelopes to multi‑scale latent and noise modulations, it produces continuously morphing "landscapes" that pulse, color‑shift, and flow in time with any track.',
    imageUrl: '/projects/music-visualizer.jpg',
    videoUrl: 'https://res.cloudinary.com/dlkzxzqpy/video/upload/v1746677385/music-visualizer_iatuyv.mp4',
    technologies: ['Deep Learning', 'PyTorch', 'StyleGan'],
    githubUrl: 'https://github.com/serignediaw99/music-visualizer',
    isVideo: true,
  },
  {
    title: 'arXiv Research Tool',
    description: 'An automated ETL pipeline using Airflow that fetches AI papers from arXiv, validates content, stores PDFs in Google Cloud, and catalogs metadata in MongoDB. Integrated LLM-powered summarization to extract key research insights and relevance scoring against user topics. Developed a Streamlit frontend for keyword-based discovery of AI research with accessible summaries.',
    imageUrl: '/projects/arxiv-tool.jpg',
    technologies: ['Airflow', 'GCS', 'Prompt Engineering', 'MongoDB', 'Streamlit'],
    githubUrl: 'https://github.com/serignediaw99/arxiv-paper-summarizer',
  },
  {
    title: 'Premier League Match Prediction',
    description: 'Match prediction system using Markov Chain Monte Carlo (MCMC) methods to forecast Premier League soccer match outcomes. Features an automated ETL pipeline for data collection and achieved 55% prediction accuracy with granular probability estimates.',
    imageUrl: '/projects/pl-prediction.jpg',
    technologies: ['Python', 'MCMC', 'Beautiful Soup', 'PostgreSQL', 'scikit-learn'],
    githubUrl: 'https://github.com/serignediaw99/PL-Match-Prediction',
  },
  {
    title: 'Football Player Tracking',
    description: 'Real-time player tracking system using computer vision and deep learning. Tracks player positions, movements, and interactions during matches.',
    imageUrl: '/projects/football-tracking.jpg',
    videoUrl: '/videos/Untitled.mov',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'Computer Vision'],
    githubUrl: 'https://github.com/serignediaw99/football-tracking',
    isVideo: true,
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuroraBackground className="min-h-screen bg-transparent">
      <div className="relative z-10">
        <Navbar isScrolled={isScrolled} />
        
        <div id="intro" className="relative z-10 min-h-screen">
          <HeroSection />
        </div>
        
        {/* Projects Section */}
        <section id="projects" className="py-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  videoUrl={project.videoUrl}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  isVideo={project.isVideo}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <div id="experience" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                Experience
              </h2>
            </div>
            <Timeline />
          </div>
        </div>

        {/* Education Section */}
        <div id="education" className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                Education
              </h2>
            </div>
            <EducationTimeline />
          </div>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                Skills & Technologies
              </h2>
            </div>
            <SkillsSection />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                Let's Connect
              </h2>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 p-16 backdrop-blur-sm">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={80}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="flex flex-col items-center space-y-12 relative">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                  <a 
                      href="mailto:serigne_diaw@yahoo.com" 
                      className="group flex items-center gap-4 p-6 rounded-xl bg-stone-100 dark:bg-stone-800/50 hover:bg-stone-200 dark:hover:bg-stone-700/50 transition-all duration-300 hover:-translate-y-1"
                  >
                      <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-stone-700 dark:text-stone-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 dark:text-stone-400">Email me at</p>
                        <p className="text-xl font-medium text-stone-800 dark:text-stone-200">serigne_diaw@yahoo.com</p>
                      </div>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/serigne-diaw-11291b173/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                      className="group flex items-center gap-4 p-6 rounded-xl bg-stone-100 dark:bg-stone-800/50 hover:bg-stone-200 dark:hover:bg-stone-700/50 transition-all duration-300 hover:-translate-y-1"
                  >
                      <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-stone-700 dark:text-stone-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 dark:text-stone-400">Connect with me on</p>
                        <p className="text-xl font-medium text-stone-800 dark:text-stone-200">LinkedIn</p>
                      </div>
                  </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="py-8">
        <div className="text-center text-stone-600 dark:text-stone-400 text-sm">
          Copyright © 2025 Serigne Diaw. All rights reserved.
        </div>
      </footer>
    </AuroraBackground>
  );
}
