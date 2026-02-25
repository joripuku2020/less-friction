"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
    {
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: "Lightning Fast",
        desc: "ストレスフリーな高速体験。すべてのツールは速さを最優先に設計。",
        color: "cyber-cyan",
    },
    {
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        title: "Minimal Design",
        desc: "不要な要素を徹底排除。本当に必要なものだけを残した美しいUI。",
        color: "cyber-violet",
    },
    {
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: "Privacy First",
        desc: "データはあなたのもの。プライバシーを第一に考えた設計思想。",
        color: "cyber-green",
    },
    {
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
        title: "Open Platform",
        desc: "拡張可能なプラットフォーム。コミュニティと共に進化し続ける。",
        color: "cyber-magenta",
    },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const colorMap: Record<
        string,
        { border: string; bg: string; text: string; glow: string }
    > = {
        "cyber-cyan": {
            border: "border-cyber-cyan/10 group-hover:border-cyber-cyan/25",
            bg: "bg-cyber-cyan/[0.04]",
            text: "text-cyber-cyan",
            glow: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.06)]",
        },
        "cyber-violet": {
            border: "border-cyber-violet/10 group-hover:border-cyber-violet/25",
            bg: "bg-cyber-violet/[0.04]",
            text: "text-cyber-violet",
            glow: "group-hover:shadow-[0_0_30px_rgba(180,0,255,0.06)]",
        },
        "cyber-green": {
            border: "border-cyber-green/10 group-hover:border-cyber-green/25",
            bg: "bg-cyber-green/[0.04]",
            text: "text-cyber-green",
            glow: "group-hover:shadow-[0_0_30px_rgba(0,255,136,0.06)]",
        },
        "cyber-magenta": {
            border: "border-cyber-magenta/10 group-hover:border-cyber-magenta/25",
            bg: "bg-cyber-magenta/[0.04]",
            text: "text-cyber-magenta",
            glow: "group-hover:shadow-[0_0_30px_rgba(255,0,170,0.06)]",
        },
    };

    const colors = colorMap[feature.color];

    return (
        <motion.div
            ref={ref}
            className={`group relative rounded-2xl border ${colors.border} bg-white/[0.01] p-6 backdrop-blur-sm transition-all duration-500 ${colors.glow}`}
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease }}
        >
            {/* Icon */}
            <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}/70`}
            >
                {feature.icon}
            </div>

            {/* Content */}
            <h3 className="font-[var(--font-orbitron)] text-sm font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors duration-300">
                {feature.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/30 group-hover:text-white/45 transition-colors duration-300">
                {feature.desc}
            </p>
        </motion.div>
    );
}

export function Features() {
    const headingRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headingRef, { once: true, margin: "-10%" });

    return (
        <section id="vision" className="relative px-6 py-32 md:py-40">
            {/* Background grid lines */}
            <div
                className="absolute inset-0 cyber-grid opacity-30"
                aria-hidden="true"
            />

            {/* Section heading */}
            <div
                ref={headingRef}
                className="relative mx-auto max-w-4xl text-center mb-16"
            >
                <motion.span
                    className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-cyan/40 mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, ease }}
                >
                    ── Our Vision ──
                </motion.span>
                <motion.h2
                    className="font-[var(--font-orbitron)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease }}
                >
                    <span className="text-gradient-cyber">Creating the Future</span>
                </motion.h2>
                <motion.p
                    className="mt-4 text-sm text-white/30 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                >
                    日々の摩擦を解消する、次世代ツールプラットフォームの構築
                </motion.p>
            </div>

            {/* Feature cards grid */}
            <div className="relative mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map((feature, i) => (
                    <FeatureCard key={feature.title} feature={feature} index={i} />
                ))}
            </div>
        </section>
    );
}
