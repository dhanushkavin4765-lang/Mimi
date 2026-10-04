import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, CheckCircle2, Music } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function FinalSecretWorld() {
  const { badge, title, subtitle, mainPhoto, letterTitle, letterContent, promises, gallery } = mimiData.finalSecret;
  const [lovedPromises, setLovedPromises] = useState({});

  const togglePromiseLove = (idx) => {
    soundFX.playSparkle();
    setLovedPromises((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-12 px-4 max-w-md mx-auto space-y-10 relative"
    >
      <div className="text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>{badge}</span>
        </div>

        <h2 className="text-3xl xs:text-4xl font-serif-heading font-extrabold text-white text-glow-gold">
          {title} ✨
        </h2>

        <p className="text-xs text-pink-200/90 font-light max-w-xs mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Main Unlocked Photo Frame */}
      <div className="relative z-10">
        <div className="relative rounded-3xl p-2.5 glass-card border-2 border-amber-300/40 shadow-xl overflow-hidden">
          <div className="relative h-80 xs:h-[360px] w-full rounded-2xl overflow-hidden bg-slate-950">
            <img
              src={mainPhoto}
              alt="Unlocked Mimi Main Photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080214] via-transparent to-transparent opacity-75" />

            <div className="absolute bottom-4 inset-x-4 text-left space-y-1">
              <span className="px-2.5 py-0.5 rounded-full glass-card text-[10px] font-semibold text-amber-300 border-amber-400/40">
                Golden Vault Focus ✨
              </span>
              <h3 className="text-xl font-serif-heading font-bold text-white mt-1">
                Thangamaana Pulla — Mimi
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Personal Letter Card */}
      <div className="relative z-10">
        <div className="glass-card rounded-3xl p-6 border-2 border-pink-300/30 shadow-xl space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-pink-300 fill-pink-400/50 animate-bounce" />
              </div>
              <h3 className="text-xl font-serif-heading font-bold text-white">
                {letterTitle}
              </h3>
            </div>
            <span className="text-[10px] text-amber-300 font-mono">Entry #001</span>
          </div>

          <div className="space-y-3 text-pink-100/90 text-xs sm:text-sm font-light leading-relaxed">
            {letterContent.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'text-sm font-serif-heading font-semibold text-pink-300' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-serif-heading italic text-amber-200">
              Forever for Mimi ✨
            </span>
            <button
              onClick={() => soundFX.playUnlockFanfare()}
              className="px-3 py-1.5 rounded-full glass-input text-[11px] font-semibold text-pink-300 flex items-center gap-1 border-pink-400/30 active:scale-95"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Play Chimes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promises Cards */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-serif-heading font-bold text-white text-center">
          Promises Saved in the Vault 🔒
        </h3>

        <div className="space-y-2.5">
          {promises.map((promise, idx) => {
            const isLoved = !!lovedPromises[idx];

            return (
              <div
                key={idx}
                onClick={() => togglePromiseLove(idx)}
                className={`cursor-pointer p-3.5 rounded-2xl glass-card border flex items-center justify-between active:scale-98 transition-transform ${
                  isLoved
                    ? 'border-amber-400/60 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'border-pink-300/20'
                }`}
              >
                <span className="text-xs text-pink-100 font-medium text-left">{promise}</span>
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${isLoved ? 'text-amber-300 fill-amber-300/20' : 'text-pink-300/50'}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Photos */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-serif-heading font-bold text-white text-center">
          Additional Private Moments ✨
        </h3>

        <div className="grid grid-cols-3 gap-2.5">
          {gallery.map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative h-28 rounded-xl overflow-hidden glass-card border border-amber-300/30 shadow-md"
            >
              <img
                src={imgUrl}
                alt={`Vault Photo ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-pink-500/20 text-[11px] text-pink-300/70 space-y-1">
        <p className="font-serif-heading text-xs text-pink-200">
          “Thangamaana Pulla” — Mobile Secret World
        </p>
        <p className="font-mono text-[9px]">
          Crafted with love & mobile magic ✨
        </p>
      </div>
    </motion.section>
  );
}
