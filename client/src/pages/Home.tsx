import React, { useState, useEffect } from "react";
import { RosaryStrip } from "@/components/RosaryStrip";
import { PrayerCard } from "@/components/PrayerCard";
import { rosaryBeads } from "@/lib/rosary-data";
import { ArrowDown, Menu, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  // Start at the saved index or default to the last index (Crucifix)
  const [currentBeadIndex, setCurrentBeadIndex] = useState(() => {
    const saved = localStorage.getItem('rosary_bead_index');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < rosaryBeads.length) {
        return parsed;
      }
    }
    return rosaryBeads.length - 1;
  });

  const [isReadAloud, setIsReadAloud] = useState(() => {
    const saved = localStorage.getItem('rosary_read_aloud');
    return saved === 'true';
  });

  // Save progress whenever index changes
  useEffect(() => {
    localStorage.setItem('rosary_bead_index', currentBeadIndex.toString());
  }, [currentBeadIndex]);

  useEffect(() => {
    localStorage.setItem('rosary_read_aloud', isReadAloud.toString());
  }, [isReadAloud]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Swiping DOWN (ArrowDown) advances the prayer (moves from Crucifix UP towards the end).
      // Since index 0 is N1 (top) and index N is Crucifix (bottom), advancing means DECREASING the index.
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentBeadIndex(prev => {
          const nextIndex = Math.max(prev - 1, 0);
          // If we are at cross (last index) and next is chain (lastIndex - 1), skip chain to A1 (lastIndex - 2)
          if (prev === rosaryBeads.length - 1 && rosaryBeads[prev - 1].type === 'chain') {
            return rosaryBeads.length - 3;
          }
          return nextIndex;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentBeadIndex(prev => {
          const nextIndex = Math.min(prev + 1, rosaryBeads.length - 1);
          // If we are at A1 (lastIndex - 2) and previous is chain (lastIndex - 1), skip chain to cross (lastIndex)
          if (prev === rosaryBeads.length - 3 && rosaryBeads[prev + 1].type === 'chain') {
            return rosaryBeads.length - 1;
          }
          return nextIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [showStartOver, setShowStartOver] = useState(false);

  // The rosary begins at the Crucifix, which is the last bead in the list
  const startIndex = rosaryBeads.length - 1;
  const isAtStart = currentBeadIndex === startIndex;

  const handleStartOver = () => {
    setCurrentBeadIndex(startIndex);
    setShowStartOver(false);
  };

  const currentBead = rosaryBeads[currentBeadIndex];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Left 75%: Prayer & Art */}
      <main className="w-3/4 h-full relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
        </div>

        {!isAtStart && (
          <button
            onClick={(e) => {
              e.currentTarget.blur();
              setShowStartOver(true);
            }}
            className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold uppercase tracking-widest text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 shadow-sm backdrop-blur-sm transition-colors"
            aria-label="Start over from the beginning of the rosary"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Over</span>
          </button>
        )}

        <AlertDialog open={showStartOver} onOpenChange={setShowStartOver}>
          <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif text-2xl text-primary">Start Over?</AlertDialogTitle>
              <AlertDialogDescription className="text-lg leading-relaxed text-primary/80 font-serif">
                This will return you to the Crucifix at the beginning of the rosary.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-sans uppercase tracking-widest">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleStartOver}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-widest"
              >
                Start Over
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <PrayerCard
          bead={currentBead} 
          isReadAloud={isReadAloud} 
          onReadAloudToggle={setIsReadAloud}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 text-sm animate-pulse flex flex-col items-center gap-2">
          <span>Swipe Down or use Arrow Down to Advance</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </main>

      {/* Right 25%: Rosary Strip */}
      <aside className="w-1/4 h-full border-l border-border shadow-2xl z-20">
        <RosaryStrip 
          currentIndex={currentBeadIndex} 
          onBeadClick={setCurrentBeadIndex}
        />
      </aside>
    </div>
  );
}
