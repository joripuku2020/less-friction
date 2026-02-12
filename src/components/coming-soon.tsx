"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function ComingSoon() {
  return (
    <section className="flex items-center justify-center px-6 py-32 md:py-40">
      <motion.p
        className="font-mono text-sm tracking-[0.3em] text-white/[0.08]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        Next.
      </motion.p>
    </section>
  );
}
