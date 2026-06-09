import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, UserPlus, Check, ChevronRight } from 'lucide-react';
import type { Template } from './types';

interface ConnectPageProps {
  template: Template;
}

const SUGGESTED_USERS = [
  { id: 1, name: 'Sarah Chen', username: 'sarahcodes', emoji: '👩🏻‍💻', bg: '#ec4899', isMutual: true },
  { id: 2, name: 'David Kim', username: 'davidk_design', emoji: '🎨', bg: '#3b82f6', isMutual: false },
  { id: 3, name: 'Elena Rodriguez', username: 'elenatravels', emoji: '✈️', bg: '#f59e0b', isMutual: true },
  { id: 4, name: 'James Wilson', username: 'jwilson_tech', emoji: '🚀', bg: '#10b981', isMutual: false },
  { id: 5, name: 'Nina Patel', username: 'ninacreates', emoji: '✨', bg: '#8b5cf6', isMutual: true },
  { id: 6, name: 'Marcus Johnson', username: 'marcusj_music', emoji: '🎸', bg: '#ef4444', isMutual: false },
  { id: 7, name: 'Leo Wong', username: 'leow_dev', emoji: '💻', bg: '#0ea5e9', isMutual: false },
];

export function ConnectPage({ template }: ConnectPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'discover' | 'mutuals'>('discover');
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set([1, 5]));

  const toggleFollow = (id: number) => {
    setFollowingIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredUsers = SUGGESTED_USERS.filter(u => {
    if (activeTab === 'mutuals' && !u.isMutual) return false;
    if (searchQuery) {
      return u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             u.username.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full overflow-y-auto scrollbar-hide pt-4"
      style={{ background: template.bodyBg }}
    >
      <div className="px-5 mb-4">
        <h1 className="text-xl font-bold mb-1" style={{ color: template.textPrimary }}>Connect</h1>
        <p className="text-xs" style={{ color: template.textSecondary }}>Find new friends and grow your network</p>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-5">
        <div 
          className="flex items-center px-3 py-2.5 rounded-2xl shadow-sm"
          style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
        >
          <Search size={16} style={{ color: template.textSecondary }} className="mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: template.textPrimary }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-5 flex gap-2">
        {(['discover', 'mutuals'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
            style={{
              background: activeTab === tab ? template.accentColor : template.chipBg,
              color: activeTab === tab ? template.accentText : template.textSecondary,
              boxShadow: activeTab === tab ? `0 2px 8px ${template.accentColor}40` : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="px-5 pb-24 space-y-3">
        <AnimatePresence>
          {filteredUsers.map((user, i) => {
            const isFollowing = followingIds.has(user.id);
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-2xl shadow-sm"
                style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
              >
                {/* Avatar */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ background: user.bg, border: `2px solid ${template.avatarRing}` }}
                >
                  {user.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold truncate" style={{ color: template.textPrimary }}>
                      {user.name}
                    </p>
                    {user.isMutual && (
                      <span 
                        className="text-[9px] px-1.5 py-0.5 rounded text-white"
                        style={{ background: template.accentColor }}
                      >
                        Mutual
                      </span>
                    )}
                  </div>
                  <p className="text-xs truncate" style={{ color: template.textSecondary }}>
                    @{user.username}
                  </p>
                </div>

                {/* Action Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFollow(user.id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-w-[85px]"
                  style={{
                    background: isFollowing ? template.chipBg : template.accentColor,
                    color: isFollowing ? template.textPrimary : template.accentText,
                    border: `1px solid ${isFollowing ? template.cardBorder : 'transparent'}`,
                  }}
                >
                  {isFollowing ? (
                    <>
                      <Check size={12} />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={12} />
                      Follow
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
          
          {filteredUsers.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm" style={{ color: template.textSecondary }}>No users found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
