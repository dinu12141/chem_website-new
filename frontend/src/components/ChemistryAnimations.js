import React, { useEffect, useState } from 'react';

const ChemistryAnimations = () => {
  const [particles, setParticles] = useState([]);

  // Restoring chemical formulas and molecular structures as per user request
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
      {/* Particle System */}
      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="particle float-enhanced-1"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Floating Chemical Formulas - Positioned to the right side, away from teacher image (Smaller) */}
      {chemicalFormulas.map((formula, index) => (
        <div
          key={`formula-${index}`}
          className={`chemistry-animation chemistry-formula-${(index % 8) + 1} chemistry-hover float-enhanced-${(index % 5) + 1}`}
          style={{
            left: `${Math.random() * 40 + 55}%`, // Positioned to the right side (55-95%)
            fontSize: `${Math.random() * 8 + 16}px`, // Smaller size
            fontWeight: Math.random() > 0.5 ? 'bold' : 'normal',
          }}
        >
          {formula}
        </div>
      ))}

      {/* Molecular Structure Animations - Positioned to the right side (Smaller) */}
      {molecularStructures.map((structure, index) => (
        <div
          key={`molecule-${index}`}
          className={`molecule-animation molecule-${index + 1} float-enhanced-${(index % 5) + 1}`}
          style={{
            fontSize: '24px', // Smaller size
            color: 'rgba(255, 165, 0, 0.25)',
            fontWeight: 'bold',
            // Position to the right side
            left: index === 0 ? '75%' : index === 1 ? '85%' : '65%',
            right: 'auto',
          }}
        >
          {structure}
        </div>
      ))}

      {/* Interactive Chemistry Equations - Positioned to the right side (Smaller) */}
      <div className="absolute top-1/4 right-1/6 opacity-20 text-yellow-400 text-sm font-mono float-enhanced-2"> {/* Smaller size and positioned right */}
        <div className="mb-2">2H₂ + O₂ → 2H₂O</div>
        <div className="mb-2">CaCO₃ → CaO + CO₂</div>
        <div>NaCl → Na⁺ + Cl⁻</div>
      </div>

      <div className="absolute bottom-1/3 right-1/6 opacity-15 text-yellow-500 text-xs font-mono float-enhanced-3"> {/* Smaller size and positioned right */}
        <div className="mb-1">pH = -log[H⁺]</div>
        <div className="mb-1">PV = nRT</div>
        <div>∆G = ∆H - T∆S</div>
      </div>

      {/* Periodic Table Elements Floating - Positioned to the right side (Smaller) */}
      {['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'].map((element, index) => (
        <div
          key={`element-${index}`}
          className="absolute text-yellow-300 opacity-10 font-bold float-enhanced-4"
          style={{
            left: `${Math.random() * 40 + 55}%`, // Positioned to the right side (55-95%)
            top: `${Math.random() * 80 + 10}%`,
            fontSize: `${Math.random() * 12 + 16}px`, // Smaller size
            animation: `float${(index % 5) + 1} ${15 + Math.random() * 10}s infinite linear`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        >
          {element}
        </div>
      ))}

      {/* Chemistry Lab Equipment Icons - Positioned to the right side (Smaller) */}
      <div className="absolute top-1/2 right-1/8 opacity-20 text-yellow-400 text-2xl float-enhanced-5"> {/* Smaller size and positioned right */}
        ⚗️
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-15 text-yellow-500 text-xl float-enhanced-1"> {/* Smaller size and positioned right */}
        🧪
      </div>
      <div className="absolute bottom-1/4 right-1/3 opacity-25 text-yellow-300 text-lg float-enhanced-2"> {/* Smaller size and positioned right */}
        ⚛️
      </div>
      
      {/* DNA Helix Representation - Positioned to the right side (Smaller) */}
      <div className="absolute top-2/3 right-1/4 opacity-10 text-yellow-400 text-xl font-mono transform rotate-45 float-enhanced-3"> {/* Smaller size and positioned right */}
        <div>∿∿∿</div>
        <div className="ml-2">∿∿∿</div>
      </div>
    </div>
  );
};

export default ChemistryAnimations;