/**
 * Resolves a public asset path using Vite's BASE_URL.
 * Use this for ALL public asset references (images, etc.) so they work
 * both locally (npm run dev / npm run preview) and on GitHub Pages.
 *
 * @example
 *   <img src={asset('logo.png')} />
 *   <img src={asset('hero-light.png')} />
 */
export const asset = (path) => {
  const base = import.meta.env.BASE_URL
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${base}${clean}`
}

/**
 * Returns the full CSS url() string for a public image asset.
 * Use this when setting CSS custom properties that contain url() from JS.
 *
 * @example
 *   el.style.setProperty('--hero-bg-image', cssUrl('hero-light.png'))
 */
export const cssUrl = (path) => `url('${asset(path)}')`
