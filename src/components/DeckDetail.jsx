import React, { useState } from 'react'
import AddCardForm from './AddCardForm'
import CreateDeckModal from './CreateDeckModal'

export default function DeckDetail({ deck, onBack, onAddCard, onDeleteCard, onEditCard, onStudy, onEditDeck, onDeleteDeck }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditDeck, setShowEditDeck] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteCardId, setDeleteCardId] = useState(null)

  const handleEditCard = (card) => {
    setEditingCard(card)
  }

  const handleSaveCardEdit = (e) => {
    e.preventDefault()
    onEditCard(editingCard)
    setEditingCard(null)
  }

  const handleDeleteCard = (cardId) => {
    onDeleteCard(cardId)
    setDeleteCardId(null)
  }

  const handleEditDeck = (data) => {
    onEditDeck(data)
    setShowEditDeck(false)
  }

  const handleDeleteDeck = () => {
    onDeleteDeck()
    setShowDeleteConfirm(false)
  }

  return (
    <div className="screen deck-detail-screen">
      <div className="deck-detail-header">
        <button className="btn-back" onClick={onBack} aria-label="Go back">
          ← Back
        </button>
        <div className="deck-detail-title">
          <span className="deck-detail-emoji">{deck.emoji}</span>
          <div>
            <h2>{deck.name}</h2>
            <p className="deck-detail-meta">{deck.sourceLang} → {deck.targetLang} · {deck.cards?.length || 0} cards</p>
          </div>
        </div>
        <div className="deck-detail-actions">
          <button className="btn-icon" onClick={() => setShowEditDeck(true)} aria-label="Edit deck" title="Edit deck">✏️</button>
          <button className="btn-icon btn-danger-icon" onClick={() => setShowDeleteConfirm(true)} aria-label="Delete deck" title="Delete deck">🗑️</button>
        </div>
      </div>

      <div className="deck-detail-buttons">
        {deck.cards && deck.cards.length > 0 && (
          <button className="btn-study" onClick={onStudy}>
            🎓 Study ({deck.cards.length} cards)
          </button>
        )}
        <button className="btn-secondary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add Card'}
        </button>
      </div>

      {showAddForm && (
        <AddCardForm onAdd={(card) => {
          onAddCard(card)
        }} />
      )}

      {deck.cards && deck.cards.length > 0 ? (
        <div className="card-list">
          {deck.cards.map((card, index) => (
            <div key={card.id || index} className="card-list-item">
              {editingCard && editingCard.id === card.id ? (
                <form className="card-edit-form" onSubmit={handleSaveCardEdit}>
                  <input
                    value={editingCard.word}
                    onChange={e => setEditingCard({ ...editingCard, word: e.target.value })}
                    required
                  />
                  <input
                    value={editingCard.translation}
                    onChange={e => setEditingCard({ ...editingCard, translation: e.target.value })}
                    required
                  />
                  <input
                    value={editingCard.context || ''}
                    onChange={e => setEditingCard({ ...editingCard, context: e.target.value })}
                    placeholder="Context..."
                  />
                  <div className="card-edit-buttons">
                    <button type="submit" className="btn-sm btn-primary">Save</button>
                    <button type="button" className="btn-sm btn-ghost" onClick={() => setEditingCard(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="card-list-content" onClick={() => handleEditCard(card)}>
                    <span className="card-word">{card.word}</span>
                    <span className="card-arrow">→</span>
                    <span className="card-translation">{card.translation}</span>
                  </div>
                  <button
                    className="btn-icon btn-sm-icon"
                    onClick={() => setDeleteCardId(card.id)}
                    aria-label={`Delete card ${card.word}`}
                  >
                    ×
                  </button>
                </>
              )}

              {deleteCardId === card.id && (
                <div className="confirm-inline">
                  <span>Delete this card?</span>
                  <button className="btn-sm btn-danger" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                  <button className="btn-sm btn-ghost" onClick={() => setDeleteCardId(null)}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-small">
          <p>No cards yet. Add some cards to start studying!</p>
        </div>
      )}

      {showEditDeck && (
        <CreateDeckModal
          editDeck={deck}
          onClose={() => setShowEditDeck(false)}
          onSave={handleEditDeck}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content modal-sm" onClick={e => e.stopPropagation()}>
            <h3>Delete "{deck.name}"?</h3>
            <p>This will delete the deck and all its cards. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={handleDeleteDeck}>Delete</button>
              <button className="btn-ghost" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
