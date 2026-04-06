import React from 'react'
import { getAccuracy } from '../utils/storage'

export default function StatsRow({ stats }) {
  const accuracy = getAccuracy(stats)

  return (
    <div className="stats-row">
      <div className="stat-box">
        <span className="stat-number">{stats.cardsToday}</span>
        <span className="stat-label">Cards today</span>
      </div>
      <div className="stat-box">
        <span className="stat-number">{stats.streak}</span>
        <span className="stat-label">Day streak</span>
        {stats.streak > 0 && <span className="stat-fire">🔥</span>}
      </div>
      <div className="stat-box">
        <span className="stat-number">{accuracy}%</span>
        <span className="stat-label">Accuracy</span>
      </div>
    </div>
  )
}
