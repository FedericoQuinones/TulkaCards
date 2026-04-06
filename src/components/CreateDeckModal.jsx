import React, { useState } from 'react'

const PRESET_COLORS = [
  '#5DCAA5', '#85B7EB', '#F0997B', '#ED93B1',
  '#9FE1CB', '#5A8E8E', '#A8D8EA', '#FFB7B2',
]

const PRESET_EMOJIS = ['🐠', '🐡', '🐙', '🦀', '🐚', '🐳', '🦈', '🐟', '🦑', '🪼']

export default function CreateDeckModal({ onClose, onSave, editDeck }) {
  const [name, setName] = useState(editDeck?.name || '')
  const [sourceLang, setSourceLang] = useState(editDeck?.sourceLang || 'Spanish')
  const [targetLang, setTargetLang] = useState(editDeck?.targetLang || 'English')
  const [color, setColor] = useState(editDeck?.color || PRESET_COLORS[0])
  const [emoji, setEmoji] = useState(editDeck?.emoji || PRESET_EMOJIS[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), sourceLang, targetLang, color, emoji })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editDeck ? 'Edit Deck' : 'New Deck'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deck-name">Deck name</label>
            <input
              id="deck-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., My vocabulary"
              autoFocus
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source-lang">Source language</label>
              <input
                id="source-lang"
                type="text"
                value={sourceLang}
                onChange={e => setSourceLang(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="target-lang">Target language</label>
              <input
                id="target-lang"
                type="text"
                value={targetLang}
                onChange={e => setTargetLang(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Pick a color</label>
            <div className="color-picker">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${color === c ? 'selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Pick an icon</label>
            <div className="emoji-picker">
              {PRESET_EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  className={`emoji-option ${emoji === e ? 'selected' : ''}`}
                  onClick={() => setEmoji(e)}
                  aria-label={`Icon ${e}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            {editDeck ? 'Save Changes' : 'Create Deck'}
          </button>
        </form>
      </div>
    </div>
  )
}
