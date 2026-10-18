import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RosaryStrip } from "@/components/RosaryStrip";
import { PrayerCard } from "@/components/PrayerCard";
import {
  rosaryBeads,
  START_BEAD_ID,
  END_BEAD_ID,
  CONCLUSION_BEAD_ID,
} from "@/lib/rosary-data";
import { ArrowDown, RotateCcw } from "lucide-react";
import crucifixImg from "@assets/generated_images/gold_filigree_crucifix.png";
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

const indexOfBead = (id: string) => rosaryBeads.findIndex((b) => b.id === id);

// The bead list runs from the end (top of the strip) to the beginning (bottom)
const START_INDEX = indexOfBead(START_BEAD_ID); // opening Crucifix
const END_INDEX = indexOfBead(END_BEAD_ID); // cross after the Conclusion medal
const CONCLUSION_INDEX = indexOfBead(CONCLUSION_BEAD_ID); // Conclusion medal

// Timing of the "begin again" animation, in milliseconds
const RESTART_JUMP_AT = 450; // when the rosary actually resets, behind the veil
const RESTART_DONE_AT = 1500; // when the veil lifts to reveal the Crucifix

function loadSavedIndex(): number {
  try {
    const savedId = localStorage.getItem("rosary_bead_id");
    if (savedId) {
      const i = indexOfBead(savedId);
      // Don't reopen the app straight into the "begin again?" question
      if (i === END_INDEX) return CONCLUSION_INDEX;
      if (i >= 0) return i;
    }
    // Earlier versions saved a position number instead of the bead's name.
    // The end cross was since added at the front of the list, so shift by one.
    const saved = localStorage.getItem("rosary_bead_index");
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed + 1 < rosaryBeads.length) {
        return parsed + 1;
      }
    }
  } catch {
    // Storage unavailable (e.g. private browsing) — just start at the beginning
  }
  return START_INDEX;
}

export default function Home() {
  const [currentBeadIndex, setCurrentBeadIndex] = useState(loadSavedIndex);

  const [isReadAloud, setIsReadAloud] = useState(() => {
    const saved = localStorage.getItem('rosary_read_aloud');
    return saved === 'true';
  });

  const [showStartOver, setShowStartOver] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const isRestartingRef = useRef(false);
  const restartTimers = useRef<number[]>([]);

  // Save progress whenever the bead changes (by name, so adding beads never shifts it)
  useEffect(() => {
    try {
      localStorage.setItem("rosary_bead_id", rosaryBeads[currentBeadIndex].id);
      localStorage.removeItem("rosary_bead_index");
    } catch {
      // ignore
    }
  }, [currentBeadIndex]);

  useEffect(() => {
    localStorage.setItem('rosary_read_aloud', isReadAloud.toString());
  }, [isReadAloud]);

  // Whether to add "Holy Mary, Mother of God…" after each clause (off by default)
  const [includeHolyMary, setIncludeHolyMary] = useState(() => {
    try {
      return localStorage.getItem('rosary_holy_mary') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rosary_holy_mary', includeHolyMary.toString());
    } catch {
      // ignore
    }
  }, [includeHolyMary]);

  // Clear any pending animation timers if the page goes away
  useEffect(() => {
    return () => restartTimers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Leave keys alone while a pop-up is open or the restart animation is playing
      if (isRestartingRef.current || document.querySelector('[role="alertdialog"]')) return;

      // Swiping DOWN (ArrowDown) advances the prayer (moves from Crucifix UP towards the end).
      // Since index 0 is the end cross (top) and the last index is the Crucifix (bottom), advancing means DECREASING the index.
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

  const isAtStart = currentBeadIndex === START_INDEX;
  const isAtEnd = currentBeadIndex === END_INDEX;

  // "Start Over" button (upper right)
  const handleStartOver = () => {
    setCurrentBeadIndex(START_INDEX);
    setShowStartOver(false);
  };

  // End cross: "No" (or closing the pop-up) returns to the Conclusion medal
  const handleStayAtEnd = () => {
    setCurrentBeadIndex(CONCLUSION_INDEX);
  };

  // End cross: "Yes" plays a short animation, then resets to the Crucifix
  const handleBeginAgain = () => {
    if (isRestartingRef.current) return;
    isRestartingRef.current = true;
    setIsRestarting(true);
    restartTimers.current = [
      window.setTimeout(() => setCurrentBeadIndex(START_INDEX), RESTART_JUMP_AT),
      window.setTimeout(() => {
        isRestartingRef.current = false;
        setIsRestarting(false);
      }, RESTART_DONE_AT),
    ];
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

        {!isAtStart && !isAtEnd && !isRestarting && (
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

        {/* Confirmation for the upper-right Start Over button */}
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

        {/* Pop-up shown on the cross after the Conclusion medal */}
        <AlertDialog
          open={isAtEnd && !isRestarting}
          onOpenChange={(open) => {
            // "No", the Escape key or tapping outside all go back to the Conclusion
            if (!open) handleStayAtEnd();
          }}
        >
          <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif text-2xl text-primary">Return to the Beginning?</AlertDialogTitle>
              <AlertDialogDescription className="text-lg leading-relaxed text-primary/80 font-serif">
                You have reached the end of the rosary. Would you like to go back to the Crucifix and begin again?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-sans uppercase tracking-widest">
                No
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  // Keep the pop-up from also running the "No" path as it closes
                  e.preventDefault();
                  handleBeginAgain();
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-widest"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Short "begin again" animation: a soft veil with a glowing cross while the beads rewind */}
        <AnimatePresence>
          {isRestarting && (
            <motion.div
              key="restart-veil"
              className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                className="relative w-12 h-16 drop-shadow-[0_0_14px_rgba(212,175,55,0.7)]"
                initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                animate={{ scale: 1.3, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img src={crucifixImg} alt="" draggable={false} className="w-full h-full object-contain select-none" />
              </motion.div>
              <motion.p
                className="font-serif italic text-2xl text-primary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Beginning again…
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <PrayerCard
          bead={currentBead}
          isReadAloud={isReadAloud}
          onReadAloudToggle={setIsReadAloud}
          includeHolyMary={includeHolyMary}
          onIncludeHolyMaryToggle={setIncludeHolyMary}
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
          onBeadClick={(index) => {
            if (!isRestartingRef.current) setCurrentBeadIndex(index);
          }}
        />
      </aside>
    </div>
  );
}
