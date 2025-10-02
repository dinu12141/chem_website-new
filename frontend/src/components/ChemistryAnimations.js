import React, { useEffect, useState } from 'react';

const ChemistryAnimations = () => {
  const [particles, setParticles] = useState([]);

  const chemicalFormulas = [
    'CO₂', 'H₂SO₄', 'NH₃', 'NaCl', 'CaCO₃', 'H₂O', 'CH₄', 'HCl',
    'KMnO₄', 'AgNO₃', 'CuSO₄', 'FeCl₃', 'NaOH', 'HNO₃', 'Ca(OH)₂',
    'Al₂O₃', 'MgSO₄', 'ZnCl₂', 'BaCl₂', 'K₂CO₃'
  ];

  const molecularStructures = [
    // Benzene ring representation
    '⬡', 
    // Water molecule representation
    '∠H₂O', 
    // Methane representation
    '⊕CH₄'
  ];

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Chemical Formulas - Moved further to the left */}
      {chemicalFormulas.map((formula, index) => (
        <div
          key={`formula-${index}`}
          className={`chemistry-animation chemistry-formula-${(index % 8) + 1} chemistry-hover`}
          style={{
            left: `${Math.random() * 60 + 5}%`, // Reduced from 80 to 60, shifted from 10% to 5%
            fontSize: `${Math.random() * 8 + 16}px`,
            fontWeight: Math.random() > 0.5 ? 'bold' : 'normal',
          }}
        >
          {formula}
        </div>
      ))}

      {/* Molecular Structure Animations - Moved further to the left */}
      {molecularStructures.map((structure, index) => (
        <div
          key={`molecule-${index}`}
          className={`molecule-animation molecule-${index + 1}`}
          style={{
            fontSize: '24px',
            color: 'rgba(255, 165, 0, 0.25)',
            fontWeight: 'bold',
            // Adjust position to be more to the left
            left: index === 0 ? '10%' : index === 1 ? '75%' : '15%',
            right: index === 1 ? '15%' : 'auto',
          }}
        >
          {structure}
        </div>
      ))}

      {/* Particle System */}
      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Interactive Chemistry Equations - Moved further to the left */}
      <div className="absolute top-1/4 left-1/6 opacity-20 text-yellow-400 text-sm font-mono">
        <div className="mb-2">2H₂ + O₂ → 2H₂O</div>
        <div className="mb-2">CaCO₃ → CaO + CO₂</div>
        <div>NaCl → Na⁺ + Cl⁻</div>
      </div>

      <div className="absolute bottom-1/3 left-1/6 opacity-15 text-yellow-500 text-xs font-mono">
        <div className="mb-1">pH = -log[H⁺]</div>
        <div className="mb-1">PV = nRT</div>
        <div>∆G = ∆H - T∆S</div>
      </div>

      {/* Periodic Table Elements Floating - Moved further to the left */}
      {['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'].map((element, index) => (
        <div
          key={`element-${index}`}
          className="absolute text-yellow-300 opacity-10 font-bold"
          style={{
            left: `${Math.random() * 70 + 2}%`, // Reduced from 90 to 70, shifted from 5% to 2%
            top: `${Math.random() * 80 + 10}%`,
            fontSize: `${Math.random() * 12 + 14}px`,
            animation: `float${(index % 5) + 1} ${15 + Math.random() * 10}s infinite linear`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        >
          {element}
        </div>
      ))}

      {/* Chemistry Lab Equipment Icons (using text representation) - Moved further to the left */}
      <div className="absolute top-1/2 left-1/8 opacity-20 text-yellow-400 text-2xl">⚗️</div>
      <div className="absolute top-1/3 right-2/3 opacity-15 text-yellow-500 text-xl">🧪</div>
      <div className="absolute bottom-1/4 left-1/4 opacity-25 text-yellow-300 text-lg">⚛️</div>
      
      {/* DNA Helix Representation - Moved further to the left */}
      <div className="absolute top-2/3 left-1/4 opacity-10 text-yellow-400 text-xl font-mono transform rotate-45">
        <div>∿∿∿</div>
        <div className="ml-2">∿∿∿</div>
      </div>
    </div>
  );
};

export default ChemistryAnimations;