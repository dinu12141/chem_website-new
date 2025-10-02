import React from 'react';

const StylizedN = () => {
  return (
    <div className="stylized-n-container float-subtle">
      {/* Main N letter container */}
      <div className="stylized-n-box relative w-64 h-64 flex items-center justify-center">
        {/* Background box with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 to-orange-700/40 backdrop-blur-lg rounded-3xl border-4 border-yellow-500/60 shadow-2xl shadow-yellow-500/30 transform rotate-6"></div>
        
        {/* Secondary decorative box */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-orange-600/30 rounded-3xl border-2 border-yellow-400/40 transform -rotate-12 scale-105"></div>
        
        {/* Tertiary glow effect */}
        <div className="absolute inset-0 bg-yellow-400/10 rounded-3xl blur-xl animate-pulse"></div>
        
        {/* The stylized "N" letter */}
        <div className="stylized-n-letter relative z-10 text-9xl font-black text-yellow-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] transform -rotate-3">
          N
        </div>
        
        {/* Decorative elements around the N */}
        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-yellow-400/30 blur-md animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-orange-500/30 blur-md animate-pulse delay-1000"></div>
        <div className="absolute top-6 -right-6 w-5 h-5 rounded-full bg-yellow-300/50 blur-sm animate-ping"></div>
        <div className="absolute -bottom-6 left-6 w-5 h-5 rounded-full bg-orange-400/50 blur-sm animate-ping delay-700"></div>
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-200/60"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-orange-300/60"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-orange-200/60"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-300/60"></div>
      </div>
      
      {/* Floating particles around the N */}
      <div className="absolute -top-8 -left-8 w-4 h-4 rounded-full bg-yellow-400/70 animate-float-3d-drift"></div>
      <div className="absolute -top-6 -right-10 w-3 h-3 rounded-full bg-orange-500/70 animate-float-3d-spiral"></div>
      <div className="absolute -bottom-8 -left-10 w-3 h-3 rounded-full bg-yellow-300/70 animate-float-3d-wave"></div>
      <div className="absolute -bottom-6 -right-8 w-4 h-4 rounded-full bg-orange-400/70 animate-float-3d-orbit"></div>
    </div>
  );
};

export default StylizedN;