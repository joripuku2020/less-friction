"use client";

import { motion } from "framer-motion";

export function ComingSoon() {
  return (
    <section className="flex items-center justify-center px-6 py-20 md:py-28">
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Ghost card — suggests the next product without revealing it */}
        <div className="flex aspect-[5/2] w-full items-center justify-center rounded-2xl border border-dashed border-white/[0.08]">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
