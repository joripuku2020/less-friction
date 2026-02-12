"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductCard() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      {/* Ambient glow — soft halo behind the plate */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease }}
        aria-hidden="true"
      >
        <div className="h-96 w-[32rem] rounded-full bg-white/[0.015] blur-[120px]" />
      </motion.div>

      <div className="relative w-full max-w-3xl">
        <motion.a
          href="https://reft-app.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
          initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
          animate={
            isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 1, delay: 0.15, ease }}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 0.985 }}
        >
          {/* Outer border — brightens on hover */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] transition-colors duration-700 group-hover:border-white/[0.14]">
            {/* Inner border for glass depth */}
            <div className="rounded-[15px] border border-white/[0.03] bg-white/[0.01] backdrop-blur-sm">
              {/* App embed */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[14px]">
                <iframe
                  src="https://reft-app.vercel.app"
                  className="pointer-events-none h-full w-full border-0"
                  loading="lazy"
                  title="Reft"
                  style={{ opacity: 0.75 }}
                />

                {/* Vignette — blends edges into black */}
                <div
                  className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/30 transition-colors duration-500 group-hover:text-white/50">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Install App
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 transition-colors duration-500 group-hover:text-white/50">
              Reft
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
