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
  const activeDotRef = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync activeDotRef
  useEffect(() => {
    activeDotRef.current = activeDot;
  }, [activeDot]);

  // Sync scroll position with pagination dots by finding the card nearest to the container's horizontal center
  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.work-scope-card-wrapper');
    if (!cards.length) return;

    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveDot(closestIndex);
    activeDotRef.current = closestIndex;
  }, []);

  const scrollToCard = useCallback((index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.work-scope-card-wrapper');
    const targetCard = cards[index];
    if (!targetCard) return;

    // Lock programmatic scroll to prevent intermediate handleScroll events from flipping activeDot
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    setActiveDot(index);
    activeDotRef.current = index;

    // Precisely center the card in the viewport
    const targetScrollLeft = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth'
    });

    // Re-enable scroll listener once the smooth transition completes
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 550);
  }, []);

  const handlePrev = () => {
    const current = activeDotRef.current;
    const newIndex = current > 0 ? current - 1 : WORK_SCOPE_ITEMS.length - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const current = activeDotRef.current;
    const newIndex = current < WORK_SCOPE_ITEMS.length - 1 ? current + 1 : 0;
    scrollToCard(newIndex);
  };

  // Re-center active card on resize and unmount cleanup
  useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current) return;
      const container = sliderRef.current;
      const cards = container.querySelectorAll<HTMLElement>('.work-scope-card-wrapper');
      const targetCard = cards[activeDotRef.current];
      if (!targetCard) return;

      const targetScrollLeft = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'auto'
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const selectedItem = WORK_SCOPE_ITEMS.find((item) => item.id === selectedItemId);
  const selectedTranslation = selectedItemId && translation.items[selectedItemId]
    ? translation.items[selectedItemId]
    : null;

  return (
    <section 
      id="zakres-prac" 
      className="relative py-16 sm:py-24 md:py-32 bg-slate-900 text-white border-t border-slate-800 overflow-hidden"
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
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>{translation.header}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {translation.title}
          </h2>
          <div className="h-1.5 w-16 sm:w-20 bg-orange-500 rounded-full" />
          <p className="text-slate-300 text-xs sm:text-base md:text-lg font-light leading-relaxed">
            {translation.subtitle}
          </p>
        </div>

        {/* Real Horizontal Carousel Slider Track (Responsive centering on mobile, tablet and desktop) */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="work-scope-track flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-6 pt-2 -mx-4 sm:-mx-6 lg:mx-0"
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
                className="work-scope-card-wrapper w-[86vw] max-w-[360px] sm:w-[460px] lg:w-[500px] flex-shrink-0 snap-center"
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
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-8 sm:mt-10">
          <button
            onClick={handlePrev}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border-2 border-slate-700 bg-slate-800 text-white shadow-lg transition-all hover:bg-orange-500 hover:border-orange-500 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={translation.prevCard}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Indicators Capsule */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md backdrop-blur-xs">
            {WORK_SCOPE_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === index
                    ? 'w-7 sm:w-9 bg-orange-500 shadow-md shadow-orange-500/50'
                    : 'w-2 sm:w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Przewiń do karty ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border-2 border-slate-700 bg-slate-800 text-white shadow-lg transition-all hover:bg-orange-500 hover:border-orange-500 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={translation.nextCard}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
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
