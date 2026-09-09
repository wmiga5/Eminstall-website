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
  const [currentPosition, setCurrentPosition] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsywna liczba wyświetlanych kart: 1 na telefonie, 2 na tablecie, 3 na komputerze
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // Wzór: Ilość pozycji = Ilość obiektów - (ilość wyświetlanych - 1)
  // Np. dla 7 kart na komputerze (3 karty): 7 - 2 = 5 pozycji
  // Np. dla 7 kart na telefonie (1 karta): 7 - 0 = 7 pozycji
  const totalPositions = Math.max(1, WORK_SCOPE_ITEMS.length - (visibleCount - 1));

  // Zabezpieczenie pozycji przy zmianie rozmiaru okna
  useEffect(() => {
    setCurrentPosition((prev) => Math.min(prev, totalPositions - 1));
  }, [totalPositions]);

  // Przejście do danej pozycji
  const goToPosition = useCallback((targetIndex: number) => {
    const newPos = (targetIndex + totalPositions) % totalPositions;
    setCurrentPosition(newPos);

    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.work-scope-card-wrapper');
    const card = cards[newPos];
    if (!card) return;

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Na telefonie centrujemy pojedynczą kartę, na komputerze dosuwamy do lewej
    const targetScroll = visibleCount === 1
      ? card.offsetLeft - (container.clientWidth - card.clientWidth) / 2
      : card.offsetLeft;

    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    });

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 450);
  }, [totalPositions, visibleCount]);

  const handleNext = () => goToPosition(currentPosition + 1);
  const handlePrev = () => goToPosition(currentPosition - 1);

  // Synchronizacja kropki podczas ręcznego przewijania (swipe na telefonie / trackpad)
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !sliderRef.current) return;
    const container = sliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.work-scope-card-wrapper');
    if (!cards.length) return;

    if (visibleCount === 1) {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setCurrentPosition(closest);
    } else {
      const scrollLeft = container.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < totalPositions; i++) {
        if (!cards[i]) continue;
        const dist = Math.abs(scrollLeft - cards[i].offsetLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      setCurrentPosition(closest);
    }
  }, [totalPositions, visibleCount]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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

        {/* Horizontal Carousel Slider Track (Phone: 1 centered card, Tablet: 2 cards, Desktop: 3 cards) */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 lg:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-[7vw] sm:px-6 lg:px-0 -mx-4 sm:-mx-6 lg:mx-0"
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
                className="work-scope-card-wrapper w-[86vw] max-w-[360px] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] flex-shrink-0 snap-center sm:snap-start"
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

          {/* Indicators Capsule: Dokładnie tyle kropek, ile jest realnych pozycji */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md backdrop-blur-xs">
            {Array.from({ length: totalPositions }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPosition(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPosition === index
                    ? 'w-7 sm:w-9 bg-orange-500 shadow-md shadow-orange-500/50'
                    : 'w-2 sm:w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Pozycja ${index + 1}`}
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
