import { useState } from 'react'

const LINKS = ['Home', 'Games', 'About', 'Contact']

export default function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (p) => {
    setPage(p)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-petal/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => go('Home')} className="flex items-center gap-2.5 cursor-pointer group">
          <span className="text-xl group-hover:animate-float">🐈‍⬛</span>
          <span className="font-nunito font-bold text-sm text-navy tracking-wide">
            Sakura Moon Atelier
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <button
              key={l}
              onClick={() => go(l)}
              className={`nav-link ${page === l ? 'active' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Decoration */}
        <div className="hidden md:flex items-center gap-1 opacity-40 text-sm">
          🌸🌸🌸
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-navy transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden bg-blush border-t border-petal/20 ${menuOpen ? 'open' : ''}`}>
        <div className="px-6 py-4 flex flex-col gap-3">
          {LINKS.map(l => (
            <button
              key={l}
              onClick={() => go(l)}
              className={`text-left font-nunito font-semibold text-sm py-2 border-b border-petal/20 ${page === l ? 'text-navy' : 'text-muted'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
