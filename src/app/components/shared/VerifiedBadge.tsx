import { motion } from 'motion/react';
import { Check, AlertTriangle, Clock } from 'lucide-react';

interface VerifiedBadgeProps {
  status: 'verified' | 'pending' | 'unverified';
  size?: 'sm' | 'md';
  showTooltip?: boolean;
  onClick?: () => void;
}

export function VerifiedBadge({ status, size = 'md', onClick }: VerifiedBadgeProps) {
  const iconSize = size === 'sm' ? 12 : 16;
  const containerSize = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';

  const config = {
    verified: {
      bg: '#10b981',
      icon: <Check size={iconSize} color="#fff" strokeWidth={3} />,
      label: '✓ Verified',
      tooltip: 'Akun terverifikasi',
    },
    pending: {
      bg: '#f59e0b',
      icon: <Clock size={iconSize} color="#fff" strokeWidth={2.5} />,
      label: '⏳ Pending',
      tooltip: 'Menunggu verifikasi',
    },
    unverified: {
      bg: '#ef4444',
      icon: <AlertTriangle size={iconSize} color="#fff" strokeWidth={2.5} />,
      label: '⚠ Belum Diverifikasi',
      tooltip: 'Belum diverifikasi — klik untuk memverifikasi',
    },
  };

  const { bg, icon, label } = config[status];

  return (
    <motion.button
      whileTap={onClick ? { scale: 0.9 } : undefined}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full text-white font-medium ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]'
      }`}
      style={{ background: bg, cursor: onClick ? 'pointer' : 'default' }}
      title={config[status].tooltip}
    >
      <span className={`${containerSize} flex items-center justify-center`}>
        {icon}
      </span>
      <span>{label}</span>
    </motion.button>
  );
}
