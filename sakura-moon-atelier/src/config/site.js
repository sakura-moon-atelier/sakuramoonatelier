/**
 * SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all website-level constants.
 * No page, component, or utility should hardcode these values.
 *
 * Environment variables override defaults when set.
 * See .env.example for the full list of supported env vars.
 * ─────────────────────────────────────────────────────────────────
 */

export const SITE = {
  // Identity
  name:        'Sakura Moon Atelier',
  tagline:     'Cosy games made with care',
  description: 'A small indie studio crafting warm, strategic, beautifully illustrated games — inspired by Japanese aesthetics and made with care in Portugal.',
  locale:      'en',
  founded:     2024,
  location:    'Lisbon, Portugal',

  // Domain & URLs — override with VITE_SITE_URL in production
  url: import.meta.env.VITE_SITE_URL ?? 'https://sakuramoonatelier.com',

  // Default OG image (relative path, resolved by SEOHead)
  ogImage: '/logo.png',

  // Contact
  email: {
    hello: import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@sakuramoonatelier.com',
    press: import.meta.env.VITE_PRESS_EMAIL   ?? 'press@sakuramoonatelier.com',
  },

  // Social — override per-handle via env vars or update directly here
  social: {
    instagram:   import.meta.env.VITE_SOCIAL_INSTAGRAM   ?? 'https://instagram.com/SakuraMoonGame',
    twitter:     import.meta.env.VITE_SOCIAL_TWITTER     ?? 'https://twitter.com/SakuraMoonGame',
    bluesky:     import.meta.env.VITE_SOCIAL_BLUESKY     ?? 'https://bsky.app/profile/sakuramoon.bsky.social',
    tiktok:      import.meta.env.VITE_SOCIAL_TIKTOK      ?? 'https://tiktok.com/@SakuraMoonGame',
    discord:     import.meta.env.VITE_SOCIAL_DISCORD     ?? 'https://discord.gg/sakuramoon',
    twitch:      import.meta.env.VITE_SOCIAL_TWITCH      ?? 'https://twitch.tv/SakuraMoonGame',
    itchio:      import.meta.env.VITE_SOCIAL_ITCHIO      ?? 'https://sakuramoonatelier.itch.io',
    steam:       import.meta.env.VITE_SOCIAL_STEAM       ?? null,
    nintendo:    import.meta.env.VITE_SOCIAL_NINTENDO    ?? null,
    playstation: import.meta.env.VITE_SOCIAL_PLAYSTATION ?? null,
  },

  // Press kit download URL — null until available
  pressKit: import.meta.env.VITE_PRESS_KIT_URL ?? null,

  // Steam wishlist
  steamWishlist: import.meta.env.VITE_STEAM_WISHLIST ?? null,
}
