/**
 * ViewToggle
 * Grid / List toggle button pair.
 * Persists preference to localStorage by key.
 */

const ICON = {
  grid: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
      <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
    </svg>
  ),
  list: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="2" width="14" height="2" rx="1"/>
      <rect x="1" y="7" width="14" height="2" rx="1"/>
      <rect x="1" y="12" width="14" height="2" rx="1"/>
    </svg>
  ),
}

export default function ViewToggle({ view, onChange }) {
  const btn = (v) => (
    <button
      onClick={() => onChange(v)}
      aria-label={`${v} view`}
      aria-pressed={view === v}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all var(--ease-normal)',
        background: view === v ? 'var(--color-brand)' : 'transparent',
        color:      view === v ? 'var(--color-text-on-brand)' : 'var(--color-text-tertiary)',
      }}
    >
      {ICON[v]}
    </button>
  )

  return (
    <div style={{
      display: 'flex', gap: '2px',
      background: 'var(--color-bg-surface-2)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '2px',
      transition: 'all var(--ease-theme)',
    }}
    role="group" aria-label="View toggle"
    >
      {btn('grid')}
      {btn('list')}
    </div>
  )
}
