import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import type { UserProfile, Template } from './types';
import { TEMPLATES } from './types';

interface TemplateSelectorProps {
  currentTemplateId: string;
  profile: UserProfile;
  onSelect: (templateId: string) => void;
  onBack: () => void;
}

function MiniProfileCard({ template, profile, isSelected, isCurrentActive }: {
  template: Template;
  profile: UserProfile;
  isSelected: boolean;
  isCurrentActive: boolean;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: template.bodyBg,
        border: isSelected
          ? `2.5px solid ${template.accentColor}`
          : `2px solid ${template.cardBorder}`,
        boxShadow: isSelected ? `0 0 0 1px ${template.accentColor}33` : 'none',
      }}
    >
      {/* Mini Banner */}
      <div
        className="h-14 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: profile.bannerImage
            ? `linear-gradient(${template.headerAngle}deg, ${template.headerFrom}cc, ${template.headerTo}cc), url(${profile.bannerImage})`
            : `linear-gradient(${template.headerAngle}deg, ${template.headerFrom}, ${template.headerTo})`,
        }}
      >
        <div className="absolute top-1 right-2 text-xl opacity-60 select-none">{template.emoji}</div>
      </div>

      {/* Mini Avatar */}
      <div className="px-3 -mt-5 flex items-end gap-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ background: profile.avatarBg, border: `2.5px solid ${template.avatarRing}` }}
        >
          {profile.avatarEmoji}
        </div>
      </div>

      {/* Mini Info */}
      <div className="px-3 pt-1.5 pb-3">
        <p className="text-xs font-semibold truncate" style={{ color: template.textPrimary }}>
          {profile.name}
        </p>
        <p className="text-[10px] truncate" style={{ color: template.textSecondary }}>
          @{profile.username}
        </p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {profile.interests.slice(0, 2).map(i => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 rounded-full"
              style={{ background: template.chipBg, color: template.chipText }}
            >
              {i.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Template Label */}
      <div
        className="px-3 pb-2 flex items-center justify-between"
      >
        <div>
          <p className="text-[10px] font-semibold" style={{ color: template.textPrimary }}>{template.name}</p>
          <p className="text-[9px]" style={{ color: template.textSecondary }}>{template.tagline}</p>
        </div>
        {isCurrentActive && !isSelected && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">Active</span>
        )}
      </div>

      {/* Selected Check */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: template.accentColor }}
          >
            <Check size={12} color={template.accentText} strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TemplateSelector({ currentTemplateId, profile, onSelect, onBack }: TemplateSelectorProps) {
  const [previewId, setPreviewId] = useState(currentTemplateId);
  const previewTemplate = TEMPLATES.find(t => t.id === previewId) || TEMPLATES[0];
  const hasChanged = previewId !== currentTemplateId;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full flex flex-col bg-white relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div>
          <h2 className="text-base text-gray-900">Templates</h2>
          <p className="text-xs text-gray-500">Pick your vibe</p>
        </div>
      </div>

      {/* Template Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setPreviewId(template.id)}
            >
              <MiniProfileCard
                template={template}
                profile={profile}
                isSelected={previewId === template.id}
                isCurrentActive={currentTemplateId === template.id}
              />
            </motion.div>
          ))}
        </div>
        <div className="h-28" />
      </div>

      {/* Bottom Apply Bar */}
      <AnimatePresence>
        {hasChanged && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: `linear-gradient(135deg, ${previewTemplate.headerFrom}, ${previewTemplate.headerTo})`,
                }}
              >
                {previewTemplate.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{previewTemplate.name}</p>
                <p className="text-xs text-gray-500">{previewTemplate.tagline}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(previewId)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: previewTemplate.accentColor }}
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
