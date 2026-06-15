import { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Check } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import type { RecommendedUser, Template } from '../types';

interface AccountRecommendationCardProps {
  user: RecommendedUser;
  template: Template;
  onFollow?: (userId: number) => void;
  isFollowing?: boolean;
  index?: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function AccountRecommendationCard({
  user,
  template,
  onFollow,
  isFollowing = false,
  index = 0,
}: AccountRecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl p-3.5 shadow-sm"
      style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
    >
      {/* Top row: avatar + info + follow btn */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: user.avatarBg, border: `2px solid ${template.avatarRing}` }}
        >
          {user.avatarEmoji}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: template.textPrimary }}>
            {user.name}
          </p>
          <p className="text-[11px] truncate" style={{ color: template.textSecondary }}>
            @{user.username}
          </p>
          <p className="text-[11px] mt-1 line-clamp-1" style={{ color: template.textSecondary }}>
            {user.bio}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onFollow?.(user.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 mt-0.5"
          style={{
            background: isFollowing ? template.chipBg : template.accentColor,
            color: isFollowing ? template.textPrimary : template.accentText,
            border: `1px solid ${isFollowing ? template.cardBorder : 'transparent'}`,
          }}
        >
          {isFollowing ? <Check size={12} /> : <UserPlus size={12} />}
          {isFollowing ? 'Following' : 'Follow'}
        </motion.button>
      </div>

      {/* Platform badges row — highly visible per dosen requirement */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {user.platforms.map((acc) => (
          <div key={acc.platform} className="flex items-center gap-1">
            <PlatformBadge platform={acc.platform} size="sm" showLabel={true} />
            <span
              className="text-[10px] font-medium"
              style={{ color: template.textSecondary }}
            >
              {formatCount(acc.followers)}
            </span>
          </div>
        ))}
      </div>

      {/* Interest tags */}
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {user.interests.map(tag => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: template.chipBg, color: template.chipText }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
