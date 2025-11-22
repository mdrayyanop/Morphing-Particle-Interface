
import React, { useState, useEffect } from 'react';
import ParticleScene from './components/ParticleScene';
import UIOverlay from './components/UIOverlay';
import { ParticleColorMode } from './types';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [activeText, setActiveText] = useState('');
  const [triggerMorph, setTriggerMorph] = useState(false);
  const [colorMode, setColorMode] = useState<ParticleColorMode>('cosmic');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTrigger = () => {
    if (!inputText.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setActiveText(inputText.toUpperCase());
    setTriggerMorph(true);
    setInputText('');
  };

  // Auto-reset effect: Returns to sphere 5 seconds after text is active
  useEffect(() => {
    if (activeText !== '') {
      const timer = setTimeout(() => {
        setIsProcessing(true);
        setActiveText(''); // Empty text triggers morphBackToSphere in ParticleScene
        setTriggerMorph(true);
        // We keep the selected colorMode even after reset
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeText]);

  const handleMorphComplete = () => {
    setTriggerMorph(false);
    setIsProcessing(false);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* CRT / Scanline Effects */}
      <div className="scanlines"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-20"></div>
      
      {/* 3D Layer */}
      <div className="absolute inset-0 z-10">
        <ParticleScene 
            text={activeText}
            triggerMorph={triggerMorph}
            onMorphComplete={handleMorphComplete}
            colorMode={colorMode}
        />
      </div>

      {/* UI Layer */}
      <UIOverlay 
        inputValue={inputText}
        setInputValue={setInputText}
        onTrigger={handleTrigger}
        isProcessing={isProcessing}
        hasActiveContent={activeText !== ''}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />
    </div>
  );
};

export default App;
