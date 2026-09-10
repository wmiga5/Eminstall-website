import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Images, Sparkles } from 'lucide-react';
import { WorkScopeItemData, WorkScopeItemTranslation, WorkScopeSectionTranslation } from './types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface WorkScopeCardProps {
  item: WorkScopeItemData;
  translation: WorkScopeItemTranslation;
  sectionTranslation: WorkScopeSectionTranslation;
  href?: string;
  onClick: () => void;
}

export const WorkScopeCard: React.FC<WorkScopeCardProps> = ({
  item,
  translation,
  sectionTranslation,
  href,
  onClick
}) => {
  const Icon = item.icon;
  const photoCount = item.gallery.length;
  const hasPhotos = item.mainImage !== null;

  const handleClick = (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.a
      href={href || '#'}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${sectionTranslation.viewDetails}: ${translation.title}`}
      className="group cursor-pointer flex flex-col h-full rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 bg-white shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 select-none no-underline text-inherit"
    >
      {/* Featured Visual Banner (Proportionate on mobile, spacious on desktop) */}
      <div className="relative h-48 sm:h-64 md:h-72 lg:h-[320px] w-full overflow-hidden bg-slate-950">
        {hasPhotos ? (
          <>
            <picture>
              <source srcSet={item.thumbnail || item.mainImage!} type="image/webp" />
              <img
                src={item.thumbnail || item.mainImage!}
                alt={translation.title}
                width={640}
                height={480}
                decoding="async"
                className={`h-full w-full object-cover ${item.imagePosition || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-106`}
                loading="lazy"
              />
            </picture>
            {/* Subtle gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Badge overlay top-left */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                {translation.badge}
              </span>
            </div>

            {/* Photo count indicator top-right */}
            {photoCount > 1 && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-slate-100 text-xs font-mono shadow-md font-medium">
                  <Images className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
                  <span>{photoCount}</span>
                </span>
              </div>
            )}

            {/* Bottom floating icon chip on image */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="hidden sm:inline text-white/90 text-xs font-mono uppercase tracking-wider font-bold drop-shadow-sm">
                Eminstall Engineering
              </span>
            </div>
          </>
        ) : (
          <ImagePlaceholder
            icon={Icon}
            badge={translation.badge}
            noticeText={sectionTranslation.noPhotosNotice}
            subText={sectionTranslation.noPhotosDesc}
          />
        )}

        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            {sectionTranslation.viewDetails}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-4 sm:p-6 lg:p-7 justify-between space-y-4 sm:space-y-5">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-700 font-bold">
              {translation.badge}
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors duration-200 leading-snug line-clamp-2">
            {translation.title}
          </h3>

          <p className="text-slate-600 font-light text-sm lg:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
            {translation.shortDesc}
          </p>
        </div>

        {/* Tech tags & Compact Prominent Action Bar */}
        <div className="space-y-3 pt-3 sm:pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(translation.tags || item.tags).slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-xs font-mono text-slate-600 bg-slate-100 group-hover:bg-orange-50 group-hover:text-orange-700 transition-colors border border-slate-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* High-visibility Action Button */}
          <div className="w-full py-2.5 px-4 sm:py-3.5 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-between group-hover:bg-orange-700 group-hover:shadow-lg transition-all duration-300">
            <span>{sectionTranslation.viewDetails}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono opacity-80 group-hover:opacity-100">
                {sectionTranslation.galleryLabel || 'Galeria'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};
