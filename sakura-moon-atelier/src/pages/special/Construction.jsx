import { useTranslation } from 'react-i18next'
import Petals from '../../components/decorative/Petals.jsx'
import Stars from '../../components/decorative/Stars.jsx'

export default function Construction({ setPage, onRetry }) {
  const { t } = useTranslation()
  const k = 'special.construction'

  const handleCta = () => {
    if (onRetry) { onRetry(); return; }
    if (setPage) { setPage('home'); window.scrollTo({ top: 0 }); }
  }

  return (
    <div className="special-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <Stars />
      <Petals />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
        {/* Badge */}
        <div className="badge badge-brand" style={{ marginBottom: 'var(--space-4)' }}>
          {t(k + '.badge')}
        </div>
        {/* Kuro + emoji */}
        <div style={{ fontSize: '4rem', margin: 'var(--space-4) 0', animation: 'floatSlow 7s ease-in-out infinite', display: 'inline-block' }} aria-hidden="true">
          {t(k + '.emoji')}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)', transition: 'color var(--ease-theme)' }}>
          {t(k + '.title')}
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.9, marginBottom: 'var(--space-4)', transition: 'color var(--ease-theme)' }}>
          {t(k + '.body')}
        </p>
        {/* Kuro message bubble */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-8)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', transition: 'all var(--ease-theme)' }}>
          <span style={{ fontSize: '1.4rem' }} aria-hidden="true">🐈‍⬛</span>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontStyle: 'italic', transition: 'color var(--ease-theme)' }}>
            {t(k + '.kuroMessage')}
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCta}>
          {t(k + '.cta')}
        </button>
      </div>
    </div>
  )
}
