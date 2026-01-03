import React, { useState, useEffect } from "react";
import { RosaryStrip } from "@/components/RosaryStrip";
import { PrayerCard } from "@/components/PrayerCard";
import { rosaryBeads } from "@/lib/rosary-data";
import { ArrowDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Start at the last index because we reversed the array to put the crucifix at the bottom.
  // Last index is now the Crucifix.
  const [currentBeadIndex, setCurrentBeadIndex] = useState(rosaryBeads.length - 1);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Swiping DOWN (ArrowDown) advances the prayer (moves from Crucifix UP towards the end).
      // Since index 0 is N1 (top) and index N is Crucifix (bottom), advancing means DECREASING the index.
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentBeadIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentBeadIndex(prev => Math.min(prev + 1, rosaryBeads.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentBead = rosaryBeads[currentBeadIndex];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Left 75%: Prayer & Art */}
      <main className="w-3/4 h-full relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
        </div>

        <PrayerCard bead={currentBead} />

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
