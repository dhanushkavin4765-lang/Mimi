import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audioSynth';

export default function MimiExplosionOverlay({ onFinish }) {
  const [mimiItems, setMimiItems] = useState([]);
  const [phase, setPhase] = useState('exploding');

  useEffect(() => {
    soundFX.playSparkle();

    // Trigger Mobile Confetti Burst
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#c084fc', '#fbbf24', '#ffffff', '#ec4899'],
      });
    } catch (e) {}

    // Mobile Viewport dimensions
    const viewportW = Math.min(window.innerWidth, 480);
    const viewportH = window.innerHeight;

    const directions = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const fonts = ['font-serif-heading', 'font-garamond', 'font-cursive', 'font-sans'];
    const colors = [
      'text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.9)]',
      'text-amber-200 drop-shadow-[0_0_18px_rgba(251,191,36,0.9)]',
      'text-purple-300 drop-shadow-[0_0_15px_rgba(192,132,252,0.9)]',
      'shimmer-text',
      'shimmer-gold',
    ];

    // Generate ~36 mobile-optimized MIMI streams
    const items = Array.from({ length: 36 }).map((_, idx) => {
      const dir = directions[idx % directions.length];
      const font = fonts[idx % fonts.length];
      const color = colors[idx % colors.length];
      const fontSize = Math.floor(Math.random() * 24) + 20; // 20px to 44px for mobile readability
      const delay = (idx % 8) * 0.1;
      const duration = Math.random() * 1.2 + 1.0;

      let initialX = 0;
      let initialY = 0;

      if (dir.includes('top')) initialY = -viewportH * 0.6;
      if (dir.includes('bottom')) initialY = viewportH * 0.6;
      if (dir.includes('left')) initialX = -viewportW * 0.6;
      if (dir.includes('right')) initialX = viewportW * 0.6;

      const targetX = (Math.random() - 0.5) * viewportW * 0.5;
      const targetY = (Math.random() - 0.5) * viewportH * 0.5;

      return {
        id: idx,
        font,
        color,
        fontSize,
        delay,
        duration,
        initialX,
        initialY,
        targetX,
        targetY,
        rotation: (Math.random() - 0.5) * 40,
      };
    });

    setMimiItems(items);

    const timer1 = setTimeout(() => {
      setPhase('full');
      soundFX.playSparkle();
    }, 2000);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 w-full h-full min-h-[100dvh] bg-[#070212] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <motion.div
        animate={
          phase === 'exploding'
            ? { scale: [0.95, 1.05, 1] }
            : { scale: 1.15, opacity: 0.1 }
        }
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="relative w-full max-w-md h-full flex items-center justify-center overflow-hidden"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-r from-pink-500/30 via-purple-600/30 to-amber-500/20 blur-[90px] animate-pulse" />

        {/* MIMI flying streams coming from top, bottom, left, right, corners */}
        {mimiItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              x: item.initialX,
              y: item.initialY,
              opacity: 0,
              scale: 0.4,
              rotate: item.rotation,
            }}
            animate={{
              x: [item.initialX, item.targetX, item.targetX * 1.3],
              y: [item.initialY, item.targetY, item.targetY * 1.3],
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.3, 1.8],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute font-extrabold tracking-widest select-none ${item.font} ${item.color}`}
            style={{ fontSize: `${item.fontSize}px` }}
          >
            MIMI
          </motion.div>
        ))}

        {/* Center Grand MIMI Emblem */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'backOut' }}
          className="relative z-20 text-center px-4"
        >
          <div className="text-6xl sm:text-7xl font-serif-heading font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300 text-glow-pink">
            MIMI
          </div>
          <p className="text-pink-200/90 text-lg font-light tracking-wider mt-2 font-cursive">
            Welcome to your secret world ✨
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
