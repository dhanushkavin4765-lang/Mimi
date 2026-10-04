import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Lock } from 'lucide-react';
import { soundFX } from '../utils/audioSynth';

export default function HeaderNav({ soundEnabled, setSoundEnabled }) {
  const scrollTo = (id) => {
    soundFX.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.enabled = nextState;
    if (nextState) soundFX.playSparkle();
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-3 z-30 w-full max-w-md mx-auto px-3"
    >
      <div className="glass-card rounded-full px-4 py-2.5 flex items-center justify-between border-2 border-pink-300/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {/* Brand logo */}
        <button
          onClick={() => scrollTo('hero-section')}
          className="flex items-center gap-2 text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[1px] shadow-sm">
            <div className="w-full h-full rounded-full bg-[#0d061f] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pink-300" />
            </div>
          </div>
          <span className="font-serif-heading font-bold text-base text-white tracking-wide">
            MIMI ✨
          </span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mute/Sound toggle button */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="p-2 rounded-full glass-input text-pink-300 active:scale-95 transition-transform"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Jump to Secret Vault button */}
          <button
            onClick={() => scrollTo('unlock-section')}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-[0_0_12px_rgba(236,72,153,0.4)] flex items-center gap-1 active:scale-95 transition-transform border border-pink-300/30"
          >
            <Lock className="w-3 h-3" />
            <span>Vault</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
