import React from 'react';

const PageBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,165,0,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Geometric polygons */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-yellow-900/20 rotate-45"></div>
      <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-yellow-900/20 rotate-12"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-yellow-900/20 rotate-45"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border border-yellow-900/20 rotate-20"></div>
      
      {/* Chemistry Elements Box - Prominent display area for text elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center">
        {/* Main box with gradient and border effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-700/30 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 transform rotate-3"></div>
        
        {/* Secondary decorative box */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-orange-600/20 rounded-2xl border border-yellow-400/30 transform -rotate-6 scale-105"></div>
        
        {/* Tertiary glow effect */}
        <div className="absolute inset-0 bg-yellow-400/10 rounded-2xl blur-xl animate-pulse"></div>
        
        {/* Content area for chemistry elements */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
          {/* Main chemistry text elements will go here */}
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]">CHEMISTRY</div>
            <div className="text-2xl font-semibold text-orange-200 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">_ELEMENTS</div>
          </div>
          
          {/* Decorative chemical formulas around the text */}
          <div className="absolute top-4 left-4 text-yellow-400/60 text-lg font-mono">H₂O</div>
          <div className="absolute top-4 right-4 text-orange-400/60 text-lg font-mono">CO₂</div>
          <div className="absolute bottom-4 left-4 text-yellow-300/60 text-lg font-mono">NaCl</div>
          <div className="absolute bottom-4 right-4 text-orange-300/60 text-lg font-mono">CH₄</div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-200/60"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-orange-300/60"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-orange-200/60"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-300/60"></div>
      </div>
    </div>
  );
};

export default PageBackground;