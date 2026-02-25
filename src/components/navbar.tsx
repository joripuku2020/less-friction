"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "#" },
    { label: "Apps", href: "#apps" },
    { label: "Vision", href: "#vision" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full px-8 py-3 transition-all duration-700 ${scrolled
                        ? "glass-strong shadow-[0_0_30px_rgba(0,245,255,0.05)]"
                        : "bg-transparent"
                    }`}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-2 font-[var(--font-orbitron)] text-sm font-bold tracking-[0.15em] uppercase"
                >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyber-cyan/30 to-cyber-violet/30 blur-sm" />
                        <span className="relative text-xs font-black text-gradient-cyber">
                            LF
                        </span>
                    </span>
                    <span className="hidden sm:inline text-white/80">Less Friction</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="relative text-xs font-medium tracking-[0.1em] uppercase text-white/40 transition-colors duration-300 hover:text-cyber-cyan group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyber-cyan to-cyber-violet transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#apps"
                    className="hidden md:inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyber-cyan transition-all duration-300 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                    Explore
                </a>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <motion.span
                        className="block h-px w-5 bg-white/60"
                        animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    />
                    <motion.span
                        className="block h-px w-5 bg-white/60"
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    />
                    <motion.span
                        className="block h-px w-5 bg-white/60"
                        animate={
                            mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                        }
                    />
                </button>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex items-center justify-center glass-strong"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="text-2xl font-medium tracking-[0.1em] uppercase text-white/60 hover:text-cyber-cyan transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
