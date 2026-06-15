import type { PlatformKey } from '../types';
import { PLATFORM_COLORS, PLATFORM_LABELS } from '../types';

interface PlatformBadgeProps {
  platform: PlatformKey;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

function PlatformIcon({ platform, size = 16 }: { platform: PlatformKey; size?: number }) {
  switch (platform) {
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
              <stop offset="0%" stopColor="#FD1D1D" />
              <stop offset="50%" stopColor="#E1306C" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.12 2.49 5.36 5.1 5.36 2.82 0 5.18-2.42 5.18-5.36V9.48a7.29 7.29 0 0 0 4.26 1.38V7.6a4.39 4.39 0 0 1-2.7-1.78z" fill="#00F2EA" />
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.12 2.49 5.36 5.1 5.36 2.82 0 5.18-2.42 5.18-5.36V9.48a7.29 7.29 0 0 0 4.26 1.38V7.6a4.39 4.39 0 0 1-2.7-1.78z" fill="#FF0050" opacity="0.6" style={{ transform: 'translate(-1px, -1px)' }} />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DA1F2">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
  }
}

export function PlatformBadge({ platform, size = 'md', showLabel = true, className = '' }: PlatformBadgeProps) {
  const color = PLATFORM_COLORS[platform];
  const label = PLATFORM_LABELS[platform];
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 gap-1 text-[10px]',
    md: 'px-2 py-1 gap-1.5 text-xs',
    lg: 'px-3 py-1.5 gap-2 text-sm',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${className}`}
      style={{
        background: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <PlatformIcon platform={platform} size={iconSize} />
      {showLabel && <span>{label}</span>}
    </div>
  );
}

export { PlatformIcon };
