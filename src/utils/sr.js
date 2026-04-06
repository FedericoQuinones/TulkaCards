// Simplified SM-2 Spaced Repetition Algorithm

export function getDefaultSR() {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
  }
}

export function processReview(card, quality) {
  // quality: 0 = Again, 2 = Hard, 3 = Good, 5 = Easy
  const sr = card.sr || getDefaultSR()
  let { easeFactor, interval, repetitions } = sr

  if (quality === 0) {
    // Again — reset
    repetitions = 0
    interval = 1 / 1440 // 1 minute in days
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  } else if (quality === 2) {
    // Hard
    if (repetitions === 0) {
      interval = 6 / 1440 // 6 minutes
    } else {
      interval = interval * 1.2
    }
    easeFactor = Math.max(1.3, easeFactor - 0.15)
    repetitions += 1
  } else if (quality === 3) {
    // Good
    if (repetitions === 0) {
      interval = 10 / 1440 // 10 minutes
    } else if (repetitions === 1) {
      interval = 1 // 1 day
    } else {
      interval = interval * easeFactor
    }
    repetitions += 1
  } else if (quality === 5) {
    // Easy
    if (repetitions === 0) {
      interval = 4 // 4 days
    } else {
      interval = interval * easeFactor * 1.3
    }
    easeFactor += 0.15
    repetitions += 1
  }

  const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString()

  return {
    ...card,
    sr: { easeFactor, interval, repetitions, nextReview }
  }
}

export function isDue(card) {
  if (!card.sr) return true
  return new Date(card.sr.nextReview) <= new Date()
}

export function getNextReviewLabel(quality) {
  switch (quality) {
    case 0: return '1 min'
    case 2: return '6 min'
    case 3: return '10 min'
    case 5: return '4 days'
    default: return ''
  }
}

export function sortByDue(cards) {
  return [...cards].sort((a, b) => {
    const aDate = a.sr ? new Date(a.sr.nextReview) : new Date(0)
    const bDate = b.sr ? new Date(b.sr.nextReview) : new Date(0)
    return aDate - bDate
  })
}
