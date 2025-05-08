'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  logo: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming & Data Analysis',
    skills: [
      {
        name: 'Python',
        level: 'Advanced',
        description: 'Primary programming language for data science and machine learning',
        logo: '/logos/python.png',
      },
      {
        name: 'Pandas',
        level: 'Advanced',
        description: 'Data manipulation and analysis library',
        logo: '/logos/pandas.svg',
      },
      {
        name: 'NumPy',
        level: 'Advanced',
        description: 'Numerical computing library',
        logo: '/logos/numpy.png',
      },
      {
        name: 'Matplotlib',
        level: 'Advanced',
        description: 'Data visualization library',
        logo: '/logos/matplotlib.png',
      },
    ],
  },
  {
    title: 'Machine Learning & AI',
    skills: [
      {
        name: 'PyTorch',
        level: 'Intermediate',
        description: 'Deep learning framework for neural networks',
        logo: '/logos/pytorch.png',
      },
      {
        name: 'TensorFlow',
        level: 'Beginner',
        description: 'Machine learning framework for building and training models',
        logo: '/logos/tensorflow.png',
      },
      {
        name: 'scikit-learn',
        level: 'Advanced',
        description: 'Machine learning library for classical ML algorithms',
        logo: '/logos/scikit-learn.png',
      },
      {
        name: 'OpenCV',
        level: 'Beginner',
        description: 'Computer vision library for image processing',
        logo: '/logos/opencv.png',
      },
    ],
  },
  {
    title: 'Data Engineering & Storage',
    skills: [
      {
        name: 'SQL',
        level: 'Advanced',
        description: 'Database querying and management',
        logo: '/logos/sql.png',
      },
      {
        name: 'MongoDB',
        level: 'Intermediate',
        description: 'NoSQL database for document storage',
        logo: '/logos/mongodb.png',
      },
      {
        name: 'Snowflake',
        level: 'Intermediate',
        description: 'Cloud data warehouse platform',
        logo: '/logos/snowflake.png',
      },
      {
        name: 'Apache Spark',
        level: 'Intermediate',
        description: 'Distributed computing framework',
        logo: '/logos/spark.png',
      },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      {
        name: 'Git',
        level: 'Advanced',
        description: 'Version control system',
        logo: '/logos/git.png',
      },
      {
        name: 'Docker',
        level: 'Intermediate',
        description: 'Containerization platform',
        logo: '/logos/docker.png',
      },
      {
        name: 'Airflow',
        level: 'Intermediate',
        description: 'Workflow management platform',
        logo: '/logos/airflow.png',
      },
    ],
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Advanced':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Beginner':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="space-y-12">
      <div className="space-y-32">
        {/* First row of categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {skillCategories.slice(0, 2).map((category) => (
            <div key={category.title} className="text-center">
              <h3 className="text-3xl font-semibold text-stone-800 dark:text-stone-100 mb-10">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-12 items-center justify-center">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-stone-50 dark:bg-stone-800 rounded-lg shadow-lg p-3 whitespace-nowrap text-center">
                        <span className="block text-sm font-medium text-stone-800 dark:text-stone-100">
                          {skill.name}
                        </span>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      {/* Triangle pointer */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-50 dark:bg-stone-800 rotate-45"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Second row of categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {skillCategories.slice(2).map((category) => (
            <div key={category.title} className="text-center">
              <h3 className="text-3xl font-semibold text-stone-800 dark:text-stone-100 mb-10">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-12 items-center justify-center">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-stone-50 dark:bg-stone-800 rounded-lg shadow-lg p-3 whitespace-nowrap text-center">
                        <span className="block text-sm font-medium text-stone-800 dark:text-stone-100">
                          {skill.name}
                        </span>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      {/* Triangle pointer */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-50 dark:bg-stone-800 rotate-45"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 