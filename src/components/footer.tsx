export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/[0.1]">
        Solving the next irritation.
      </p>
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/25 transition-colors duration-300 hover:text-white/60"
        aria-label="Follow on X"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </footer>
  );
}
