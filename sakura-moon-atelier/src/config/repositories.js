/**
 * REPOSITORY CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * Controls whether the app reads data from local JS/JSON files
 * or from your remote API.
 *
 * Set VITE_DATA_SOURCE=remote in .env.local to switch.
 * Per-resource overrides let you migrate one resource at a time.
 * ─────────────────────────────────────────────────────────────────
 */

export const DATA_SOURCE = (import.meta.env.VITE_DATA_SOURCE ?? 'static')

export const REMOTE_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.sakuramoonatelier.com'

/**
 * Per-resource source override (falls back to DATA_SOURCE).
 * Example: { news: 'remote', games: 'static' }
 */
export const RESOURCE_SOURCE = {}
