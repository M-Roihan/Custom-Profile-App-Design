import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Users } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import type { ConnectedAccount, Template } from '../types';

interface MultiAccountPickerProps {
  userName: string;
  accounts: ConnectedAccount[];
  template: Template;
  onSelect: (accounts: ConnectedAccount[]) => void;
  onClose: () => void;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function MultiAccountPicker({ userName, accounts, template, onSelect, onClose }: MultiAccountPickerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAccount = (platform: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(platform)) next.delete(platform);
      else next.add(platform);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(accounts.map(a => a.platform)));
  };

  const handleConfirm = () => {
    const selectedAccounts = accounts.filter(a => selected.has(a.platform));
    onSelect(selectedAccounts);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: template.cardBg }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: `${template.accentColor}15` }}
            >
              <Users size={18} style={{ color: template.accentColor }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: template.textPrimary }}>
                📌 {userName}
              </p>
              <p className="text-[11px]" style={{ color: template.textSecondary }}>
                memiliki beberapa akun:
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: template.chipBg }}
          >
            <X size={14} style={{ color: template.textSecondary }} />
          </button>
        </div>

        {/* Account list */}
        <div className="px-5 py-2 space-y-2">
          {accounts.map((acc) => {
            const isSelected = selected.has(acc.platform);
            return (
              <motion.button
                key={acc.platform}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleAccount(acc.platform)}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{
                  background: isSelected ? `${template.accentColor}10` : template.chipBg,
                  border: `1.5px solid ${isSelected ? template.accentColor : 'transparent'}`,
                }}
              >
                {/* Radio/check */}
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: isSelected ? template.accentColor : template.textSecondary + '40',
                    background: isSelected ? template.accentColor : 'transparent',
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>

                <PlatformBadge platform={acc.platform} size="sm" showLabel={false} />

                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: template.textPrimary }}>
                    @{acc.username}
                  </p>
                  <p className="text-[10px]" style={{ color: template.textSecondary }}>
                    {formatCount(acc.followers)} followers
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pt-2 pb-5">
          <p className="text-[11px] mb-3 text-center" style={{ color: template.textSecondary }}>
            Pilih akun yang ingin kamu ikuti
          </p>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={selectAll}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                background: template.accentColor,
                color: template.accentText,
              }}
            >
              Ikuti Semua ({accounts.length})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              disabled={selected.size === 0}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                background: selected.size > 0 ? template.chipBg : '#f3f4f6',
                color: selected.size > 0 ? template.textPrimary : '#d1d5db',
                border: `1px solid ${template.cardBorder}`,
              }}
            >
              Ikuti ({selected.size}) Terpilih
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
