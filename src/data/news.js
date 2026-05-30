// News / devlog data — add new articles here.
// No backend required; the News and NewsDetail pages read from this array.
// To add a post: add an object at the TOP of the array (newest first).

export const NEWS_CATEGORIES = ['devlog', 'update', 'announcement', 'art']

export const NEWS = [
  {
    id: 'farmed-gdd-complete',
    date: '2025-05-20',
    category: 'devlog',
    emoji: '📋',
    title: 'FARMED.COM: Game Design Document v2.0 Complete',
    excerpt: 'After months of iteration, the GDD for FARMED.COM is done. All four seasons, The Inspector, the Drone, the Farm Bell — everything is locked in and ready to build.',
    body: `
After months of iteration, research, and many cups of coffee (supervised by Kuro), the Game Design Document for FARMED.COM version 2.0 is complete.

**What's in the GDD**

The document covers everything: the full roguelike map structure inspired by Slay the Spire, the Sudoku crop-placement mechanics, all four seasonal campaign bosses, and the true final challenge — The Inspector, who arrives with a clipboard and thorough expectations.

**The Core Loop**

Each run starts in Spring and ends (hopefully) with the Inspector's approval in Winter. Every node on the map is a customer order. Every order is a Sudoku puzzle. Solve it correctly, choose the right crops, fulfil the delivery before the Order Deadline, and don't let the Farm Bell ring more than necessary.

**What's Next**

Now that the GDD is locked, we're moving into prototyping. The first milestone is a playable Sudoku board with the 9-crop system running. No numbers — just crops.

Kuro has been informed. He has opinions.
    `,
    tags: ['FARMED.COM', 'design', 'GDD'],
  },
  {
    id: 'studio-identity',
    date: '2025-04-10',
    category: 'announcement',
    emoji: '🌸',
    title: 'Sakura Moon Atelier — The Studio is Official',
    excerpt: 'The studio has a name, a logo, a mascot, and a founder with a very important hat. Welcome to Sakura Moon Atelier.',
    body: `
Sakura Moon Atelier is officially a thing.

**The Name**

It comes from two things that feel most like home: sakura blossoms in spring, and the quiet of a moonlit night. The studio makes cosy games with real depth — warm to look at, genuinely challenging to master.

**The Logo**

A black cat sitting under a crescent moon, beside a sakura tree. That's Kuro. He was here before the studio was.

**The Founder**

Engineer by day. Game developer by the light of a laptop screen. Always accompanied by Kuro, who provides quality assurance by sitting directly on the keyboard at critical moments.

**What We're Building**

FARMED.COM — a Sudoku farm roguelike. It shouldn't exist but absolutely should. More details coming soon.
    `,
    tags: ['studio', 'announcement', 'identity', 'test', 'test1'],
  },
  {
    id: 'farmed-concept',
    date: '2025-03-01',
    category: 'devlog',
    emoji: '🌾',
    title: 'From Grid Puzzles to Farm Deliveries: The Pivot',
    excerpt: 'FARMED.COM started as something quite different. Here\'s how a Sudoku roguelike became a farm delivery business run by an elderly couple.',
    body: `
Every game starts with a question. For FARMED.COM, the question was: "What if the numbers in Sudoku were something you could care about?"

**The Original Concept**

The original idea was a dark, neural-AI-themed Sudoku game. Grids that looked like circuit boards. Numbers that felt like data. It was interesting, but it was cold.

**The Pivot**

Then someone asked: what if the grid was a field? What if the numbers were crops?

Everything clicked. Suddenly the 30-second Farm Bell made sense — it's the evaluation cycle of the day. Suddenly the wrong crops damaging "Soil Life" made sense. Suddenly the elderly couple made sense — people who understood the land, and who have a grandson who set up a delivery app for them.

**The Inspector**

The Inspector came later. After Winter. He's the final challenge — not a monster, not an enemy. Just a person with a clipboard and standards. You either meet them or you don't.

Kuro, I am told, will be watching.
    `,
    tags: ['FARMED.COM', 'devlog', 'design'],
  },
  {
    id: 'design-system',
    date: '2025-02-15',
    category: 'art',
    emoji: '🎨',
    title: 'Building the Visual Identity of Sakura Moon Atelier',
    excerpt: 'Two themes, one palette, and a two-layer design token system. How the visual language of the studio came together.',
    body: `
Before writing a single line of game code, we built the visual foundation.

**Two Themes**

Sakura Garden (light) and Moonlight (dark). Both themes are built on the same primitive colour tokens — raw values that are never used directly. Over those, semantic tokens define meaning: "brand", "surface", "text-primary". Switching themes only overrides the semantic layer.

**The Palette**

Sakura pink (#C83860 in light, #F07898 in dark), warm gold (#C89040 / #F0C870), cream parchment (#FAF5EE), and deep navy (#080614). Every colour has a reason.

**Kuro's Rule**

Kuro reviewed the design tokens. He knocked the laptop off the table twice. We took this as approval.
    `,
    tags: ['art', 'design', 'tokens'],
  },
]

/**
 * Get a news post by id.
 * @param {string} id
 */
export const getNewsById = (id) => NEWS.find(n => n.id === id) ?? null

/**
 * Filter news by category.
 * @param {string|null} category — null means all
 */
export const filterNews = (category, query = '') => {
  const q = query.toLowerCase().trim()
  return NEWS.filter(n => {
    const matchCat = !category || n.category === category
    const matchQuery = !q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.tags.some(t => t.toLowerCase().includes(q))
    return matchCat && matchQuery
  })
}
