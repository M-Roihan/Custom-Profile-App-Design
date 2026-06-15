import { motion } from 'motion/react';
import { Heart, MessageCircle } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import type { FeedContent, Template } from '../types';

interface ContentCardProps {
  content: FeedContent;
  template: Template;
  index?: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function ContentCard({ content, template, index = 0 }: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
    >
      {/* Header: avatar + username + platform badge */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{ background: content.avatarBg }}
          >
            {content.avatarEmoji}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: template.textPrimary }}>
              {content.displayName}
            </p>
            <p className="text-[10px] truncate" style={{ color: template.textSecondary }}>
              @{content.username} · {content.timestamp}
            </p>
          </div>
        </div>
        <PlatformBadge platform={content.platform} size="sm" showLabel={true} />
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={content.thumbnail}
          alt={content.caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${template.cardBg}40, transparent 40%)`,
          }}
        />
      </div>

      {/* Caption */}
      <div className="p-3 pt-2.5">
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: template.textPrimary }}
        >
          {content.caption}
        </p>

        {/* Interest tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {content.interests.map(tag => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: template.chipBg, color: template.chipText }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center gap-4 mt-3 pt-2.5" style={{ borderTop: `1px solid ${template.cardBorder}` }}>
          <button className="flex items-center gap-1.5 text-xs" style={{ color: template.textSecondary }}>
            <Heart size={14} />
            <span>{formatCount(content.likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs" style={{ color: template.textSecondary }}>
            <MessageCircle size={14} />
            <span>{formatCount(content.comments)}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
