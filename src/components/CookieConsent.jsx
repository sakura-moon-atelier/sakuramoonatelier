import { useState, useEffect } from 'react'

const STORAGE_KEY = 'sma-cookie-consent'

/**
 * GDPR-compliant cookie consent banner.
 * Stores acceptance in localStorage. No dark patterns.
 * No analytics/tracking cookies are used on this site — this banner
 * covers future third-party scripts (newsletter embed, analytics, etc.)
 */
export default function CookieConsent({ setPage }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so it doesn't flash immediately on load
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
      } catch {
        // localStorage unavailable — don't show banner
      }
    }, 1800)
    return () => clearTimeout(t)
  }, [])

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch {}
    setVisible(false)
  }

  const decline = () => {
    try { localStorage.setItem(STORAGE_KEY, 'declined') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      style={{
        position: 'fixed',
        bottom: '1.2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(92vw, 560px)',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '1rem 1.2rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'calc(var(--z-modal) + 10)',
        display: 'flex',
        flexDirection: 'column',
        gap: '.65rem',
        animation: 'slideUp .3s ease',
        transition: 'background var(--ease-theme), border-color var(--ease-theme)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
        <span style={{ fontSize: '1.3rem', flexShrink: 0 }} aria-hidden="true">🍪</span>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '.2rem', transition: 'color var(--ease-theme)' }}>
            A quick note on cookies
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', lineHeight: 1.7, transition: 'color var(--ease-theme)' }}>
            This site stores your theme and language preferences in your browser. No tracking or advertising. If you subscribe to updates, we store only your email.{' '}
            <button
              onClick={() => setPage('privacy')}
              style={{ color: 'var(--color-brand)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}>
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          className="btn btn-ghost"
          style={{ fontSize: '.65rem', padding: '.35rem .8rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Decline
        </button>
        <button
          onClick={accept}
          className="btn btn-primary"
          style={{ fontSize: '.65rem', padding: '.38rem 1rem' }}>
          Got it 🌸
        </button>
      </div>
    </div>
  )
}
