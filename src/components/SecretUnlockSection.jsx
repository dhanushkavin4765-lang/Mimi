import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Sparkles, ShieldCheck } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';
import UnlockExplosionOverlay from './UnlockExplosionOverlay';

export default function SecretUnlockSection({ onUnlocked, isUnlocked }) {
  const [idInput, setIdInput] = useState(mimiData.credentials.secretUnlockId);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    soundFX.playClick();

    const requiredID = mimiData.credentials.secretUnlockId;
    const requiredPass = mimiData.credentials.secretUnlockPassword;

    if (
      idInput.trim().toLowerCase() !== requiredID.toLowerCase() ||
      passwordInput.trim().toLowerCase() !== requiredPass.toLowerCase()
    ) {
      setErrorMsg(`Incorrect Credentials! Required ID: "${requiredID}" & Password: "${requiredPass}"`);
      soundFX.playClick();
      return;
    }

    setErrorMsg('');
    setIsAnimating(true);
  };

  return (
    <section id="unlock-section" className="py-12 px-4 max-w-md mx-auto text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[220px] bg-gradient-to-tr from-amber-500/15 via-pink-500/15 to-purple-600/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Full-screen mobile unlock overlay animation */}
      <AnimatePresence>
        {isAnimating && (
          <UnlockExplosionOverlay
            onFinish={() => {
              setIsAnimating(false);
              onUnlocked();
            }}
          />
        )}
      </AnimatePresence>

      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-6 xs:p-8 border-2 border-amber-400/30 shadow-[0_0_40px_rgba(251,191,36,0.25)]"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-600/20 border-2 border-amber-300/40 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] mb-4"
          >
            <Lock className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </motion.div>

          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold">
            Final Secret Vault
          </span>

          <h2 className="text-3xl font-serif-heading font-extrabold text-white mt-1 mb-2">
            SECRET UNLOCK ✨
          </h2>

          <p className="text-xs text-pink-200/80 font-light mb-6">
            Enter credentials to unlock the final secret vault.
          </p>

          <form onSubmit={handleUnlockSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-pink-300/80 mb-1.5 flex justify-between">
                <span>Secret ID</span>
                <span className="text-[10px] text-amber-300 font-mono">ID: Mimi</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400">
                  <ShieldCheck className="w-5 h-5 opacity-80" />
                </div>
                <input
                  type="text"
                  value={idInput}
                  onChange={(e) => {
                    setIdInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter ID (Mimi)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-white text-base font-semibold placeholder-pink-300/30 focus:outline-none border-amber-300/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-pink-300/80 mb-1.5 flex justify-between">
                <span>Secret Password</span>
                <span className="text-[10px] text-amber-300 font-mono">Password: Mimi</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400">
                  <KeyRound className="w-5 h-5 opacity-80" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter Password (Mimi)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-white text-base font-semibold placeholder-pink-300/30 focus:outline-none border-pink-300/30"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-semibold pt-1">
                {errorMsg}
              </p>
            )}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-bold text-base shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-200 flex items-center justify-center gap-2 border border-amber-200/40 mt-3 min-h-[54px]"
            >
              <span>Unlock Secret Vault</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <div className="p-3.5 rounded-2xl glass-card border border-emerald-400/40 text-emerald-300 text-xs font-semibold inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Secret Vault Successfully Unlocked Below ✨</span>
        </div>
      )}
    </section>
  );
}
