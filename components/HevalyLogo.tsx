import React from 'react';

export const HevalyLogo = ({ className = "w-8 h-8", color = "#7F8994" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outline for the bag handle */}
    <path d="M40 30 V 20 C 40 10 60 10 60 20 V 30" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    
    {/* Left pillar of H */ }
    <path d="M30 30 H 42 V 55 Q 35 55 25 65 H 30 V 30" fill={color}/>

    {/* Right pillar of H */ }
    <path d="M58 30 H 70 V 65 H 58 V 45 Q 65 42 70 30" fill={color}/>
    
    {/* Left Block */}
    <path d="M25 30 H 40 V 46 Q 32 46 25 55 Z" fill={color}/>
    
    {/* Right Block */}
    <path d="M60 30 H 75 V 65 H 55 V 50 Q 60 50 60 30 Z" fill={color}/>
    
    <path d="M25 30 H38 V45 C30 45, 25 52, 25 60 Z" fill={color} />
    <path d="M62 30 H75 V65 H55 V52 C65 52, 62 40, 62 30 Z" fill={color} />

    {/* Let's make it simpler */}
    <path d="M25 30 H 40 V 45 C 32 46, 25 52, 25 60 Z" fill={color} />
  </svg>
);
