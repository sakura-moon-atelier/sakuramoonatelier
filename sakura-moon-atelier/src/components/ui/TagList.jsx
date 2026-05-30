/**
 * TagList — renders tags in a single non-wrapping row.
 * Shows up to `max` tags, then a "+N more" counter badge.
 * Ensures consistent single-line height on all cards.
 */
export default function TagList({ tags = [], max = 3, onTagClick }) {
  if (!tags.length) return null

  const visible = tags.slice(0, max)
  const overflow = tags.length - max

  const tagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    background: 'var(--color-bg-surface-2)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-sm)',
    padding: '.18rem .6rem',
    whiteSpace: 'nowrap',
    cursor: onTagClick ? 'pointer' : 'default',
    transition: 'all var(--ease-normal)',
  }

  const overflowStyle = {
    ...tagStyle,
    background: 'var(--color-brand-subtle)',
    border: '1px solid var(--color-brand-subtle-2)',
    color: 'var(--color-brand)',
    fontWeight: 700,
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        alignItems: 'center',
      }}
      aria-label={`Tags: ${tags.join(', ')}`}
    >
      {visible.map(tag => (
        <span
          key={tag}
          style={tagStyle}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          onMouseEnter={onTagClick ? e => { e.target.style.borderColor = 'var(--color-brand)'; e.target.style.color = 'var(--color-brand)' } : undefined}
          onMouseLeave={onTagClick ? e => { e.target.style.borderColor = ''; e.target.style.color = '' } : undefined}
        >
          #{tag}
        </span>
      ))}
      {overflow > 0 && (
        <span style={overflowStyle} aria-label={`${overflow} more tags`}>
          +{overflow}
        </span>
      )}
    </div>
  )
}
