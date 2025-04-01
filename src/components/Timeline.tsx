import { motion } from 'framer-motion';

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
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-stone-200 dark:bg-stone-700"></div>

      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative mb-12 ${
            index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'
          }`}
        >
          <div className="relative">
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-600 dark:bg-stone-400 rounded-full"></div>
            
            {/* Content */}
            <div className={`p-6 rounded-lg shadow-lg bg-stone-50 dark:bg-stone-800 ${
              index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
            }`}>
              <div className="text-sm font-semibold text-stone-600 dark:text-stone-400 mb-2">
                {experience.year}
              </div>
              <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-1">
                {experience.title}
              </h3>
              <div className="text-stone-600 dark:text-stone-300 mb-2">
                {experience.company}
              </div>
              <p className="text-stone-600 dark:text-stone-400">
                {experience.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 