import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseVal: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const SmoothAnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const isMobile = width < 768;
    const particleCount = isMobile ? 28 : 58;
    const connectionDistance = isMobile ? 85 : 130;

    const colors = [
      'rgba(2, 132, 199, ',   // Sky Blue (#0284C7)
      'rgba(6, 182, 212, ',   // Cyan (#06B6D4)
      'rgba(99, 102, 241, ',  // Indigo (#6366F1)
      'rgba(16, 185, 129, ',  // Emerald (#10B981)
      'rgba(139, 92, 246, ',  // Purple (#8B5CF6)
    ];

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.4 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    // Occasional subtle radar ripples
    const ripples: Ripple[] = [];
    let lastRippleTime = 0;

    // Mouse tracking for subtle organic interaction
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.016;

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Spawn periodic gentle ripples
      if (time - lastRippleTime > 4.5 && ripples.length < 3) {
        lastRippleTime = time;
        ripples.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1,
          radius: 5,
          maxRadius: Math.random() * 120 + 80,
          alpha: 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Draw and update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.65;
        r.alpha -= 0.0018;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw particle constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw connections to mouse if close
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Gentle repulsion away from mouse
            const force = (1 - mDist / 140) * 0.6;
            p1.vx += (mdx / (mDist || 1)) * force * 0.2;
            p1.vy += (mdy / (mDist || 1)) * force * 0.2;
          }
        }

        // Pulse alpha
        p1.pulseVal += p1.pulseSpeed;
        p1.alpha = p1.baseAlpha + Math.sin(p1.pulseVal) * 0.18;

        // Draw particle with subtle ambient glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${Math.max(0.05, p1.alpha)})`;
        ctx.shadowColor = `${p1.color}0.4)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Friction to prevent high speed from mouse push
        p1.vx *= 0.992;
        p1.vy *= 0.992;

        // Ensure minimum slow drift
        if (Math.abs(p1.vx) < 0.08) p1.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(p1.vy) < 0.08) p1.vy += (Math.random() - 0.5) * 0.05;

        // Screen wrap
        if (p1.x < -10) p1.x = width + 10;
        else if (p1.x > width + 10) p1.x = -10;

        if (p1.y < -10) p1.y = height + 10;
        else if (p1.y > height + 10) p1.y = -10;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ── 1. Soft Dynamic Gradient Aurora Orbs (Smooth GPU Breathing) ── */}
      <div 
        className="absolute -top-40 -left-20 w-[620px] h-[620px] rounded-full blur-[140px] opacity-70 animate-aurora-slow"
        style={{
          background: 'radial-gradient(circle, rgba(2,132,199,0.22) 0%, rgba(56,189,248,0.12) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-1/4 -right-32 w-[680px] h-[680px] rounded-full blur-[150px] opacity-65 animate-aurora-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(129,140,248,0.10) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-2/3 -left-32 w-[580px] h-[580px] rounded-full blur-[130px] opacity-60 animate-aurora-drift"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(2,132,199,0.10) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-55 animate-aurora-slow"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(52,211,153,0.08) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* ── 2. Light Geometric Grid Matrix ── */}
      <div className="absolute inset-0 grid-light-pattern opacity-60" />
      <div className="absolute inset-0 grid-dots-pattern opacity-40" />

      {/* ── 3. Ultra-Smooth HTML5 Canvas Particles & Constellation ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block" 
        style={{ willChange: 'transform' }}
      />

      {/* ── 4. Floating Decorative Financial Elements (Smooth Parallax Badges) ── */}
      <div className="hidden lg:block absolute top-28 left-8 animate-float-smooth-1 opacity-85">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-lg shadow-sky-500/10 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#0F172A]">XAUUSD</span>
          <span className="text-emerald-600 font-extrabold">+0.45%</span>
        </div>
      </div>

      <div className="hidden lg:block absolute top-48 right-12 animate-float-smooth-2 opacity-85">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-lg shadow-indigo-500/10 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
          <span className="text-[#0284C7]">⚡</span>
          <span className="text-[#0F172A]">Daily ROI</span>
          <span className="text-[#0284C7] font-extrabold">0.8% - 2.0%</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-[52%] left-10 animate-float-smooth-3 opacity-80">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/10 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
          <span className="text-emerald-600">🛡️</span>
          <span className="text-[#0F172A]">BEP20 Verified</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-[68%] right-10 animate-float-smooth-1 opacity-80">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-lg shadow-amber-500/10 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
          <span className="text-amber-500">⏱</span>
          <span className="text-[#0F172A]">Mon–Fri Settlement</span>
        </div>
      </div>

      <div className="hidden 2xl:block absolute bottom-24 left-24 animate-float-smooth-2 opacity-75">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>72h Capital Liquidity</span>
        </div>
      </div>

      {/* ── 5. Ambient Flowing Liquidity Waves (SVG with Soft Gradient) ── */}
      <svg 
        className="absolute top-1/4 left-0 w-full h-[450px] opacity-35 pointer-events-none animate-wave-drift" 
        viewBox="0 0 1440 320" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,192C672,171,768,117,864,117.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
          fill="url(#bg-wave-gradient-1)" 
        />
        <path 
          d="M0,192L48,186.7C96,181,192,171,288,149.3C384,128,480,96,576,112C672,128,768,192,864,208C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
          fill="url(#bg-wave-gradient-2)" 
          opacity="0.6"
        />
        <defs>
          <linearGradient id="bg-wave-gradient-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="bg-wave-gradient-2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.04" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
