import React, { useState, useEffect } from 'react';
import { ChipState, SystemLog } from '../types';
import { Shield, ArrowDown, Languages } from 'lucide-react';
import { translations, Language } from '../translations';

interface HUDOverlayProps {
  scrollPercent: number;
  activeState: ChipState;
  logs: SystemLog[];
  scrollSpeed: number;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function HUDOverlay({ scrollPercent, activeState, logs, scrollSpeed, language, setLanguage }: HUDOverlayProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [audioActive, setAudioActive] = useState(false);

  const t = translations[language];

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const timeStr = d.toLocaleTimeString([], { hour12: false });
      const dateStr = d.toISOString().slice(0, 10);
      setCurrentTime(`${dateStr} ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusColor = () => {
    switch (activeState) {
      case 'standby': return 'text-cyan-400';
      case 'about': return 'text-amber-400';
      case 'skills': return 'text-emerald-400';
      case 'projects': return 'text-sky-400';
      case 'certificates': return 'text-purple-400';
      case 'contact': return 'text-fuchsia-400';
      case 'done': return 'text-rose-400';
    }
  };

  const getStatusBgColor = () => {
    switch (activeState) {
      case 'standby': return 'bg-cyan-500/20 border-cyan-500/40';
      case 'about': return 'bg-amber-500/20 border-amber-500/40';
      case 'skills': return 'bg-emerald-500/20 border-emerald-500/40';
      case 'projects': return 'bg-sky-500/20 border-sky-500/40';
      case 'certificates': return 'bg-purple-500/20 border-purple-500/40';
      case 'contact': return 'bg-fuchsia-500/20 border-fuchsia-500/40';
      case 'done': return 'bg-rose-500/20 border-rose-500/40';
    }
  };

  return (
    <div id="hud-overlay" className="fixed inset-0 w-full h-full pointer-events-none z-40 font-mono text-[10px]">
      
      {/* ------------------ TOP NAV HUD BAR ------------------ */}
      <header className="absolute top-0 left-0 right-0 h-14 bg-[#0a0a0b]/80 flex items-center justify-between px-6 border-b border-zinc-900 pointer-events-auto backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              activeState === 'done' ? 'bg-rose-500' : 'bg-cyan-500'
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              activeState === 'done' ? 'bg-rose-500' : 'bg-cyan-500'
            }`} />
          </div>
          <span className="text-zinc-300 font-bold tracking-widest text-[11px] uppercase">
            YAMEN_ALHUDHUD <span className="text-zinc-600 font-normal">//</span> <span className="text-rose-500 font-bold tracking-widest">{t.nonEmployee}</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* HUD Interactive Menu - Minimalist Design */}
          <nav className="hidden md:flex items-center gap-6 text-zinc-500 font-bold tracking-widest text-[9px]">
            <button
              onClick={() => scrollToSection('about-section')}
              className={`transition-colors cursor-pointer hover:text-white ${activeState === 'about' ? 'text-amber-400' : ''}`}
            >
              {t.menuAbout}
            </button>
            <button
              onClick={() => scrollToSection('skills-section')}
              className={`transition-colors cursor-pointer hover:text-white ${activeState === 'skills' ? 'text-emerald-400' : ''}`}
            >
              {t.menuSkills}
            </button>
            <button
              onClick={() => scrollToSection('projects-section')}
              className={`transition-colors cursor-pointer hover:text-white ${activeState === 'projects' ? 'text-sky-400' : ''}`}
            >
              {t.menuProjects}
            </button>
            <button
              onClick={() => scrollToSection('certificates-section')}
              className={`transition-colors cursor-pointer hover:text-white ${activeState === 'certificates' ? 'text-purple-400' : ''}`}
            >
              {t.menuCertificates}
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className={`transition-colors cursor-pointer hover:text-white ${activeState === 'contact' ? 'text-fuchsia-400' : ''}`}
            >
              {t.menuContact}
            </button>
          </nav>

          {/* Bilingual Selector Switch */}
          <div className="flex items-center gap-1 bg-zinc-950/80 border border-zinc-850 px-2 py-0.5 rounded-lg pointer-events-auto shadow-inner">
            <Languages className="w-3.5 h-3.5 text-zinc-500 mr-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`text-[9px] font-mono tracking-wider transition-all px-1.5 py-0.5 rounded ${
                language === 'en' 
                  ? 'text-cyan-400 font-bold bg-cyan-950/50 border border-cyan-800/30' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              EN
            </button>
            <span className="text-zinc-800 font-mono text-[9px] select-none">|</span>
            <button
              onClick={() => setLanguage('ar')}
              className={`text-[9px] font-mono tracking-wider transition-all px-1.5 py-0.5 rounded ${
                language === 'ar' 
                  ? 'text-cyan-400 font-bold bg-cyan-950/50 border border-cyan-800/30' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              AR
            </button>
          </div>
        </div>
      </header>

      {/* ------------------ BOTTOM BAR STATUS ------------------ */}
      <footer className="absolute bottom-6 left-6 right-6 h-20 flex justify-end items-end">
        {/* Scrolling helper details */}
        <div className="flex flex-col items-end gap-1.5 font-mono text-zinc-400">
          <div className={`p-2 rounded-lg border flex gap-2 items-center tracking-wider font-semibold transition-all duration-300 select-none ${getStatusBgColor()}`}>
            <Shield className={`w-3.5 h-3.5 ${getStatusColor()}`} />
            <span className={getStatusColor()}>{t.coreState}: {activeState.toUpperCase()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
