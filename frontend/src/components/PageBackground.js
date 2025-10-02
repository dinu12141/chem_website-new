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
    </div>
  );
};

export default PageBackground;