import React from 'react';
import { LucideIcon, Image as ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  icon?: LucideIcon;
  badge?: string;
  noticeText?: string;
  subText?: string;
  className?: string;
  compact?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  icon: Icon = ImageIcon,
  badge = 'Inżynieria Eminstall',
  noticeText = 'Dokumentacja fotograficzna w przygotowaniu',
  subText = 'Zdjęcia z realizacji zostaną wkrótce dodane do portfolio',
  className = '',
  compact = false
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center text-center p-6 select-none border border-slate-700/60 shadow-inner ${className}`}
    >
      {/* Engineered technical grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#33415530_1px,transparent_1px),linear-gradient(to_bottom,#33415530_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" 
      />

      {/* Decorative subtle ambient radial light */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Corner blueprint accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-orange-500/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-orange-500/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-orange-500/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-orange-500/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          {badge}
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shadow-md backdrop-blur-xs">
          <Icon className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <p className="text-white font-semibold text-sm sm:text-base leading-snug">
            {noticeText}
          </p>
          {!compact && (
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              {subText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
