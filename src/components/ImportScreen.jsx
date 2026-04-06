import React, { useState, useRef } from 'react'
import { parseFile, ACCEPT_STRING, SUPPORTED_FORMATS } from '../utils/importCards'
import FishMascot from './FishMascot'

export default function ImportScreen({ decks, onImport }) {
  const [dragOver, setDragOver] = useState(false)
  const [parsedCards, setParsedCards] = useState(null)
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id || '')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [fileName, setFileName] = useState('')
  const fileRef = useRef()

  const handleFile = async (file) => {
    setError(null)
    setParsedCards(null)
    setSuccess(null)
    setLoading(true)
    setFileName(file.name)

    try {
      const cards = await parseFile(file)
      if (cards.length === 0) {
        setError('No valid cards found in this file. Make sure it has at least 2 columns (word, translation).')
      } else {
        setParsedCards(cards)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  const handleImport = () => {
    if (!parsedCards || !selectedDeckId) return
    onImport(selectedDeckId, parsedCards)
    setSuccess(`${parsedCards.length} cards imported! 🐠`)
    setParsedCards(null)
    setFileName('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="screen import-screen">
      <div className="section-header">
        <h2>Import Cards</h2>
        <p className="section-subtitle">Import flashcards from a file into one of your decks.</p>
      </div>

      {decks.length === 0 ? (
        <div className="empty-state">
          <FishMascot size={80} />
          <h3>No decks yet!</h3>
          <p>Create a deck first, then you can import cards into it.</p>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="import-deck">Import to deck</label>
            <select
              id="import-deck"
              value={selectedDeckId}
              onChange={e => setSelectedDeckId(e.target.value)}
              className="select-input"
            >
              {decks.map(d => (
                <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>
              ))}
            </select>
          </div>

          <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''} ${parsedCards ? 'has-file' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload file"
          >
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPT_STRING}
              onChange={handleFileInput}
              className="file-input-hidden"
            />
            {loading ? (
              <div className="drop-zone-content">
                <div className="loading-spinner" />
                <p>Parsing file...</p>
              </div>
            ) : (
              <div className="drop-zone-content">
                <span className="drop-zone-icon">📁</span>
                <p className="drop-zone-text">
                  {fileName ? fileName : 'Drop a file here or click to browse'}
                </p>
                <p className="drop-zone-formats">
                  Supported: {SUPPORTED_FORMATS.join(', ')}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="import-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="import-success">
              {success}
            </div>
          )}

          {parsedCards && (
            <div className="import-preview">
              <h4>Preview ({parsedCards.length} cards found)</h4>
              <div className="preview-table">
                <div className="preview-table-header">
                  <span>Word</span>
                  <span>Translation</span>
                  <span>Context</span>
                </div>
                {parsedCards.slice(0, 5).map((card, i) => (
                  <div key={i} className="preview-table-row">
                    <span>{card.word}</span>
                    <span>{card.translation}</span>
                    <span className="preview-context">{card.context || '—'}</span>
                  </div>
                ))}
                {parsedCards.length > 5 && (
                  <div className="preview-table-more">
                    ...and {parsedCards.length - 5} more
                  </div>
                )}
              </div>
              <button className="btn-primary btn-full" onClick={handleImport}>
                Import {parsedCards.length} Cards
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
