import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, X, ChevronRight } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function ImportantPlacesSection() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section id="places-section" className="py-10 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Coordinates of Joy</span>
        </div>

        <h2 className="text-2xl xs:text-3xl font-serif-heading font-bold text-white">
          Important Places ✨
        </h2>

        <p className="text-xs text-pink-200/70 font-light max-w-xs mx-auto">
          Locations etched in our heart forever. Tap to open memories.
        </p>
      </div>

      {/* Mobile Vertical Cards Stack */}
      <div className="space-y-4">
        {mimiData.importantPlaces.map((place, idx) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundFX.playClick();
              setSelectedPlace(place);
            }}
            className="group cursor-pointer glass-card rounded-2xl p-3 border-pink-400/20 shadow-md overflow-hidden flex items-center gap-3.5 text-left"
          >
            <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 bg-slate-950">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 p-1 rounded-full glass-card text-pink-300">
                <MapPin className="w-3 h-3" />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-1 space-y-1">
              <span className="text-[9px] text-amber-300 font-mono uppercase tracking-wider block truncate">
                {place.tag}
              </span>
              <h3 className="text-base font-bold font-serif-heading text-white truncate">
                {place.name}
              </h3>
              <p className="text-[11px] text-pink-200/70 font-light line-clamp-2 leading-snug">
                {place.shortDescription}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-pink-300 pt-0.5">
                <span>View memory</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <div
            onClick={() => setSelectedPlace(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full glass-card rounded-3xl p-5 border-2 border-pink-300/30 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-3 right-3 p-2 rounded-full glass-card text-white/80 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090417] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] text-amber-300 font-mono">{selectedPlace.tag}</span>
                  <h3 className="text-lg font-serif-heading font-bold text-white">
                    {selectedPlace.name}
                  </h3>
                </div>
              </div>

              <div className="text-left space-y-2">
                <h4 className="text-xs font-semibold uppercase text-pink-300 tracking-wider">
                  Expanded Memory Log
                </h4>
                <p className="text-xs sm:text-sm text-pink-100/90 font-light leading-relaxed p-3.5 rounded-2xl glass-input">
                  {selectedPlace.fullMemory}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
