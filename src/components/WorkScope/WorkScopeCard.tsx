import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Images, Sparkles } from 'lucide-react';
import { WorkScopeItemData, WorkScopeItemTranslation, WorkScopeSectionTranslation } from './types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface WorkScopeCardProps {
  item: WorkScopeItemData;
  translation: WorkScopeItemTranslation;
  sectionTranslation: WorkScopeSectionTranslation;
  onClick: () => void;
}

export const WorkScopeCard: React.FC<WorkScopeCardProps> = ({
  item,
  translation,
  sectionTranslation,
  onClick
}) => {
  const Icon = item.icon;
  const photoCount = item.gallery.length;
  const hasPhotos = item.mainImage !== null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${sectionTranslation.viewDetails}: ${translation.title}`}
      className="group cursor-pointer flex flex-col h-full rounded-3xl border-2 border-slate-200/90 bg-white shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 select-none"
    >
      {/* Featured Visual Banner (Massive eye-catching format) */}
      <div className="relative h-72 sm:h-80 md:h-[340px] w-full overflow-hidden bg-slate-950">
        {hasPhotos ? (
          <>
            <img
              src={item.mainImage!}
              alt={translation.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            {/* Rich gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

            {/* Badge overlay top-left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                {translation.badge}
              </span>
            </div>

            {/* Photo count indicator top-right */}
            {photoCount > 1 && (
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-slate-100 text-xs font-mono shadow-md font-medium">
                  <Images className="w-3.5 h-3.5 text-orange-400" />
                  <span>{photoCount} zdjęcia</span>
                </span>
              </div>
            )}

            {/* Bottom floating icon chip on image */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-white/90 text-xs font-mono uppercase tracking-wider font-bold drop-shadow-sm">
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
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Sparkles className="w-4 h-4 text-orange-500" />
            {sectionTranslation.viewDetails}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6 sm:p-7 justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">
              {translation.badge}
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-200 leading-snug">
            {translation.title}
          </h3>

          <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed line-clamp-3">
            {translation.shortDesc}
          </p>
        </div>

        {/* Tech tags & Large Prominent Action Bar */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono text-slate-600 bg-slate-100 group-hover:bg-orange-50 group-hover:text-orange-700 transition-colors border border-slate-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* High-visibility Action Button */}
          <div className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm flex items-center justify-between group-hover:bg-orange-600 group-hover:shadow-lg transition-all duration-300">
            <span>{sectionTranslation.viewDetails}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono opacity-80 group-hover:opacity-100">Galeria & Zakres</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
