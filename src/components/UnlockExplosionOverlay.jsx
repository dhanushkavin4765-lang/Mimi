import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart, Crown, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audioSynth';

export default function UnlockExplosionOverlay({ onFinish }) {
  const [step, setStep] = useState(1);
  // 1: Lock Glowing
  // 2: Screen Darkening & Particles Converging
  // 3: Lock Opens
  // 4: Golden Light Beams
  // 5: MIMI Text Appears
  // 6: Golden Particle Shower
  // 7: Reveal Complete

  useEffect(() => {
    soundFX.playSparkle();

    // Timeline sequence:
    // Step 1 -> 2 (800ms)
    const t1 = setTimeout(() => {
      setStep(2);
      soundFX.playSparkle();
    }, 800);

    // Step 2 -> 3: Lock Opens (1800ms)
    const t2 = setTimeout(() => {
      setStep(3);
      soundFX.playLoginWhoosh();
    }, 1800);

    // Step 3 -> 4: Golden Light Beam (2600ms)
    const t3 = setTimeout(() => {
      setStep(4);
      soundFX.playUnlockFanfare();
    }, 2600);

    // Step 4 -> 5: MIMI Text Appears (3400ms)
    const t4 = setTimeout(() => {
      setStep(5);

      // Gold confetti fireworks shower!
      try {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.2 },
          colors: ['#facc15', '#fbbf24', '#f59e0b', '#ffffff', '#f472b6'],
        });
      } catch (e) {}
    }, 3400);

    // Step 5 -> 6: Golden Particle Shower & Fadeout (4600ms)
    const t5 = setTimeout(() => {
      setStep(6);
    }, 4600);

    // Finish transition (5600ms)
    const t6 = setTimeout(() => {
      onFinish();
    }, 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${
        step >= 2 ? 'bg-[#04010a]' : 'bg-[#090317]/95'
      }`}
    >
      {/* 5. Golden Light Rays Beam from behind lock */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0.3, 0.9, 0.6], scale: [0.5, 2.5, 3] }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-pink-500 blur-[130px] opacity-80"
        />
      )}

      {/* Converging Golden Sparkle Particles around lock */}
      {step >= 2 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i / 36) * Math.PI * 2;
            const dist = 300;
            const startX = Math.cos(angle) * dist;
            const startY = Math.sin(angle) * dist;

            return (
              <motion.div
                key={i}
                initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
                animate={{
                  x: [startX, 0],
                  y: [startY, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.2],
                }}
                transition={{
                  duration: 1.4,
                  delay: (i % 6) * 0.08,
                  repeat: step < 5 ? Infinity : 0,
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
              />
            );
          })}
        </div>
      )}

      {/* Center Lock Symbol Container */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center">
        {/* Step 1 & 2: Lock Glow & Shake */}
        <motion.div
          animate={
            step === 1
              ? { scale: [1, 1.15, 1], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] }
              : step === 2
              ? { x: [-4, 4, -4, 4, 0], scale: 1.2 }
              : step === 3
              ? { scale: 1.3, rotateY: 180 }
              : { scale: [1.3, 2, 0], opacity: [1, 1, 0] }
          }
          transition={{ duration: 0.6 }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500/30 via-pink-500/30 to-purple-600/30 border-2 border-amber-300/60 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.7)] mb-6"
        >
          {step < 3 ? (
            <Lock className="w-16 h-16 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
          ) : (
            <Unlock className="w-16 h-16 text-amber-200 drop-shadow-[0_0_25px_rgba(251,191,36,1)] animate-pulse" />
          )}
        </motion.div>

        {/* 6. MIMI Text Appears */}
        {step >= 5 && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'backOut' }}
            className="space-y-4 text-center z-30"
          >
            <div className="text-6xl sm:text-9xl font-serif-heading font-extrabold tracking-widest text-glow-gold shimmer-gold">
              MIMI
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-amber-200 text-xl sm:text-3xl font-cursive tracking-wider"
            >
              Secret Heart Vault Unlocked ✨
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* 7. Golden Particle Shower from top */}
      {step >= 5 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 40 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ y: -50, x: `${Math.random() * 100}vw`, opacity: 0 }}
              animate={{
                y: '105vh',
                opacity: [0, 1, 0.8, 0],
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.8,
                ease: 'linear',
              }}
              className="absolute text-amber-300"
            >
              <Star className="w-4 h-4 fill-amber-300/60 text-amber-200" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
