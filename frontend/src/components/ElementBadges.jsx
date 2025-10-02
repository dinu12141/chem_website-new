import React from 'react';

const badgeBase =
  'absolute flex items-center justify-center [transform-style:preserve-3d]';

const badgeSmall = 'w-12 h-12 md:w-16 md:h-16';
const badgeMedium = 'w-16 h-16 md:w-20 md:h-20';
const badgeLarge = 'w-20 h-20 md:w-24 md:h-24';
const badgeXLarge = 'w-24 h-24 md:w-28 md:h-28';

const face =
  'absolute inset-0 rounded-xl bg-gray-900/30 border border-[#F7941D]/40 shadow-[0_15px_40px_rgba(247,148,29,0.3)] backdrop-blur-sm';

const glow =
  'absolute -inset-2 rounded-xl opacity-70 blur-xl bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,1)_0%,rgba(247,148,29,0.6)_30%,rgba(247,148,29,0.2)_60%,transparent_80%)]';

const labelSmall = 'relative z-10 text-[#F7941D] font-bold text-sm md:text-base [text-shadow:0_0_8px_rgba(247,148,29,0.8),0_0_16px_rgba(247,148,29,0.6),0_0_24px_rgba(247,148,29,0.4)]';
const labelMedium = 'relative z-10 text-[#F7941D] font-bold text-lg md:text-xl [text-shadow:0_0_10px_rgba(247,148,29,0.8),0_0_20px_rgba(247,148,29,0.6),0_0_30px_rgba(247,148,29,0.4)]';
const labelLarge = 'relative z-10 text-[#F7941D] font-bold text-xl md:text-2xl [text-shadow:0_0_12px_rgba(247,148,29,0.8),0_0_24px_rgba(247,148,29,0.6),0_0_36px_rgba(247,148,29,0.4)]';
const labelXLarge = 'relative z-10 text-[#F7941D] font-bold text-2xl md:text-3xl [text-shadow:0_0_15px_rgba(247,148,29,0.8),0_0_30px_rgba(247,148,29,0.6),0_0_45px_rgba(247,148,29,0.4)]';

// Semi-transparent versions for overlapping badges
const faceOverlap = 'absolute inset-0 rounded-xl bg-gray-900/20 border border-[#F7941D]/30 shadow-[0_15px_40px_rgba(247,148,29,0.2)] backdrop-blur-sm';
const glowOverlap = 'absolute -inset-2 rounded-xl opacity-50 blur-xl bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,0.8)_0%,rgba(247,148,29,0.4)_30%,rgba(247,148,29,0.1)_60%,transparent_80%)]';

export default function ElementBadges() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Distant Board Container with N-pattern arrangement */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
          right: '10%'
        }}
      >
        {/* Board Background */}
        <div 
          className="absolute w-96 h-72 bg-gray-900/25 border border-[#F7941D]/25 rounded-lg backdrop-blur-sm shadow-[0_25px_80px_rgba(247,148,29,0.15)]"
          style={{
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-120px)',
            left: '-192px',
            top: '-144px'
          }}
        />

        {/* N-Pattern Elements on the distant board */}
        
        {/* Top-left vertical line of N */}
        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '-80px', 
            top: '-80px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '0s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>C</span>
        </div>

        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '-80px', 
            top: '-10px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '0.5s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>O₂</span>
        </div>

        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '-80px', 
            top: '60px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '1s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>B</span>
        </div>

        {/* Diagonal line of N */}
        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '-40px', 
            top: '-50px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '1.5s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>N₂</span>
        </div>

        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '0px', 
            top: '-10px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '2s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>Cl</span>
        </div>

        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '40px', 
            top: '30px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '2.5s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>CO₂</span>
        </div>

        {/* Top-right vertical line of N */}
        <div
          className={`${badgeBase} ${badgeMedium} animate-board-glow`}
          style={{ 
            left: '80px', 
            top: '-80px',
            transform: 'rotateX(12deg) rotateY(-3deg) translateZ(-100px)',
            animationDelay: '3s'
          }}
        >
          <div className={glowOverlap} />
          <div className={faceOverlap} />
          <span className={labelMedium}>Ar</span>
        </div>
      </div>
    </div>
  );
}


