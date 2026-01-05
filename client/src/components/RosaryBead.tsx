import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BeadType } from '@/lib/rosary-data';

interface RosaryBeadProps {
  type: BeadType;
  isActive: boolean;
  label: string;
  image?: string;
  stripIcon?: string; // New prop for specific strip icon
  onClick: () => void;
}

export const RosaryBead: React.FC<RosaryBeadProps> = ({ type, isActive, label, image, stripIcon, onClick }) => {
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
      <div className="h-4 w-[1px] bg-stone-400/50 mx-auto my-0" />
    );
  }

  // Use stripIcon if provided, otherwise fallback to image
  const displayIcon = stripIcon || image;

  return (
    <motion.div 
      className={cn("flex flex-col items-center relative", isActive ? "z-10" : "z-0")}
      onClick={onClick}
      layout
    >
      {isCross && (
        <div className={cn(
          "relative flex flex-col items-center justify-center transition-all duration-500",
          isActive 
            ? "scale-125 z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" 
            : "opacity-60 scale-90 grayscale-[0.3] hover:opacity-100 hover:scale-100 hover:grayscale-0"
        )}>
          {/* Connector to chain */}
          <div className="w-[1px] h-2 bg-stone-400/50 absolute -top-2" />

          {/* SVG Crucifix */}
          <svg 
            width="48" 
            height="64" 
            viewBox="0 0 24 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* The Cross (Darker Gold) */}
            <path 
              d="M10.5 4C10.5 3.44772 10.9477 3 11.5 3H12.5C13.0523 3 13.5 3.44772 13.5 4V9H18.5C19.0523 9 19.5 9.44772 19.5 10V11C19.5 11.5523 19.0523 12 18.5 12H13.5V28C13.5 28.5523 13.0523 29 12.5 29H11.5C10.9477 29 10.5 28.5523 10.5 28V12H5.5C4.94772 12 4.5 11.5523 4.5 11V10C4.5 9.44772 4.94772 9 5.5 9H10.5V4Z" 
              fill="#C5A028" 
              stroke="#B8860B" 
              strokeWidth="0.5"
            />
            
            {/* The Corpus / Body (Lighter/Brighter Gold) */}
            <path 
              d="M12 8C12.55 8 13 7.55 13 7C13 6.45 12.55 6 12 6C11.45 6 11 6.45 11 7C11 7.55 11.45 8 12 8ZM12 8.5C10.5 9.5 9 10.5 6 10V11C8.5 11.5 10.5 12 11.5 14V22L11 25H13L12.5 22V14C13.5 12 15.5 11.5 18 11V10C15 10.5 13.5 9.5 12 8.5Z" 
              fill="#F9E076" 
              className="drop-shadow-sm"
            />
          </svg>
        </div>
      )}

      {isMedal && (
        <div className={cn(
          "w-14 h-16 bg-[#C5A028] rounded-full border-2 border-[#D4AF37]/50 shadow-xl flex items-center justify-center overflow-hidden",
          activeStyle
        )}>
          {displayIcon ? (
             <img src={displayIcon} alt="Medal" className="absolute inset-0 w-full h-full object-cover opacity-90 scale-150" />
          ) : (
             <div className="text-[10px] text-amber-100 font-serif">M</div>
          )}
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/10" />
        </div>
      )}

      {isLarge && (
        <div className={cn(
          beadBase,
          "w-10 h-10 bg-[#C5A028] border border-[#D4AF37] bg-gradient-to-br from-[#E6C65A] via-[#C5A028] to-[#997A1F] shadow-amber-900/10",
          activeStyle
        )}>
          {/* 18k gold texture effect */}
          <div className="w-full h-full rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full pointer-events-none" />
        </div>
      )}

      {isSmall && (
        <div className={cn(
          beadBase,
          "w-8 h-8 bg-stone-300 border border-stone-400 bg-gradient-to-br from-stone-100 via-stone-300 to-stone-400 shadow-sm",
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
