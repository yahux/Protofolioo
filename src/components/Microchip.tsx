import React, { useRef, useState, useEffect } from 'react';
import { Thermometer, Radio, Activity, MapPin } from 'lucide-react';
import { ChipState } from '../types';

interface MicrochipProps {
  state: ChipState;
  scrollPercent: number;
  scrollSpeed: number;
}

export default function Microchip({ state, scrollPercent, scrollSpeed }: MicrochipProps) {
  const chipRef = useRef<HTMLDivElement | null>(null);
  const jordanTemp = 24; // Static value to remove external API dependency

  // Compute stats based on scroll parameters
  const coreLoad = Math.min(100, Math.floor(scrollPercent)); // base 0% to 100% based on scroll completion


  // Color mappings for different states matching the Sophisticated Dark theme specs
  const themeColors = {
    standby: {
      glow: 'shadow-[0_0_80px_-10px_rgba(6,182,212,0.45),_inset_0_0_20px_rgba(6,182,212,0.2)] border-cyan-500/50',
      text: 'text-cyan-400',
      bgGlow: 'from-cyan-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-cyan-500',
      label: 'CORE_READY',
    },
    about: {
      glow: 'shadow-[0_0_80px_-10px_rgba(234,179,8,0.45),_inset_0_0_20px_rgba(234,179,8,0.2)] border-amber-500/50',
      text: 'text-amber-400',
      bgGlow: 'from-amber-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-amber-500',
      label: 'BIOMETRICS_OK',
    },
    skills: {
      glow: 'shadow-[0_0_80px_-10px_rgba(34,197,94,0.45),_inset_0_0_20px_rgba(34,197,94,0.2)] border-emerald-500/50',
      text: 'text-emerald-400',
      bgGlow: 'from-emerald-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-emerald-500',
      label: 'CORES_SCANNING',
    },
    projects: {
      glow: 'shadow-[0_0_80px_-10px_rgba(14,165,233,0.45),_inset_0_0_20px_rgba(14,165,233,0.2)] border-sky-500/50',
      text: 'text-sky-400',
      bgGlow: 'from-sky-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-sky-500',
      label: 'DATA_CONNECTED',
    },
    certificates: {
      glow: 'shadow-[0_0_80px_-10px_rgba(168,85,247,0.45),_inset_0_0_20px_rgba(168,85,247,0.2)] border-purple-500/50',
      text: 'text-purple-400',
      bgGlow: 'from-purple-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-purple-500',
      label: 'VERIFIED_CRED',
    },
    contact: {
      glow: 'shadow-[0_0_80px_-10px_rgba(217,70,239,0.45),_inset_0_0_20px_rgba(217,70,239,0.2)] border-fuchsia-500/50',
      text: 'text-fuchsia-400',
      bgGlow: 'from-fuchsia-950/35 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-fuchsia-500',
      label: 'UPLINK_STABLE',
    },
    done: {
      glow: 'shadow-[0_0_40px_-10px_rgba(239,68,68,0.3),_inset_0_0_10px_rgba(239,68,68,0.1)] border-red-500/30',
      text: 'text-red-400',
      bgGlow: 'from-red-950/15 via-[#0d0d0e] to-[#0a0a0b]',
      accent: 'bg-red-500/70',
      label: 'POWER_SAVE',
    },
  };

  const currentTheme = themeColors[state];

  return (
    <div
      id="fixed-microchip-container"
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-10]"
    >
      <div
        ref={chipRef}
        id="interactive-microchip"
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* Absolute Background Ambient Glow that fills a bit of screen behind the chip */}
        <div 
          id="chip-backglow"
          className={`absolute w-96 h-96 rounded-full blur-[80px] opacity-40 transition-all duration-700 -z-10 ${
            state === 'standby' ? 'bg-cyan-500/20' :
            state === 'about' ? 'bg-amber-500/20' :
            state === 'skills' ? 'bg-emerald-500/20' :
            state === 'projects' ? 'bg-sky-500/20' :
            state === 'contact' ? 'bg-fuchsia-500/20' : 'bg-red-500/10'
          }`}
        />

        {/* --- MAIN CHIP BODY --- */}
        <div
          id="chip-body"
          className="relative w-[210px] h-[210px] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-2xl border border-zinc-700 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-300"
        >
          {/* Internal circuitry lines printed on chip board */}
          <div className="absolute inset-2 border border-zinc-800/40 rounded-xl pointer-events-none opacity-40">
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-700/30" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-zinc-700/30" />
            <div className="absolute inset-8 rounded-lg border border-zinc-700/20" />
          </div>

          {/* --- CHIP CORE / SILICON DIE --- */}
          <div
            id="chip-silicon-core"
            className={`w-[155px] h-[155px] rounded-xl bg-gradient-to-b ${currentTheme.bgGlow} border-2 ${currentTheme.glow} chip-glow flex flex-col justify-between p-3 transition-all duration-700`}
          >
            {/* LED Screen HUD elements */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
              <div className="flex items-center gap-1">
                <Activity className={`w-3.5 h-3.5 ${currentTheme.text} animate-pulse`} />
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${currentTheme.text}`}>
                  {currentTheme.label}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.accent} animate-ping`} />
              </div>
            </div>

            {/* Diagnostic Console Grid */}
            <div className="flex-1 py-2 flex flex-col justify-center gap-1 font-mono text-[9px] leading-tight text-zinc-400">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-zinc-500">
                  <MapPin className="w-2.5 h-2.5 text-rose-500" />
                  <span>LOCATION:</span>
                </div>
                <span className={`font-semibold ${currentTheme.text}`}>Jordan</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-zinc-500">
                  <Thermometer className="w-2.5 h-2.5" />
                  <span>TEMP:</span>
                </div>
                <span className="text-zinc-300 font-semibold">
                  {jordanTemp !== null ? `${jordanTemp}°C` : '28°C'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-zinc-500">
                  <Radio className="w-2.5 h-2.5" />
                  <span>LOAD:</span>
                </div>
                <span className="text-zinc-300 font-semibold">{coreLoad}%</span>
              </div>
            </div>

            {/* Status bar loading simulation */}
            <div className="w-full">
              <div className="flex justify-between text-[7px] font-mono text-zinc-500 mb-0.5 uppercase tracking-wide">
                <span>SCROLL_OFFSET</span>
                <span>{scrollPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-[3px] bg-zinc-950 rounded-full overflow-hidden">
                <div
                  className={`h-full ${currentTheme.accent} transition-all duration-300`}
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Accent Corners from Sophisticated Dark design */}
          <div className={`absolute top-2.5 left-2.5 w-1 h-1 rounded-full ${currentTheme.accent} opacity-80`} />
          <div className="absolute top-2.5 right-2.5 w-1 h-1 bg-zinc-700 rounded-full opacity-40" />
          <div className="absolute bottom-2.5 left-2.5 w-1 h-1 bg-zinc-700 rounded-full opacity-40" />
          <div className="absolute bottom-2.5 right-2.5 w-1 h-1 bg-zinc-700 rounded-full opacity-40" />
        </div>
      </div>
    </div>
  );
}
