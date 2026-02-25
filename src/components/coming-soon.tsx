"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ComingSoon() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center px-6 py-32 md:py-40 overflow-hidden"
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="h-64 w-64 rounded-full bg-cyber-violet/[0.03] blur-[100px]" />
      </div>

      <div className="relative text-center">
        {/* Decorative lines */}
        <motion.div
          className="mx-auto mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyber-cyan/20" />
          <span
            className="h-1.5 w-1.5 rounded-full bg-cyber-cyan/20"
            style={{ animation: "glow-pulse 3s infinite" }}
          />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyber-cyan/20" />
        </motion.div>

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <p
            className="font-[var(--font-orbitron)] text-lg font-semibold tracking-[0.15em] uppercase text-white/[0.06] sm:text-xl md:text-2xl"
            style={{
              textShadow: "0 0 40px rgba(0,245,255,0.05)",
            }}
          >
            More Apps Coming
          </p>
          <p
            className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase text-cyber-cyan/15"
            style={{ animation: "glow-pulse 4s infinite 1s" }}
          >
            ── 2025 ──
          </p>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-1 w-1 rounded-full bg-white/[0.06]"
              style={{ animation: `glow-pulse 2s infinite ${i * 0.4}s` }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
