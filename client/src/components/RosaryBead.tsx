import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BeadType } from '@/lib/rosary-data';

interface RosaryBeadProps {
  type: BeadType;
  isActive: boolean;
  label: string;
  image?: string;
  onClick: () => void;
}

export const RosaryBead: React.FC<RosaryBeadProps> = ({ type, isActive, label, image, onClick }) => {
  const isCross = type === 'cross';
  const isMedal = type === 'medal';
  const isChain = type === 'chain';
  const isSmall = type === 'small';
  const isLarge = type === 'large';

  // Base bead style
  const beadBase = "rounded-full shadow-lg transition-all duration-500 relative flex items-center justify-center cursor-pointer";
  
  // Active state styling - Glow effect
  const activeStyle = isActive 
    ? "ring-4 ring-accent/50 scale-125 shadow-accent/40 z-10 brightness-110" 
    : "opacity-60 scale-90 hover:opacity-100 hover:scale-100 brightness-90 saturate-50";

  if (isChain) {
    return (
      <div className="h-6 w-[1px] bg-stone-400/50 mx-auto my-0" />
    );
  }

  return (
    <motion.div 
      className={cn("flex flex-col items-center relative", isActive ? "z-10" : "z-0")}
      onClick={onClick}
      layout
    >
      {isCross && (
        <div className={cn(
          "w-12 h-16 flex items-center justify-center relative",
          activeStyle
        )}>
          {/* Simple Cross Graphic */}
          <div className="absolute w-8 h-1.5 bg-stone-600 rounded-full" />
          <div className="absolute w-1.5 h-12 bg-stone-600 rounded-full" />
          {/* Subtle Metallic Effect */}
          <div className="absolute w-8 h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <div className="absolute w-1.5 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
        </div>
      )}

      {isMedal && (
        <div className={cn(
          "w-14 h-16 bg-amber-700 rounded-full border-2 border-amber-500/50 shadow-xl flex items-center justify-center overflow-hidden",
          activeStyle
        )}>
          {image ? (
             <img src={image} alt="Medal" className="absolute inset-0 w-full h-full object-cover opacity-90 scale-150" />
          ) : (
             <div className="text-[10px] text-amber-100 font-serif">M</div>
          )}
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/10" />
        </div>
      )}

      {isLarge && (
        <div className={cn(
          beadBase,
          "w-10 h-10 bg-stone-800 border border-stone-600 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-950",
          activeStyle
        )}>
          <div className="w-full h-full rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        </div>
      )}

      {isSmall && (
        <div className={cn(
          beadBase,
          "w-6 h-6 bg-stone-300 border border-stone-400 bg-gradient-to-br from-stone-100 via-stone-300 to-stone-400 shadow-sm",
          activeStyle
        )}>
           <div className="w-2 h-2 rounded-full bg-white/40 blur-[1px] absolute top-1 left-1" />
        </div>
      )}
      
      {isActive && label && !isCross && !isMedal && (
         <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-12 whitespace-nowrap text-xs font-serif text-primary/70 italic tracking-widest"
         >
           {label}
         </motion.span>
      )}
    </motion.div>
  );
};
