import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Globe, Share2, BadgeCheck, Plus,
  Instagram, Github, Youtube, Linkedin, Twitter, Music2,
} from 'lucide-react';
import { toast } from 'sonner';
import { PlatformBadge } from './shared/PlatformBadge';
import { VerifiedBadge } from './shared/VerifiedBadge';
import { FollowerBreakdown } from './shared/FollowerBreakdown';
import { VerificationModal } from './shared/VerificationModal';
import type { UserProfile, Template, AppSettings, PlatformKey } from './types';
import { SOCIAL_PLATFORMS } from './types';

interface ProfileViewProps {
  profile: UserProfile;
  template: Template;
  settings: AppSettings;
  onEdit: () => void;
  onUpdateProfile?: (profile: UserProfile) => void;
}

function useCountUp(target: number, delay: number = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 700;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return count;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

const TEMPLATE_DECORATIONS: Record<string, ReactNode> = {
  neon: (
    <>
      <div className="absolute top-3 right-6 w-16 h-16 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
      <div className="absolute bottom-2 right-24 w-8 h-8 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      <div className="absolute top-8 left-8 text-2xl opacity-20 select-none">⬡</div>
    </>
  ),
  pastel: (
    <>
      <div className="absolute top-2 right-8 text-3xl opacity-40 select-none animate-bounce" style={{ animationDuration: '3s' }}>🌸</div>
      <div className="absolute bottom-3 right-20 text-xl opacity-30 select-none">🦋</div>
      <div className="absolute top-6 left-12 text-lg opacity-30 select-none">✿</div>
    </>
  ),
  ocean: (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20 select-none text-3xl overflow-hidden">〰️〰️〰️〰️〰️</div>
      <div className="absolute top-4 right-10 text-2xl opacity-40 select-none">🌊</div>
    </>
  ),
  sunset: (
    <>
      <div className="absolute top-4 right-10 text-4xl opacity-50 select-none">☀️</div>
      <div className="absolute bottom-2 left-8 text-xl opacity-20 select-none">✦</div>
      <div className="absolute top-2 left-20 text-sm opacity-20 select-none">✦</div>
    </>
  ),
  forest: (
    <>
      <div className="absolute top-3 right-8 text-3xl opacity-50 select-none">🍃</div>
      <div className="absolute bottom-2 right-20 text-xl opacity-40 select-none">🌿</div>
      <div className="absolute top-8 left-6 text-lg opacity-30 select-none">🌱</div>
    </>
  ),
  synthwave: (
    <>
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(219,39,119,0.3) 20px, rgba(219,39,119,0.3) 21px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(219,39,119,0.2) 30px, rgba(219,39,119,0.2) 31px)',
        }}
      />
      <div className="absolute top-4 right-8 text-2xl opacity-60 select-none">🎸</div>
    </>
  ),
  minimal: null,
  classic: (
    <div className="absolute top-4 right-6 opacity-10 select-none" style={{ fontSize: '80px', lineHeight: 1 }}>✦</div>
  ),
};

export function ProfileView({ profile, template, settings, onEdit, onUpdateProfile }: ProfileViewProps) {
  const posts = useCountUp(profile.postsCount, 100);
  const following = useCountUp(profile.followingCount, 300);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [template.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://profile.app/@${profile.username}`).catch(() => {});
    toast.success('Profile link copied!', { description: `@${profile.username}` });
  };

  const handleVerificationSuccess = (platform: PlatformKey, username: string) => {
    if (onUpdateProfile) {
      const newAccount = { platform, username, verified: true, followers: 0 };
      onUpdateProfile({
        ...profile,
        connectedAccounts: [...profile.connectedAccounts, newAccount],
        followerBreakdown: [...profile.followerBreakdown, { platform, count: 0 }],
      });
    }
    toast.success('Akun berhasil diverifikasi!', { description: `@${username}` });
  };

  // Get sub-interest chips for display
  const selectedSubInterests = profile.subInterests
    .flatMap(cat => cat.items.filter(i => i.selected).map(i => i.label));

  return (
    <>
      <motion.div
        key={template.id}
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ background: template.bodyBg }}
      >
        {/* Banner */}
        <div
          className="relative h-[120px] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: profile.bannerImage
              ? `linear-gradient(${template.headerAngle}deg, ${template.headerFrom}cc, ${template.headerTo}cc), url(${profile.bannerImage})`
              : `linear-gradient(${template.headerAngle}deg, ${template.headerFrom}, ${template.headerTo})`,
          }}
        >
          {TEMPLATE_DECORATIONS[template.id]}
        </div>

        {/* Avatar + Quick Actions row */}
        <div className="px-5 -mt-6 flex items-end justify-between relative z-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-4xl shadow-lg select-none"
            style={{
              background: profile.avatarBg,
              border: `4px solid ${template.avatarRing}`,
            }}
          >
            {profile.avatarEmoji}
          </motion.div>

          <div className="flex gap-2 pb-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={{
                borderColor: template.cardBorder,
                color: template.textPrimary,
                background: template.cardBg,
              }}
            >
              Edit Profile
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
              style={{
                borderColor: template.cardBorder,
                color: template.textSecondary,
                background: template.cardBg,
              }}
            >
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-5 mt-3"
        >
          <div className="flex items-center gap-1.5">
            <h1 className="truncate" style={{ color: template.textPrimary }}>{profile.name}</h1>
            {profile.isVerified && (
              <BadgeCheck size={20} style={{ color: template.accentColor }} className="shrink-0" />
            )}
          </div>
          <p className="text-sm mt-0.5" style={{ color: template.textSecondary }}>
            @{profile.username}
          </p>
          {profile.bio && (
            <p className="text-sm mt-3 leading-relaxed" style={{ color: template.textPrimary }}>
              {profile.bio}
            </p>
          )}

          {/* Location + Website */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {settings.showLocation && profile.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: template.textSecondary }} />
                <span className="text-xs" style={{ color: template.textSecondary }}>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1.5">
                <Globe size={13} style={{ color: template.accentColor }} />
                <span className="text-xs" style={{ color: template.accentColor }}>{profile.website}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats — with Follower Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-5 mt-5 rounded-2xl p-4"
          style={{
            background: template.cardBg,
            border: `1px solid ${template.cardBorder}`,
          }}
        >
          <div className="flex items-start divide-x" style={{ borderColor: `${template.cardBorder}` }}>
            <div className="flex-1 flex flex-col items-center gap-0.5">
              <span className="text-lg font-semibold" style={{ color: template.textPrimary }}>
                {formatCount(posts)}
              </span>
              <span className="text-xs" style={{ color: template.textSecondary }}>Posts</span>
            </div>

            {/* Follower breakdown — expandable */}
            <div className="flex-1">
              <FollowerBreakdown
                data={profile.followerBreakdown}
                total={profile.followersCount}
                template={template}
              />
            </div>

            <div className="flex-1 flex flex-col items-center gap-0.5">
              <span className="text-lg font-semibold" style={{ color: template.textPrimary }}>
                {formatCount(following)}
              </span>
              <span className="text-xs" style={{ color: template.textSecondary }}>Following</span>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        {settings.showInterests && profile.interests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="px-5 mt-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: template.textSecondary }}>
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ background: template.chipBg, color: template.chipText }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
            {/* Sub-interest chips */}
            {selectedSubInterests.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedSubInterests.map((sub, i) => (
                  <motion.span
                    key={sub}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                    style={{
                      background: `${template.accentColor}15`,
                      color: template.accentColor,
                      border: `1px solid ${template.accentColor}30`,
                    }}
                  >
                    {sub}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Connected Accounts — with verification status */}
        {settings.showSocial && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-5 mt-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: template.textSecondary }}>
                Akun Tersambung
              </p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVerification(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: template.accentColor, color: template.accentText }}
              >
                <Plus size={10} />
                Tambah
              </motion.button>
            </div>

            <div className="space-y-2">
              {profile.connectedAccounts.map((acc, i) => (
                <motion.div
                  key={acc.platform}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
                >
                  <PlatformBadge platform={acc.platform} size="sm" showLabel={false} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: template.textPrimary }}>
                      @{acc.username}
                    </p>
                    <p className="text-[10px]" style={{ color: template.textSecondary }}>
                      {formatCount(acc.followers)} followers
                    </p>
                  </div>
                  <VerifiedBadge
                    status={acc.verified ? 'verified' : 'unverified'}
                    size="sm"
                    onClick={acc.verified ? undefined : () => setShowVerification(true)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Template badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-5 mt-6 mb-8 flex items-center justify-center gap-2"
        >
          <div
            className="px-3 py-1 rounded-full text-xs flex items-center gap-1.5"
            style={{ background: template.chipBg, color: template.textSecondary }}
          >
            <span>{template.emoji}</span>
            <span>{template.name} Template</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerification && (
          <VerificationModal
            onClose={() => setShowVerification(false)}
            onSuccess={handleVerificationSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}
