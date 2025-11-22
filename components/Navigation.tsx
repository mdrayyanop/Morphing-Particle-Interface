import React from 'react';
import { ViewState } from '../types';
import { User, Code, Cpu, Image as ImageIcon, Send, Home } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  disabled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, disabled }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'CORE', icon: <Home size={18} /> },
    { id: 'ABOUT', label: 'IDENTITY', icon: <User size={18} /> },
    { id: 'SKILLS', label: 'CAPABILITIES', icon: <Cpu size={18} /> },
    { id: 'PROJECTS', label: 'UNITS', icon: <Code size={18} /> },
    { id: 'GALLERY', label: 'VISUALS', icon: <ImageIcon size={18} /> },
    { id: 'CONTACT', label: 'UPLINK', icon: <Send size={18} /> },
  ];

  return (
    <div className="flex items-center justify-center w-full gap-2 md:gap-6 pointer-events-auto p-4 overflow-x-auto no-scrollbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          disabled={disabled}
          className={`
            relative group flex items-center gap-2 px-4 py-2 rounded border transition-all duration-300 whitespace-nowrap
            ${currentView === item.id 
              ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
              : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className={`${currentView === item.id ? 'animate-pulse' : ''}`}>{item.icon}</span>
          <span className="font-['Share_Tech_Mono'] text-xs tracking-widest hidden md:block">{item.label}</span>
          
          {/* Hover Bracket Effect */}
          <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full ${currentView === item.id ? 'w-full' : ''}`}></span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;