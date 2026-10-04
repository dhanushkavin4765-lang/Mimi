import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, MapPin, Calendar, X, Eye } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function PhotoMemoriesGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likesMap, setLikesMap] = useState({});

  const toggleLike = (id, currentLikes, e) => {
    e.stopPropagation();
    soundFX.playSparkle();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || currentLikes) + 1,
    }));
  };

  return (
    <section id="photos-section" className="py-10 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-[11px] font-bold">
          <Camera className="w-3.5 h-3.5" />
          <span>Captured Moments</span>
        </div>

        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif-heading font-bold text-white">
          Photo Memories Gallery ✨
        </h2>

        <p className="text-xs text-pink-200/70 font-light max-w-xs mx-auto">
          Tap any image to open full screen.
        </p>
      </div>

      {/* Mobile-First Grid: 1-Column or 2-Columns on xs */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        {mimiData.photos.map((photo, idx) => {
          const currentLikes = likesMap[photo.id] || photo.likes;

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFX.playClick();
                setSelectedPhoto(photo);
              }}
              className="group relative cursor-pointer glass-card rounded-2xl p-2 border-pink-400/20 shadow-md overflow-hidden glass-card-hover"
            >
              <div className="relative h-56 xs:h-48 w-full rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090417] via-[#090417]/25 to-transparent opacity-75" />

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full glass-card text-[9px] font-semibold text-pink-200 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-pink-400" />
                  <span className="truncate max-w-[90px]">{photo.location}</span>
                </div>

                <button
                  onClick={(e) => toggleLike(photo.id, photo.likes, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full glass-card text-pink-300 flex items-center gap-1 active:scale-90"
                >
                  <Heart className="w-3 h-3 fill-pink-500/50 text-pink-400" />
                  <span className="text-[9px] font-mono font-bold text-white">{currentLikes}</span>
                </button>

                <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                  <span className="text-[9px] text-amber-300 font-mono flex items-center gap-1 mb-0.5">
                    <Calendar className="w-2.5 h-2.5" />
                    {photo.date}
                  </span>
                  <h3 className="text-sm font-bold font-serif-heading text-white line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full glass-card rounded-3xl p-4 border border-pink-300/30 space-y-3"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full glass-card text-white/80"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[60vh] bg-slate-950">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[60vh] mx-auto rounded-2xl"
                />
              </div>

              <div className="text-left px-1 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-pink-300 font-mono">
                  <span>{selectedPhoto.date}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedPhoto.location}
                  </span>
                </div>
                <h3 className="text-xl font-serif-heading font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-pink-100/90 font-light leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
