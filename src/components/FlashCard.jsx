import React, { useState, useEffect } from 'react'

export default function FlashCard({ card, deck, flipped, onFlip }) {
  const [localFlipped, setLocalFlipped] = useState(false)

  useEffect(() => {
    setLocalFlipped(flipped)
  }, [flipped])

  const handleFlip = () => {
    if (!localFlipped) {
      setLocalFlipped(true)
      onFlip()
    }
  }

  return (
    <div
      className="flashcard-wrapper"
      onClick={handleFlip}
      onKeyDown={e => e.key === ' ' && handleFlip()}
      tabIndex={0}
      role="button"
      aria-label={localFlipped ? 'Card showing answer' : 'Card showing question, tap to reveal'}
    >
      <div className={`flashcard-inner ${localFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-label">TRANSLATE</span>
          <span className="flashcard-lang-badge">{deck.sourceLang}</span>
          <h2 className="flashcard-word">{card.word}</h2>
          <span className="flashcard-hint">tap to reveal</span>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-label">ANSWER</span>
          <span className="flashcard-lang-badge">{deck.targetLang}</span>
          <h2 className="flashcard-word">{card.translation}</h2>
          {card.context && (
            <p className="flashcard-context">{card.context}</p>
          )}
        </div>
      </div>
    </div>
  )
}
