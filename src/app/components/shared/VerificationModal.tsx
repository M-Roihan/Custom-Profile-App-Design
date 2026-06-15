import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ChevronRight, Loader2, Shield, Mail, ArrowLeft } from 'lucide-react';
import { PlatformIcon } from './PlatformBadge';
import type { PlatformKey } from '../types';
import { PLATFORM_COLORS, PLATFORM_LABELS } from '../types';

interface VerificationModalProps {
  onClose: () => void;
  onSuccess: (platform: PlatformKey, username: string) => void;
}

const ALL_PLATFORMS: PlatformKey[] = ['instagram', 'tiktok', 'linkedin', 'youtube', 'twitter', 'github'];

export function VerificationModal({ onClose, onSuccess }: VerificationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const [verifyMethod, setVerifyMethod] = useState<'oauth' | 'otp' | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [username, setUsername] = useState('');

  const handleSelectPlatform = (p: PlatformKey) => {
    setSelectedPlatform(p);
    setStep(2);
  };

  const handleSelectMethod = (method: 'oauth' | 'otp') => {
    setVerifyMethod(method);
    setIsVerifying(true);
  };

  useEffect(() => {
    if (isVerifying) {
      const timer = setTimeout(() => {
        setIsVerifying(false);
        setStep(3);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVerifying]);

  const handleConfirm = () => {
    if (selectedPlatform) {
      onSuccess(selectedPlatform, username || `user_${selectedPlatform}`);
    }
    onClose();
  };

  const platformColor = selectedPlatform ? PLATFORM_COLORS[selectedPlatform] : '#6366f1';
  const platformLabel = selectedPlatform ? PLATFORM_LABELS[selectedPlatform] : '';

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
        className="w-full max-w-[390px] bg-white rounded-t-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            {step > 1 && !isVerifying && (
              <button
                onClick={() => setStep((step - 1) as 1 | 2)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <ArrowLeft size={18} className="text-gray-600" />
              </button>
            )}
            <div>
              <h3 className="text-base font-bold text-gray-900">Tambah Akun</h3>
              <p className="text-xs text-gray-500">Verifikasi kepemilikan akun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-5 mb-5">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-1">
                <div className="flex-1 h-1 rounded-full overflow-hidden bg-gray-100">
                  <motion.div
                    animate={{
                      width: step >= s ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: step >= s ? platformColor : '#e5e7eb' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-gray-400 font-medium">
            <span style={{ color: step >= 1 ? platformColor : undefined }}>Pilih Platform</span>
            <span style={{ color: step >= 2 ? platformColor : undefined }}>Verifikasi</span>
            <span style={{ color: step >= 3 ? platformColor : undefined }}>Selesai</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-8 overflow-y-auto" style={{ maxHeight: '55vh' }}>
          <AnimatePresence mode="wait">
            {/* Step 1: Pick platform */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-2.5"
              >
                <p className="text-sm text-gray-600 mb-4">
                  Pilih platform yang ingin kamu hubungkan:
                </p>
                {ALL_PLATFORMS.map((p) => (
                  <motion.button
                    key={p}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectPlatform(p)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    style={{ background: '#fafafa' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${PLATFORM_COLORS[p]}15` }}
                    >
                      <PlatformIcon platform={p} size={20} />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 flex-1 text-left">
                      {PLATFORM_LABELS[p]}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Verify method */}
            {step === 2 && !isVerifying && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${platformColor}15` }}
                  >
                    <PlatformIcon platform={selectedPlatform!} size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Verifikasi akun {platformLabel}
                  </p>
                </div>

                {/* Username input */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                    Username {platformLabel}
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Masukkan username ${platformLabel}`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* OAuth Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectMethod('oauth')}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl text-white font-medium text-sm"
                  style={{ background: platformColor }}
                >
                  <Shield size={18} />
                  <div className="text-left flex-1">
                    <p className="font-semibold">Lanjutkan dengan {platformLabel}</p>
                    <p className="text-xs opacity-80">Login OAuth — paling aman & cepat</p>
                  </div>
                  <ChevronRight size={16} />
                </motion.button>

                {/* OTP Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectMethod('otp')}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 text-gray-800 font-medium text-sm"
                >
                  <Mail size={18} className="text-gray-500" />
                  <div className="text-left flex-1">
                    <p className="font-semibold">Kode Verifikasi (OTP)</p>
                    <p className="text-xs text-gray-500">Kirim kode ke email/nomor terdaftar</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </motion.button>
              </motion.div>
            )}

            {/* Loading state */}
            {step === 2 && isVerifying && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 size={40} style={{ color: platformColor }} />
                </motion.div>
                <p className="text-sm font-medium text-gray-800 mt-4">Memverifikasi akun...</p>
                <p className="text-xs text-gray-500 mt-1">
                  Menghubungkan ke {platformLabel} {verifyMethod === 'oauth' ? 'via OAuth' : 'via OTP'}
                </p>

                {/* Progress bar */}
                <div className="w-48 h-1.5 rounded-full bg-gray-100 mt-4 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    className="h-full rounded-full"
                    style={{ background: platformColor }}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#10b98120' }}
                >
                  <Check size={36} color="#10b981" strokeWidth={3} />
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Berhasil! ✓</h4>
                <p className="text-sm text-gray-600 text-center mb-1">
                  Akun <strong>@{username || `user_${selectedPlatform}`}</strong>
                </p>
                <p className="text-sm text-gray-600 text-center">
                  dari <strong>{platformLabel}</strong> berhasil diverifikasi
                </p>

                <div
                  className="mt-4 px-3 py-1.5 rounded-full flex items-center gap-2"
                  style={{ background: `${platformColor}15` }}
                >
                  <PlatformIcon platform={selectedPlatform!} size={14} />
                  <span className="text-xs font-medium" style={{ color: platformColor }}>
                    {platformLabel} · Terverifikasi
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="mt-8 px-8 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: '#10b981' }}
                >
                  Selesai
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
