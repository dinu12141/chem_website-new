import React from 'react';

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main logo container */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background box with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 to-orange-700/40 backdrop-blur-lg rounded-2xl border-3 border-yellow-500/60 shadow-xl shadow-yellow-500/30 transform rotate-6"></div>
        
        {/* Secondary decorative box */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-orange-600/30 rounded-2xl border-2 border-yellow-400/40 transform -rotate-12 scale-105"></div>
        
        {/* Tertiary glow effect */}
        <div className="absolute inset-0 bg-yellow-400/10 rounded-2xl blur-lg animate-pulse"></div>
        
        {/* Logo image placeholder - replace with your actual logo */}
        <div className="relative z-10 w-36 h-36 flex items-center justify-center">
          <img 
            src="/images/logo.png" 
            alt="SMARTCHEM Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] transform -rotate-3"
          />
        </div>
        
        {/* Decorative elements around the logo */}
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-yellow-400/30 blur-md animate-pulse"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-orange-500/30 blur-md animate-pulse delay-1000"></div>
        <div className="absolute top-4 -right-4 w-4 h-4 rounded-full bg-yellow-300/50 blur-sm animate-ping"></div>
        <div className="absolute -bottom-4 left-4 w-4 h-4 rounded-full bg-orange-400/50 blur-sm animate-ping delay-700"></div>
        
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-yellow-200/60"></div>
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-300/60"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-orange-200/60"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-yellow-300/60"></div>
      </div>
      
      {/* Floating particles around the logo */}
      <div className="absolute -top-6 -left-6 w-3 h-3 rounded-full bg-yellow-400/70 float-enhanced-1"></div>
      <div className="absolute -top-4 -right-7 w-2 h-2 rounded-full bg-orange-500/70 float-enhanced-2"></div>
      <div className="absolute -bottom-6 -left-7 w-2 h-2 rounded-full bg-yellow-300/70 float-enhanced-3"></div>
      <div className="absolute -bottom-4 -right-6 w-3 h-3 rounded-full bg-orange-400/70 float-enhanced-4"></div>
    </div>
  );
};

export default Logo;