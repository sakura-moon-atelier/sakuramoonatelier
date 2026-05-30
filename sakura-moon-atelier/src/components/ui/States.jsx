/**
 * LoadingState — consistent skeleton/spinner shown while data loads.
 * ErrorState  — consistent error display with retry button.
 */

export function LoadingState({ message = 'Loading…', rows = 3 }) {
  return (
    <div style={{ padding: 'var(--space-12)', textAlign: 'center' }} role="status" aria-live="polite">
      <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-4)', animation: 'float 2s ease-in-out infinite' }} aria-hidden="true">
        🌸
      </span>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', transition: 'color var(--ease-theme)' }}>
        {message}
      </p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div style={{ padding: 'var(--space-12)', textAlign: 'center' }} role="alert">
      <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-4)' }} aria-hidden="true">🌩️</span>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-6)', transition: 'color var(--ease-theme)' }}>
        {message ?? 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry} style={{ fontSize: 'var(--text-xs)' }}>
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ emoji = '🌾', message = 'Nothing found.', children }) {
  return (
    <div style={{ padding: 'var(--space-16)', textAlign: 'center' }}>
      <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }} aria-hidden="true">{emoji}</span>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginBottom: children ? 'var(--space-4)' : 0, transition: 'color var(--ease-theme)' }}>
        {message}
      </p>
      {children}
    </div>
  )
}
