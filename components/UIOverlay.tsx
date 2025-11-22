
import React from 'react';
import { Wifi, Activity, Command, Zap } from 'lucide-react';
import { ParticleColorMode } from '../types';

interface UIOverlayProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  onTrigger: () => void;
  isProcessing: boolean;
  hasActiveContent: boolean;
  colorMode: ParticleColorMode;
  setColorMode: (mode: ParticleColorMode) => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({
  inputValue,
  setInputValue,
  onTrigger,
  isProcessing,
  hasActiveContent,
  colorMode,
  setColorMode
}) => {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onTrigger();
    }
  };

  const colorOptions: { mode: ParticleColorMode; color: string; label: string }[] = [
    { mode: 'cosmic', color: 'bg-purple-500', label: 'COSMIC' },
    { mode: 'neon', color: 'bg-pink-500', label: 'NEON' },
    { mode: 'ocean', color: 'bg-cyan-500', label: 'OCEAN' },
    { mode: 'emerald', color: 'bg-green-500', label: 'BIO' },
    { mode: 'sunset', color: 'bg-orange-500', label: 'SOLAR' },
    { mode: 'gold', color: 'bg-yellow-400', label: 'GOLD' },
  ];

  return (
    <div className="relative z-30 w-full h-full pointer-events-none flex flex-col justify-between select-none p-6 md:p-10">
      
      {/* --- Top HUD --- */}
      <div className="flex justify-between items-start flex-none">
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-cyan-400">
                <Activity size={14} className="animate-pulse" />
                <span className="font-['Share_Tech_Mono'] text-xs tracking-widest uppercase">Neuromorphic.Core</span>
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            <span className="text-[10px] text-gray-500 font-mono">v5.0.1 // ONLINE</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs font-mono text-cyan-900/80">
             <Wifi size={12} /> SECURE CONNECTION
        </div>
      </div>

      {/* --- Bottom Input Area --- */}
      <div className="w-full max-w-xl mx-auto pointer-events-auto flex-none mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        
        {/* Color Selector */}
        <div className={`flex justify-center gap-3 mb-6 transition-all duration-500 ${isProcessing ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
           {colorOptions.map((opt) => (
             <button
               key={opt.mode}
               onClick={() => setColorMode(opt.mode)}
               className={`group relative p-1 transition-all duration-300`}
               title={opt.label}
             >
               <div className={`w-3 h-3 rounded-full ${opt.color} ${colorMode === opt.mode ? 'scale-125 ring-2 ring-white/50 shadow-[0_0_10px_currentColor]' : 'opacity-40 hover:opacity-80'}`}></div>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/0 group-hover:text-white/70 transition-all duration-300 whitespace-nowrap tracking-wider pointer-events-none">
                  {opt.label}
               </span>
             </button>
           ))}
        </div>

        {/* Command Line Box */}
        <div className={`transition-all duration-500 transform ${isProcessing ? 'opacity-50 grayscale' : 'opacity-100'}`}>
          <div className="flex justify-between items-end mb-2 px-2">
            <span className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest">System Input</span>
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative flex items-center bg-black/80 border border-white/10 backdrop-blur-md rounded px-4 h-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <Command className="text-cyan-500 mr-4 animate-pulse" size={20} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={hasActiveContent ? "DISPLAYING CONTENT..." : "ENTER TEXT TO MATERIALIZE..."}
                className="flex-1 bg-transparent border-none text-white font-['Share_Tech_Mono'] text-xl tracking-wider placeholder-gray-700 focus:ring-0 focus:outline-none uppercase"
                maxLength={15}
                autoFocus
              />
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onTrigger}
                  disabled={!inputValue.trim() || isProcessing}
                  className={`
                     px-6 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 rounded flex items-center justify-center
                     ${!inputValue.trim() ? 'border-gray-800 text-gray-700' : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'}
                  `}
                >
                  <Zap size={14} className={isProcessing ? "animate-spin" : ""} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Corner Decor --- */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-cyan-500/30 hidden md:block"></div>
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-cyan-500/30 hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-cyan-500/30 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-cyan-500/30 hidden md:block"></div>

    </div>
  );
};

export default UIOverlay;
