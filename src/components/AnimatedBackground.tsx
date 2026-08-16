import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Raw mouse coordinates
  const rawMouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawMouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  // Multi-tiered springs for fluid trailing cursor effect ("mouse ke piche piche move kare")
  // Tier 1: Core Cursor (Fastest - crisp direct dot & inner ring)
  const coreX = useSpring(rawMouseX, { stiffness: 450, damping: 28 });
  const coreY = useSpring(rawMouseY, { stiffness: 450, damping: 28 });

  // Tier 2: Mid Cursor Ring (Medium Lag)
  const midX = useSpring(rawMouseX, { stiffness: 180, damping: 22 });
  const midY = useSpring(rawMouseY, { stiffness: 180, damping: 22 });

  // Tier 3: Trailing Glow Ring (Slower Lag)
  const trail1X = useSpring(rawMouseX, { stiffness: 90, damping: 20 });
  const trail1Y = useSpring(rawMouseY, { stiffness: 90, damping: 20 });

  // Tier 4: Ambient Soft Spotlight (Slowest Lag - organic floating trailing aura)
  const spotX = useSpring(rawMouseX, { stiffness: 45, damping: 18 });
  const spotY = useSpring(rawMouseY, { stiffness: 45, damping: 18 });

  // Mouse offset from screen center for parallax tilt
  const mouseParallaxX = useTransform(spotX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-35, 35]);
  const mouseParallaxY = useTransform(spotY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-35, 35]);

  const { scrollYProgress } = useScroll();

  // Smooth scroll springs
  const smoothYProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Parallax transform calculations for floating ambient glowing orbs
  const orb1Y = useTransform(smoothYProgress, [0, 1], ['0%', '150%']);
  const orb1Scale = useTransform(smoothYProgress, [0, 0.5, 1], [1, 1.3, 0.9]);
  const orb1Rotate = useTransform(smoothYProgress, [0, 1], [0, 360]);

  const orb2Y = useTransform(smoothYProgress, [0, 1], ['0%', '-120%']);
  const orb2Scale = useTransform(smoothYProgress, [0, 0.5, 1], [1.2, 0.8, 1.4]);

  const orb3Y = useTransform(smoothYProgress, [0, 1], ['0%', '80%']);

  // Floating ticker badges translation
  const ticker1X = useTransform(smoothYProgress, [0, 1], ['-10%', '30%']);
  const ticker2X = useTransform(smoothYProgress, [0, 1], ['20%', '-20%']);
  const ticker3Y = useTransform(smoothYProgress, [0, 1], ['0%', '200%']);

  // Track cursor position & velocity in ref for canvas calculations
  const mousePosRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, speed: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mousePosRef.current.lastX = mousePosRef.current.x;
      mousePosRef.current.lastY = mousePosRef.current.y;
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
      mousePosRef.current.speed = speed;

      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  // Canvas particle grid & dynamic cursor trail animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.6 ? '#F0C040' : Math.random() > 0.3 ? '#00D4FF' : '#00E676'
    }));

    // Floating financial candlestick lines
    const candleCount = 20;
    const candles = Array.from({ length: candleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      height: Math.random() * 45 + 15,
      isGreen: Math.random() > 0.4,
      speedY: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.35 + 0.1
    }));

    // Mouse stardust spark particles array for trailing tail
    interface CursorSpark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxLife: number;
      life: number;
      color: string;
    }
    const cursorSparks: CursorSpark[] = [];

    // Mouse path breadcrumbs for comet laser ribbon
    interface MousePathPoint {
      x: number;
      y: number;
      time: number;
    }
    const mousePathHistory: MousePathPoint[] = [];

    let currentScroll = window.scrollY;

    const render = () => {
      const scrollDiff = window.scrollY - currentScroll;
      currentScroll = window.scrollY;

      ctx.clearRect(0, 0, width, height);

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const mSpeed = mousePosRef.current.speed;

      // Append breadcrumb point if mouse is active
      if (mx > 0 && my > 0) {
        const now = Date.now();
        mousePathHistory.push({ x: mx, y: my, time: now });

        // Generate gold/cyan spark dust when cursor moves
        if (mSpeed > 1) {
          const sparkCount = Math.min(Math.floor(mSpeed / 4) + 1, 4);
          for (let s = 0; s < sparkCount; s++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.8 + 0.4;
            cursorSparks.push({
              x: mx + (Math.random() - 0.5) * 8,
              y: my + (Math.random() - 0.5) * 8,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 2.8 + 1,
              alpha: 0.9,
              maxLife: Math.random() * 25 + 15,
              life: 0,
              color: Math.random() > 0.5 ? '#F0C040' : Math.random() > 0.2 ? '#00D4FF' : '#00E676'
            });
          }
        }
      }

      // Filter old breadcrumbs (> 350ms)
      const now = Date.now();
      while (mousePathHistory.length > 0 && now - mousePathHistory[0].time > 350) {
        mousePathHistory.shift();
      }

      // Draw subtle moving grid lines
      const gridOffset = (window.scrollY * 0.2) % 60;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = gridOffset; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render Floating Candlestick Bars
      candles.forEach((c) => {
        c.y -= c.speedY + scrollDiff * 0.05;
        if (c.y < -60) c.y = height + 60;
        if (c.y > height + 60) c.y = -60;

        const candleColor = c.isGreen ? `rgba(0, 230, 118, ${c.alpha})` : `rgba(255, 71, 87, ${c.alpha})`;

        // Wick
        ctx.strokeStyle = candleColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y - 10);
        ctx.lineTo(c.x, c.y + c.height + 10);
        ctx.stroke();

        // Body
        ctx.fillStyle = candleColor;
        ctx.fillRect(c.x - 3, c.y, 6, c.height);
      });

      // Render Mouse Comet Tail Ribbon (Glowing trail line following cursor path)
      if (mousePathHistory.length > 2) {
        ctx.save();
        for (let i = 1; i < mousePathHistory.length; i++) {
          const pt1 = mousePathHistory[i - 1];
          const pt2 = mousePathHistory[i];
          const ageRatio = (now - pt2.time) / 350; // 0 = newest, 1 = oldest
          const alpha = (1 - ageRatio) * 0.55;
          const lineWidth = (1 - ageRatio) * 6 + 1;

          ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 212, 255, ${alpha})` : `rgba(240, 192, 64, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render Trailing Mouse Sparks (Stardust trailing behind mouse)
      for (let i = cursorSparks.length - 1; i >= 0; i--) {
        const sp = cursorSparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life++;

        const lifeRatio = sp.life / sp.maxLife;
        const currentAlpha = sp.alpha * (1 - lifeRatio);

        if (sp.life >= sp.maxLife) {
          cursorSparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Glowing Background Nodes & Connection Lines
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY - scrollDiff * 0.08;

        // Mouse repelling & magnet interaction physics
        if (mx > 0 && my > 0) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            const force = (150 - mdist) / 150;
            p.x += (mdx / mdist) * force * 2.8;
            p.y += (mdy / mdist) * force * 2.8;
          }
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles to mouse if mouse is near
        if (mx > 0 && my > 0) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - mdist / 160) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        // Connect nearby nodes with delicate constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* HTML Canvas with particle constellation, stardust sparks & comet trail */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* TIER 4: Ambient Soft Spotlight (Slowest Lag - Organic Large Floating Aura) */}
      <motion.div
        style={{
          x: spotX,
          y: spotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-[#00D4FF]/25 via-[#F0C040]/15 to-transparent blur-[100px] pointer-events-none"
      />

      {/* TIER 3: Trailing Glow Ring (Slower Lag - Floats smoothly behind cursor) */}
      <motion.div
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-[180px] h-[180px] rounded-full border border-[#F0C040]/40 bg-[#F0C040]/10 blur-[20px] pointer-events-none"
      />

      {/* TIER 2: Mid Cursor Ring (Medium Lag - Fluid Cyan Glowing Ring) */}
      <motion.div
        style={{
          x: midX,
          y: midY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-[44px] h-[44px] rounded-full border-2 border-[#00D4FF] bg-[#00D4FF]/10 shadow-[0_0_20px_#00D4FF] pointer-events-none"
      />

      {/* TIER 1: Crisp Gold Core Pointer Dot (Fastest - Right at Cursor Tip) */}
      <motion.div
        style={{
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#F0C040] to-[#00E676] shadow-[0_0_12px_#F0C040] pointer-events-none z-10"
      />

      {/* Glow Orb 1 - Gold Radial Light (Top Left / Scroll + Mouse Driven) */}
      <motion.div
        style={{ y: orb1Y, x: mouseParallaxX, scale: orb1Scale, rotate: orb1Rotate }}
        className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-radial from-[#F0C040]/15 via-[#F0C040]/5 to-transparent blur-[140px]"
      />

      {/* Glow Orb 2 - Cyan ECN Light (Middle Right / Scroll + Mouse Driven) */}
      <motion.div
        style={{ y: orb2Y, x: mouseParallaxX, scale: orb2Scale }}
        className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full bg-radial from-[#00D4FF]/15 via-[#00D4FF]/5 to-transparent blur-[160px]"
      />

      {/* Glow Orb 3 - Emerald Profit Light (Bottom Left / Scroll + Mouse Driven) */}
      <motion.div
        style={{ y: orb3Y, x: mouseParallaxY }}
        className="absolute top-[70%] -left-[10%] w-[600px] h-[600px] rounded-full bg-radial from-[#00E676]/12 via-[#00E676]/3 to-transparent blur-[150px]"
      />

      {/* Floating Scroll-Driven Parallax Market Badges */}
      <motion.div
        style={{ x: ticker1X, y: orb3Y }}
        className="absolute top-[25%] left-[5%] px-3 py-1.5 rounded-xl bg-[#141824]/40 border border-[#F0C040]/20 backdrop-blur-md font-mono text-[10px] text-[#F0C040] opacity-30 hidden lg:flex items-center gap-2 shadow-2xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F0C040] animate-ping" />
        <span>XAUUSD • 2374.85 ▲ +1.8%</span>
      </motion.div>

      <motion.div
        style={{ x: ticker2X }}
        className="absolute top-[60%] right-[6%] px-3 py-1.5 rounded-xl bg-[#141824]/40 border border-[#00D4FF]/20 backdrop-blur-md font-mono text-[10px] text-[#00D4FF] opacity-30 hidden lg:flex items-center gap-2 shadow-2xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-ping" />
        <span>MT5 ECN EA ACTIVE • 0ms</span>
      </motion.div>

      <motion.div
        style={{ y: ticker3Y }}
        className="absolute top-[85%] left-[12%] px-3 py-1.5 rounded-xl bg-[#141824]/40 border border-[#00E676]/20 backdrop-blur-md font-mono text-[10px] text-[#00E676] opacity-30 hidden lg:flex items-center gap-2 shadow-2xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
        <span>IB REBATE • $15/LOT DISPATCHED</span>
      </motion.div>

      {/* Light Overlay Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0A0E1A]/80" />
    </div>
  );
};


