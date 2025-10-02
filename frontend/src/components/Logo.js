import React from 'react';

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center logo-pop-up">
      {/* Main logo container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background box with reduced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-700/20 backdrop-blur-md rounded-2xl border-2 border-yellow-500/40 shadow-lg shadow-yellow-500/20 transform rotate-6"></div>
        
        {/* Secondary decorative box */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-orange-600/10 rounded-2xl border border-yellow-400/20 transform -rotate-12 scale-105"></div>
        
        {/* Tertiary glow effect */}
        <div className="absolute inset-0 bg-yellow-400/5 rounded-2xl blur-md animate-pulse"></div>
        
        {/* Logo image placeholder - replace with your actual logo */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center">
          <img 
            src="/images/logo.png" 
            alt="SMARTCHEM Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transform -rotate-3"
          />
        </div>
        
        {/* Decorative elements around the logo */}
        <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-yellow-400/20 blur-sm animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-orange-500/20 blur-sm animate-pulse delay-1000"></div>
        <div className="absolute top-3 -right-3 w-3 h-3 rounded-full bg-yellow-300/30 blur-xs animate-ping"></div>
        <div className="absolute -bottom-3 left-3 w-3 h-3 rounded-full bg-orange-400/30 blur-xs animate-ping delay-700"></div>
        
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-yellow-200/40"></div>
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-orange-300/40"></div>
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-orange-200/40"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-yellow-300/40"></div>
      </div>
      
      {/* Orbiting particles around the logo - Reduced intensity */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-400/50 orbit-1"></div>
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-orange-500/50 orbit-2"></div>
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300/50 orbit-3"></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-orange-400/50 orbit-4"></div>
      
      {/* Additional orbiting particles */}
      <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-yellow-500/40 orbit-1"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-orange-300/40 orbit-2"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-yellow-200/40 orbit-3"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-orange-400/40 orbit-4"></div>
    </div>
  );
};

export default Logo;