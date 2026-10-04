import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Camera, MessageCircle, Lock, Unlock, Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function SecretNotesGrid() {
  const [openCardId, setOpenCardId] = useState(null);
  const [openedCards, setOpenedCards] = useState({});

  const iconMap = {
    Sparkles: Sparkles,
    Heart: Heart,
    Camera: Camera,
    MessageCircle: MessageCircle,
  };

  const handleCardClick = (note) => {
    soundFX.playSparkle();
    setOpenCardId(note.id);
    setOpenedCards((prev) => ({ ...prev, [note.id]: true }));

    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#c084fc', '#fbbf24'],
      });
    } catch (e) {}
  };

  return (
    <section id="notes-section" className="py-10 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-[11px] font-bold">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Envelopes</span>
        </div>

        <h2 className="text-2xl xs:text-3xl font-serif-heading font-bold text-white">
          Little Secret Notes ✨
        </h2>

        <p className="text-xs text-pink-200/70 font-light max-w-xs mx-auto">
          Tap any card to break the seal and read the hidden note inside.
        </p>
      </div>

      {/* Mobile Stack Grid: 1-column layout */}
      <div className="grid grid-cols-1 gap-4">
        {mimiData.secretNotes.map((note, idx) => {
          const IconComp = iconMap[note.icon] || Sparkles;
          const isOpened = !!openedCards[note.id];

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(note)}
              className="relative cursor-pointer glass-card rounded-2xl p-5 border-2 border-pink-300/20 shadow-md overflow-hidden text-left flex items-center justify-between gap-4 min-h-[96px]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-400/30 flex items-center justify-center shrink-0">
                  <IconComp className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-heading text-white">
                    {note.cardTitle}
                  </h3>
                  <p className="text-[11px] text-pink-200/70 mt-0.5">
                    {isOpened ? 'Read note again →' : 'Tap to unseal ✨'}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-pink-300">
                {isOpened ? (
                  <Unlock className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Lock className="w-5 h-5 text-amber-300/80" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {openCardId && (
          <div
            onClick={() => setOpenCardId(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {mimiData.secretNotes
              .filter((n) => n.id === openCardId)
              .map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-sm w-full glass-card rounded-3xl p-6 border-2 border-pink-300/40 shadow-2xl text-center space-y-4"
                >
                  <button
                    onClick={() => setOpenCardId(null)}
                    className="absolute top-3 right-3 p-2 rounded-full glass-card text-white/80"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mx-auto w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-amber-300" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-pink-300">
                      Unsealed Secret
                    </span>
                    <h3 className="text-xl font-serif-heading font-bold text-white mt-0.5">
                      {note.cardTitle}
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl glass-input text-pink-100 font-light text-xs sm:text-sm leading-relaxed text-left border-pink-400/20 italic">
                    “{note.content}”
                  </div>

                  <button
                    onClick={() => setOpenCardId(null)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
                  >
                    Close Note ✨
                  </button>
                </motion.div>
              ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
