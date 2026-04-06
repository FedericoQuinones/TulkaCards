import React from 'react'

export default function DeckCard({ deck, onClick }) {
  const cardCount = deck.cards ? deck.cards.length : 0

  return (
    <button
      className="deck-card"
      onClick={() => onClick(deck)}
      style={{ '--deck-color': deck.color }}
    >
      <div className="deck-card-header">
        <span className="deck-card-emoji">{deck.emoji}</span>
        <span className="deck-card-count">{cardCount} card{cardCount !== 1 ? 's' : ''}</span>
      </div>
      <div className="deck-card-body">
        <h3 className="deck-card-name">{deck.name}</h3>
        <p className="deck-card-langs">{deck.sourceLang} → {deck.targetLang}</p>
      </div>
      <div className="deck-card-bar" />
    </button>
  )
}
