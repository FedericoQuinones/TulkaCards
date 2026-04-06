import React from 'react'

export default function Bubbles() {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 6 + Math.random() * 20,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 12,
    opacity: 0.08 + Math.random() * 0.15,
  }))

  return (
    <div className="bubbles-container" aria-hidden="true">
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  )
}
