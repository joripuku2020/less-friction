"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export type AppInfo = {
  id: string;
  name: string;
  tag: string;
  url: string;
  icon: React.ReactNode;
};

const apps: AppInfo[] = [
  {
    id: "lag",
    name: "Open LAG",
    tag: "Vision Tool",
    url: "https://lag-app-lf.vercel.app",
    icon: (
      <svg
        className="w-4 h-4 text-cyber-cyan/70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: "reft",
    name: "Open Reft",
    tag: "Productivity Tool",
    url: "https://reft-app.vercel.app",
    icon: (
      <svg
        className="w-4 h-4 text-cyber-cyan/70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

function AppCard({ app }: { app: AppInfo }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setRotate({
        x: (y - 0.5) * -12,
        y: (x - 0.5) * 12,
      });
      setGlare({
        x: x * 100,
        y: y * 100,
        opacity: 0.12,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div className="relative w-full max-w-3xl perspective-1000 mx-auto">
      <motion.div
        ref={cardRef}
        className="group relative"
        initial={{ opacity: 0, y: 100, filter: "blur(30px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
        >
          {/* Holographic border glow */}
          <div
            className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(180,0,255,0.2), rgba(0,245,255,0.2))",
              backgroundSize: "200% 200%",
              animation: "holo-shimmer 3s linear infinite",
              filter: "blur(1px)",
            }}
          />

          {/* Card body */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm transition-colors duration-700 group-hover:border-cyber-cyan/20">
            {/* Holographic glare overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0,245,255,0.08), transparent 60%)`,
                opacity: glare.opacity,
              }}
            />

            {/* Rainbow refraction at top */}
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-px z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), rgba(180,0,255,0.4), rgba(255,0,170,0.4), rgba(0,255,136,0.4), transparent)",
              }}
            />

            {/* App embed */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <iframe
                src={app.url}
                className="pointer-events-none h-full w-full border-0 bg-black/50"
                loading="lazy"
                title={app.name}
                style={{ opacity: 0.8 }}
              />
              {/* Vignette */}
              <div
                className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(3,0,20,0.6) 100%)",
                }}
              />
            </div>

            {/* Labels */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] px-6 py-4 bg-[#0a0a0a]/80">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-cyan/10 to-cyber-violet/10 border border-cyber-cyan/10">
                  {app.icon}
                </span>
                <div>
                  <p className="font-[var(--font-orbitron)] text-xs font-semibold tracking-wide text-white/80">
                    {app.name}
                  </p>
                  <p className="text-[10px] text-white/30">{app.tag}</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-cyber-cyan/10 bg-cyber-cyan/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-cyber-cyan/50 transition-all duration-500 group-hover:text-cyber-cyan/80 group-hover:border-cyber-cyan/25">
                <span className="h-1 w-1 rounded-full bg-cyber-green" />
                Live
              </span>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export function ProductCard() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="apps"
      ref={ref}
      className="relative flex flex-col min-h-screen items-center justify-center px-6 py-32 gap-24"
    >
      {/* Section label */}
      <motion.div
        className="absolute top-16 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-cyan/30">
          ── Applications ──
        </span>
      </motion.div>

      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease }}
        aria-hidden="true"
      >
        <div className="h-[500px] w-[600px] rounded-full bg-gradient-to-br from-cyber-cyan/[0.02] to-cyber-violet/[0.02] blur-[120px]" />
      </motion.div>

      <div className="relative w-full z-10 flex flex-col gap-32 mt-16 pb-20">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
