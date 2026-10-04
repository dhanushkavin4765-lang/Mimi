import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button';

      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 pointer-events-none z-50 mix-blend-screen shadow-[0_0_12px_rgba(244,114,182,0.8)]"
        animate={{
          x: pos.x - 8,
          y: pos.y - 8,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.2 }}
      />
      {/* Outer subtle halo ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-pink-400/40 pointer-events-none z-50 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? 'rgba(251,191,36,0.7)' : 'rgba(244,114,182,0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      />
    </>
  );
}
