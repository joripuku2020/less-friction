export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.03] px-6 py-16">
      {/* Grid lines background */}
      <div
        className="absolute inset-0 opacity-20 cyber-grid"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 blur-sm" />
              <span className="relative text-[10px] font-black text-gradient-cyber">
                LF
              </span>
            </span>
            <span className="font-[var(--font-orbitron)] text-xs font-medium tracking-[0.1em] uppercase text-white/40">
              Less Friction
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/AI_no_tayori"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 transition-colors duration-300 hover:text-cyber-cyan/60"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        {/* Copyright & Tagline */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.15em] text-white/20">
            © 2026 Seiichi Sato
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/[0.08]">
            Solving the next irritation.
          </p>
        </div>
      </div>
    </footer>
  );
}
