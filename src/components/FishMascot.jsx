import React from 'react'

export default function FishMascot({ size = 80, animate = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`fish-mascot ${animate ? 'fish-swim' : ''} ${className}`}
      role="img"
      aria-label="TulkaCards fish mascot"
    >
      {/* Body */}
      <ellipse cx="60" cy="60" rx="38" ry="32" fill="#5DCAA5" />
      <ellipse cx="60" cy="60" rx="38" ry="32" fill="url(#fishGrad)" />

      {/* Belly highlight */}
      <ellipse cx="58" cy="68" rx="24" ry="16" fill="#9FE1CB" opacity="0.6" />

      {/* Top fin */}
      <path d="M55 28 Q60 10 68 28" fill="#F0997B" stroke="#E88A6C" strokeWidth="1" />
      <path d="M58 28 Q61 16 65 28" fill="#F5B09A" opacity="0.5" />

      {/* Tail */}
      <path d="M98 60 Q118 42 112 60 Q118 78 98 60Z" fill="#F0997B" />
      <path d="M98 60 Q112 50 108 60 Q112 70 98 60Z" fill="#F5B09A" opacity="0.5" />

      {/* Side fin */}
      <ellipse cx="50" cy="76" rx="12" ry="6" fill="#F0997B" transform="rotate(-20, 50, 76)" opacity="0.9" />

      {/* Left eye */}
      <circle cx="42" cy="52" r="10" fill="white" />
      <circle cx="44" cy="51" r="6" fill="#1D4E5C" />
      <circle cx="46" cy="49" r="2.5" fill="white" />

      {/* Right eye */}
      <circle cx="68" cy="52" r="10" fill="white" />
      <circle cx="70" cy="51" r="6" fill="#1D4E5C" />
      <circle cx="72" cy="49" r="2.5" fill="white" />

      {/* Mouth */}
      <path d="M50 66 Q55 72 62 66" stroke="#1D4E5C" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Blush cheeks */}
      <ellipse cx="36" cy="62" rx="6" ry="4" fill="#ED93B1" opacity="0.4" />
      <ellipse cx="76" cy="62" rx="6" ry="4" fill="#ED93B1" opacity="0.4" />

      {/* Scales pattern */}
      <circle cx="55" cy="55" r="3" fill="#4CB896" opacity="0.3" />
      <circle cx="65" cy="58" r="3" fill="#4CB896" opacity="0.3" />
      <circle cx="60" cy="48" r="2.5" fill="#4CB896" opacity="0.2" />
      <circle cx="72" cy="65" r="2.5" fill="#4CB896" opacity="0.2" />

      <defs>
        <radialGradient id="fishGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#7DD8B8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5DCAA5" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function FishCelebrate({ size = 120 }) {
  return (
    <div className="fish-celebrate">
      <FishMascot size={size} animate />
      <div className="celebrate-sparkles">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>✨</span>
        ))}
      </div>
    </div>
  )
}
