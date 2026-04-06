import React, { useState } from 'react'
import StatsRow from './StatsRow'
import DeckCard from './DeckCard'
import CreateDeckModal from './CreateDeckModal'
import FishMascot from './FishMascot'

export default function DecksScreen({ decks, stats, onSelectDeck, onCreateDeck, onNavigate }) {
  const [showCreate, setShowCreate] = useState(false)

  const handleCreate = (deckData) => {
    onCreateDeck(deckData)
    setShowCreate(false)
  }

  return (
    <div className="screen decks-screen">
      <StatsRow stats={stats} />

      <div className="section-header">
        <h2>My Decks</h2>
        <button className="btn-primary btn-sm" onClick={() => setShowCreate(true)}>
          + New Deck
        </button>
      </div>

      {decks.length === 0 ? (
        <div className="empty-state">
          <FishMascot size={100} animate />
          <h3>No decks yet!</h3>
          <p>Create one or browse our starter packs.</p>
          <div className="empty-state-actions">
            <button className="btn-primary" onClick={() => setShowCreate(true)}>
              + New Deck
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('library')}>
              Browse Library
            </button>
          </div>
        </div>
      ) : (
        <div className="deck-grid">
          {decks.map(deck => (
            <DeckCard key={deck.id} deck={deck} onClick={onSelectDeck} />
          ))}
        </div>
      )}

      {showCreate && (
        <CreateDeckModal
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  )
}
