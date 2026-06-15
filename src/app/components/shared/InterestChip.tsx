import { motion } from 'motion/react';
import type { Template } from '../types';

interface InterestChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'filter' | 'display';
  template?: Template;
}

export function InterestChip({ label, selected = false, onClick, variant = 'display', template }: InterestChipProps) {
  if (variant === 'filter') {
    return (
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0"
        style={{
          background: selected
            ? (template?.accentColor || '#6366f1')
            : (template?.chipBg || '#f3f4f6'),
          color: selected
            ? (template?.accentText || '#ffffff')
            : (template?.chipText || '#64748b'),
          boxShadow: selected
            ? `0 2px 8px ${template?.accentColor || '#6366f1'}40`
            : 'none',
        }}
      >
        {label}
      </motion.button>
    );
  }

  return (
    <span
      className="px-3 py-1.5 rounded-full text-xs font-medium"
      style={{
        background: template?.chipBg || '#f3f4f6',
        color: template?.chipText || '#374151',
      }}
    >
      {label}
    </span>
  );
}
