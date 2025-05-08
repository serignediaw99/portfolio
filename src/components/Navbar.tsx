'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
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