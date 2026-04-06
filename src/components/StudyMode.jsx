import React, { useState, useCallback } from 'react'
import FlashCard from './FlashCard'
import { FishCelebrate } from './FishMascot'
import { processReview, sortByDue, getNextReviewLabel } from '../utils/sr'

const QUALITY_BUTTONS = [
  { quality: 0, label: 'Again', className: 'sr-again' },
  { quality: 2, label: 'Hard', className: 'sr-hard' },
  { quality: 3, label: 'Good', className: 'sr-good' },
  { quality: 5, label: 'Easy', className: 'sr-easy' },
]

export default function StudyMode({ deck, onBack, onUpdateCard, onRecordStudy }) {
  const sortedCards = sortByDue(deck.cards || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [sessionStats, setSessionStats] = useState({ total: 0, correct: 0 })

  const currentCard = sortedCards[currentIndex]
  const totalCards = sortedCards.length

  const handleFlip = useCallback(() => {
    setFlipped(true)
  }, [])

  const handleRate = useCallback((quality) => {
    if (isExiting) return

    const updatedCard = processReview(currentCard, quality)
    onUpdateCard(updatedCard)
    onRecordStudy(quality)

    const isCorrect = quality >= 3
    setSessionStats(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }))

    // Start exit animation, then swap the card
    setIsExiting(true)

    setTimeout(() => {
      if (currentIndex + 1 >= totalCards) {
        setCompleted(true)
      } else {
        setCurrentIndex(prev => prev + 1)
        setFlipped(false)
      }
      setIsExiting(false)
    }, 280)
  }, [isExiting, currentCard, currentIndex, totalCards, onUpdateCard, onRecordStudy])

  if (totalCards === 0) {
    return (
      <div className="screen study-screen">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="empty-state">
          <h3>No cards to study!</h3>
          <p>Add some cards to this deck first.</p>
        </div>
      </div>
    )
  }

  if (completed) {
    const accuracy = sessionStats.total > 0
      ? Math.round((sessionStats.correct / sessionStats.total) * 100)
      : 0

    return (
      <div className="screen study-screen study-complete">
        <FishCelebrate size={140} />
        <h2>Session Complete!</h2>
        <p className="study-complete-subtitle">Great job studying {deck.name}!</p>

        <div className="study-complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-num">{sessionStats.total}</span>
            <span className="complete-stat-label">Cards reviewed</span>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-num">{accuracy}%</span>
            <span className="complete-stat-label">Accuracy</span>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-num">{sessionStats.correct}</span>
            <span className="complete-stat-label">Got right</span>
          </div>
        </div>

        <div className="study-complete-actions">
          <button className="btn-primary" onClick={() => {
            setCurrentIndex(0)
            setFlipped(false)
            setCompleted(false)
            setSessionStats({ total: 0, correct: 0 })
            setAnimDirection('slide-in-right')
          }}>
            Study Again
          </button>
          <button className="btn-secondary" onClick={onBack}>
            Back to Deck
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen study-screen">
      <div className="study-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="study-progress">
          <div className="study-progress-bar">
            <div
              className="study-progress-fill"
              style={{ width: `${((currentIndex) / totalCards) * 100}%` }}
            />
          </div>
          <span className="study-progress-text">{currentIndex + 1} / {totalCards}</span>
        </div>
      </div>

      <div className={`study-card-area${isExiting ? ' exiting' : ''}`}>
        <FlashCard
          key={currentIndex}
          card={currentCard}
          deck={deck}
          flipped={flipped}
          onFlip={handleFlip}
        />
      </div>

      {flipped && (
        <div className="sr-buttons">
          {QUALITY_BUTTONS.map(btn => (
            <button
              key={btn.quality}
              className={`sr-btn ${btn.className}`}
              onClick={() => handleRate(btn.quality)}
            >
              <span className="sr-btn-label">{btn.label}</span>
              <span className="sr-btn-time">{getNextReviewLabel(btn.quality)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
