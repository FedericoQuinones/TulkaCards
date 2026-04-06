# TulkaCards — Development Prompt

## What is TulkaCards?

TulkaCards is a flashcard application for learning vocabulary between languages. The primary language pair is Spanish ↔ English. It runs on mobile, tablet, and desktop (responsive web app). The name is "TulkaCards" and the mascot is a cute fish. The entire visual identity is ocean/sea themed with a soft, playful, slightly childlike aesthetic.

---

## Core identity & design direction

### Brand
- **Name**: TulkaCards
- **Tagline**: "Learn & Swim"
- **Mascot**: A cute, round fish with big eyes, blushing cheeks, and a small fin on top. Simple SVG style, not realistic. Think Kawaii meets ocean.
- **Logo**: The fish mascot next to the word "TulkaCards" in a rounded, friendly font.

### Visual aesthetic
- **Theme**: Underwater / ocean. Soft, pastel, warm.
- **Color palette**:
  - Primary: Teal/mint (#5DCAA5, #9FE1CB, #E1F5EE)
  - Secondary: Soft blue (#85B7EB, #E6F1FB)
  - Accent warm: Coral (#F0997B), Pink (#ED93B1)
  - Text: Dark teal (#1D4E5C), muted teal (#5A8E8E)
  - Backgrounds: Gradient from light mint to soft aqua
- **Typography**: Rounded, friendly fonts. Primary: Quicksand (UI text). Secondary: Nunito (headings, logo, big numbers). Both from Google Fonts.
- **Decorative elements**:
  - Animated bubbles floating upward (subtle, in background)
  - Gentle wave shapes at the bottom of the screen
  - The fish mascot appears in empty states and loading
  - Rounded corners everywhere (16-24px border-radius)
  - Glassmorphism cards: semi-transparent white backgrounds with backdrop blur
- **Tone**: Friendly, encouraging, simple. Not corporate. Think "cute language app for everyone."

### Responsive design (critical requirement)
The app must work flawlessly on:
- **Mobile** (320px - 480px): Single column layout. Cards stack vertically. Navigation at bottom as tab bar. Touch-friendly tap targets (minimum 44px). Full-width flashcards.
- **Tablet** (481px - 1024px): Two-column grid for deck cards. Navigation can stay at top. Comfortable spacing.
- **Desktop** (1025px+): Centered content with max-width (~700px). Navigation at top. Hover states on interactive elements.

Use CSS media queries or a mobile-first approach. All interactive elements must be usable with both touch and mouse.

---

## Features (keep it simple — this is the full scope)

### 1. Deck management

The user starts with **zero decks**. Their "My Decks" section is empty with a friendly empty state showing the fish mascot and a message like "No decks yet! Create one or browse our starter packs."

**The user can:**
- **Create a new empty deck**: Tap a "+" or "New deck" button. A simple form asks for:
  - Deck name (required)
  - Source language (default: Spanish)
  - Target language (default: English)
  - Pick a color (from a small preset palette of 6-8 ocean-themed colors)
  - Pick an emoji/icon (from a small preset list of sea creatures: 🐠🐡🐙🦀🐚🐳🦈🐟🦑🪼)
- **Add a deck from the starter library** (see section below)
- **Edit a deck**: Change name, color, icon
- **Delete a deck**: With confirmation

### 2. Starter deck library

Separate from "My Decks", there's a section called **"Starter Packs"** or **"Deck Library"**. These are pre-made decks the user can browse and add to their collection with one tap. Adding a starter deck copies it into "My Decks" where the user can then edit it freely.

**Include these starter decks (Spanish ↔ English):**

1. **Everyday basics** 🐠 — 30 cards
   Most common words: hola/hello, gracias/thank you, por favor/please, buenos días/good morning, buenas noches/good night, sí/yes, no/no, agua/water, comida/food, casa/house, familia/family, amigo/friend, trabajo/work, escuela/school, dinero/money, tiempo/time, día/day, noche/night, grande/big, pequeño/small, bueno/good, malo/bad, nuevo/new, viejo/old, feliz/happy, triste/sad, rápido/fast, lento/slow, mucho/a lot, poco/a little

2. **At the restaurant** 🐡 — 20 cards
   mesa/table, menú/menu, la cuenta/the bill, propina/tip, plato/dish, bebida/drink, postre/dessert, cuchara/spoon, tenedor/fork, cuchillo/knife, servilleta/napkin, camarero/waiter, reserva/reservation, pedir/to order, delicioso/delicious, picante/spicy, vegetariano/vegetarian, alérgico/allergic, recomendación/recommendation, para llevar/takeout

3. **Travel essentials** 🐙 — 25 cards
   aeropuerto/airport, vuelo/flight, pasaporte/passport, equipaje/luggage, hotel/hotel, habitación/room, reserva/reservation, taxi/taxi, estación/station, billete/ticket, mapa/map, dirección/address, izquierda/left, derecha/right, recto/straight, cerca/near, lejos/far, emergencia/emergency, hospital/hospital, farmacia/pharmacy, ayuda/help, perdido/lost, turista/tourist, cambio/exchange, aduana/customs

4. **Tech & work** 🦀 — 20 cards
   computadora/computer, pantalla/screen, teclado/keyboard, contraseña/password, correo/email, reunión/meeting, proyecto/project, equipo/team, fecha límite/deadline, informe/report, servidor/server, red/network, datos/data, desarrollo/development, actualizar/to update, descargar/to download, archivo/file, carpeta/folder, error/bug, respaldo/backup

5. **Feelings & people** 🐚 — 20 cards
   contento/happy, enojado/angry, cansado/tired, emocionado/excited, nervioso/nervous, aburrido/bored, sorprendido/surprised, orgulloso/proud, asustado/scared, confundido/confused, madre/mother, padre/father, hermano/brother, hermana/sister, hijo/son, hija/daughter, abuelo/grandfather, abuela/grandmother, esposo/husband, esposa/wife

6. **English idioms** 🐳 — 15 cards
   Break the ice/Romper el hielo, Hit the nail on the head/Dar en el clavo, Piece of cake/Pan comido, Under the weather/Sentirse mal, Cost an arm and a leg/Costar un ojo de la cara, Bite the bullet/Morder la bala, Spill the beans/Soltar la sopa, Once in a blue moon/De vez en cuando, The ball is in your court/La pelota está en tu cancha, Let the cat out of the bag/Revelar un secreto, Call it a day/Dar por terminado, Break a leg/Mucha suerte, A blessing in disguise/No hay mal que por bien no venga, Burn the midnight oil/Quedarse hasta tarde trabajando, Get out of hand/Salirse de control

7. **Numbers & time** 🐟 — 20 cards
   uno/one, diez/ten, cien/one hundred, mil/one thousand, primero/first, último/last, hora/hour, minuto/minute, segundo/second, semana/week, mes/month, año/year, hoy/today, mañana/tomorrow, ayer/yesterday, siempre/always, nunca/never, temprano/early, tarde/late, ahora/now

8. **Shopping & money** 🦈 — 15 cards
   tienda/store, precio/price, barato/cheap, caro/expensive, descuento/discount, oferta/sale, efectivo/cash, tarjeta/card, recibo/receipt, talla/size, probador/fitting room, devolver/to return, cambiar/to exchange, bolsa/bag, cajero/cashier

Each card has three fields: **word** (source language), **translation** (target language), and **context** (an example sentence using the word). All starter deck cards must include a context sentence.

### 3. Card management (manual entry)

Inside any deck, the user can:
- **Add a card manually**: A simple form with three fields:
  - Word/phrase (required)
  - Translation (required)
  - Context sentence (optional, but encouraged — show placeholder like "Use it in a sentence...")
  - The form should be quick and fluid. After saving, the form clears and stays open so the user can add multiple cards in a row. Show a small success indicator (checkmark or the fish doing a happy animation).
- **Edit a card**: Tap on a card in the card list to edit its fields
- **Delete a card**: Swipe or delete button with confirmation
- **View card list**: See all cards in the deck as a scrollable list showing word → translation

### 4. Import from file

The user can import cards from external files. A drag-and-drop zone (on desktop) or file picker button (on mobile).

**Supported formats:**
- **.xlsx / .xls** (Excel)
- **.csv**
- **.tsv**
- **.json**
- **.txt** (tab-separated or semicolon-separated)

**Expected file structure:**
- Column A / Field 1: Word or phrase
- Column B / Field 2: Translation
- Column C / Field 3: Context sentence (optional)

**Import flow:**
1. User selects a file
2. App shows a preview table of the first 5 cards parsed
3. User confirms import
4. Cards are added to the currently selected deck (or user picks which deck)
5. Show success message with count: "12 cards imported! 🐠"

**Edge cases:**
- If a file has more than 3 columns, only use the first 3
- If a file has only 2 columns, import without context
- Skip empty rows
- Show error message for unsupported formats

### 5. Study mode (Flashcards with Spaced Repetition)

When the user taps "Study" on a deck:

1. Show cards one at a time
2. The **front** shows the word/phrase with a label indicating the source language
3. User taps the card to **flip** it
4. The **back** shows the translation and the context sentence (if any)
5. After flipping, show **4 difficulty buttons** at the bottom:
   - **Again** (coral/red color) — "1 min" — user didn't know it
   - **Hard** (pink color) — "6 min" — user barely remembered
   - **Good** (teal/green color) — "10 min" — user knew it with effort
   - **Easy** (blue color) — "4 days" — user knew it instantly
6. Tapping a difficulty button advances to the next card with a slide animation
7. Show a progress bar at the top: "5 / 20"
8. When all cards are reviewed, show a completion screen with stats and the fish mascot celebrating

**Spaced Repetition algorithm:**
Use a simplified SM-2 algorithm (same family as Anki):
- Each card tracks: ease factor, interval, repetitions, next review date
- "Again" resets the card
- "Hard" slightly reduces ease and gives a shorter interval
- "Good" maintains ease and calculates normal interval
- "Easy" increases ease and gives a longer interval
- Cards due for review appear first in study sessions

### 6. Simple stats (on the main screen)

Show three stat boxes at the top of the main screen:
- **Cards today**: How many cards the user has studied today
- **Day streak**: Consecutive days the user has studied (at least 1 card)
- **Accuracy**: Percentage of cards answered "Good" or "Easy" out of total reviews today

---

## Information architecture & navigation

The app has only 3 main sections, accessible via navigation:

### Navigation
- **Mobile**: Bottom tab bar with 3 tabs — Decks, Library, Import
- **Tablet/Desktop**: Top navigation bar with 3 tabs

### Screen flow

```
[Main Screen — "My Decks"]
├── Stats row (cards today, streak, accuracy)
├── My Decks grid (user's decks or empty state)
│   ├── Tap deck → [Deck Detail Screen]
│   │   ├── Card list (all cards in this deck)
│   │   ├── "Add Card" button → inline form
│   │   ├── "Study" button → [Study Mode]
│   │   │   ├── Flashcard flip
│   │   │   ├── SR buttons
│   │   │   └── Completion screen
│   │   └── "Edit Deck" / "Delete Deck"
│   └── "New Deck" button → create deck form
│
[Library Screen — "Starter Packs"]
├── Grid of starter decks with preview
├── Tap to see deck contents (card count, sample cards)
└── "Add to My Decks" button → copies deck to My Decks
│
[Import Screen]
├── File upload zone
├── Preview table
└── "Import to [deck]" button
```

---

## Technical notes

### Data persistence
- Use browser localStorage or IndexedDB for web version
- All data (decks, cards, SR state, stats) should persist between sessions
- No backend required for MVP — everything runs client-side

### File parsing libraries (suggestions)
- Excel: SheetJS (xlsx)
- CSV/TSV: PapaParse
- JSON: native JSON.parse

### Animations
- Card flip: CSS 3D transform with perspective
- Card transition: slide out to the right, new card slides in from left
- Bubbles: CSS keyframe animations floating upward
- Waves: horizontal CSS animation on SVG wave shapes
- Micro-interactions: button press scale(0.97), hover lifts with box-shadow

### Accessibility
- All interactive elements must be keyboard navigable
- Sufficient color contrast on text
- Touch targets minimum 44x44px on mobile
- Screen reader labels on icon-only buttons

---

## UI component reference

### Deck card (in grid)
```
┌─────────────────────┐
│ 🐠                8 cards │
│                        │
│ Everyday basics        │
│ Most common words      │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │  ← colored bottom bar
└─────────────────────┘
```

### Flashcard (front)
```
┌──────────────────────────┐
│                          │
│        TRANSLATE         │  ← small label
│                          │
│        Gracias           │  ← big word
│                          │
│      tap to reveal       │  ← hint text
└──────────────────────────┘
```

### Flashcard (back)
```
┌──────────────────────────┐
│                          │
│         ANSWER           │
│                          │
│       Thank you          │  ← big word
│                          │
│  Muchas gracias por tu   │  ← context
│  ayuda — Thank you very  │
│  much for your help      │
└──────────────────────────┘
```

### SR buttons row
```
┌────────┐┌────────┐┌────────┐┌────────┐
│ Again  ││ Hard   ││ Good   ││ Easy   │
│ 1 min  ││ 6 min  ││ 10 min ││ 4 days │
└────────┘└────────┘└────────┘└────────┘
  coral     pink      teal      blue
```

### Add card form
```
┌──────────────────────────┐
│ Word or phrase           │  ← input
├──────────────────────────┤
│ Translation              │  ← input
├──────────────────────────┤
│ Use it in a sentence...  │  ← input (optional)
├──────────────────────────┤
│     [+ Add Card]         │  ← button
└──────────────────────────┘
```

### Empty state (My Decks)
```
     🐠  ← fish mascot swimming
  
  No decks yet!
  Create one or browse
  our starter packs.

  [+ New Deck]  [Browse Library]
```

---

## Language

The app UI is in **English** by default. The content (flashcard words and context sentences) is Spanish ↔ English. The UI should use simple, clear English so non-native speakers can use it comfortably.

---

## Summary of what makes TulkaCards different from Anki

1. **Beautiful, modern UI** — ocean theme, animations, cute mascot vs Anki's dated interface
2. **Zero setup friction** — starter packs ready to go, one-tap to add
3. **Easy manual entry** — quick inline form, not a complex note editor
4. **Simple import** — drag a file, preview, import. No formatting gymnastics
5. **Mobile-first responsive** — works great on phone, tablet, and desktop
6. **Focused scope** — flashcards and spaced repetition, nothing else. No plugins, no templates, no complexity
