import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, KeyRound, Heart } from 'lucide-react';
import { soundFX } from '../utils/audioSynth';
import { mimiData } from '../config/mimiData';

export default function SecretLoginModal({ onLoginSuccess }) {
  const [inputID, setInputID] = useState(mimiData.credentials.loginId);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playClick();

    if (inputID.trim().toLowerCase() !== mimiData.credentials.loginId.toLowerCase()) {
      setErrorMsg(`Access Denied! Required ID: "${mimiData.credentials.loginId}"`);
      soundFX.playClick();
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    soundFX.playLoginWhoosh();

    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full min-h-[100dvh] bg-[#070311] flex flex-col justify-between p-5 overflow-y-auto overflow-x-hidden">
      {/* Background glowing ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-pink-600/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />

      {/* Top Spacer/Brand */}
      <div className="pt-4 text-center z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/25 text-pink-300 text-xs font-semibold uppercase tracking-wider">
          Mimi's Secret Realm ✨
        </span>
      </div>

      {/* Center Mobile Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm mx-auto my-auto p-6 sm:p-8 rounded-3xl glass-card border-2 border-pink-300/25 shadow-[0_0_40px_rgba(236,72,153,0.3)] text-center overflow-hidden"
      >
        {/* Crown/Sparkle Icon Badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-400/35 flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.4)] mb-5"
        >
          <Sparkles className="w-8 h-8 text-pink-300 drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-serif-heading font-bold text-white tracking-wide mb-1">
          Private World
        </h1>
        <p className="text-xs sm:text-sm text-pink-200/80 font-light mb-6 leading-relaxed">
          Created specially for <span className="text-pink-300 font-semibold underline underline-offset-4 decoration-pink-400/50">Mimi</span> ✨
        </p>

        {/* Form (ID: Mimi, NO password field) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-pink-300/80 mb-2 flex items-center justify-between">
              <span>Secret Login ID</span>
              <span className="text-[10px] text-amber-300 font-mono">ID: Mimi</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400">
                <KeyRound className="w-5 h-5 opacity-80" />
              </div>
              <input
                type="text"
                value={inputID}
                onChange={(e) => {
                  setInputID(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter ID (Mimi)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-white text-base font-semibold placeholder-pink-300/30 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 mt-2 font-medium"
              >
                {errorMsg}
              </motion.p>
            )}
          </div>

          {/* Large Touch-friendly Button: "Enter Mimi ✨" */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.96 }}
            className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 text-white font-bold text-base shadow-[0_0_25px_rgba(236,72,153,0.5)] active:shadow-[0_0_35px_rgba(236,72,153,0.8)] transition-all duration-200 overflow-hidden border border-pink-300/40 min-h-[54px] flex items-center justify-center gap-2"
          >
            <span>Enter Mimi</span>
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.button>
        </form>
      </motion.div>

      {/* Footer info */}
      <div className="pb-4 text-center z-10 text-xs text-pink-300/60 font-light flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/50 animate-bounce" />
        <span>Made with endless magic for Mimi</span>
      </div>
    </div>
  );
}
