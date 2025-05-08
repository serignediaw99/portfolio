'use client';

import Navbar from '@/components/Navbar';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative z-0">
        {children}
      </main>
    </>
  );
} 