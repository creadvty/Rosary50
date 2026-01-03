import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RosaryBead } from './RosaryBead';
import { rosaryBeads } from '@/lib/rosary-data';

interface RosaryStripProps {
  currentIndex: number;
  onBeadClick: (index: number) => void;
}

export const RosaryStrip: React.FC<RosaryStripProps> = ({ currentIndex, onBeadClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beadRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to keep active bead centered
  useEffect(() => {
    if (beadRefs.current[currentIndex] && containerRef.current) {
      const bead = beadRefs.current[currentIndex];
      const container = containerRef.current;
      
      const containerHeight = container.clientHeight;
      const beadTop = bead?.offsetTop || 0;
      const beadHeight = bead?.clientHeight || 0;

      // Calculate scroll position to center the bead
      const scrollTo = beadTop - (containerHeight / 2) + (beadHeight / 2);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="h-full w-full bg-[#fdfbf7] dark:bg-[#1a1816] border-l border-stone-200 dark:border-stone-800 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none z-0" />
      
      {/* Central Thread Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-300 dark:bg-stone-700 -translate-x-1/2 z-0" />

      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto rosary-scroll py-[50vh] px-4 scroll-smooth relative z-10"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <div className="flex flex-col items-center">
          {rosaryBeads.map((bead, index) => {
            const nextBead = rosaryBeads[index + 1];
            // Determine spacing based on bead types
            // If current and next are both small (MHM), use tighter spacing
            const isMHMtoMHM = bead.type === 'small' && nextBead?.type === 'small';
            
            return (
              <div 
                key={`${bead.id}-${index}`}
                ref={(el) => { beadRefs.current[index] = el; }}
                className={cn("scroll-snap-center flex flex-col items-center", isMHMtoMHM ? "mb-2" : "mb-10")}
              >
                <RosaryBead
                  type={bead.type}
                  label={bead.label}
                  image={bead.image}
                  isActive={currentIndex === index}
                  onClick={() => onBeadClick(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Vignette / Fade */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#fdfbf7] to-transparent dark:from-[#1a1816] pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fdfbf7] to-transparent dark:from-[#1a1816] pointer-events-none z-20" />
    </div>
  );
};

// Helper for class merging if not imported
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
