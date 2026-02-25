"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

export function CursorGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 25, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const bgCyan = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(0,245,255,0.04), transparent 60%)`;
  const bgViolet = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(180,0,255,0.03), transparent 55%)`;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
        style={{ background: bgCyan }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
        style={{ background: bgViolet }}
        aria-hidden="true"
      />
    </>
  );
}
