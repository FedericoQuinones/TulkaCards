import React from 'react'
import FishMascot from './FishMascot'

const tabs = [
  { id: 'decks', label: 'Decks', icon: '🗂️' },
  { id: 'library', label: 'Library', icon: '📚' },
  { id: 'import', label: 'Import', icon: '📥' },
]

export default function Navigation({ activeTab, onTabChange, onLogoClick }) {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="nav-top" role="navigation" aria-label="Main navigation">
        <button className="nav-logo" onClick={onLogoClick} aria-label="Go to home">
          <FishMascot size={36} />
          <span className="nav-logo-text">TulkaCards</span>
          <span className="nav-tagline">Learn & Swim</span>
        </button>
        <div className="nav-tabs-desktop">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab-desktop ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span className="nav-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="nav-bottom" role="navigation" aria-label="Main navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab-mobile ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            aria-label={tab.label}
          >
            <span className="nav-tab-icon">{tab.icon}</span>
            <span className="nav-tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
