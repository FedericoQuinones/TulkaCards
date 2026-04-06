import React, { useState, useEffect, useCallback } from 'react'
import Navigation from './components/Navigation'
import Bubbles from './components/Bubbles'
import Waves from './components/Waves'
import DecksScreen from './components/DecksScreen'
import DeckDetail from './components/DeckDetail'
import StudyMode from './components/StudyMode'
import LibraryScreen from './components/LibraryScreen'
import ImportScreen from './components/ImportScreen'
import { loadDecks, saveDecks, loadStats, saveStats, recordStudy } from './utils/storage'
import { getDefaultSR } from './utils/sr'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export default function App() {
  const [activeTab, setActiveTab] = useState('decks')
  const [decks, setDecks] = useState(() => loadDecks())
  const [stats, setStats] = useState(() => loadStats())
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [studyingDeck, setStudyingDeck] = useState(null)

  // Persist decks
  useEffect(() => { saveDecks(decks) }, [decks])
  useEffect(() => { saveStats(stats) }, [stats])

  // Keep selectedDeck in sync with decks array
  useEffect(() => {
    if (selectedDeck) {
      const updated = decks.find(d => d.id === selectedDeck.id)
      if (updated) setSelectedDeck(updated)
      else setSelectedDeck(null)
    }
  }, [decks])

  // Keep studyingDeck in sync
  useEffect(() => {
    if (studyingDeck) {
      const updated = decks.find(d => d.id === studyingDeck.id)
      if (updated) setStudyingDeck(updated)
    }
  }, [decks])

  const handleCreateDeck = useCallback((deckData) => {
    const newDeck = {
      id: generateId(),
      ...deckData,
      cards: [],
      createdAt: new Date().toISOString(),
    }
    setDecks(prev => [...prev, newDeck])
  }, [])

  const handleAddStarterDeck = useCallback((starterDeck) => {
    const newDeck = {
      id: generateId(),
      name: starterDeck.name,
      emoji: starterDeck.emoji,
      color: starterDeck.color,
      sourceLang: starterDeck.sourceLang,
      targetLang: starterDeck.targetLang,
      starterId: starterDeck.id,
      cards: starterDeck.cards.map(card => ({
        ...card,
        id: generateId(),
        sr: getDefaultSR(),
      })),
      createdAt: new Date().toISOString(),
    }
    setDecks(prev => [...prev, newDeck])
  }, [])

  const handleSelectDeck = useCallback((deck) => {
    setSelectedDeck(deck)
  }, [])

  const handleAddCard = useCallback((card) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== selectedDeck.id) return d
      return {
        ...d,
        cards: [...(d.cards || []), { ...card, id: generateId(), sr: getDefaultSR() }]
      }
    }))
  }, [selectedDeck])

  const handleDeleteCard = useCallback((cardId) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== selectedDeck.id) return d
      return { ...d, cards: d.cards.filter(c => c.id !== cardId) }
    }))
  }, [selectedDeck])

  const handleEditCard = useCallback((updatedCard) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== selectedDeck.id) return d
      return {
        ...d,
        cards: d.cards.map(c => c.id === updatedCard.id ? updatedCard : c)
      }
    }))
  }, [selectedDeck])

  const handleEditDeck = useCallback((data) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== selectedDeck.id) return d
      return { ...d, ...data }
    }))
  }, [selectedDeck])

  const handleDeleteDeck = useCallback(() => {
    setDecks(prev => prev.filter(d => d.id !== selectedDeck.id))
    setSelectedDeck(null)
  }, [selectedDeck])

  const handleUpdateStudyCard = useCallback((updatedCard) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== studyingDeck.id) return d
      return {
        ...d,
        cards: d.cards.map(c => c.id === updatedCard.id ? updatedCard : c)
      }
    }))
  }, [studyingDeck])

  const handleRecordStudy = useCallback((quality) => {
    setStats(prev => recordStudy(prev, quality))
  }, [])

  const handleImport = useCallback((deckId, cards) => {
    setDecks(prev => prev.map(d => {
      if (d.id !== deckId) return d
      return {
        ...d,
        cards: [
          ...(d.cards || []),
          ...cards.map(c => ({ ...c, id: generateId(), sr: getDefaultSR() }))
        ]
      }
    }))
  }, [])

  // Study mode
  if (studyingDeck) {
    return (
      <div className="app">
        <Bubbles />
        <StudyMode
          deck={studyingDeck}
          onBack={() => setStudyingDeck(null)}
          onUpdateCard={handleUpdateStudyCard}
          onRecordStudy={handleRecordStudy}
        />
        <Waves />
      </div>
    )
  }

  // Deck detail
  if (selectedDeck) {
    return (
      <div className="app">
        <Bubbles />
        <div className="app-content">
          <DeckDetail
            deck={selectedDeck}
            onBack={() => setSelectedDeck(null)}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCard}
            onStudy={() => setStudyingDeck(selectedDeck)}
            onEditDeck={handleEditDeck}
            onDeleteDeck={handleDeleteDeck}
          />
        </div>
        <Waves />
      </div>
    )
  }

  // Main app with tabs
  return (
    <div className="app">
      <Bubbles />
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogoClick={() => setActiveTab('decks')}
      />
      <main className="app-content">
        {activeTab === 'decks' && (
          <DecksScreen
            decks={decks}
            stats={stats}
            onSelectDeck={handleSelectDeck}
            onCreateDeck={handleCreateDeck}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'library' && (
          <LibraryScreen
            userDecks={decks}
            onAddDeck={handleAddStarterDeck}
          />
        )}
        {activeTab === 'import' && (
          <ImportScreen
            decks={decks}
            onImport={handleImport}
          />
        )}
      </main>
      <Waves />
    </div>
  )
}
