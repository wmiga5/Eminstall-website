import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WORK_SCOPE_ITEMS } from './workScopeData';
import { WorkScopeCard } from './WorkScopeCard';
import { WorkScopeModal } from './WorkScopeModal';
import { WorkScopeSectionTranslation } from './types';

interface WorkScopeSectionProps {
  translation: WorkScopeSectionTranslation;
  onContactClick: () => void;
}

export const WorkScopeSection: React.FC<WorkScopeSectionProps> = ({
  translation,
  onContactClick
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sync scroll position with pagination dots
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 24; // width + gap
    const scrollPos = container.scrollLeft;
    const newActiveIndex = Math.round(scrollPos / cardWidth);
    setActiveDot(Math.min(WORK_SCOPE_ITEMS.length - 1, Math.max(0, newActiveIndex)));
  }, []);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    const scrollAmount = card ? card.offsetWidth + 24 : 500;
    
    // If at the beginning, cycle to the end
    if (container.scrollLeft <= 10) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    const scrollAmount = card ? card.offsetWidth + 24 : 500;

    // If near the end, cycle to start
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    if (card) {
      const cardWidth = card.offsetWidth + 24;
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  const selectedItem = WORK_SCOPE_ITEMS.find((item) => item.id === selectedItemId);
  const selectedTranslation = selectedItemId && translation.items[selectedItemId]
    ? translation.items[selectedItemId]
    : null;

  return (
    <section 
      id="zakres-prac" 
      className="relative py-24 md:py-32 bg-slate-900 text-white border-t border-slate-800 overflow-hidden"
    >
      {/* Compatibility anchors for existing links */}
      <span id="uslugi" className="absolute -top-24 pointer-events-none" />
      <span id="realizacje" className="absolute -top-24 pointer-events-none" />

      {/* Modern industrial blueprint background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-60" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{translation.header}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {translation.title}
          </h2>
          <div className="h-1.5 w-20 bg-orange-500 rounded-full" />
          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            {translation.subtitle}
          </p>
        </div>

        {/* Real Horizontal Carousel Slider Track */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-1 -mx-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WORK_SCOPE_ITEMS.map((item) => {
            const itemTrans = translation.items[item.id] || {
              badge: 'Inżynieria',
              title: item.id,
              shortDesc: '',
              fullDesc: '',
              scopeList: []
            };

            return (
              <div 
                key={item.id} 
                className="w-[88vw] sm:w-[480px] lg:w-[560px] flex-shrink-0 snap-start"
              >
                <WorkScopeCard
                  item={item}
                  translation={itemTrans}
                  sectionTranslation={translation}
                  onClick={() => setSelectedItemId(item.id)}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Navigation: [Prev Button] [Pill Indicators] [Next Button] */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-10">
          <button
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-700 bg-slate-800 text-white shadow-lg transition-all hover:bg-orange-500 hover:border-orange-500 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={translation.prevCard}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Indicators Capsule */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md backdrop-blur-xs">
            {WORK_SCOPE_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === index
                    ? 'w-9 bg-orange-500 shadow-md shadow-orange-500/50'
                    : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Przewiń do karty ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-700 bg-slate-800 text-white shadow-lg transition-all hover:bg-orange-500 hover:border-orange-500 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={translation.nextCard}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedItem && selectedTranslation && (
          <WorkScopeModal
            item={selectedItem}
            translation={selectedTranslation}
            sectionTranslation={translation}
            onClose={() => setSelectedItemId(null)}
            onContactClick={onContactClick}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
