import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { WorkScopeItemData, WorkScopeItemTranslation, WorkScopeSectionTranslation } from './types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface WorkScopeModalProps {
  item: WorkScopeItemData;
  translation: WorkScopeItemTranslation;
  sectionTranslation: WorkScopeSectionTranslation;
  onClose: () => void;
  onContactClick: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

export const WorkScopeModal: React.FC<WorkScopeModalProps> = ({
  item,
  translation,
  sectionTranslation,
  onClose,
  onContactClick
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const photos = item.gallery.length > 0 ? item.gallery : (item.mainImage ? [item.mainImage] : []);
  const hasPhotos = photos.length > 0;

  const handlePrev = useCallback(() => {
    if (!hasPhotos) return;
    setSlideDirection(-1);
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [hasPhotos, photos.length]);

  const handleNext = useCallback(() => {
    if (!hasPhotos) return;
    setSlideDirection(1);
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [hasPhotos, photos.length]);

  const handleSelectThumbnail = (index: number) => {
    setSlideDirection(index > activePhotoIndex ? 1 : -1);
    setActivePhotoIndex(index);
  };

  // Keyboard navigation (Escape to close, arrows to browse photos)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext, isLightboxOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-5 md:p-8 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workscope-modal-title"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] max-h-[860px] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Sticky Modal Header / Close bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-xs z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-700 font-bold block">
                {translation.badge}
              </span>
              <h3 id="workscope-modal-title" className="font-display font-bold text-slate-900 text-base sm:text-lg line-clamp-1">
                {translation.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-orange-700 hover:text-white transition-all cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={sectionTranslation.closeDetails}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: on mobile whole body scrolls; on desktop right side scrolls independently */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-full lg:min-h-0">
            
            {/* Gallery Column (Left - 7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col space-y-4 p-5 sm:p-7 md:p-8 lg:overflow-y-auto custom-scrollbar">
              <div 
                className={`relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md flex items-center justify-center ${
                  hasPhotos ? 'cursor-pointer group' : ''
                }`}
                onClick={() => {
                  if (hasPhotos) {
                    setIsLightboxOpen(true);
                  }
                }}
              >
                {hasPhotos ? (
                  <>
                    {/* Fullscreen trigger badge */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white text-xs font-mono font-medium backdrop-blur-md border border-white/15 shadow-md transition-all cursor-pointer group/btn"
                      title={sectionTranslation.zoomPhoto || 'Pełny ekran'}
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-white transition-colors" />
                      <span className="hidden sm:inline">{sectionTranslation.zoomPhoto || 'Pełny ekran'}</span>
                    </button>

                    <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                      <motion.img
                        key={activePhotoIndex}
                        src={photos[activePhotoIndex]}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        alt={`${translation.title} - ${activePhotoIndex + 1}`}
                        title={sectionTranslation.zoomPhoto || 'Kliknij, aby otworzyć pełny ekran'}
                        className="w-full h-full object-contain bg-slate-950"
                      />
                    </AnimatePresence>

                    {/* Photo Index Counter */}
                    {photos.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-mono px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5 z-10">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span>{activePhotoIndex + 1} / {photos.length}</span>
                      </div>
                    )}

                    {/* Navigation Arrows for Photos */}
                    {photos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-white hover:bg-orange-500 transition-colors backdrop-blur-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 shadow-lg"
                          aria-label={sectionTranslation.prevPhoto}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-white hover:bg-orange-500 transition-colors backdrop-blur-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 shadow-lg"
                          aria-label={sectionTranslation.nextPhoto}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <ImagePlaceholder
                    icon={item.icon}
                    badge={translation.badge}
                    noticeText={sectionTranslation.noPhotosNotice}
                    subText={sectionTranslation.noPhotosDesc}
                  />
                )}
              </div>

              {/* Thumbnails Row (if > 1 photo) */}
              {hasPhotos && photos.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto py-2.5 px-1.5 custom-scrollbar">
                  {photos.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectThumbnail(idx)}
                      className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIndex === idx
                          ? 'border-orange-500 ring-2 ring-orange-500/30 shadow-md scale-105'
                          : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Technology tags */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {(translation.tags || item.tags).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Extended Details Column (Right - 5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col space-y-6 p-5 sm:p-7 md:p-8 border-t lg:border-t-0 lg:border-l border-slate-100 lg:overflow-y-auto lg:h-full custom-scrollbar">
              {/* Extended Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-500" />
                  {sectionTranslation.galleryTitle}
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                  {translation.fullDesc}
                </p>
              </div>

              {/* Scope Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  {sectionTranslation.scopeListTitle}
                </h4>
                <ul className="space-y-2.5">
                  {translation.scopeList.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              {translation.specifications && (
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-orange-500" />
                    {sectionTranslation.specsTitle}
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-mono leading-relaxed">
                    {translation.specifications}
                  </div>
                </div>
              )}

              {/* Target Sector */}
              {translation.targetSector && (
                <div className="space-y-1.5 pt-4 border-t border-slate-100">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                    {sectionTranslation.sectorTitle}
                  </h4>
                  <p className="text-xs font-semibold text-slate-800">
                    {translation.targetSector}
                  </p>
                </div>
              )}

              {/* Action Banner / CTA */}
              <div className="pt-6 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {sectionTranslation.contactPrompt}
                    </span>
                    <span className="block text-[11px] text-slate-600 mt-0.5">
                      {translation.title}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onContactClick();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-md cursor-pointer flex-shrink-0"
                  >
                    <span>{sectionTranslation.contactBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </motion.div>

      {/* Clean Fullscreen Photo Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && hasPhotos && (
          <motion.div
            key="workscope-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950/95 backdrop-blur-xl select-none"
            role="dialog"
            aria-modal="true"
            aria-label={sectionTranslation.zoomPhoto || 'Pełny ekran'}
          >
            {/* Top Bar / Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between px-4 sm:px-8 py-3.5 bg-slate-950/70 border-b border-white/10 z-20"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block truncate">
                    {translation.badge}
                  </span>
                  <h4 className="text-white text-sm sm:text-base font-semibold truncate">
                    {translation.title}
                  </h4>
                </div>
                {photos.length > 1 && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono border border-white/10 ml-3 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>{activePhotoIndex + 1} / {photos.length}</span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 hover:bg-orange-500 text-white transition-all cursor-pointer border border-white/15 shadow-md active:scale-95 flex-shrink-0"
                aria-label={sectionTranslation.closeZoom || 'Zamknij'}
                title={sectionTranslation.closeZoom || 'Zamknij (Esc)'}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Center Stage / Image Display */}
            <div
              className="relative flex-1 w-full flex items-center justify-center px-4 py-2 sm:px-12 sm:py-4 overflow-hidden cursor-pointer"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div
                className="relative max-h-full max-w-full flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                  <motion.img
                    key={activePhotoIndex}
                    src={photos[activePhotoIndex]}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    alt={`${translation.title} - ${activePhotoIndex + 1}`}
                    className="max-h-[72vh] sm:max-h-[76vh] max-w-[92vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10 bg-slate-950 select-none"
                  />
                </AnimatePresence>
              </div>

              {/* Side Navigation Chevrons */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-slate-900/80 hover:bg-orange-500 text-white transition-all backdrop-blur-md border border-white/15 shadow-2xl cursor-pointer active:scale-95"
                    aria-label={sectionTranslation.prevPhoto}
                  >
                    <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-slate-900/80 hover:bg-orange-500 text-white transition-all backdrop-blur-md border border-white/15 shadow-2xl cursor-pointer active:scale-95"
                    aria-label={sectionTranslation.nextPhoto}
                  >
                    <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Bar: Pasek do przechodzenia między zdjęciami */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between px-4 sm:px-8 py-3 bg-slate-950/80 border-t border-white/10 z-20 gap-4"
            >
              <div className="flex items-center gap-2.5 overflow-x-auto max-w-full custom-scrollbar py-2 px-1">
                {photos.length > 1 && photos.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectThumbnail(idx)}
                    className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105 opacity-100 shadow-lg'
                        : 'border-white/20 opacity-50 hover:opacity-90 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400 flex-shrink-0 hidden md:flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Esc: {sectionTranslation.closeZoom || 'zamknij'}</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">← → : {sectionTranslation.galleryCount || 'zdjęcia'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
