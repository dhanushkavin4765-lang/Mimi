import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Sparkles, CheckCheck, RefreshCw } from 'lucide-react';
import { mimiData } from '../config/mimiData';
import { soundFX } from '../utils/audioSynth';

export default function InteractiveChatSection() {
  const { title, subtitle, messages: initialMessages } = mimiData.chat;
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentIndex < initialMessages.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, initialMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
        soundFX.playClick();
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, initialMessages]);

  const replayChat = () => {
    soundFX.playSparkle();
    setMessages([]);
    setCurrentIndex(0);
    setIsTyping(false);
  };

  return (
    <section id="chat-section" className="py-10 px-3 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-[11px] font-bold">
          <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
          <span>Saved Conversation</span>
        </div>

        <h2 className="text-2xl xs:text-3xl font-serif-heading font-bold text-white">
          {title} ✨
        </h2>

        <p className="text-xs text-pink-200/70 font-light max-w-xs mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Mobile Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl border-2 border-pink-300/20 shadow-lg overflow-hidden"
      >
        {/* Chat Window Top Bar */}
        <div className="px-4 py-3 bg-[#0d061c]/90 border-b border-pink-400/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-pink-400/40 p-[1px] shrink-0">
              <img
                src={mimiData.hero.centerPhoto.url}
                alt="Mimi Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0d061c]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white flex items-center gap-1 font-serif-heading">
                <span>Mimi</span>
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300/30" />
              </h4>
              <p className="text-[10px] text-pink-300/70 font-mono">Online • Replaying log</p>
            </div>
          </div>

          <button
            onClick={replayChat}
            className="px-2.5 py-1 rounded-full glass-input text-[11px] font-medium text-pink-300 flex items-center gap-1 border-pink-400/30 active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        </div>

        {/* Chat Body Stream */}
        <div className="p-4 h-80 xs:h-[360px] overflow-y-auto space-y-3.5 bg-gradient-to-b from-[#090417]/90 to-[#0c051f]/90">
          <div className="text-center my-1">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-[9px] text-pink-300/70 font-mono uppercase tracking-wider">
              Memory Log — Today
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'me';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={msg.avatar || mimiData.hero.centerPhoto.url}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover border border-pink-400/40 self-end mb-1 shrink-0"
                  />
                )}

                <div className={`max-w-[85%] space-y-0.5 ${isMe ? 'text-right' : 'text-left'}`}>
                  <div className="text-[9px] text-pink-300/60 font-semibold px-1">
                    {msg.senderName}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-br-none shadow-sm'
                        : 'glass-card border-pink-300/20 text-slate-100 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-pink-300/50 px-1 justify-end">
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-pink-300" />}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-pink-300/70 text-[11px] font-mono pl-1">
              <Sparkles className="w-3 h-3 text-pink-300 animate-spin" />
              <span className="animate-pulse">Mimi is typing...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-[#0a041a] border-t border-pink-400/15 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value="Replaying saved memory logs ✨"
            className="w-full px-3.5 py-2.5 rounded-full glass-input text-pink-200/70 text-xs focus:outline-none cursor-not-allowed"
          />
          <button
            onClick={replayChat}
            className="p-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shrink-0 active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
