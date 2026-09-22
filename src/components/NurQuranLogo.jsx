export function NurQuranLogo({ size = 'md', animated = false, className = '' }) {
  const sizeMap = {
    xs: { box: 'w-7 h-7 rounded-xl', font: 'text-sm' },
    sm: { box: 'w-8 h-8 rounded-xl', font: 'text-base' },
    md: { box: 'w-10 h-10 rounded-2xl', font: 'text-xl' },
    lg: { box: 'w-16 h-16 rounded-2xl', font: 'text-3xl' },
    xl: { box: 'w-24 h-24 rounded-3xl', font: 'text-4xl' },
    '2xl': { box: 'w-32 h-32 rounded-3xl', font: 'text-6xl' }
  };

  const selected = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow */}
      {animated && (
        <div className="absolute inset-0 rounded-3xl bg-amber-400/25 dark:bg-emerald-500/20 blur-xl animate-pulse pointer-events-none" />
      )}

      {/* Islamic 8-pointed star badge container */}
      <div
        className={`relative ${selected.box} bg-linear-to-br from-[#064e3b] via-[#043d2f] to-[#02281f] text-white flex items-center justify-center shadow-md border-2 border-amber-400/70 dark:border-amber-400/90 transition-transform ${
          animated ? 'hover:scale-105 duration-300' : ''
        }`}
      >
        {/* Subtle geometric star overlay inside */}
        <svg
          className="absolute inset-0 w-full h-full p-1 opacity-25 text-amber-300 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="18" y="18" width="64" height="64" rx="8" />
          <rect
            x="18"
            y="18"
            width="64"
            height="64"
            rx="8"
            transform="rotate(45 50 50)"
          />
          <circle cx="50" cy="50" r="32" strokeWidth="1.5" />
        </svg>

        {/* Center Calligraphic "Nun" (ن) */}
        <span className={`relative z-10 font-arabic font-bold text-amber-300 ${selected.font} drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]`}>
          ن
        </span>

        {/* Sparkle dot accent */}
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-amber-300" />
      </div>
    </div>
  );
}
