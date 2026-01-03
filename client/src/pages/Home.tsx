import React, { useState, useEffect } from "react";
import { RosaryStrip } from "@/components/RosaryStrip";
import { PrayerCard } from "@/components/PrayerCard";
import { rosaryBeads } from "@/lib/rosary-data";
import { ArrowDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentBeadIndex, setCurrentBeadIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentBeadIndex(prev => Math.min(prev + 1, rosaryBeads.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentBeadIndex(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle scroll wheel on the main area to advance beads
  const handleWheel = (e: React.WheelEvent) => {
    // Debounce or threshold could be added here for smoother experience
    // For now, let's keep it simple: strict bead interaction or click
  };
  
  const currentBead = rosaryBeads[currentBeadIndex];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Left 75%: Prayer & Art */}
      <main className="w-3/4 h-full relative flex flex-col overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
        </div>

        <PrayerCard bead={currentBead} />

        {/* Navigation Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 text-sm animate-pulse flex flex-col items-center gap-2">
          <span>Scroll or use Arrow Keys</span>
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
