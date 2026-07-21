import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CircuitBackground from './components/CircuitBackground';
import Microchip from './components/Microchip';
import PortfolioContent from './components/PortfolioContent';
import HUDOverlay from './components/HUDOverlay';
import { ChipState, SystemLog } from './types';
import { ArrowDown, Cpu, Shield, RefreshCw, Github, Linkedin, Mail, Video, Languages } from 'lucide-react';
import { translations, Language } from './translations';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [activeState, setActiveState] = useState<ChipState>('standby');
  const [videoError, setVideoError] = useState(false);

  // Set document direction and language on change
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const [logs, setLogs] = useState<SystemLog[]>([
    { id: '1', timestamp: '04:18:13', message: 'SYSTEM_BOOT: Core processor initialized.', type: 'info' },
    { id: '2', timestamp: '04:18:14', message: 'BIOS_OK: 64-Core systems mapping completed successfully.', type: 'success' },
    { id: '3', timestamp: '04:18:15', message: 'SYSTEM_STANDBY: Low power sleep active. Scroll to boot cores.', type: 'info' },
  ]);

  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const activeStateRef = useRef<ChipState>('standby');

  const getTimestamp = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour12: false });
  };

  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        timestamp: getTimestamp(),
        message,
        type,
      },
    ].slice(-15)); // keep the last 15 logs
  };

  const handleMessageUplink = (sender: string, text: string) => {
    addLog(`UPLINK_RECEIVED: Package from sender [${sender.toUpperCase()}] received.`, 'success');
    addLog(`TRANSMITTING: "${text.substring(0, 25)}..." to main memory...`, 'info');
    setTimeout(() => {
      addLog('TRANSMIT_SUCCESS: Payload written to sector_0x8F.', 'success');
    }, 2000);
  };

  // Scroll listener to compute percentages, speed, and active thresholds
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(pct);

      // Scroll speed calculation (lowpass filter for smooth response)
      const now = Date.now();
      const deltaY = Math.abs(scrollTop - lastScrollRef.current);
      const deltaTime = now - lastTimeRef.current;
      if (deltaTime > 0) {
        const instantSpeed = (deltaY / deltaTime) * 100;
        setScrollSpeed((prev) => Math.min(120, prev * 0.4 + instantSpeed * 0.6));
      }
      lastScrollRef.current = scrollTop;
      lastTimeRef.current = now;

      // Map scroll percentage to active portfolio sections
      let nextState: ChipState = 'standby';
      if (pct < 15) {
        nextState = 'standby'; // Spacer Top (0% to 15%)
      } else if (pct >= 15 && pct < 29) {
        nextState = 'about'; // About Section (15% to 29%)
      } else if (pct >= 29 && pct < 43) {
        nextState = 'skills'; // Skills Section (29% to 43%)
      } else if (pct >= 43 && pct < 57) {
        nextState = 'projects'; // Projects Section (43% to 57%)
      } else if (pct >= 57 && pct < 71) {
        nextState = 'certificates'; // Certificates Section (57% to 71%)
      } else if (pct >= 71 && pct < 85) {
        nextState = 'contact'; // Contact Section (71% to 85%)
      } else {
        nextState = 'done'; // Spacer Bottom (85% to 100%)
      }

      if (nextState !== activeStateRef.current) {
        activeStateRef.current = nextState;
        setActiveState(nextState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Decay scroll speed back to 0 when scrolling halts
  useEffect(() => {
    const decayInterval = setInterval(() => {
      setScrollSpeed((prev) => {
        if (prev <= 0.2) return 0;
        return prev * 0.85; // smooth exponential decay
      });
    }, 50);
    return () => clearInterval(decayInterval);
  }, []);

  // Append logs on active state transition
  useEffect(() => {
    switch (activeState) {
      case 'standby':
        addLog('SYS_STANDBY: High-efficiency energy profile active.', 'info');
        break;
      case 'about':
        addLog('CORE_WAKEUP: Initializing BIOS database channels...', 'success');
        addLog('BIO_MODULE: Rendering developer biographical telemetry...', 'info');
        break;
      case 'skills':
        addLog('SCAN_CORE: Processing structural pipeline registers...', 'warning');
        addLog('SCAN_COMPLETE: 12 computational skill libraries online.', 'success');
        break;
      case 'projects':
        addLog('DATA_STREAM: Rendering core system repositories...', 'info');
        addLog('SYNC_OK: Network Analyzer, Cache Manager, and Cryptographic Gateway repositories loaded.', 'success');
        break;
      case 'certificates':
        addLog('SECURE_VAULT: Retrieving verified credential signatures...', 'warning');
        addLog('CERTIFICATION: 4 cryptographic badges authenticated successfully.', 'success');
        break;
      case 'contact':
        addLog('TRANSCEIVER: Constructing gold transceiver trace routing...', 'warning');
        addLog('UPLINK_OK: Listening for gateway connection packets.', 'info');
        break;
      case 'done':
        addLog('COOLDOWN: Thread task queues idle. Entering deep power-save state.', 'error');
        addLog('THERMALS: CPU temperature falling. Core clocks set to 0.1GHz.', 'info');
        break;
    }
  }, [activeState]);

  // GSAP ScrollTrigger Configurations
  useEffect(() => {
    // 1. Complex Timeline for Central Chip Glow and Light Propagation
    // Trigger is defined as the whole app container to animate gradually with scroll
    const propagationTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#app-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Animate chip backglow and chip core glow to get brighter
    propagationTl.to('#chip-backglow', {
      opacity: 0.9,
      scale: 1.6,
      duration: 0.3,
      ease: 'power1.out',
    }, 0);

    propagationTl.to('#chip-silicon-core', {
      boxShadow: '0 0 120px 20px rgba(6, 182, 212, 0.8), inset 0 0 30px rgba(6, 182, 212, 0.4)',
      borderColor: 'rgba(6, 182, 212, 1)',
      duration: 0.3,
      ease: 'power1.out',
    }, 0);

    // Trigger the light propagation outward from the center gradually with scroll
    propagationTl.to('.prop-path', {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.04,
        from: 'start',
      },
      ease: 'power1.inOut',
    }, 0.1);

    // 2. Fade in and slide content cards when their parent section enters viewport
    const otherSections = ['#about-section', '#skills-section', '#projects-section', '#certificates-section', '#contact-section'];
    const triggers: ScrollTrigger[] = [];

    otherSections.forEach((sel) => {
      // Set initial transparent/slid-down state in GSAP to avoid flashes
      gsap.set(`${sel} > div`, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        filter: 'blur(5px)',
      });

      const trigger = ScrollTrigger.create({
        trigger: sel,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          gsap.to(`${sel} > div`, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(`${sel} > div`, {
            opacity: 0,
            y: 40,
            scale: 0.97,
            filter: 'blur(5px)',
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.in',
          });
        },
      });
      triggers.push(trigger);
    });

    return () => {
      propagationTl.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleReboot = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addLog('SYSTEM_REBOOT: Initializing full cold reboot sequence...', 'warning');
  };

  return (
    <div id="app-container" className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-400">
      
      {/* 1. Subtle Animated Circuit Board Pattern Background spanning whole page */}
      <CircuitBackground />

      {/* 2. Persistent HUD & Telemetry framing the viewport */}
      <HUDOverlay
        scrollPercent={scrollPercent}
        activeState={activeState}
        logs={logs}
        scrollSpeed={scrollSpeed}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 3. Fixed Position Glowing Microchip in exact viewport center */}
      <Microchip
        state={activeState}
        scrollPercent={scrollPercent}
        scrollSpeed={scrollSpeed}
      />

      {/* 4. SCROLLABLE LAYERS */}
      <div id="scrollable-sections" className="relative w-full z-10">
        
        {/* ================== LARGE SPACER TOP (min-height: 175vh) ================== */}
        <div id="spacer-top" className="min-h-[175vh] flex flex-col justify-start items-center py-16 px-4 relative gap-16">
          
          {/* Header element at top of page */}
          <div className="text-center flex flex-col items-center gap-6 mt-16 max-w-xl pb-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-mono font-medium tracking-widest text-cyan-400 uppercase leading-snug">
                {t.yamen}
              </h1>
              <p className="text-xs sm:text-sm font-mono font-light tracking-widest text-cyan-500/80 uppercase animate-pulse">
                {language === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
              </p>
            </div>

            {/* Profile Picture between Name and Content */}
            <div className="relative group pointer-events-auto my-2">
              {/* External decorative HUD circle */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-2xl bg-zinc-950">
                <img
                  src="./assets/images/yamen_portrait_1784557365585.jpg"
                  alt={t.yamen}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Small sci-fi target markers on corners or sides */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />
            </div>
          </div>

          {/* Way to see me video presentation - enlarged to max-w-3xl, set to sticky so it pins on scroll */}
          <div className="sticky top-24 z-20 flex flex-col items-center gap-4 bg-zinc-950/40 border border-zinc-900/80 p-6 rounded-2xl backdrop-blur-md shadow-2xl w-full max-w-3xl text-center pointer-events-auto transition-transform duration-300">
            <div className="flex items-center gap-2 border-b border-zinc-850 pb-2.5 w-full justify-center">
              <Video className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase">{t.wayToSeeMe}</span>
            </div>
            
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center group">
              <video 
                src="/intro.mp4" 
                autoPlay
                muted
                loop
                playsInline
                controls 
                className="w-full h-full object-cover rounded-lg"
                onError={() => setVideoError(true)}
              />
              {videoError && (
                <div id="video-fallback" className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 text-zinc-500 p-4 gap-2">
                  <div className="w-10 h-10 rounded-full border border-dashed border-zinc-800 flex items-center justify-center text-zinc-650 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                    <Video className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-mono leading-relaxed text-zinc-400 max-w-xs">
                    {t.videoPrompt}
                  </p>
                </div>
              )}
            </div>

            <div className="font-mono text-[9px] text-zinc-500 tracking-wider">
              {t.scrollText}
            </div>
          </div>

          {/* Guide at bottom of top spacer */}
          <div className="flex flex-col items-center gap-2 text-zinc-500 font-mono text-[9px] tracking-widest mt-auto mb-10 select-none">
            <span className="animate-pulse">{t.scrollInit}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* ================== INTERACTIVE PORTFOLIO CHIP AREA ================== */}
        {/* About, Skills, Projects, and Contact sections */}
        <PortfolioContent onSendMessage={handleMessageUplink} language={language} />

        {/* ================== LARGE SPACER BOTTOM (min-height: 60vh) ================== */}
        <div id="spacer-bottom" className="min-h-[60vh] flex flex-col justify-end items-center pb-20 px-4 relative gap-12">
          
          {/* Middle diagnostic feedback */}
          <div className="flex flex-col items-center gap-4 bg-rose-950/5 border border-rose-500/10 p-6 rounded-2xl backdrop-blur-sm max-w-sm text-center shadow-2xl pointer-events-auto">
            <Shield className="w-8 h-8 text-rose-500 animate-pulse" />
            <div className="font-mono text-[10px] leading-relaxed text-zinc-400">
              <span className="text-rose-400 font-bold block mb-1.5">{t.rebootActive}</span>
              {t.rebootDetails}
            </div>
            <button
              onClick={handleReboot}
              className="mt-2 text-[9px] flex items-center gap-2 bg-zinc-900 border border-zinc-850 hover:border-cyan-500/50 hover:text-cyan-400 text-zinc-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.rebootBtn}</span>
            </button>
          </div>

          {/* Systems final footer at bottom of page */}
          <footer className="text-center flex flex-col items-center gap-4 font-mono tracking-wider">
            {/* Clickable Clean Social Icon Links */}
            <div className="flex items-center gap-6 text-zinc-500 pointer-events-auto">
              <a
                href="https://github.com/yahux"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1.5 rounded bg-zinc-950/60 border border-zinc-850 hover:border-cyan-500/30"
                title="GitHub Routing"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/yamen-alhudhud-5848ba344"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1.5 rounded bg-zinc-950/60 border border-zinc-850 hover:border-cyan-500/30"
                title="LinkedIn Uplink"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:yamenalhudhud@gmail.com"
                className="hover:text-cyan-400 transition-colors p-1.5 rounded bg-zinc-950/60 border border-zinc-850 hover:border-cyan-500/30"
                title="Email Broadcast"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://web.whatsapp.com/send/?phone=00962796104412"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors p-1.5 rounded bg-zinc-950/60 border border-zinc-850 hover:border-cyan-500/30 flex items-center justify-center"
                title="WhatsApp Direct Connection"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.257 1.876 13.779.845 11.14.845c-5.439 0-9.865 4.42-9.87 9.866-.001 1.745.484 3.393 1.402 4.869L1.65 21.842l6.432-1.688zm12.336-6.31c-.302-.152-1.792-.885-2.043-.977-.253-.092-.437-.138-.62.138-.182.274-.707.885-.866 1.068-.16.183-.318.206-.62.054-.302-.152-1.275-.47-2.428-1.499-.896-.8-1.5-1.787-1.677-2.091-.176-.304-.019-.468.132-.619.136-.136.302-.353.454-.53.15-.176.2-.303.302-.505.101-.202.051-.378-.025-.53-.076-.152-.62-1.493-.849-2.043-.224-.539-.452-.465-.62-.474-.16-.008-.344-.01-.528-.01-.184 0-.484.07-.737.344-.253.274-.965.944-.965 2.302 0 1.358.987 2.67 1.124 2.854.137.183 1.943 2.967 4.707 4.16.658.284 1.171.453 1.57.58.66.21 1.262.18 1.737.109.529-.079 1.792-.733 2.043-1.441.252-.708.252-1.314.176-1.441-.075-.126-.274-.202-.576-.354z"/>
                </svg>
              </a>
            </div>

            <div className="flex flex-col items-center gap-2 text-[9px] text-zinc-600">
              <p className="uppercase">© {new Date().getFullYear()} {t.footerCopy}</p>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}
