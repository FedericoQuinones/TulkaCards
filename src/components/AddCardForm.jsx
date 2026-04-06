import React, { useState } from 'react'

export default function AddCardForm({ onAdd }) {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [context, setContext] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!word.trim() || !translation.trim()) return

    onAdd({
      word: word.trim(),
      translation: translation.trim(),
      context: context.trim(),
    })

    setWord('')
    setTranslation('')
    setContext('')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 1500)
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <div className="add-card-form-inner">
        <input
          type="text"
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Word or phrase"
          required
          className="add-card-input"
        />
        <input
          type="text"
          value={translation}
          onChange={e => setTranslation(e.target.value)}
          placeholder="Translation"
          required
          className="add-card-input"
        />
        <input
          type="text"
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="Use it in a sentence..."
          className="add-card-input"
        />
        <button type="submit" className="btn-primary btn-full">
          + Add Card
        </button>
      </div>
      {showSuccess && (
        <div className="add-card-success">
          <span className="success-check">✓</span> Card added!
        </div>
      )}
    </form>
  )
}
