'use client';

import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const experiences = [
  {
    year: 'Oct 2024 - Present',
    title: 'Data Scientist',
    company: 'Qventus Inc.',
    description: 'Applying NLP and supervised learning to group clinical procedure orders.'
  },
  {
    year: 'Jun 2022 - Jun 2024',
    title: 'Data Analyst',
    company: 'UC Davis Center for Neuroscience',
    description: 'Managing data collection, preprocessing, and analysis for an EEG spatial memory project examining hippocampal-prefrontal interactions.'
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      <div className="relative rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 p-8">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-stone-200 dark:border-stone-800"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-400 dark:bg-stone-600" />
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100">
                {experience.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                {experience.company} • {experience.year}
              </p>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                {experience.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 