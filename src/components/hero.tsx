"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

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
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] px-6">
      <div className="text-center">
        <h1 className="text-5xl font-medium tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <RevealWord delay={0}>Less</RevealWord>{" "}
          <RevealWord delay={0.08}>friction.</RevealWord>
        </h1>
        <p className="mt-2 text-5xl font-medium tracking-[-0.05em] text-white/30 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <RevealWord delay={0.2}>Better</RevealWord>{" "}
          <RevealWord delay={0.28}>tools.</RevealWord>
        </p>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-8 h-px w-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
