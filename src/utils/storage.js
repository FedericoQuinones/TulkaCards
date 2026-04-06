const STORAGE_KEYS = {
  DECKS: 'tulka_decks',
  STATS: 'tulka_stats',
}

export function loadDecks() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DECKS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveDecks(decks) {
  localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks))
}

export function loadStats() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATS)
    if (!data) return getDefaultStats()
    const stats = JSON.parse(data)
    const today = new Date().toDateString()
    if (stats.lastStudyDate !== today) {
      if (stats.lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
        return { ...stats, cardsToday: 0, todayReviews: 0, todayCorrect: 0 }
      } else if (stats.lastStudyDate) {
        return { ...stats, cardsToday: 0, streak: 0, todayReviews: 0, todayCorrect: 0 }
      }
    }
    return stats
  } catch {
    return getDefaultStats()
  }
}

export function saveStats(stats) {
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats))
}

function getDefaultStats() {
  return {
    cardsToday: 0,
    streak: 0,
    todayReviews: 0,
    todayCorrect: 0,
    lastStudyDate: null,
  }
}

export function recordStudy(stats, quality) {
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  let newStreak = stats.streak
  if (stats.lastStudyDate !== today) {
    if (stats.lastStudyDate === yesterday) {
      newStreak = stats.streak + 1
    } else if (!stats.lastStudyDate) {
      newStreak = 1
    } else if (stats.lastStudyDate !== today) {
      newStreak = 1
    }
  }

  const isCorrect = quality >= 3
  return {
    cardsToday: (stats.lastStudyDate === today ? stats.cardsToday : 0) + 1,
    streak: newStreak,
    todayReviews: (stats.lastStudyDate === today ? stats.todayReviews : 0) + 1,
    todayCorrect: (stats.lastStudyDate === today ? stats.todayCorrect : 0) + (isCorrect ? 1 : 0),
    lastStudyDate: today,
  }
}

export function getAccuracy(stats) {
  if (!stats.todayReviews) return 0
  return Math.round((stats.todayCorrect / stats.todayReviews) * 100)
}
