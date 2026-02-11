"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-flip for touch devices
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setIsFlipped(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setIsFlipped(false);
  }, []);

  return (
    <section className="flex items-center justify-center px-6 py-24 md:py-32">
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        {/* ── Animated border wrapper ── */}
        <div
          className="relative cursor-pointer overflow-hidden rounded-2xl p-px"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Rotating gradient — the sweep of light around the border */}
          <motion.div
            className={`absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
              isHovering ? "opacity-100" : "opacity-50"
            }`}
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 10%, transparent 40%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Base border */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              isHovering ? "bg-white/[0.1]" : "bg-white/[0.06]"
            }`}
          />

          {/* ── Inner card ── */}
          <div className="relative rounded-[15px] bg-[#0a0a0a]">
            <div className="p-1">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                {/* Subtle grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* ── Mirror visual ── */}
                <div className="relative flex h-full w-full items-center justify-center">
                  {/* Left: Original */}
                  <motion.div
                    className="flex flex-1 items-center justify-center"
                    animate={{ opacity: isFlipped ? 0.35 : 1 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                        className="text-white/30"
                      >
                        <polygon
                          points="18,12 38,24 18,36"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-mono text-xl text-white/20 md:text-2xl">
                        R
                      </span>
                    </div>
                  </motion.div>

                  {/* Center mirror line */}
                  <motion.div
                    className="h-2/5 w-px"
                    animate={{
                      backgroundColor: isFlipped
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.1)",
                      boxShadow: isFlipped
                        ? "0 0 16px rgba(255,255,255,0.12)"
                        : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.6, ease }}
                  />

                  {/* Right: Mirrored (scaleX:-1 makes ▶R appear as Я◀) */}
                  <motion.div
                    className="flex flex-1 items-center justify-center"
                    style={{ transform: "scaleX(-1)" }}
                    animate={{ opacity: isFlipped ? 1 : 0.35 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                        className="text-white/30"
                      >
                        <polygon
                          points="18,12 38,24 18,36"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-mono text-xl text-white/20 md:text-2xl">
                        R
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]">
                  <div className="h-full w-1/3 bg-white/[0.12]" />
                </div>

                {/* State indicators */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    animate={{
                      backgroundColor: !isFlipped
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    animate={{
                      backgroundColor: isFlipped
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            Reft
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/50 md:text-base">
            Mirror any video. Instantly.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black"
          >
            Open Reft
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
