export type PageType = 'home' | 'profile' | 'edit' | 'templates' | 'settings' | 'discover' | 'create-post';

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

export type PlatformKey = 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'twitter' | 'github';

export interface ConnectedAccount {
  platform: PlatformKey;
  username: string;
  verified: boolean;
  followers: number;
  displayName?: string;
}

export interface FollowerBreakdownItem {
  platform: PlatformKey;
  count: number;
}

export interface FeedContent {
  id: string;
  platform: PlatformKey;
  username: string;
  displayName: string;
  avatarEmoji: string;
  avatarBg: string;
  thumbnail: string;
  caption: string;
  interests: string[];
  timestamp: string;
  likes: number;
  comments: number;
}

export interface RecommendedUser {
  id: number;
  name: string;
  username: string;
  avatarEmoji: string;
  avatarBg: string;
  platforms: ConnectedAccount[];
  interests: string[];
  bio: string;
}

export interface SubInterestItem {
  label: string;
  selected: boolean;
}

export interface SubInterestCategory {
  category: string;
  emoji: string;
  items: SubInterestItem[];
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
  connectedAccounts: ConnectedAccount[];
  followerBreakdown: FollowerBreakdownItem[];
  subInterests: SubInterestCategory[];
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

export const PLATFORM_COLORS: Record<PlatformKey, string> = {
  instagram: '#E1306C',
  tiktok: '#00F2EA',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
  github: '#333333',
};

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  twitter: 'Twitter / X',
  github: 'GitHub',
};

export const SOCIAL_PLATFORMS = [
  { key: 'instagram' as keyof SocialLinks, label: 'Instagram', prefix: 'instagram.com/', color: '#E1306C' },
  { key: 'twitter' as keyof SocialLinks, label: 'Twitter / X', prefix: 'x.com/', color: '#1DA1F2' },
  { key: 'tiktok' as keyof SocialLinks, label: 'TikTok', prefix: 'tiktok.com/@', color: '#000000' },
  { key: 'youtube' as keyof SocialLinks, label: 'YouTube', prefix: 'youtube.com/', color: '#FF0000' },
  { key: 'linkedin' as keyof SocialLinks, label: 'LinkedIn', prefix: 'linkedin.com/in/', color: '#0077B5' },
  { key: 'github' as keyof SocialLinks, label: 'GitHub', prefix: 'github.com/', color: '#333333' },
];

// ── Sub-Interest Categories ──
export const DEFAULT_SUB_INTERESTS: SubInterestCategory[] = [
  {
    category: 'Coding',
    emoji: '🖥️',
    items: [
      { label: 'JavaScript', selected: true },
      { label: 'Python', selected: true },
      { label: 'Java', selected: false },
      { label: 'Rust', selected: false },
      { label: 'TypeScript', selected: true },
      { label: 'Go', selected: false },
    ],
  },
  {
    category: 'Design',
    emoji: '🎯',
    items: [
      { label: 'UI/UX', selected: true },
      { label: '3D Modeling', selected: false },
      { label: 'Graphic Design', selected: false },
      { label: 'Motion Design', selected: true },
    ],
  },
  {
    category: 'Gaming',
    emoji: '🎮',
    items: [
      { label: 'RPG', selected: false },
      { label: 'FPS', selected: false },
      { label: 'MOBA', selected: true },
      { label: 'Indie Games', selected: true },
    ],
  },
  {
    category: 'Music',
    emoji: '🎵',
    items: [
      { label: 'Pop', selected: false },
      { label: 'Lo-fi', selected: true },
      { label: 'Rock', selected: false },
      { label: 'K-Pop', selected: true },
      { label: 'Jazz', selected: false },
    ],
  },
];

// ── Default Profile ──
export const DEFAULT_PROFILE: UserProfile = {
  name: 'Said Nurdiansyah',
  username: 'saidnurdiansyah',
  bio: 'Creative developer & digital explorer ✨ Building at the intersection of code and design.',
  bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  avatarEmoji: '🤩',
  avatarBg: '#6366f1',
  location: 'Jakarta, Indonesia',
  website: 'saidnurdiansyah.dev',
  interests: ['🖥️ Coding', '🎯 Design', '🎵 Music', '🎮 Gaming'],
  socialLinks: {
    instagram: 'said.gram',
    twitter: 'saiddev',
    tiktok: 'saidtok',
    youtube: '',
    linkedin: 'said-nurdiansyah',
    github: 'saidnurdiansyah',
  },
  followersCount: 1248,
  followingCount: 389,
  postsCount: 47,
  templateId: 'neon',
  isVerified: true,
  connectedAccounts: [
    { platform: 'instagram', username: 'said.gram', verified: true, followers: 850, displayName: 'Said N.' },
    { platform: 'tiktok', username: 'saidtok', verified: true, followers: 220, displayName: 'Said Creative' },
    { platform: 'linkedin', username: 'said-nurdiansyah', verified: false, followers: 128, displayName: 'Said Nurdiansyah' },
    { platform: 'github', username: 'saidnurdiansyah', verified: true, followers: 50, displayName: 'saidnurdiansyah' },
  ],
  followerBreakdown: [
    { platform: 'instagram', count: 850 },
    { platform: 'tiktok', count: 220 },
    { platform: 'linkedin', count: 128 },
    { platform: 'github', count: 50 },
  ],
  subInterests: DEFAULT_SUB_INTERESTS,
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

// ── Mock Feed Data ──
export const MOCK_FEED_DATA: FeedContent[] = [
  {
    id: 'f1',
    platform: 'instagram',
    username: 'alya.codes',
    displayName: 'Alya Putri',
    avatarEmoji: '👩🏻‍💻',
    avatarBg: '#ec4899',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    caption: 'Finally shipped my new portfolio! Built with Next.js + Framer Motion. Check it out 🚀',
    interests: ['🖥️ Coding', '🎯 Design'],
    timestamp: '2 jam lalu',
    likes: 234,
    comments: 18,
  },
  {
    id: 'f2',
    platform: 'tiktok',
    username: 'budi.creative',
    displayName: 'Budi Santoso',
    avatarEmoji: '🎨',
    avatarBg: '#3b82f6',
    thumbnail: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Tutorial UI design dalam 60 detik! Watch sampai habis 🎨✨ #uidesign #figma',
    interests: ['🎯 Design', '🖥️ Coding'],
    timestamp: '4 jam lalu',
    likes: 1520,
    comments: 89,
  },
  {
    id: 'f3',
    platform: 'linkedin',
    username: 'rina-wijaya',
    displayName: 'Rina Wijaya',
    avatarEmoji: '💼',
    avatarBg: '#0ea5e9',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    caption: 'Excited to share — just got promoted to Senior Product Designer at Tokopedia! Grateful for the journey 🙏',
    interests: ['🎯 Design'],
    timestamp: '6 jam lalu',
    likes: 456,
    comments: 32,
  },
  {
    id: 'f4',
    platform: 'instagram',
    username: 'dimas.gamedev',
    displayName: 'Dimas Prasetyo',
    avatarEmoji: '🎮',
    avatarBg: '#10b981',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Work in progress — my first indie game using Unity! Character design phase 🎮🔥',
    interests: ['🎮 Gaming', '🖥️ Coding'],
    timestamp: '8 jam lalu',
    likes: 389,
    comments: 45,
  },
  {
    id: 'f5',
    platform: 'tiktok',
    username: 'maya.lofi',
    displayName: 'Maya Sari',
    avatarEmoji: '🎵',
    avatarBg: '#8b5cf6',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    caption: 'Making lo-fi beats for your coding session 🎧☕ Link in bio!',
    interests: ['🎵 Music', '🖥️ Coding'],
    timestamp: '12 jam lalu',
    likes: 892,
    comments: 67,
  },
  {
    id: 'f6',
    platform: 'github',
    username: 'fajar-dev',
    displayName: 'Fajar Rahman',
    avatarEmoji: '💻',
    avatarBg: '#f59e0b',
    thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop',
    caption: 'Just open-sourced my React component library! 500+ components, fully typed. Give it a ⭐',
    interests: ['🖥️ Coding'],
    timestamp: '1 hari lalu',
    likes: 723,
    comments: 54,
  },
];

// ── Mock Recommended Users ──
export const MOCK_RECOMMENDED_USERS: RecommendedUser[] = [
  {
    id: 1,
    name: 'Alya Putri',
    username: 'alya.codes',
    avatarEmoji: '👩🏻‍💻',
    avatarBg: '#ec4899',
    platforms: [
      { platform: 'instagram', username: 'alya.codes', verified: true, followers: 5200 },
      { platform: 'github', username: 'alyaputri', verified: true, followers: 890 },
    ],
    interests: ['🖥️ Coding', '🎯 Design'],
    bio: 'Frontend dev | React enthusiast',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    username: 'budi.creative',
    avatarEmoji: '🎨',
    avatarBg: '#3b82f6',
    platforms: [
      { platform: 'tiktok', username: 'budi.creative', verified: true, followers: 12400 },
      { platform: 'instagram', username: 'budidesigns', verified: true, followers: 3800 },
      { platform: 'linkedin', username: 'budi-santoso', verified: false, followers: 520 },
    ],
    interests: ['🎯 Design', '🖥️ Coding'],
    bio: 'UI/UX Designer | Content Creator',
  },
  {
    id: 3,
    name: 'Rina Wijaya',
    username: 'rina.wijaya',
    avatarEmoji: '💼',
    avatarBg: '#0ea5e9',
    platforms: [
      { platform: 'linkedin', username: 'rina-wijaya', verified: true, followers: 2100 },
      { platform: 'twitter', username: 'rinawijaya', verified: true, followers: 1800 },
    ],
    interests: ['🎯 Design', '🖥️ Coding'],
    bio: 'Senior Product Designer @Tokopedia',
  },
  {
    id: 4,
    name: 'Dimas Prasetyo',
    username: 'dimas.gamedev',
    avatarEmoji: '🎮',
    avatarBg: '#10b981',
    platforms: [
      { platform: 'instagram', username: 'dimas.gamedev', verified: true, followers: 4200 },
      { platform: 'tiktok', username: 'dimasgames', verified: true, followers: 8900 },
      { platform: 'youtube', username: 'DimasGameDev', verified: false, followers: 15000 },
    ],
    interests: ['🎮 Gaming', '🖥️ Coding'],
    bio: 'Indie game developer | Unity & Godot',
  },
  {
    id: 5,
    name: 'Maya Sari',
    username: 'maya.lofi',
    avatarEmoji: '🎵',
    avatarBg: '#8b5cf6',
    platforms: [
      { platform: 'tiktok', username: 'maya.lofi', verified: true, followers: 25000 },
      { platform: 'youtube', username: 'MayaLofiBeats', verified: true, followers: 18000 },
      { platform: 'instagram', username: 'mayasari.music', verified: false, followers: 6700 },
    ],
    interests: ['🎵 Music', '🖥️ Coding'],
    bio: 'Lo-fi producer | Coding music 🎧',
  },
  {
    id: 6,
    name: 'Fajar Rahman',
    username: 'fajar-dev',
    avatarEmoji: '💻',
    avatarBg: '#f59e0b',
    platforms: [
      { platform: 'github', username: 'fajar-dev', verified: true, followers: 3400 },
      { platform: 'twitter', username: 'fajardev', verified: true, followers: 2200 },
    ],
    interests: ['🖥️ Coding'],
    bio: 'Open source maintainer | TypeScript',
  },
  {
    id: 7,
    name: 'Siti Handayani',
    username: 'siti.designs',
    avatarEmoji: '✨',
    avatarBg: '#f43f5e',
    platforms: [
      { platform: 'instagram', username: 'siti.designs', verified: true, followers: 9800 },
      { platform: 'tiktok', username: 'sitihandayani', verified: true, followers: 14200 },
    ],
    interests: ['🎯 Design', '🎵 Music'],
    bio: 'Motion designer | After Effects wizard',
  },
  {
    id: 8,
    name: 'Andi Kurniawan',
    username: 'andi.gaming',
    avatarEmoji: '🕹️',
    avatarBg: '#06b6d4',
    platforms: [
      { platform: 'youtube', username: 'AndiGaming', verified: true, followers: 32000 },
      { platform: 'tiktok', username: 'andi.gaming', verified: true, followers: 21000 },
    ],
    interests: ['🎮 Gaming'],
    bio: 'Pro gamer | Esports commentator',
  },
];

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
