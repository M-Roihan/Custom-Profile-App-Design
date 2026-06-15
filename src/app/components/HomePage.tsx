import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Rss } from 'lucide-react';
import { ContentCard } from './shared/ContentCard';
import { InterestChip } from './shared/InterestChip';
import { CreatePostModal } from './shared/CreatePostModal';
import type { Template, UserProfile, FeedContent } from './types';
import { MOCK_FEED_DATA } from './types';

interface HomePageProps {
  template: Template;
  profile: UserProfile;
}

export function HomePage({ template, profile }: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Derive filter chips from user interests
  const filterOptions = ['Semua', ...profile.interests];

  // Filter feed by active interest
  const filteredFeed = activeFilter === 'Semua'
    ? MOCK_FEED_DATA
    : MOCK_FEED_DATA.filter(item =>
        item.interests.some(tag => tag === activeFilter)
      );

  const hasConnectedAccounts = profile.connectedAccounts.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-full overflow-y-auto scrollbar-hide relative"
        style={{ background: template.bodyBg }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sparkles size={20} style={{ color: template.accentColor }} />
              <h1 className="text-xl font-bold" style={{ color: template.textPrimary }}>
                Feed
              </h1>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
              style={{ background: profile.avatarBg }}
            >
              {profile.avatarEmoji}
            </div>
          </div>
          <p className="text-xs" style={{ color: template.textSecondary }}>
            Konten terkurasi dari akun yang terhubung
          </p>
        </div>

        {/* Filter chips — horizontal scroll */}
        <div className="px-5 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {filterOptions.map(option => (
              <InterestChip
                key={option}
                label={option}
                selected={activeFilter === option}
                onClick={() => setActiveFilter(option)}
                variant="filter"
                template={template}
              />
            ))}
          </div>
        </div>

        {/* Feed content */}
        <div className="px-5 pb-28 space-y-4">
          {hasConnectedAccounts ? (
            <AnimatePresence mode="popLayout">
              {filteredFeed.length > 0 ? (
                filteredFeed.map((item, i) => (
                  <ContentCard key={item.id} content={item} template={template} index={i} />
                ))
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                    style={{ background: template.chipBg }}
                  >
                    🔍
                  </div>
                  <p className="text-sm font-medium" style={{ color: template.textPrimary }}>
                    Tidak ada konten
                  </p>
                  <p className="text-xs mt-1" style={{ color: template.textSecondary }}>
                    Tidak ada konten untuk filter "{activeFilter}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            /* Empty state — no connected accounts */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                style={{ background: `${template.accentColor}15` }}
              >
                <Rss size={32} style={{ color: template.accentColor }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: template.textPrimary }}>
                Feed-mu masih kosong
              </h3>
              <p className="text-sm mb-6 px-8 leading-relaxed" style={{ color: template.textSecondary }}>
                Hubungkan akun pertamamu untuk mulai melihat konten yang relevan dengan minatmu
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: template.accentColor, color: template.accentText }}
              >
                <Plus size={16} />
                Hubungkan Akun
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* FAB — Create Post */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowCreatePost(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-20"
          style={{
            background: `linear-gradient(135deg, ${template.accentColor}, ${template.buttonBg})`,
            color: template.accentText,
            boxShadow: `0 4px 20px ${template.accentColor}50`,
          }}
        >
          <Plus size={24} />
        </motion.button>
      </motion.div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <CreatePostModal
            template={template}
            connectedPlatforms={profile.connectedAccounts.map(a => a.platform)}
            onClose={() => setShowCreatePost(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
