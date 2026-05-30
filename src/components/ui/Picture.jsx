import { asset } from '../../utils/assets.js'

/**
 * Responsive image with WebP + PNG/JPG fallback.
 * Automatically serves .webp if available, falls back to original.
 * Always include width + height to prevent CLS (Cumulative Layout Shift).
 *
 * @example
 *   <Picture src="logo.png" alt="Studio logo" width={120} height={120} />
 */
export default function Picture({ src, alt, width, height, style, className, loading = 'lazy', ...props }) {
  const webpSrc = asset(src.replace(/\.(png|jpe?g)$/i, '.webp'))
  const fallbackSrc = asset(src)

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={style}
        className={className}
        {...props}
      />
    </picture>
  )
}
