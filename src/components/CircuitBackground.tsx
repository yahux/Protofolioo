import React, { useEffect, useRef } from 'react';

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    // Track window resize
    const handleResize = () => {
      if (!canvas) return;
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Only resize if width changed (rotation/desktop resize) or height changed significantly (more than 120px)
      if (newWidth !== lastWidth || Math.abs(newHeight - lastHeight) > 120) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
        lastWidth = newWidth;
        lastHeight = newHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Data pulse class
    interface Trace {
      points: { x: number; y: number }[];
      speed: number;
      progress: number;
      color: string;
      size: number;
    }

    const pulses: Trace[] = [];

    // Helper to generate a random circuit trace path
    const createTrace = (): Trace => {
      const isVertical = Math.random() > 0.5;
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      
      const points = [{ x: startX, y: startY }];
      let curX = startX;
      let curY = startY;
      const segments = Math.floor(Math.random() * 3) + 2; // 2 to 4 segments
      const segmentLength = Math.random() * 80 + 40;

      for (let i = 0; i < segments; i++) {
        const direction = Math.random();
        if (isVertical) {
          if (direction < 0.4) {
            curY += segmentLength;
          } else if (direction < 0.8) {
            curY -= segmentLength;
          } else {
            curX += Math.random() > 0.5 ? segmentLength : -segmentLength;
            curY += Math.random() > 0.5 ? segmentLength : -segmentLength;
          }
        } else {
          if (direction < 0.4) {
            curX += segmentLength;
          } else if (direction < 0.8) {
            curX -= segmentLength;
          } else {
            curX += Math.random() > 0.5 ? segmentLength : -segmentLength;
            curY += Math.random() > 0.5 ? segmentLength : -segmentLength;
          }
        }
        points.push({ x: curX, y: curY });
      }

      // Choose color accent (blue, teal, green, gold, magenta)
      const colors = [
        'rgba(14, 165, 233, 0.7)', // sky-500
        'rgba(20, 184, 166, 0.7)', // teal-500
        'rgba(34, 197, 94, 0.7)',  // green-500
        'rgba(234, 179, 8, 0.7)',  // yellow-500
        'rgba(217, 70, 239, 0.7)', // fuchsia-500
      ];

      return {
        points,
        speed: Math.random() * 0.015 + 0.005,
        progress: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.4 + 0.4,
      };
    };

    // Initialize with more pulses
    for (let i = 0; i < 45; i++) {
      pulses.push(createTrace());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update pulses
      pulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          // Recycle pulse
          pulses[index] = createTrace();
          return;
        }

        // Draw the trace line in dim white/grey
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)'; // very subtle cyan trace track
        ctx.lineWidth = 0.4;
        ctx.moveTo(pulse.points[0].x, pulse.points[0].y);
        for (let i = 1; i < pulse.points.length; i++) {
          ctx.lineTo(pulse.points[i].x, pulse.points[i].y);
        }
        ctx.stroke();

        // Draw circles/nodes at joints
        pulse.points.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.fill();
        });

        // Draw glowing moving particle
        const totalPoints = pulse.points.length;
        const currentSegmentProgress = pulse.progress * (totalPoints - 1);
        const segmentIdx = Math.floor(currentSegmentProgress);
        const ratio = currentSegmentProgress - segmentIdx;

        if (segmentIdx < totalPoints - 1) {
          const p1 = pulse.points[segmentIdx];
          const p2 = pulse.points[segmentIdx + 1];
          const x = p1.x + (p2.x - p1.x) * ratio;
          const y = p1.y + (p2.y - p1.y) * ratio;

          // Glow effect
          ctx.beginPath();
          ctx.arc(x, y, pulse.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color.replace('0.7', '0.15');
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div id="circuit-bg-container" className="fixed inset-0 w-full h-full bg-[#0a0a0b] overflow-hidden -z-20">
      {/* Absolute circuit-grid pattern from Sophisticated Dark design */}
      <div id="circuit-grid-overlay" className="absolute inset-0 circuit-grid opacity-[0.45] -z-10" />

      {/* Manual Trace Lines from the Sophisticated Dark design */}
      <div className="trace h-[1px] w-full top-[20%] opacity-50 z-[-5]" />
      <div className="trace h-[1px] w-full top-[80%] opacity-30 z-[-5]" />
      <div className="trace w-[1px] h-full left-[15%] opacity-40 z-[-5]" />
      <div className="trace w-[1px] h-full right-[15%] opacity-40 z-[-5]" />

      {/* Repeating circuit board paths SVG background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none -z-10">
        <defs>
          <pattern id="circuit-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal and vertical paths */}
            <path d="M 10 10 L 90 10 L 110 30 L 190 30" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <path d="M 50 100 L 50 140 L 70 160 L 150 160" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <path d="M 120 50 L 120 90 L 100 110 L 20 110" fill="none" stroke="#06b2d2" strokeWidth="1.2" strokeDasharray="3,3" />
            <path d="M 180 120 L 180 180 M 180 180 L 140 180" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            
            {/* Diagonal interconnects */}
            <path d="M 20 50 L 50 20" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <path d="M 160 80 L 190 110" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            
            {/* Nodes / Pads */}
            <circle cx="10" cy="10" r="2.5" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <circle cx="90" cy="10" r="2.5" fill="#06b2d2" />
            <circle cx="190" cy="30" r="2.5" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <circle cx="50" cy="100" r="2.5" fill="#06b2d2" />
            <circle cx="150" cy="160" r="2.5" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <circle cx="120" cy="50" r="2.5" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <circle cx="20" cy="110" r="2.5" fill="#06b2d2" />
            <circle cx="180" cy="120" r="2.5" fill="none" stroke="#06b2d2" strokeWidth="1.2" />
            <circle cx="140" cy="180" r="2.5" fill="#06b2d2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>

      {/* 2. Custom Glowing Trace Paths for the Propagation Effect */}
      <svg
        id="propagation-svg"
        viewBox="0 0 1000 1000"
        className="absolute w-[3000px] h-[3000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
      >
        <defs>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background/dormant paths (dim cyan, always visible) */}
        <g opacity="0.08">
          <path d="M 500 500 L 450 450 L 450 300 L 300 300 L 200 200 L 100 200 L 50 150 L 0 150" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 400 400 L 300 400 L 250 350 L 250 200 L 150 100 L 0 100" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 550 450 L 550 300 L 700 300 L 800 200 L 900 200 L 950 150 L 1000 150" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 600 400 L 700 400 L 750 350 L 750 200 L 850 100 L 1000 100" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 450 550 L 450 700 L 300 700 L 200 800 L 100 800 L 50 850 L 0 850" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 400 600 L 300 600 L 250 650 L 250 800 L 150 900 L 0 900" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 550 550 L 550 700 L 700 700 L 800 800 L 900 800 L 950 850 L 1000 850" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 600 600 L 700 600 L 750 650 L 750 800 L 850 900 L 1000 900" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 500 380 L 460 340 L 460 200 L 380 120 L 380 0" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 500 380 L 540 340 L 540 200 L 620 120 L 620 0" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 500 620 L 460 660 L 460 800 L 380 880 L 380 1000" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 500 620 L 540 660 L 540 800 L 620 880 L 620 1000" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 380 500 L 340 460 L 200 460 L 120 380 L 0 380" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 380 500 L 340 540 L 200 540 L 120 620 L 0 620" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 620 500 L 660 460 L 800 460 L 880 380 L 1000 380" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
          <path d="M 500 500 L 620 500 L 660 540 L 800 540 L 880 620 L 1000 620" fill="none" stroke="#06b2d2" strokeWidth="0.4" />
        </g>
        
        {/* Animated glowing paths (animated with GSAP) */}
        <g id="glowing-traces-group">
          <path className="prop-path" pathLength="100" d="M 500 500 L 450 450 L 450 300 L 300 300 L 200 200 L 100 200 L 50 150 L 0 150" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 400 400 L 300 400 L 250 350 L 250 200 L 150 100 L 0 100" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 550 450 L 550 300 L 700 300 L 800 200 L 900 200 L 950 150 L 1000 150" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 600 400 L 700 400 L 750 350 L 750 200 L 850 100 L 1000 100" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 450 550 L 450 700 L 300 700 L 200 800 L 100 800 L 50 850 L 0 850" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 400 600 L 300 600 L 250 650 L 250 800 L 150 900 L 0 900" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 550 550 L 550 700 L 700 700 L 800 800 L 900 800 L 950 850 L 1000 850" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 600 600 L 700 600 L 750 650 L 750 800 L 850 900 L 1000 900" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 500 380 L 460 340 L 460 200 L 380 120 L 380 0" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 500 380 L 540 340 L 540 200 L 620 120 L 620 0" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 500 620 L 460 660 L 460 800 L 380 880 L 380 1000" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 500 620 L 540 660 L 540 800 L 620 880 L 620 1000" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 380 500 L 340 460 L 200 460 L 120 380 L 0 380" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 380 500 L 340 540 L 200 540 L 120 620 L 0 620" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 620 500 L 660 460 L 800 460 L 880 380 L 1000 380" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
          <path className="prop-path" pathLength="100" d="M 500 500 L 620 500 L 660 540 L 800 540 L 880 620 L 1000 620" fill="none" stroke="#06b2d2" strokeWidth="0.8" filter="url(#glow-filter)" strokeDasharray="100" strokeDashoffset="100" opacity="0" />
        </g>
      </svg>

      {/* Canvas for dynamic glowing particle pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Tech-feeling ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-cyan-950/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-950/15 blur-[140px] pointer-events-none -z-10" />
    </div>
  );
}
