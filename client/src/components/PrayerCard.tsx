import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeadData } from '@/lib/rosary-data';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { X, Check } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PrayerCardProps {
  bead: BeadData;
  isReadAloud: boolean;
  onReadAloudToggle: (val: boolean) => void;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({ bead, isReadAloud, onReadAloudToggle }) => {
  const isMHM = bead.prayer.body.includes("Hail Mary, full of grace");
  const isCross = bead.type === 'cross';
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const { 
    canInstall, 
    install, 
    showIOSPrompt, 
    setShowIOSPrompt, 
    showSafariPrompt, 
    setShowSafariPrompt, 
    trackManualInstall 
  } = usePWAInstall();

  useEffect(() => {
    if (isReadAloud) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // For transition beads (F1, H1, J1, L1), the decade title is in bead.prayer.subtext
      // The user wants it read AFTER the Fatima Prayer (which is at the end of bead.prayer.body)
      // and BEFORE the Our Father (which is also at the end of bead.prayer.body in my current data)
      // Actually, looking at rosary-data, body is "Glory Be... Fatima... Our Father"
      // and subtext is "The Youth...". 
      // User request: "read aloud the title of the decade after the Fatima Prayer and before the Our Father."
      
      let textToRead = "";
      if (['F1', 'H1', 'J1', 'L1'].includes(bead.id)) {
        // Find indices to split the body
        const body = bead.prayer.body;
        const fatimaEndIndex = body.indexOf("Your Mercy.");
        if (fatimaEndIndex !== -1) {
          const beforeFatimaEnd = body.substring(0, fatimaEndIndex + 11);
          const afterFatimaEnd = body.substring(fatimaEndIndex + 11);
          // For transition beads: "Glory Be... Fatima... [Number and Title]... Our Father"
          // We exclude the bead.prayer.title at the very beginning per request
          textToRead = `${beforeFatimaEnd}. ${bead.prayer.title}. ${bead.prayer.subtext}. ${afterFatimaEnd}`;
        } else {
          textToRead = `${bead.prayer.body}. ${bead.prayer.subtext || ''}`;
        }
      } else if (isMHM) {
        // For MHM beads, only read the body and subtext (clause)
        textToRead = `${bead.prayer.body}. ${bead.prayer.subtext || ''}`;
      } else {
        textToRead = `${bead.prayer.title}. ${bead.prayer.body}. ${bead.prayer.subtext || ''}`;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower for contemplative pace
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [bead.id, isReadAloud]);

  return (
    <div className="h-full flex flex-col items-center p-8 pt-16 max-w-3xl mx-auto text-center relative z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={bead.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center w-full h-full"
        >
          {/* Prayer Section - Scrollable */}
          <div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-8">
            <motion.h2 
              className="text-sm uppercase tracking-[0.2em] text-primary font-sans font-semibold sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isCross ? bead.prayer.title : `${bead.label} — ${bead.prayer.title}`}
            </motion.h2>

            {isCross && (
              <div className="flex flex-col items-center gap-6 mb-8">
              </div>
            )}
            
            <div className="space-y-4">
              {isMHM ? (
                <p className="text-xl md:text-2xl leading-relaxed font-serif font-medium">
                  <span className="text-primary/50">{bead.prayer.body}, </span>
                  <span className="text-primary">{bead.prayer.subtext}</span>
                </p>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl leading-relaxed text-primary font-serif font-medium whitespace-pre-line">
                    {bead.prayer.body}
                  </p>
                  {isCross && (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-3 pb-4 border-b border-primary/10"
                      >
                        <Switch 
                          id="read-aloud" 
                          checked={isReadAloud} 
                          onCheckedChange={onReadAloudToggle}
                        />
                        <Label htmlFor="read-aloud" className="text-sm font-sans font-medium text-primary/70 uppercase tracking-widest cursor-pointer">
                          Read Aloud
                        </Label>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setShowInfo(true)}
                        className="text-primary/60 hover:text-primary transition-colors font-serif italic text-lg underline underline-offset-4"
                      >
                        What is the Carthusian Rosary?
                      </motion.button>

                      {canInstall && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          onClick={install}
                          className="mt-2 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-sans text-sm uppercase tracking-widest transition-colors border border-primary/20"
                        >
                          Add to Home Page
                        </motion.button>
                      )}
                    </div>
                  )}
                  {bead.prayer.subtext && (
                    <motion.div 
                      className="mt-6 p-4 border-t border-b border-primary/20 bg-primary/5"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-xl md:text-2xl text-primary font-serif font-medium space-y-4 whitespace-pre-line">
                        {bead.prayer.subtext}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Artwork Section - Fixed height at bottom */}
          <motion.div 
            className="w-full max-w-[200px] md:max-w-xs aspect-[3/4] rounded-t-full relative overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/10 shrink-0 mt-4 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img 
              src={bead.image} 
              alt={bead.prayer.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AlertDialog open={showInfo} onOpenChange={setShowInfo}>
        <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-primary">The Carthusian Rosary</AlertDialogTitle>
            <AlertDialogDescription className="text-lg leading-relaxed text-primary/80 font-serif">
              Before the Rosary was simplified to 15 mysteries, it originally had 50 unique mysteries composed by Blessed Dominic of Prussia. Now you too can pray these 50 mysteries, focused on Jesus, as our Blessed Mother was. Highly recommended by St. Louis de Montfort and St. John Paul II.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowInfo(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-widest"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* iOS Install Prompt */}
      <AlertDialog open={showIOSPrompt} onOpenChange={setShowIOSPrompt}>
        <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
          <div className="absolute right-4 top-4">
            <button onClick={() => setShowIOSPrompt(false)} className="text-primary/40 hover:text-primary transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-primary">Install on iOS</AlertDialogTitle>
            <AlertDialogDescription className="text-lg leading-relaxed text-primary/80 font-serif">
              Tap <span className="font-bold">Share</span> then <span className="font-bold">Add to Home Screen</span> to install this app on your device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => trackManualInstall('ios_manual')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Check className="h-4 w-4" /> Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Safari Desktop Install Prompt */}
      <AlertDialog open={showSafariPrompt} onOpenChange={setShowSafariPrompt}>
        <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
          <div className="absolute right-4 top-4">
            <button onClick={() => setShowSafariPrompt(false)} className="text-primary/40 hover:text-primary transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-primary">Install on Safari</AlertDialogTitle>
            <AlertDialogDescription className="text-lg leading-relaxed text-primary/80 font-serif">
              Go to <span className="font-bold">File</span> then <span className="font-bold">Add to Dock</span> to install this app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => trackManualInstall('safari_manual')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Check className="h-4 w-4" /> Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
