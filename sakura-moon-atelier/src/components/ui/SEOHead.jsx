import { Helmet } from 'react-helmet-async'
import { SITE } from '../../config/site.js'

/**
 * SEOHead — per-page meta tags.
 * Reads canonical URL from SITE config (no hardcoded domain).
 */
export default function SEOHead({
  title       = `${SITE.name} — ${SITE.tagline}`,
  description = SITE.description,
  ogImage     = SITE.ogImage,
  ogType      = 'website',
  noindex     = false,
}) {
  const fullImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE.url}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"        content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:url"         content={SITE.url} />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />
    </Helmet>
  )
}
