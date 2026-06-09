import { motion } from 'motion/react';
import { User, Pencil, Palette, Settings, Users } from 'lucide-react';
import type { PageType, Template } from './types';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  template: Template;
}

const NAV_ITEMS = [
  { id: 'profile' as PageType, label: 'Profile', Icon: User },
  { id: 'connect' as PageType, label: 'Connect', Icon: Users },
  { id: 'edit' as PageType, label: 'Edit', Icon: Pencil },
  { id: 'templates' as PageType, label: 'Templates', Icon: Palette },
  { id: 'settings' as PageType, label: 'Settings', Icon: Settings },
];

export function BottomNav({ currentPage, onNavigate, template }: BottomNavProps) {
  return (
    <div
      className="flex items-center border-t"
      style={{
        background: template.navBg,
        borderColor: template.cardBorder,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = currentPage === id;
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
