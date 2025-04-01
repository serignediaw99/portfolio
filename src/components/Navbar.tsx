'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              href="#intro" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('intro');
              }}
              className="text-2xl font-bold text-stone-800 dark:text-stone-100"
            >
              Serigne Diaw
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('projects');
              }}
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('skills');
              }}
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Skills
            </Link>
            <Link 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('contact');
              }}
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('projects');
              }}
              className="block px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="#skills" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('skills');
              }}
              className="block px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Skills
            </Link>
            <Link 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick('contact');
              }}
              className="block px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 