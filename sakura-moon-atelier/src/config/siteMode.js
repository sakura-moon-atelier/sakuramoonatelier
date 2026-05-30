/**
 * SITE MODE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────
 * SITE_MODE controls the global state of the entire site.
 *
 *   'live'          → normal operation
 *   'maintenance'   → every page shows Maintenance (except passthrough)
 *   'construction'  → every page shows Construction
 *
 * ROUTE_OVERRIDES puts individual routes in a special state
 * while the rest of the site runs normally.
 *
 * Usage examples:
 *   SITE_MODE = 'maintenance'              // whole site in maintenance
 *   ROUTE_OVERRIDES = { games: 'construction' }  // just games page
 * ─────────────────────────────────────────────────────────────────
 */

export const SITE_MODE = 'live'  // 'live' | 'maintenance' | 'construction'

export const ROUTE_OVERRIDES = {
  // 'games':      'construction',
  // 'contact':    'maintenance',
  // 'news-detail':'construction',
}

// These routes always render normally regardless of SITE_MODE.
export const PASSTHROUGH_ROUTES = new Set([
  'debug', 'privacy', 'offline', '404', 'error',
  'construction', 'maintenance',
])
