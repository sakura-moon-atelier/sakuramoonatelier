// Social feed — curated posts shown on the site.
// No API needed. Update this file to add new posts.
// Posts appear on Home (latest 3) and the Social page (all).

export const SOCIAL_PLATFORMS = [
  { key:'instagram',   icon:'📷', label:'Instagram',   color:'#E1306C' },
  { key:'twitter',     icon:'𝕏',  label:'X / Twitter', color:'#1DA1F2' },
  { key:'bluesky',     icon:'🦋', label:'Bluesky',     color:'#0085FF' },
  { key:'tiktok',      icon:'🎵', label:'TikTok',      color:'#FF0050' },
  { key:'twitch',      icon:'🎮', label:'Twitch',      color:'#9146FF' },
  { key:'discord',     icon:'💬', label:'Discord',     color:'#5865F2' },
  { key:'itchio',      icon:'🕹', label:'itch.io',     color:'#FA5C5C' },
  { key:'steam',       icon:'🎯', label:'Steam',       color:'#1B2838' },
]

export const SOCIAL_POSTS = [
  {
    id: 'post-001',
    platform: 'instagram',
    date: '2025-05-18',
    emoji: '🌸',
    text: "The GDD is done. FARMED.COM is officially in pre-production. Four seasons. Two farmers. One drone. One man with a clipboard. He arrives last. 🌾 #indiegame #gamedev #farmedcom",
    imageEmoji: '🌾',
    imageGradient: 'linear-gradient(135deg,#0C2010,#1A3020)',
    likes: 247,
    url: '#',
  },
  {
    id: 'post-002',
    platform: 'bluesky',
    date: '2025-05-10',
    emoji: '🦋',
    text: "Design token system for Sakura Moon Atelier is live — two layers, primitive + semantic. Changing the whole theme is one CSS block. Very satisfying. Kuro supervised. 🐈‍⬛",
    imageEmoji: null,
    imageGradient: null,
    likes: 89,
    url: '#',
  },
  {
    id: 'post-003',
    platform: 'tiktok',
    date: '2025-04-28',
    emoji: '🎵',
    text: "What is Sudoku with crops? Let me show you… 🌾🌻🥬🍅 #gamedev #indiegame #sudoku #cozygame #farmgame",
    imageEmoji: '📱',
    imageGradient: 'linear-gradient(135deg,#100820,#201040)',
    likes: 1842,
    url: '#',
  },
  {
    id: 'post-004',
    platform: 'twitter',
    date: '2025-04-15',
    emoji: '𝕏',
    text: "Naming the studio was surprisingly hard. Then I looked at the logo and there was already a cat under a moon next to a sakura tree. The name was already there. Sakura Moon Atelier. 🌙🌸🐈‍⬛",
    imageEmoji: null,
    imageGradient: null,
    likes: 312,
    url: '#',
  },
  {
    id: 'post-005',
    platform: 'discord',
    date: '2025-04-02',
    emoji: '💬',
    text: "The Sakura Moon Atelier Discord is open! Come talk about cosy roguelikes, Sudoku crop logic, and cats who sit on keyboards at critical moments. Link in bio.",
    imageEmoji: '💬',
    imageGradient: 'linear-gradient(135deg,#100B30,#1A1050)',
    likes: 156,
    url: '#',
  },
  {
    id: 'post-006',
    platform: 'twitch',
    date: '2025-03-20',
    emoji: '🎮',
    text: "First development stream of FARMED.COM tonight. I will be building the Sudoku board. Kuro will be judging. The Farm Bell will ring exactly once more than I want it to. 9PM Lisbon time.",
    imageEmoji: '🔴',
    imageGradient: 'linear-gradient(135deg,#1A0820,#200830)',
    likes: 203,
    url: '#',
  },
]

export const getLatestPosts = (count = 3) => SOCIAL_POSTS.slice(0, count)
export const getPostsByPlatform = (platform) =>
  platform ? SOCIAL_POSTS.filter(p => p.platform === platform) : SOCIAL_POSTS
