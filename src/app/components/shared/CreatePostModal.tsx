import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image, Send, Check, Sparkles } from 'lucide-react';
import { PlatformIcon } from './PlatformBadge';
import type { PlatformKey, Template } from '../types';
import { PLATFORM_COLORS, PLATFORM_LABELS } from '../types';

interface CreatePostModalProps {
  template: Template;
  connectedPlatforms: PlatformKey[];
  onClose: () => void;
}

export function CreatePostModal({ template, connectedPlatforms, onClose }: CreatePostModalProps) {
  const [step, setStep] = useState<'compose' | 'success'>('compose');
  const [postText, setPostText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<PlatformKey>>(
    new Set(connectedPlatforms)
  );

  const togglePlatform = (p: PlatformKey) => {
    setSelectedPlatforms(prev => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const handlePost = () => {
    if (selectedPlatforms.size > 0 && postText.trim()) {
      setStep('success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-[390px] rounded-t-3xl overflow-hidden"
        style={{ background: template.cardBg, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {step === 'compose' && (
            <motion.div
              key="compose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-3"
                style={{ borderBottom: `1px solid ${template.cardBorder}` }}
              >
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: template.chipBg }}
                >
                  <X size={16} style={{ color: template.textSecondary }} />
                </button>
                <h3 className="text-base font-bold" style={{ color: template.textPrimary }}>
                  Buat Post
                </h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePost}
                  disabled={selectedPlatforms.size === 0 || !postText.trim()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: (selectedPlatforms.size > 0 && postText.trim())
                      ? template.accentColor
                      : template.chipBg,
                    color: (selectedPlatforms.size > 0 && postText.trim())
                      ? template.accentText
                      : template.textSecondary,
                  }}
                >
                  <Send size={14} />
                  Post
                </motion.button>
              </div>

              <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
                {/* Text area */}
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Apa yang sedang kamu pikirkan? ✨"
                  rows={4}
                  className="w-full bg-transparent text-sm resize-none focus:outline-none"
                  style={{ color: template.textPrimary }}
                />

                {/* Upload button (placeholder) */}
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium mb-5"
                  style={{ background: template.chipBg, color: template.textSecondary }}
                >
                  <Image size={14} />
                  Tambah Foto/Video
                </button>

                {/* Platform Distribution */}
                <div
                  className="pt-4 mb-4"
                  style={{ borderTop: `1px solid ${template.cardBorder}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: template.textSecondary }}>
                    Distribusi Platform
                  </p>
                  <p className="text-[11px] mb-3" style={{ color: template.textSecondary }}>
                    Pilih platform tujuan untuk post ini:
                  </p>

                  <div className="space-y-2">
                    {connectedPlatforms.map((p) => {
                      const isSelected = selectedPlatforms.has(p);
                      return (
                        <motion.button
                          key={p}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => togglePlatform(p)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
                          style={{
                            background: isSelected ? `${PLATFORM_COLORS[p]}10` : template.chipBg,
                            border: `1.5px solid ${isSelected ? PLATFORM_COLORS[p] : 'transparent'}`,
                          }}
                        >
                          {/* Checkbox */}
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                            style={{
                              background: isSelected ? PLATFORM_COLORS[p] : 'transparent',
                              border: `2px solid ${isSelected ? PLATFORM_COLORS[p] : template.textSecondary + '40'}`,
                              borderRadius: '6px',
                            }}
                          >
                            {isSelected && <Check size={12} color="#fff" strokeWidth={3} />}
                          </div>

                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: `${PLATFORM_COLORS[p]}15` }}
                          >
                            <PlatformIcon platform={p} size={16} />
                          </div>

                          <span className="text-sm font-medium flex-1 text-left" style={{ color: template.textPrimary }}>
                            {PLATFORM_LABELS[p]}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Preview note */}
                {selectedPlatforms.size > 0 && postText.trim() && (
                  <div
                    className="p-3 rounded-xl text-xs"
                    style={{ background: `${template.accentColor}10`, color: template.accentColor }}
                  >
                    <p className="font-semibold mb-1">📋 Preview</p>
                    <p className="opacity-80 line-clamp-2">{postText}</p>
                    <p className="mt-1.5 font-medium">
                      → Akan dikirim ke {selectedPlatforms.size} platform
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-16 px-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: `${template.accentColor}15` }}
              >
                <Sparkles size={36} style={{ color: template.accentColor }} />
              </motion.div>

              <h3 className="text-lg font-bold mb-2" style={{ color: template.textPrimary }}>
                Post Berhasil! 🎉
              </h3>
              <p className="text-sm text-center mb-4" style={{ color: template.textSecondary }}>
                Post berhasil dikirim ke {selectedPlatforms.size} platform!
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {Array.from(selectedPlatforms).map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: `${PLATFORM_COLORS[p]}15`, color: PLATFORM_COLORS[p] }}
                  >
                    <PlatformIcon platform={p} size={12} />
                    <span>{PLATFORM_LABELS[p]}</span>
                    <Check size={10} />
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-8 py-3 rounded-full text-sm font-semibold"
                style={{ background: template.accentColor, color: template.accentText }}
              >
                Kembali ke Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
