import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeadData } from '@/lib/rosary-data';

interface PrayerCardProps {
  bead: BeadData;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({ bead }) => {
  const isMHM = bead.prayer.body.includes("Hail Mary, full of grace");

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 max-w-3xl mx-auto text-center relative z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={bead.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8 w-full"
        >
          {/* Prayer Section */}
          <div className="space-y-6 w-full">
            <motion.h2 
              className="text-sm uppercase tracking-[0.2em] text-primary font-sans font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {bead.label} — {bead.prayer.title}
            </motion.h2>
            
            <div className="space-y-4">
              {isMHM ? (
                <p className="text-xl md:text-2xl leading-relaxed font-serif font-medium">
                  <span className="text-primary/50">{bead.prayer.body}, </span>
                  <span className="text-primary">{bead.prayer.subtext}</span>
                </p>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl leading-relaxed text-primary font-serif font-medium">
                    {bead.prayer.body}
                  </p>
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

          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Artwork Section */}
          <motion.div 
            className="w-full max-w-md aspect-[3/4] rounded-t-full relative overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/10"
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
    </div>
  );
};
