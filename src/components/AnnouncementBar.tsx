import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Globe2, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { themeSettings, updateThemeSetting } = useStore();

  if (!themeSettings.showAnnouncement) return null;

  return (
    <aside 
      id="announcement-bar"
      aria-label="Promotional announcements"
      className="w-full text-xs py-2 px-4 transition-all duration-300 relative z-50 border-b border-[#164d68]/40"
      style={{ backgroundColor: themeSettings.announcementBg }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left region / currency */}
        <div className="hidden md:flex items-center gap-2 text-[#a9bbc5]">
          <Globe2 className="w-3.5 h-3.5 text-[#e6be62]" />
          <span>Paris • London • New York | USD ($)</span>
        </div>

        {/* Center message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2 text-[#f4efe5] font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-[#e6be62] animate-pulse" />
          <span>{themeSettings.announcementText}</span>
          <span className="hidden sm:inline text-[#e6be62] underline underline-offset-4 cursor-pointer hover:text-white transition-colors">
            Discover Privileges
          </span>
        </div>

        {/* Right close / dismiss */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateThemeSetting('showAnnouncement', false)}
            aria-label="Dismiss announcement"
            className="text-[#a9bbc5] hover:text-[#f4efe5] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
