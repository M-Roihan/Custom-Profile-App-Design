import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock, Bell, LogOut, ChevronRight, Eye, EyeOff,
  MapPin, Heart, Share2, ThumbsUp, MessageCircle, UserPlus,
  Link2, Check, Unlink,
} from 'lucide-react';
import { toast } from 'sonner';
import { PlatformIcon } from './shared/PlatformBadge';
import type { AppSettings, UserProfile, Template, PlatformKey } from './types';
import { PLATFORM_COLORS, PLATFORM_LABELS } from './types';

interface SettingsPageProps {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
  profile: UserProfile;
  template: Template;
}

function Toggle({ value, onChange, color }: { value: boolean; onChange: (v: boolean) => void; color: string }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0"
      style={{ background: value ? color : '#e5e7eb' }}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}

function SettingRow({
  icon, label, description, value, onChange, accentColor,
}: {
  icon: ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  accentColor: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium" style={{ color: '#1f2937' }}>{label}</p>
          {description && <p className="text-xs text-gray-400 truncate">{description}</p>}
        </div>
      </div>
      <Toggle value={value} onChange={onChange} color={accentColor} />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-1">
      {title}
    </p>
  );
}

const ALL_PLATFORMS: PlatformKey[] = ['instagram', 'tiktok', 'linkedin', 'youtube', 'twitter', 'github'];

export function SettingsPage({ settings, onUpdate, profile, template }: SettingsPageProps) {
  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    onUpdate({ ...settings, [key]: value });
  };

  const accentColor = template.accentColor;

  // Determine which platforms are connected
  const connectedPlatforms = new Set(profile.connectedAccounts.map(a => a.platform));

  const handleConnectAll = () => {
    toast.success('Menghubungkan semua akun...', { description: 'Flow OAuth dimulai untuk semua platform' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full overflow-y-auto scrollbar-hide"
      style={{ background: template.bodyBg }}
    >
      {/* Profile Summary Card */}
      <div
        className="mx-4 mt-5 p-4 rounded-2xl flex items-center gap-3"
        style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
          style={{ background: profile.avatarBg, border: `3px solid ${template.avatarRing}` }}
        >
          {profile.avatarEmoji}
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate" style={{ color: template.textPrimary }}>{profile.name}</p>
          <p className="text-sm" style={{ color: template.textSecondary }}>@{profile.username}</p>
          <div
            className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs"
            style={{ background: settings.publicProfile ? `${accentColor}18` : '#f3f4f6', color: settings.publicProfile ? accentColor : '#9ca3af' }}
          >
            {settings.publicProfile ? <Eye size={10} /> : <EyeOff size={10} />}
            {settings.publicProfile ? 'Public' : 'Private'}
          </div>
        </div>
        <div className="ml-auto shrink-0">
          <ChevronRight size={16} style={{ color: template.textSecondary }} />
        </div>
      </div>

      <div className="px-4 pb-28">
        {/* ── SSO Dashboard ── */}
        <SectionHeader title="Akun Tersambung (SSO)" />
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
        >
          {ALL_PLATFORMS.map((platform) => {
            const isConnected = connectedPlatforms.has(platform);
            const account = profile.connectedAccounts.find(a => a.platform === platform);
            return (
              <div
                key={platform}
                className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
                style={{ borderColor: template.cardBorder }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${PLATFORM_COLORS[platform]}15` }}
                >
                  <PlatformIcon platform={platform} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: template.textPrimary }}>
                    {PLATFORM_LABELS[platform]}
                  </p>
                  {isConnected && account && (
                    <p className="text-[10px]" style={{ color: template.textSecondary }}>
                      @{account.username}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {isConnected ? (
                    <span
                      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: '#10b98120', color: '#10b981' }}
                    >
                      <Check size={10} />
                      Terhubung
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: '#f3f4f6', color: '#9ca3af' }}
                    >
                      <Unlink size={10} />
                      Belum
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Connect All Button */}
          <div className="px-4 py-3" style={{ borderTop: `1px solid ${template.cardBorder}` }}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConnectAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: accentColor, color: template.accentText }}
            >
              <Link2 size={14} />
              Hubungkan Semua Akun
            </motion.button>
          </div>
        </div>

        {/* Privacy Settings */}
        <SectionHeader title="Privacy" />
        <div
          className="rounded-2xl px-4 divide-y"
          style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
        >
          <SettingRow
            icon={<Eye size={15} />}
            label="Public Profile"
            description="Anyone can view your profile"
            value={settings.publicProfile}
            onChange={v => update('publicProfile', v)}
            accentColor={accentColor}
          />
          <SettingRow
            icon={<MapPin size={15} />}
            label="Show Location"
            description="Display your city on profile"
            value={settings.showLocation}
            onChange={v => update('showLocation', v)}
            accentColor={accentColor}
          />
          <SettingRow
            icon={<Heart size={15} />}
            label="Show Interests"
            description="Display your interest tags"
            value={settings.showInterests}
            onChange={v => update('showInterests', v)}
            accentColor={accentColor}
          />
          <SettingRow
            icon={<Share2 size={15} />}
            label="Show Social Links"
            description="Display your social media"
            value={settings.showSocial}
            onChange={v => update('showSocial', v)}
            accentColor={accentColor}
          />
        </div>

        {/* Notification Settings */}
        <SectionHeader title="Notifications" />
        <div
          className="rounded-2xl px-4 divide-y"
          style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
        >
          <SettingRow
            icon={<ThumbsUp size={15} />}
            label="Likes"
            description="When someone likes your post"
            value={settings.notifyLikes}
            onChange={v => update('notifyLikes', v)}
            accentColor={accentColor}
          />
          <SettingRow
            icon={<MessageCircle size={15} />}
            label="Comments"
            description="When someone comments"
            value={settings.notifyComments}
            onChange={v => update('notifyComments', v)}
            accentColor={accentColor}
          />
          <SettingRow
            icon={<UserPlus size={15} />}
            label="New Followers"
            description="When someone follows you"
            value={settings.notifyFollowers}
            onChange={v => update('notifyFollowers', v)}
            accentColor={accentColor}
          />
        </div>

        {/* Account */}
        <SectionHeader title="Account" />
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: template.cardBg, border: `1px solid ${template.cardBorder}` }}
        >
          {[
            { label: 'Change Password', icon: <Lock size={15} /> },
            { label: 'Notification Settings', icon: <Bell size={15} /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => toast('Coming soon', { description: `${label} will be available soon.` })}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:opacity-80 border-b last:border-b-0"
              style={{ borderColor: template.cardBorder }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${accentColor}18`, color: accentColor }}
              >
                {icon}
              </div>
              <span className="text-sm font-medium flex-1" style={{ color: template.textPrimary }}>{label}</span>
              <ChevronRight size={16} style={{ color: template.textSecondary }} />
            </button>
          ))}
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => toast.error('Logged out', { description: 'See you next time!' })}
          className="w-full mt-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium"
          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
        >
          <LogOut size={16} />
          Log Out
        </motion.button>

        <p className="text-center text-xs text-gray-400 mt-6">
          CustomProfile v2.0 · Made with ♥
        </p>
      </div>
    </motion.div>
  );
}
