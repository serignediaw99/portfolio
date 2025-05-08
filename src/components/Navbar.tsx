'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/10 backdrop-blur-sm border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-gray-800 font-medium hover:text-gray-600 transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/#projects" 
              className={`text-gray-800 font-medium hover:text-gray-600 transition-colors ${
                pathname === '/#projects' ? 'text-gray-900' : ''
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/#experience" 
              className={`text-gray-800 font-medium hover:text-gray-600 transition-colors ${
                pathname === '/#experience' ? 'text-gray-900' : ''
              }`}
            >
              Experience
            </Link>
            <Link 
              href="/#skills" 
              className={`text-gray-800 font-medium hover:text-gray-600 transition-colors ${
                pathname === '/#skills' ? 'text-gray-900' : ''
              }`}
            >
              Skills
            </Link>
            <Link 
              href="/#contact" 
              className={`text-gray-800 font-medium hover:text-gray-600 transition-colors ${
                pathname === '/#contact' ? 'text-gray-900' : ''
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/projects/electronic-music-visualizer" 
              className={`text-gray-800 font-medium hover:text-gray-600 transition-colors ${
                pathname === '/projects/electronic-music-visualizer' ? 'text-gray-900' : ''
              }`}
            >
              Music Visualizer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 