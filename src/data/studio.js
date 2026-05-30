/**
 * STUDIO DATA
 * ─────────────────────────────────────────────────────────────────
 * Studio identity, team, and values.
 * Website-level config (URLs, emails, social handles) comes from
 * src/config/site.js — do not duplicate those values here.
 * ─────────────────────────────────────────────────────────────────
 */
import { SITE } from '../config/site.js'

// Re-export STUDIO for backwards compatibility — components import from here
export const STUDIO = {
  name:      SITE.name,
  tagline:   SITE.tagline,
  founded:   SITE.founded,
  location:  SITE.location,
  email:     SITE.email,
  social:    SITE.social,
  pressKit:  SITE.pressKit,
}

export const FOUNDER = {
  name:        'Ana',
  displayName: 'Ana',
  role:        'Founder & Developer',
  photo:       'founder.png',
  sheet:       'founder-sheet.png',
  traits: ['Engineer', 'Cat Lover', 'Magic Enthusiast', 'Builder of Cosy Worlds'],
  essentials: [
    { emoji:'💻', label:'Laptop' },
    { emoji:'✨', label:'Magic Tablet' },
    { emoji:'☕', label:'Coffee' },
    { emoji:'👓', label:'Code Glasses' },
    { emoji:'🌸', label:'Sakura Bookmark' },
    { emoji:'🪄', label:'Wand / Stylus' },
  ],
}

export const KURO = {
  name:   'Kuro',
  emoji:  '🐈‍⬛',
  role:   'Chief Quality Officer',
  traits: ['Moon Watcher', 'Professional Distractor', 'Quality Assurance'],
}

export const VALUES = [
  { icon:'🌸', key:'care',     colorVar:'--color-brand-subtle' },
  { icon:'🌙', key:'cosy',     colorVar:'--color-accent-subtle' },
  { icon:'🐱', key:'everyone', colorVar:'rgba(70,148,80,.10)' },
]

export const PRESS_KIT_ASSETS = [
  { label:'Studio Logo (PNG)',         file:'logo.png',          size:'~120KB' },
  { label:'Founder Profile (PNG)',     file:'founder.png',       size:'~200KB' },
  { label:'Character Sheet (PNG)',     file:'founder-sheet.png', size:'~450KB' },
]
