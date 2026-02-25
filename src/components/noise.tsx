export function NoiseOverlay() {
  return (
    <>
      {/* Film grain noise */}
      <svg
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.02]"
        aria-hidden="true"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[99] opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.03) 2px, rgba(0,245,255,0.03) 4px)",
        }}
      />

      {/* Moving scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-[99] overflow-hidden opacity-[0.04]"
        aria-hidden="true"
      >
        <div
          className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent"
          style={{ animation: "scanline 8s linear infinite" }}
        />
      </div>
    </>
  );
}
