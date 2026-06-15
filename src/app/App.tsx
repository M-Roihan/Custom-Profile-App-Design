import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { ProfileView } from './components/ProfileView';
import { EditProfile } from './components/EditProfile';
import { TemplateSelector } from './components/TemplateSelector';
import { SettingsPage } from './components/SettingsPage';
import { HomePage } from './components/HomePage';
import { DiscoverPage } from './components/DiscoverPage';
import { BottomNav } from './components/BottomNav';
import { CreatePostModal } from './components/shared/CreatePostModal';
import {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  TEMPLATES,
  type UserProfile,
  type AppSettings,
  type PageType,
} from './components/types';

export default function App() {
  const [page, setPage] = useState<PageType>('home');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const currentTemplate = TEMPLATES.find(t => t.id === profile.templateId) ?? TEMPLATES[0];

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    toast.success('Profile saved!', { description: 'Your changes are live.' });
    setPage('profile');
  };

  const handleSelectTemplate = (templateId: string) => {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    setProfile(prev => ({ ...prev, templateId }));
    toast.success(`Template applied!`, { description: tpl ? `${tpl.emoji} ${tpl.name}` : '' });
    setPage('profile');
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  const showBottomNav = page === 'home' || page === 'profile' || page === 'settings' || page === 'discover';

  return (
    <div className="size-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea22, #764ba222), #f1f5f9' }}>
      <Toaster position="top-center" richColors />

      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: '100%',
          maxWidth: '390px',
          height: '100%',
          maxHeight: '844px',
          borderRadius: '36px',
          background: currentTemplate.bodyBg,
        }}
      >
        {/* Status Bar (decorative) */}
        <div
          className="flex items-center justify-between px-6 pt-2 pb-1 text-[10px] shrink-0 z-10"
          style={{
            color: currentTemplate.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)',
            background: currentTemplate.isDark
              ? `${currentTemplate.headerTo}cc`
              : `${currentTemplate.bodyBg}cc`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" opacity={0.7}>
              <rect x="0" y="4" width="3" height="7" rx="0.5" />
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.5" />
              <rect x="9" y="0.5" width="3" height="10.5" rx="0.5" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" opacity={0.3} />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" opacity={0.7}>
              <path d="M8 2.4C5.4 2.4 3.1 3.5 1.4 5.3L0 3.9C2.1 1.5 5 0 8 0s5.9 1.5 8 3.9L14.6 5.3C12.9 3.5 10.6 2.4 8 2.4z"/>
              <path d="M8 5.6c-1.6 0-3 .7-4 1.8L2.6 6C3.9 4.5 5.8 3.6 8 3.6s4.1.9 5.4 2.4L12 7.4c-1-1.1-2.4-1.8-4-1.8z"/>
              <circle cx="8" cy="10" r="2"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 rounded-sm border border-current opacity-70 flex items-center px-0.5">
                <div className="h-1.5 bg-current rounded-sm" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {page === 'home' && (
              <HomePage
                key="home"
                template={currentTemplate}
                profile={profile}
              />
            )}
            {page === 'profile' && (
              <ProfileView
                key="profile"
                profile={profile}
                template={currentTemplate}
                settings={settings}
                onEdit={() => setPage('edit')}
                onUpdateProfile={handleUpdateProfile}
              />
            )}
            {page === 'discover' && (
              <DiscoverPage
                key="discover"
                template={currentTemplate}
              />
            )}
            {page === 'edit' && (
              <EditProfile
                key="edit"
                profile={profile}
                onSave={handleSaveProfile}
                onCancel={() => setPage('profile')}
              />
            )}
            {page === 'templates' && (
              <TemplateSelector
                key="templates"
                currentTemplateId={profile.templateId}
                profile={profile}
                onSelect={handleSelectTemplate}
                onBack={() => setPage('profile')}
              />
            )}
            {page === 'settings' && (
              <SettingsPage
                key="settings"
                settings={settings}
                onUpdate={setSettings}
                profile={profile}
                template={currentTemplate}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            currentPage={page}
            onNavigate={setPage}
            onCreatePost={() => setShowCreatePost(true)}
            template={currentTemplate}
          />
        )}
      </div>

      {/* Global Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <CreatePostModal
            template={currentTemplate}
            connectedPlatforms={profile.connectedAccounts.map(a => a.platform)}
            onClose={() => setShowCreatePost(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
