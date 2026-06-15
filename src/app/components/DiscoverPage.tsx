import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, TrendingUp } from 'lucide-react';
import { AccountRecommendationCard } from './shared/AccountRecommendationCard';
import { MultiAccountPicker } from './shared/MultiAccountPicker';
import { InterestChip } from './shared/InterestChip';
import type { Template, RecommendedUser } from './types';
import { MOCK_RECOMMENDED_USERS } from './types';

interface DiscoverPageProps {
  template: Template;
}

export function DiscoverPage({ template }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [pickerUser, setPickerUser] = useState<RecommendedUser | null>(null);

  // Derive interest categories from mock data
  const allInterests = Array.from(
    new Set(MOCK_RECOMMENDED_USERS.flatMap(u => u.interests))
  );
  const categories = ['Semua', ...allInterests];

  // Filter users
  const filteredUsers = MOCK_RECOMMENDED_USERS.filter(u => {
    const matchesSearch = !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'Semua' ||
      u.interests.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  // Group users by interest category
  const groupedByInterest: Record<string, RecommendedUser[]> = {};
  if (activeCategory === 'Semua') {
    allInterests.forEach(interest => {
      const users = filteredUsers.filter(u => u.interests.includes(interest));
      if (users.length > 0) {
        groupedByInterest[interest] = users;
      }
    });
  }

  const handleFollow = (userId: number) => {
    const user = MOCK_RECOMMENDED_USERS.find(u => u.id === userId);
    if (user && user.platforms.length > 1) {
      setPickerUser(user);
    } else {
      toggleFollow(userId);
    }
  };

  const toggleFollow = (userId: number) => {
    setFollowingIds(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ background: template.bodyBg }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <Compass size={20} style={{ color: template.accentColor }} />
            <h1 className="text-xl font-bold" style={{ color: template.textPrimary }}>
              Discover
            </h1>
          </div>
          <p className="text-xs" style={{ color: template.textSecondary }}>
            Temukan orang berdasarkan minat yang sama
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3">
          <div
            className="flex items-center px-3.5 py-2.5 rounded-2xl shadow-sm"
            style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
          >
            <Search size={16} style={{ color: template.textSecondary }} className="mr-2.5" />
            <input
              type="text"
              placeholder="Cari orang berdasarkan minat atau username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm focus:outline-none"
              style={{ color: template.textPrimary }}
            />
          </div>
        </div>

        {/* Category filter chips */}
        <div className="px-5 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map(cat => (
              <InterestChip
                key={cat}
                label={cat}
                selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                variant="filter"
                template={template}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-28">
          {activeCategory === 'Semua' && !searchQuery ? (
            /* Grouped by interest */
            Object.entries(groupedByInterest).map(([interest, users]) => (
              <div key={interest} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} style={{ color: template.accentColor }} />
                  <h3
                    className="text-sm font-bold"
                    style={{ color: template.textPrimary }}
                  >
                    Orang dengan minat {interest}
                  </h3>
                </div>

                {/* Horizontal scroll cards */}
                <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
                  <div className="flex gap-3" style={{ width: 'max-content' }}>
                    {users.map((user, i) => (
                      <div key={user.id} className="w-[280px] shrink-0">
                        <AccountRecommendationCard
                          user={user}
                          template={template}
                          onFollow={() => handleFollow(user.id)}
                          isFollowing={followingIds.has(user.id)}
                          index={i}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Flat list for filtered view */
            <div className="space-y-3">
              <AnimatePresence>
                {filteredUsers.map((user, i) => (
                  <AccountRecommendationCard
                    key={user.id}
                    user={user}
                    template={template}
                    onFollow={() => handleFollow(user.id)}
                    isFollowing={followingIds.has(user.id)}
                    index={i}
                  />
                ))}
              </AnimatePresence>

              {filteredUsers.length === 0 && (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                    style={{ background: template.chipBg }}
                  >
                    🔍
                  </div>
                  <p className="text-sm font-medium" style={{ color: template.textPrimary }}>
                    Tidak ada hasil
                  </p>
                  <p className="text-xs mt-1" style={{ color: template.textSecondary }}>
                    Coba kata kunci lain atau ubah filter
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Multi-Account Picker Modal */}
      <AnimatePresence>
        {pickerUser && (
          <MultiAccountPicker
            userName={pickerUser.name}
            accounts={pickerUser.platforms}
            template={template}
            onSelect={() => toggleFollow(pickerUser.id)}
            onClose={() => setPickerUser(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
