"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the element under the cursor is clickable
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-out ${
            isPointer ? 'scale-150' : 'scale-100'
          }`}
        >
          <div className={`w-4 h-4 ${isPointer ? 'bg-blue-500' : 'bg-black'} rounded-full`} />
        </div>
      </div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]) {
          cursor: none !important;
        }
      `}</style>
    </>
  );
} 