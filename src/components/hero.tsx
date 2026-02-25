"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Particle Grid (Canvas) ─── */
function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const spacing = 50;
    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const time = Date.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const influence = Math.max(0, 1 - dist / maxDist);

        const wave = Math.sin(time + i * 0.3 + j * 0.2) * 3;
        const px = x + influence * dx * 0.08 + wave * 0.5;
        const py = y + influence * dy * 0.08 + wave;

        const sizeBase = 1;
        const sizeGlow = sizeBase + influence * 2;
        const alpha = 0.08 + influence * 0.5;

        const r = Math.floor(influence * 180);
        const g = Math.floor(245 - influence * 200);
        const b = 255;

        ctx.beginPath();
        ctx.arc(px, py, sizeGlow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        if (influence > 0.1) {
          ctx.beginPath();
          ctx.arc(px, py, sizeGlow * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${influence * 0.07})`;
          ctx.fill();
        }
      }
    }

    ctx.strokeStyle = "rgba(0, 245, 255, 0.015)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * spacing, 0);
      ctx.lineTo(i * spacing, h);
      ctx.stroke();
    }
    for (let j = 0; j < rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * spacing);
      ctx.lineTo(w, j * spacing);
      ctx.stroke();
    }

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ─── Glitch Text ─── */
function GlitchText({
  children,
  glitchText,
  className = "",
}: {
  children: React.ReactNode;
  glitchText: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 text-cyber-cyan/60"
        style={{ animation: "glitch-1 3s infinite linear" }}
        aria-hidden="true"
      >
        {glitchText}
      </span>
      <span
        className="absolute inset-0 text-cyber-violet/60"
        style={{ animation: "glitch-2 3s infinite linear 0.1s" }}
        aria-hidden="true"
      >
        {glitchText}
      </span>
    </span>
  );
}

/* ─── Reveal Word ─── */
function RevealWord({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden py-1 align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "120%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Floating Orbs ─── */
function FloatingOrbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-1/4 left-1/5 h-64 w-64 rounded-full bg-cyber-cyan/[0.03] blur-[100px]"
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 h-80 w-80 rounded-full bg-cyber-violet/[0.04] blur-[120px]"
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyber-magenta/[0.015] blur-[150px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Hero ─── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Particle Grid Background */}
      <div className="absolute inset-0 opacity-60">
        <ParticleGrid />
      </div>

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--color-background) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: yParallax, opacity: opacityOut }}
      >
        {/* Status badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/10 bg-cyber-cyan/[0.03] px-4 py-1.5"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-cyber-cyan"
            style={{ animation: "glow-pulse 2s infinite" }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyber-cyan/70">
            Platform Active
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="font-[var(--font-orbitron)] text-5xl font-bold tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95]">
          <GlitchText glitchText="Less Friction.">
            <RevealWord delay={0}>Less</RevealWord>{" "}
            <RevealWord delay={0.1}>Friction.</RevealWord>
          </GlitchText>
        </h1>

        <motion.p
          className="mt-3 font-[var(--font-orbitron)] text-3xl font-medium tracking-[-0.02em] text-gradient-cyber sm:text-4xl md:text-5xl lg:text-[3.5rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          Better Tools.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-lg mx-auto text-sm text-white/30 leading-relaxed md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          摩擦のない、美しいツールを。
          <br />
          次世代のアプリプラットフォーム。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          <a
            href="#apps"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-cyan/10 to-cyber-violet/10 px-8 py-3 text-sm font-semibold text-white transition-all duration-500 hover:from-cyber-cyan/20 hover:to-cyber-violet/20 hover:shadow-[0_0_40px_rgba(0,245,255,0.15)]"
          >
            <span className="absolute inset-0 rounded-full border border-cyber-cyan/20 transition-colors duration-500 group-hover:border-cyber-cyan/40" />
            <span className="relative">アプリを見る</span>
            <svg
              className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#vision"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] px-8 py-3 text-sm text-white/50 transition-all duration-300 hover:border-white/15 hover:text-white/80"
          >
            ビジョンを知る
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1, ease }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-cyber-cyan/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
