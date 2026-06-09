export type PageType = 'profile' | 'edit' | 'templates' | 'settings' | 'connect';

export interface Template {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  headerFrom: string;
  headerTo: string;
  headerAngle: number;
  avatarRing: string;
  bodyBg: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  accentText: string;
  chipBg: string;
  chipText: string;
  buttonBg: string;
  buttonText: string;
  navBg: string;
  navActive: string;
  navInactive: string;
  isDark: boolean;
}

export interface SocialLinks {
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  github: string;
}

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  bannerImage?: string;
  avatarEmoji: string;
  avatarBg: string;
  location: string;
  website: string;
  interests: string[];
  socialLinks: SocialLinks;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  templateId: string;
  isVerified: boolean;
}

export interface AppSettings {
  publicProfile: boolean;
  showLocation: boolean;
  showInterests: boolean;
  showSocial: boolean;
  notifyLikes: boolean;
  notifyComments: boolean;
  notifyFollowers: boolean;
}

export const AVATAR_EMOJIS = [
  '😊', '😎', '🤩', '😄', '🥳', '😍', '🤗', '😺',
  '🦊', '🐱', '🐻', '🐼', '🦁', '🐸', '🦋', '🌟',
  '🎭', '🎨', '🎮', '🎵', '🏆', '💎', '🌸', '🔥',
];

export const AVATAR_COLORS = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#8b5cf6', '#ef4444', '#0ea5e9',
  '#f97316', '#14b8a6', '#a855f7', '#84cc16',
];

export const INTEREST_OPTIONS = [
  '🎮 Gaming', '🎵 Music', '🎨 Art', '📸 Photography', '✈️ Travel',
  '💪 Fitness', '🍳 Cooking', '📚 Books', '🎬 Movies', '💻 Tech',
  '👗 Fashion', '⚽ Sports', '🌿 Nature', '💃 Dance', '🍕 Food',
  '🎯 Design', '🖥️ Coding', '🔬 Science', '🎌 Anime', '🎤 K-Pop',
  '🎸 Guitar', '🧩 Puzzles', '🌍 Culture', '🏄 Surfing',
];

export const SOCIAL_PLATFORMS = [
  { key: 'instagram' as keyof SocialLinks, label: 'Instagram', prefix: 'instagram.com/', color: '#E1306C' },
  { key: 'twitter' as keyof SocialLinks, label: 'Twitter / X', prefix: 'x.com/', color: '#1DA1F2' },
  { key: 'tiktok' as keyof SocialLinks, label: 'TikTok', prefix: 'tiktok.com/@', color: '#000000' },
  { key: 'youtube' as keyof SocialLinks, label: 'YouTube', prefix: 'youtube.com/', color: '#FF0000' },
  { key: 'linkedin' as keyof SocialLinks, label: 'LinkedIn', prefix: 'linkedin.com/in/', color: '#0077B5' },
  { key: 'github' as keyof SocialLinks, label: 'GitHub', prefix: 'github.com/', color: '#333333' },
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  username: 'alexrivera',
  bio: 'Creative soul & digital explorer ✨ Turning ideas into reality, one pixel at a time.',
  bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  avatarEmoji: '🤩',
  avatarBg: '#6366f1',
  location: 'Jakarta, Indonesia',
  website: 'alexrivera.me',
  interests: ['💻 Coding', '🎨 Art', '🎵 Music', '✈️ Travel'],
  socialLinks: {
    instagram: 'alexrivera',
    twitter: 'alexrivera',
    tiktok: '',
    youtube: '',
    linkedin: 'alex-rivera',
    github: 'alexrivera',
  },
  followersCount: 1248,
  followingCount: 389,
  postsCount: 47,
  templateId: 'classic',
  isVerified: false,
};

export const DEFAULT_SETTINGS: AppSettings = {
  publicProfile: true,
  showLocation: true,
  showInterests: true,
  showSocial: true,
  notifyLikes: true,
  notifyComments: true,
  notifyFollowers: false,
};

export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'Clean & Professional',
    emoji: '✨',
    headerFrom: '#334155',
    headerTo: '#0f172a',
    headerAngle: 135,
    avatarRing: '#ffffff',
    bodyBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    accentColor: '#3b82f6',
    accentText: '#ffffff',
    chipBg: '#e2e8f0',
    chipText: '#334155',
    buttonBg: '#0f172a',
    buttonText: '#ffffff',
    navBg: '#ffffff',
    navActive: '#3b82f6',
    navInactive: '#94a3b8',
    isDark: false,
  },
  {
    id: 'neon',
    name: 'Neon Nights',
    tagline: 'Dark & Electric',
    emoji: '⚡',
    headerFrom: '#7c3aed',
    headerTo: '#0a0a1a',
    headerAngle: 135,
    avatarRing: '#a855f7',
    bodyBg: '#0a0a1a',
    cardBg: '#111128',
    cardBorder: '#7c3aed44',
    textPrimary: '#f5f3ff',
    textSecondary: '#a78bfa',
    accentColor: '#a855f7',
    accentText: '#ffffff',
    chipBg: '#1e1e3a',
    chipText: '#c4b5fd',
    buttonBg: '#7c3aed',
    buttonText: '#ffffff',
    navBg: '#0f0f22',
    navActive: '#a855f7',
    navInactive: '#4c4c7a',
    isDark: true,
  },
  {
    id: 'pastel',
    name: 'Pastel Dream',
    tagline: 'Soft & Dreamy',
    emoji: '🌸',
    headerFrom: '#f9a8d4',
    headerTo: '#c4b5fd',
    headerAngle: 135,
    avatarRing: '#ffffff',
    bodyBg: '#fdf4ff',
    cardBg: '#fff0fb',
    cardBorder: '#f5d0fe',
    textPrimary: '#6b21a8',
    textSecondary: '#a21caf',
    accentColor: '#ec4899',
    accentText: '#ffffff',
    chipBg: '#fce7f3',
    chipText: '#9d174d',
    buttonBg: '#ec4899',
    buttonText: '#ffffff',
    navBg: '#fdf4ff',
    navActive: '#ec4899',
    navInactive: '#d8b4fe',
    isDark: false,
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    tagline: 'Calm & Flowing',
    emoji: '🌊',
    headerFrom: '#0891b2',
    headerTo: '#164e63',
    headerAngle: 180,
    avatarRing: '#67e8f9',
    bodyBg: '#ecfeff',
    cardBg: '#f0fdff',
    cardBorder: '#a5f3fc',
    textPrimary: '#164e63',
    textSecondary: '#0e7490',
    accentColor: '#06b6d4',
    accentText: '#ffffff',
    chipBg: '#cffafe',
    chipText: '#155e75',
    buttonBg: '#0e7490',
    buttonText: '#ffffff',
    navBg: '#f0fdff',
    navActive: '#06b6d4',
    navInactive: '#a5f3fc',
    isDark: false,
  },
  {
    id: 'sunset',
    name: 'Golden Hour',
    tagline: 'Warm & Vibrant',
    emoji: '🌅',
    headerFrom: '#f59e0b',
    headerTo: '#dc2626',
    headerAngle: 135,
    avatarRing: '#fef3c7',
    bodyBg: '#fffbeb',
    cardBg: '#fff7ed',
    cardBorder: '#fed7aa',
    textPrimary: '#78350f',
    textSecondary: '#92400e',
    accentColor: '#f59e0b',
    accentText: '#ffffff',
    chipBg: '#fef3c7',
    chipText: '#78350f',
    buttonBg: '#d97706',
    buttonText: '#ffffff',
    navBg: '#fff7ed',
    navActive: '#f59e0b',
    navInactive: '#fcd34d',
    isDark: false,
  },
  {
    id: 'forest',
    name: 'Forest Spirit',
    tagline: 'Natural & Fresh',
    emoji: '🌿',
    headerFrom: '#059669',
    headerTo: '#022c22',
    headerAngle: 135,
    avatarRing: '#6ee7b7',
    bodyBg: '#f0fdf4',
    cardBg: '#f0fdf4',
    cardBorder: '#a7f3d0',
    textPrimary: '#064e3b',
    textSecondary: '#065f46',
    accentColor: '#059669',
    accentText: '#ffffff',
    chipBg: '#d1fae5',
    chipText: '#064e3b',
    buttonBg: '#065f46',
    buttonText: '#ffffff',
    navBg: '#f0fdf4',
    navActive: '#059669',
    navInactive: '#6ee7b7',
    isDark: false,
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    tagline: 'Retro & Bold',
    emoji: '🎸',
    headerFrom: '#db2777',
    headerTo: '#4c1d95',
    headerAngle: 135,
    avatarRing: '#f9a8d4',
    bodyBg: '#1a1028',
    cardBg: '#1e1535',
    cardBorder: '#db277733',
    textPrimary: '#fce7f3',
    textSecondary: '#f9a8d4',
    accentColor: '#db2777',
    accentText: '#ffffff',
    chipBg: '#2d1b4a',
    chipText: '#f9a8d4',
    buttonBg: '#db2777',
    buttonText: '#ffffff',
    navBg: '#120b20',
    navActive: '#db2777',
    navInactive: '#6b21a8',
    isDark: true,
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    tagline: 'Pure & Simple',
    emoji: '◻️',
    headerFrom: '#111827',
    headerTo: '#000000',
    headerAngle: 180,
    avatarRing: '#e5e7eb',
    bodyBg: '#f9fafb',
    cardBg: '#ffffff',
    cardBorder: '#e5e7eb',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    accentColor: '#111827',
    accentText: '#ffffff',
    chipBg: '#f3f4f6',
    chipText: '#374151',
    buttonBg: '#111827',
    buttonText: '#ffffff',
    navBg: '#ffffff',
    navActive: '#111827',
    navInactive: '#9ca3af',
    isDark: false,
  },
];
