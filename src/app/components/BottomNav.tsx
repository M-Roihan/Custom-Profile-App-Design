import { motion } from 'motion/react';
import { Home, Compass, User, Settings, Plus } from 'lucide-react';
import type { PageType, Template } from './types';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onCreatePost: () => void;
  template: Template;
}

const NAV_ITEMS = [
  { id: 'home' as PageType, label: 'Feed', Icon: Home },
  { id: 'discover' as PageType, label: 'Discover', Icon: Compass },
  { id: 'create-post' as PageType, label: 'Post', Icon: Plus, isCenter: true },
  { id: 'profile' as PageType, label: 'Profile', Icon: User },
  { id: 'settings' as PageType, label: 'Settings', Icon: Settings },
];

export function BottomNav({ currentPage, onNavigate, onCreatePost, template }: BottomNavProps) {
  return (
    <div
      className="flex items-center border-t"
      style={{
        background: template.navBg,
        borderColor: template.cardBorder,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map(({ id, label, Icon, isCenter }) => {
        const isActive = currentPage === id;

        // Center button (Create Post) — special FAB style
        if (isCenter) {
          return (
            <button
              key={id}
              onClick={onCreatePost}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 relative"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md -mt-3"
                style={{
                  background: `linear-gradient(135deg, ${template.accentColor}, ${template.buttonBg})`,
                  color: template.accentText,
                  boxShadow: `0 3px 12px ${template.accentColor}40`,
                }}
              >
                <Plus size={22} strokeWidth={2.5} />
              </motion.div>
              <span
                className="text-[10px] font-medium"
                style={{ color: template.navInactive }}
              >
                {label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 relative transition-all active:scale-95"
          >
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: template.navActive }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div
              animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Icon
                size={20}
                style={{ color: isActive ? template.navActive : template.navInactive }}
              />
            </motion.div>
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? template.navActive : template.navInactive }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
