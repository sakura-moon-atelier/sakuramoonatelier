/**
 * PlaceholderImage
 * Shown whenever a real image is not yet available.
 * Consistent gradient + emoji + optional label.
 * Swap it out by setting src on the parent data object.
 */
export default function PlaceholderImage({
  emoji = '🌸',
  label,
  aspectRatio = '16/9',
  style = {},
  gradient = 'linear-gradient(135deg, var(--color-bg-surface-2), var(--color-bg-surface-3))',
}) {
  return (
    <div
      role="img"
      aria-label={label ?? `${emoji} placeholder image`}
      style={{
        width: '100%',
        aspectRatio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        background: gradient,
        borderRadius: 0,  /* no radius by default; parent card handles it */
        transition: 'background var(--ease-theme)',
        ...style,
      }}
    >
      <span style={{ fontSize: '2.5rem', lineHeight: 1 }} aria-hidden="true">{emoji}</span>
      {label && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '0 1rem',
          transition: 'color var(--ease-theme)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
