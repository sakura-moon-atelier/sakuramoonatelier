import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { SUPPORTED_LANGS } from '../../i18n/config.js'
import Picture from '../ui/Picture.jsx'

// News is added here — Social stays in footer only
const NAV_KEYS = ['home', 'games', 'news', 'about', 'contact']

export default function Nav({ page, setPage }) {
  const { t, i18n } = useTranslation()
  const { dark, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const go = (key) => { setPage(key); setOpen(false); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <button onClick={() => go('home')}
          style={{ display:'flex', alignItems:'center', gap:'.55rem', background:'none', border:'none', cursor:'pointer' }}
          aria-label="Go to home">
          <Picture src="logo.png" alt="Sakura Moon Atelier logo" width={32} height={32}
            style={{ width:'32px', height:'32px', objectFit:'contain', borderRadius:'4px' }} loading="eager" />
          <div className="nav-logo-text">
            <div style={{ fontFamily:'var(--font-label)', fontWeight:700, fontSize:'.80rem', color:'var(--color-text-primary)', letterSpacing:'.04em', transition:'color var(--ease-theme)', whiteSpace:'nowrap' }}>
              Sakura Moon Atelier
            </div>
            <div style={{ fontSize:'.52rem', fontWeight:600, color:'var(--color-text-muted)', letterSpacing:'.16em', textTransform:'uppercase', transition:'color var(--ease-theme)' }}>
              Indie Game Studio
            </div>
          </div>
        </button>

        {/* Desktop nav links */}
        <div className="nav-links">
          {NAV_KEYS.map(key => (
            <button key={key} onClick={() => go(key)}
              className={`nav-link ${page === key || (page === 'news-detail' && key === 'news') || (page === 'game-detail' && key === 'games') ? 'active' : ''}`}>
              {t(`nav.${key}`)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="nav-controls">
          <div className="lang-toggle" role="group" aria-label="Language selector">
            {SUPPORTED_LANGS.map(lang => (
              <button key={lang.code}
                className={`lang-btn ${i18n.language.startsWith(lang.code) ? 'active' : ''}`}
                onClick={() => i18n.changeLanguage(lang.code)}
                aria-label={`Switch to ${lang.name}`}
                aria-pressed={i18n.language.startsWith(lang.code)}>
                {lang.label}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
            <div className="theme-toggle-knob" />
          </button>
          <button className={`nav-hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu" aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`nav-mobile-menu ${open ? 'open' : ''}`} role="menu">
          {NAV_KEYS.map(key => (
            <button key={key} onClick={() => go(key)} role="menuitem"
              className={`nav-mobile-link ${page === key ? 'active' : ''}`}>
              {t(`nav.${key}`)}
            </button>
          ))}
          <button onClick={() => go('social')} role="menuitem" className="nav-mobile-link">
            📱 Social
          </button>
          <button onClick={() => go('press-kit')} role="menuitem" className="nav-mobile-link">
            📋 Press Kit
          </button>
        </div>
      </nav>
    </>
  )
}
