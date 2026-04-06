import React from 'react'

export default function Waves() {
  return (
    <div className="waves-container" aria-hidden="true">
      <svg
        className="waves-svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          className="wave wave-1"
          d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,120 L0,120Z"
          fill="#5DCAA5"
          opacity="0.15"
        />
        <path
          className="wave wave-2"
          d="M0,80 C240,40 480,100 720,60 C960,20 1200,80 1440,50 L1440,120 L0,120Z"
          fill="#85B7EB"
          opacity="0.1"
        />
        <path
          className="wave wave-3"
          d="M0,90 C180,70 360,110 540,80 C720,50 900,90 1080,70 C1260,50 1380,80 1440,70 L1440,120 L0,120Z"
          fill="#9FE1CB"
          opacity="0.12"
        />
      </svg>
    </div>
  )
}
