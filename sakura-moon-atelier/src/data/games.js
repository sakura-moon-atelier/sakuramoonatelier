/**
 * GAMES DATA
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all game data.
 * To add a new game: add one object to the GAMES array.
 * The Games list, GameDetail, press kit, and related news/social
 * all read from here (or from the remote repository when configured).
 *
 * ADDING A NEW GAME — minimum required fields:
 *   id, slug, title, status, platforms, seasons (can be []), grid (can be [])
 *   Everything else is optional and the UI handles null gracefully.
 */

export const GAMES = [
  {
    // ── Identity ────────────────────────────────────────────────
    id:       'farmed-com',
    slug:     'farmed-com',
    title:    'FARMED.COM',
    subtitle: 'Sudoku Farm Roguelike',
    status:   'development',     // 'development' | 'released' | 'announced'
    releaseYear: null,

    // ── Platforms ───────────────────────────────────────────────
    platforms: ['Steam', 'itch.io', 'Xbox', 'PlayStation', 'Switch'],

    // ── Store links — null = announced but no page yet ──────────
    storeLinks: {
      steam:       null,   // TODO: add store page URL
      itchio:      null,   // TODO: add itch.io page URL
      xbox:        null,
      playstation: null,
      nintendo:    null,
    },

    // ── Press kit ───────────────────────────────────────────────
    pressKit: null,    // TODO: set to press kit URL when ready

    // ── Related content — filters news.js + socialFeed.js ───────
    relatedNewsTag:   'FARMED.COM',   // matches tags[] in news.js
    relatedSocialTag: 'farmedcom',    // matches tags[] in socialFeed.js

    // ── Gameplay grid preview (5×5 sample board) ─────────────────
    droneColor: '#3A78B4',
    grid: [
      ['🍓','og'],['','em'],['🧄','og'],['','em'],['🌿','gr'],
      ['','em'],['🥬','gr'],['','em'],['🍅','og'],['','em'],
      ['🌿','og'],['','em'],['🥬','rd'],['','em'],['🧄','gr'],
      ['','em'],['🍓','og'],['','bl'],['🌻','gr'],['','em'],
      ['🍅','og'],['','em'],['','em'],['🌿','og'],['','em'],
    ],

    // ── Seasons / acts ───────────────────────────────────────────
    seasons: [
      { key:'spring', emoji:'🌸', bg:'rgba(90,165,80,.12)',   color:'#5CAA50' },
      { key:'summer', emoji:'☀',  bg:'rgba(210,168,55,.12)',  color:'#B08838' },
      { key:'autumn', emoji:'🍂', bg:'rgba(190,100,55,.12)',  color:'#B06838' },
      { key:'winter', emoji:'❄',  bg:'rgba(75,115,210,.12)',  color:'#5888C0' },
      { key:'final',  emoji:'📋', bg:'rgba(100,80,80,.08)',   color:null },
    ],

    // ── Screenshots — add real paths when art is ready ───────────
    // Each: { src: 'screenshots/farmed-01.webp', alt: '...', caption: '...' }
    screenshots: [
      // Placeholders shown until real screenshots are added
      { src: null, alt: 'Sudoku crop board — Spring',    caption: 'The board in Spring. Nine crops. No numbers.',        emoji: '🌾' },
      { src: null, alt: 'Roguelike map — Season select', caption: 'Choose your path through the season map.',            emoji: '🗺' },
      { src: null, alt: 'Drone delivery',                caption: 'Blue delivers the order. The customer rates you.',    emoji: '🚁' },
      { src: null, alt: 'The Inspector',                 caption: 'He arrives after Winter. He has a clipboard.',        emoji: '📋' },
    ],

    // ── Trailers — youtubeId: null until video exists ────────────
    trailers: [
      { youtubeId: null, title: 'Announcement Teaser', placeholder: true },
    ],

    // ── Features (shown on detail page) ─────────────────────────
    features: [
      { icon:'🌾', titleKey:'cropSudoku',    bodyKey:'cropSudokuBody' },
      { icon:'🗺', titleKey:'roguelikeMap',  bodyKey:'roguelikeMapBody' },
      { icon:'🚁', titleKey:'theDrone',      bodyKey:'theDroneBody' },
      { icon:'⏰', titleKey:'farmBell',      bodyKey:'farmBellBody' },
      { icon:'🛠', titleKey:'farmTools',     bodyKey:'farmToolsBody' },
      { icon:'📋', titleKey:'theInspector',  bodyKey:'theInspectorBody' },
    ],
  },
  // ── ADD NEXT GAME HERE ───────────────────────────────────────
  // {
  //   id:    'my-next-game',
  //   slug:  'my-next-game',
  //   title: 'My Next Game',
  //   ...
  // }
]

// ── Cell style map for the grid preview ────────────────────────
export const CELL_STYLES = {
  og: { background:'rgba(255,255,255,.09)' },
  gr: { background:'rgba(70,180,100,.23)' },
  rd: { background:'rgba(210,60,80,.23)' },
  bl: { background:'rgba(70,120,200,.23)' },
  em: { background:'rgba(255,255,255,.03)', border:'1px dashed rgba(255,255,255,.12)' },
}

// ── Helpers (used by static repository) ─────────────────────────
export const getGameBySlug = (slug) => GAMES.find(g => g.slug === slug) ?? null
