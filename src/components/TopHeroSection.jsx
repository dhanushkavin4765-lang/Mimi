import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, Expand, X } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function TopHeroSection() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { title, subtitle, badge, quote, centerPhoto } = mimiData.hero;

  return (
    <section id="hero-section" className="relative pt-6 pb-12 px-4 text-center overflow-hidden max-w-md mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[240px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-500/15 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-[11px] font-bold tracking-wider uppercase shadow-sm"
        >
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>{badge}</span>
        </motion.div>

        {/* MUST-HAVE EXACT PHRASE AT TOP: "Thangamaana Pulla" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-serif-heading font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.7)] leading-tight">
            <span className="shimmer-text">{title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-pink-200/90 font-light max-w-xs mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Romantic Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block glass-card px-4 py-2.5 rounded-2xl border-pink-400/20 italic text-xs text-amber-200/90 font-garamond"
        >
          {quote}
        </motion.div>

        {/* CENTER PHOTO / IMAGE SECTION (Mobile Screen Width Optimized) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-2"
        >
          <div className="relative inline-block w-full max-w-[280px] xs:max-w-[310px] mx-auto group">
            {/* Ambient Aura */}
            <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 rounded-[34px] blur-lg opacity-40 animate-pulse" />

            {/* Mobile Photo Frame */}
            <div
              onClick={() => {
                soundFX.playSparkle();
                setIsPhotoModalOpen(true);
              }}
              className="relative cursor-pointer w-full h-[360px] xs:h-[400px] rounded-[28px] p-2.5 glass-card border-2 border-pink-300/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden active:scale-[0.98] transition-transform animate-float-slow"
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">
                <img
                  src={centerPhoto.url}
                  alt={centerPhoto.alt}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080312] via-transparent to-transparent opacity-65" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-card text-[10px] font-bold text-pink-300 border-pink-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{centerPhoto.tag}</span>
                </div>

                <div className="absolute top-3 right-3 p-1.5 rounded-full glass-card text-white/80">
                  <Expand className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 text-left bg-gradient-to-t from-[#070311] via-[#070311]/80 to-transparent">
                  <p className="text-white text-xs xs:text-sm font-semibold font-serif-heading">
                    {centerPhoto.caption}
                  </p>
                  <p className="text-[10px] text-pink-300/70 mt-0.5">
                    Tap to view full photo ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div
            onClick={() => setIsPhotoModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full glass-card p-4 rounded-3xl border border-pink-300/30 text-center space-y-3"
            >
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-full glass-card text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="rounded-2xl overflow-hidden max-h-[60vh] bg-slate-950">
                <img
                  src={centerPhoto.url}
                  alt={centerPhoto.alt}
                  className="w-full h-full object-contain max-h-[60vh] mx-auto rounded-2xl"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif-heading font-bold text-white">
                  Thangamaana Pulla — Mimi ✨
                </h3>
                <p className="text-xs text-pink-200/80 mt-0.5">{centerPhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
