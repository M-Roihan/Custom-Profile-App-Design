import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';
import type { FollowerBreakdownItem, Template } from '../types';

interface FollowerBreakdownProps {
  data: FollowerBreakdownItem[];
  total: number;
  template: Template;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function FollowerBreakdown({ data, total, template }: FollowerBreakdownProps) {
  const [expanded, setExpanded] = useState(false);
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div>
      {/* Total + expand toggle */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex flex-col items-center gap-0.5 flex-1">
          <span className="text-lg font-semibold" style={{ color: template.textPrimary }}>
            {formatCount(total)}
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: template.textSecondary }}>
            Followers
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </div>
      </motion.button>

      {/* Breakdown detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-2.5">
              {data.map((item) => (
                <div key={item.platform} className="flex items-center gap-2.5">
                  <PlatformBadge platform={item.platform} size="sm" showLabel={false} />
                  <div className="flex-1">
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: `${template.chipBg}` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / maxCount) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: template.accentColor }}
                      />
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium min-w-[40px] text-right tabular-nums"
                    style={{ color: template.textPrimary }}
                  >
                    {formatCount(item.count)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
