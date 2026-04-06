import React, { useState } from 'react'
import { STARTER_DECKS, CATEGORIES } from '../data/starterDecks'

export default function LibraryScreen({ userDecks, onAddDeck }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [previewDeck, setPreviewDeck] = useState(null)
  const [addedIds, setAddedIds] = useState(new Set())

  const isAlreadyAdded = (starterId) =>
    userDecks.some(d => d.starterId === starterId) || addedIds.has(starterId)

  const filteredDecks = activeCategory === 'all'
    ? STARTER_DECKS
    : STARTER_DECKS.filter(d => d.category === activeCategory)

  const handleAdd = (starterDeck) => {
    onAddDeck(starterDeck)
    setAddedIds(prev => new Set([...prev, starterDeck.id]))
    setPreviewDeck(null)
  }

  return (
    <div className="screen library-screen">
      <div className="section-header">
        <h2>Starter Packs</h2>
        <p className="section-subtitle">Pre-made decks by topic. Tap to preview, then add to your collection.</p>
      </div>

      {/* Category tabs */}
      <div className="category-tabs" role="tablist">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            role="tab"
            aria-selected={activeCategory === cat.id}
          >
            <span className="category-tab-emoji">{cat.emoji}</span>
            <span className="category-tab-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Deck count */}
      <p className="library-count">
        {filteredDecks.length} pack{filteredDecks.length !== 1 ? 's' : ''}
        {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
      </p>

      <div className="deck-grid">
        {filteredDecks.map(deck => {
          const added = isAlreadyAdded(deck.id)
          return (
            <button
              key={deck.id}
              className={`deck-card library-card ${added ? 'added' : ''}`}
              style={{ '--deck-color': deck.color }}
              onClick={() => !added && setPreviewDeck(deck)}
              disabled={added}
            >
              <div className="deck-card-header">
                <span className="deck-card-emoji">{deck.emoji}</span>
                <span className="deck-card-count">{deck.cards.length} cards</span>
              </div>
              <div className="deck-card-body">
                <h3 className="deck-card-name">{deck.name}</h3>
                <p className="deck-card-desc">{deck.description}</p>
              </div>
              {added && <div className="deck-added-badge">✓ Added</div>}
              <div className="deck-card-bar" />
            </button>
          )
        })}
      </div>

      {previewDeck && (
        <div className="modal-overlay" onClick={() => setPreviewDeck(null)}>
          <div className="modal-content modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="preview-header-info">
                <span className="preview-emoji">{previewDeck.emoji}</span>
                <div>
                  <h2>{previewDeck.name}</h2>
                  <p>{previewDeck.cards.length} cards · {previewDeck.sourceLang} → {previewDeck.targetLang}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setPreviewDeck(null)} aria-label="Close">&times;</button>
            </div>

            <div className="preview-description">{previewDeck.description}</div>

            <div className="preview-cards">
              <h4>Sample cards</h4>
              <div className="preview-card-list">
                {previewDeck.cards.slice(0, 8).map((card, i) => (
                  <div key={i} className="preview-card-item">
                    <span className="card-word">{card.word}</span>
                    <span className="card-arrow">→</span>
                    <span className="card-translation">{card.translation}</span>
                  </div>
                ))}
                {previewDeck.cards.length > 8 && (
                  <p className="preview-more">...and {previewDeck.cards.length - 8} more cards</p>
                )}
              </div>
            </div>

            <button className="btn-primary btn-full" onClick={() => handleAdd(previewDeck)}>
              Add to My Decks
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
