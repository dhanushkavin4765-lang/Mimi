import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Component imports
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import SecretLoginModal from './components/SecretLoginModal';
import MimiExplosionOverlay from './components/MimiExplosionOverlay';
import HeaderNav from './components/HeaderNav';
import TopHeroSection from './components/TopHeroSection';
import PhotoMemoriesGallery from './components/PhotoMemoriesGallery';
import InteractiveChatSection from './components/InteractiveChatSection';
import SecretNotesGrid from './components/SecretNotesGrid';
import ImportantPlacesSection from './components/ImportantPlacesSection';
import SecretUnlockSection from './components/SecretUnlockSection';
import FinalSecretWorld from './components/FinalSecretWorld';

export default function App() {
  const [stage, setStage] = useState('LOGIN'); // 'LOGIN' | 'EXPLOSION' | 'MAIN'
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-[#070212] text-slate-100 font-sans overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-200">
      {/* Dynamic Background Canvas */}
      <BackgroundCanvas />

      {/* Trailing Cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {/* STEP 1: Secret Login Screen (Mobile First) */}
        {stage === 'LOGIN' && (
          <SecretLoginModal
            key="login-modal"
            onLoginSuccess={() => setStage('EXPLOSION')}
          />
        )}

        {/* STEP 2: Cinematic MIMI Explosion Overlay (Mobile Viewport Constrained) */}
        {stage === 'EXPLOSION' && (
          <MimiExplosionOverlay
            key="mimi-explosion"
            onFinish={() => setStage('MAIN')}
          />
        )}
      </AnimatePresence>

      {/* STEP 3: Main Website (Mobile Vertical Layout) */}
      {stage === 'MAIN' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md mx-auto min-h-screen space-y-8 pb-16 overflow-x-hidden"
        >
          {/* Header Navigation */}
          <HeaderNav
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />

          {/* Top Section with "Thangamaana Pulla" & Center Photo */}
          <TopHeroSection />

          {/* Photo Memories Gallery */}
          <PhotoMemoriesGallery />

          {/* Chat Conversation */}
          <InteractiveChatSection />

          {/* Secret Notes */}
          <SecretNotesGrid />

          {/* Important Places */}
          <ImportantPlacesSection />

          {/* Secret Unlock Vault */}
          <SecretUnlockSection
            onUnlocked={() => setIsVaultUnlocked(true)}
            isUnlocked={isVaultUnlocked}
          />

          {/* Final Unlocked Content */}
          {isVaultUnlocked && <FinalSecretWorld />}
        </motion.div>
      )}
    </div>
  );
}
