import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, MapPin, Globe, User, FileText, AtSign, X } from 'lucide-react';
import type { UserProfile } from './types';
import { AVATAR_EMOJIS, AVATAR_COLORS, INTEREST_OPTIONS, SOCIAL_PLATFORMS } from './types';

// Social icons for the edit form
const SOCIAL_ICON_CHARS: Record<string, string> = {
  instagram: 'IG',
  twitter: 'X',
  tiktok: 'TT',
  youtube: 'YT',
  linkedin: 'LI',
  github: 'GH',
};

interface EditProfileProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

export function EditProfile({ profile, onSave, onCancel }: EditProfileProps) {
  const [draft, setDraft] = useState<UserProfile>({ ...profile });
  const [activeSection, setActiveSection] = useState<'avatar' | 'info' | 'interests' | 'social'>('avatar');
  const [hasChanges, setHasChanges] = useState(false);

  const update = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const updateSocial = (key: keyof UserProfile['socialLinks'], value: string) => {
    setDraft(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
    setHasChanges(true);
  };

  const toggleInterest = (interest: string) => {
    const has = draft.interests.includes(interest);
    update('interests', has
      ? draft.interests.filter(i => i !== interest)
      : [...draft.interests, interest]
    );
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Discard changes?')) onCancel();
    } else {
      onCancel();
    }
  };

  const SECTIONS = [
    { id: 'avatar' as const, label: 'Avatar', icon: '🎨' },
    { id: 'info' as const, label: 'Info', icon: '👤' },
    { id: 'interests' as const, label: 'Interests', icon: '⭐' },
    { id: 'social' as const, label: 'Social', icon: '🔗' },
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <button
          onClick={handleCancel}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h2 className="text-base" style={{ color: '#0f172a' }}>Edit Profile</h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSave(draft)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-white"
          style={{ background: '#6366f1' }}
        >
          <Check size={14} />
          Save
        </motion.button>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide shrink-0">
        {SECTIONS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className="flex-1 min-w-[72px] flex flex-col items-center gap-0.5 py-2.5 text-xs transition-colors relative"
            style={{ color: activeSection === id ? '#6366f1' : '#94a3b8' }}
          >
            <span className="text-base">{icon}</span>
            <span className="font-medium">{label}</span>
            {activeSection === id && (
              <motion.div
                layoutId="edit-tab"
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                style={{ background: '#6366f1' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* AVATAR SECTION */}
        {activeSection === 'avatar' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5"
          >
            {/* Preview */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-md mb-2"
                style={{ background: draft.avatarBg, border: '4px solid #e2e8f0' }}
              >
                {draft.avatarEmoji}
              </div>
              <p className="text-xs text-gray-500">Tap an emoji and color below</p>
            </div>

            {/* Emoji Grid */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Choose Emoji</p>
            <div className="grid grid-cols-8 gap-2 mb-6">
              {AVATAR_EMOJIS.map(emoji => (
                <motion.button
                  key={emoji}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => update('avatarEmoji', emoji)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all"
                  style={{
                    background: draft.avatarEmoji === emoji ? '#e0e7ff' : '#f3f4f6',
                    border: draft.avatarEmoji === emoji ? '2px solid #6366f1' : '2px solid transparent',
                  }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>

            {/* Color Grid */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Background Color</p>
            <div className="flex flex-wrap gap-3">
              {AVATAR_COLORS.map(color => (
                <motion.button
                  key={color}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => update('avatarBg', color)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform"
                  style={{ background: color, border: draft.avatarBg === color ? '3px solid white' : '3px solid transparent', boxShadow: draft.avatarBg === color ? `0 0 0 2px ${color}` : 'none' }}
                >
                  {draft.avatarBg === color && <Check size={16} className="text-white" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* INFO SECTION */}
        {activeSection === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 space-y-4"
          >
            <Field
              label="Name"
              icon={<User size={14} />}
              value={draft.name}
              onChange={v => update('name', v)}
              placeholder="Your display name"
              maxLength={40}
            />
            <Field
              label="Username"
              icon={<AtSign size={14} />}
              value={draft.username}
              onChange={v => update('username', v.replace(/[^a-zA-Z0-9_.]/g, ''))}
              placeholder="username"
              prefix="@"
              maxLength={30}
            />
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={14} />
                Bio
              </label>
              <textarea
                value={draft.bio}
                onChange={e => update('bio', e.target.value)}
                maxLength={150}
                rows={3}
                placeholder="Tell the world about you..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 resize-none focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
              />
              <p className="text-xs text-gray-400 text-right mt-1">{draft.bio.length}/150</p>
            </div>
            <Field
              label="Location"
              icon={<MapPin size={14} />}
              value={draft.location}
              onChange={v => update('location', v)}
              placeholder="City, Country"
              maxLength={50}
            />
            <Field
              label="Website"
              icon={<Globe size={14} />}
              value={draft.website}
              onChange={v => update('website', v)}
              placeholder="yourwebsite.com"
              maxLength={80}
            />
          </motion.div>
        )}

        {/* INTERESTS SECTION */}
        {activeSection === 'interests' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5"
          >
            <p className="text-sm text-gray-500 mb-4">
              Select up to 8 interests to show on your profile.
            </p>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => {
                const selected = draft.interests.includes(interest);
                const tooMany = draft.interests.length >= 8 && !selected;
                return (
                  <motion.button
                    key={interest}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => !tooMany && toggleInterest(interest)}
                    className="px-3 py-1.5 rounded-full text-sm transition-all"
                    style={{
                      background: selected ? '#6366f1' : '#f3f4f6',
                      color: selected ? '#ffffff' : tooMany ? '#d1d5db' : '#374151',
                      border: selected ? 'none' : '1px solid #e5e7eb',
                      opacity: tooMany ? 0.5 : 1,
                    }}
                  >
                    {interest}
                  </motion.button>
                );
              })}
            </div>
            {draft.interests.length > 0 && (
              <p className="text-xs text-indigo-600 mt-4 text-center">
                {draft.interests.length}/8 selected
              </p>
            )}
          </motion.div>
        )}

        {/* SOCIAL SECTION */}
        {activeSection === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 space-y-4"
          >
            <p className="text-sm text-gray-500">
              Add your social handles — just your username, no full URL needed.
            </p>
            {SOCIAL_PLATFORMS.map(({ key, label, color }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: color }}
                  >
                    {SOCIAL_ICON_CHARS[key]}
                  </div>
                  <input
                    type="text"
                    value={draft.socialLinks[key]}
                    onChange={e => updateSocial(key, e.target.value)}
                    placeholder={`${label} username`}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                  />
                  {draft.socialLinks[key] && (
                    <button
                      onClick={() => updateSocial(key, '')}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Field({
  label, icon, value, onChange, placeholder, prefix, maxLength,
}: {
  label: string;
  icon?: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-400 text-sm select-none">{prefix}</span>
        )}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
          style={{ paddingLeft: prefix ? '1.75rem' : undefined }}
        />
      </div>
    </div>
  );
}
