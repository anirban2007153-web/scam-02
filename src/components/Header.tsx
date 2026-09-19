import React from 'react';
import { ActiveView } from '../types';
import { Smartphone, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onSelectView }) => {
  const getViewTitle = () => {
    switch (activeView) {
      case 'keypad':
        return 'Keypad Phone Simulation';
      case 'analyzer':
        return 'SMS Analyzer Tool';
      case 'history':
        return 'Analysis History';
      case 'awareness':
        return 'Awareness Center';
      default:
        return 'Smartphone Web Dashboard';
    }
  };

  const isKeypad = activeView === 'keypad';

  return (
    <header className="py-2.5 px-4 md:px-6 bg-[#0c142b]/95 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-mono font-medium text-slate-300" id="top-status-indicator">
            Active View: <strong className={isKeypad ? "text-cyan-300 font-semibold" : "text-white font-semibold"}>{getViewTitle()}</strong>
          </span>
        </div>
        <span className="hidden lg:inline-block text-slate-700">|</span>
        <span className="hidden lg:inline-block text-xs text-slate-400 font-mono">
          Interactive Heuristic Detection Sandbox
        </span>
      </div>

      {/* Segmented Mode Switcher */}
      <div className="inline-flex p-1 bg-slate-950/90 border border-slate-700/80 rounded-xl shadow-inner shadow-black/40">
        <button
          id="btn-mode-web"
          type="button"
          onClick={() => onSelectView(activeView === 'keypad' ? 'dashboard' : activeView)}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none cursor-pointer ${
            !isKeypad
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>📱 Smartphone / Web Mode</span>
        </button>
        <button
          id="btn-mode-keypad"
          type="button"
          onClick={() => onSelectView('keypad')}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none cursor-pointer ${
            isKeypad
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">📟</span>
          <span>Keypad Phone Mode</span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
            isKeypad ? 'bg-slate-950 text-cyan-400' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
          }`}>
            Sim
          </span>
        </button>
      </div>

      <div className="hidden sm:flex items-center space-x-2.5">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-300 border border-blue-800/60">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
          Hackathon Edition
        </span>
      </div>
    </header>
  );
};
