/**
 * Injects JSON-LD structured data into the document head.
 * Helps Google understand entity types: Organization, VideoGame, WebSite.
 * Works alongside react-helmet-async.
 */
import { useEffect } from 'react'

export default function JsonLd({ data }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    script.setAttribute('data-jsonld', data['@type'] ?? 'schema')
    document.head.appendChild(script)
    return () => script.remove()
  }, [data])
  return null
}

// Pre-built schemas — import and use in pages
export const SCHEMA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sakura Moon Atelier',
    description: 'A small indie game studio crafting cosy, strategic, beautifully illustrated games.',
    url: 'https://sakuramoonatelier.com',
    logo: 'https://sakuramoonatelier.com/logo.png',
    foundingDate: '2024',
    foundingLocation: { '@type': 'Place', name: 'Lisbon, Portugal' },
    sameAs: [
      'https://twitter.com/SakuraMoonGame',
      'https://instagram.com/SakuraMoonGame',
      'https://sakuramoonatelier.itch.io',
    ],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sakura Moon Atelier',
    url: 'https://sakuramoonatelier.com',
  },
  farmedCom: {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'FARMED.COM',
    description: 'A cosy Sudoku farm roguelike. An elderly farming couple navigate a modern delivery app with crops replacing numbers, four seasons, and The Inspector waiting at the end.',
    genre: ['Roguelike', 'Puzzle', 'Strategy'],
    gamePlatform: ['PC', 'Steam', 'itch.io'],
    applicationCategory: 'Game',
    operatingSystem: 'Windows, macOS, Linux',
    author: { '@type': 'Organization', name: 'Sakura Moon Atelier' },
    offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder' },
  },
}
