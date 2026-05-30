/**
 * REPOSITORY TYPES
 * Shared contracts used by all repository interfaces and their implementations.
 * Both static (local) and remote implementations receive and return these shapes.
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * @typedef {Object} QueryFilter
 * Full-featured filter passed to all repository query methods.
 * Static repositories apply filters in JS.
 * Remote repositories serialise them to query params.
 *
 * @property {string}             [query]    - Full-text search term
 * @property {string}             [category] - Single category slug
 * @property {string[]}           [tags]     - OR-matched tags
 * @property {string}             [gameId]   - Filter by related game id
 * @property {string}             [platform] - Filter social posts by platform
 * @property {string}             [dateFrom] - ISO date string 'YYYY-MM-DD'
 * @property {string}             [dateTo]   - ISO date string 'YYYY-MM-DD'
 * @property {'date'|'title'|'likes'} [sortBy] - Sort field
 * @property {'asc'|'desc'}       [order]    - Sort direction (default: desc)
 * @property {number}             [page]     - 1-indexed page number
 * @property {number}             [limit]    - Items per page
 * @property {AbortSignal}        [signal]   - For cancelling remote requests
 */

/**
 * @typedef {Object} PaginatedResult
 * Standard return shape from all repository list methods.
 * Remote implementations map their API response to this shape.
 *
 * @property {Array}   items   - Items for the current page
 * @property {number}  total   - Total matching items (across all pages)
 * @property {number}  page    - Current page number (1-indexed)
 * @property {boolean} hasMore - Whether more pages exist
 */

/**
 * Creates an empty PaginatedResult.
 * Useful as an initial state in hooks.
 * @returns {PaginatedResult}
 */
export const emptyResult = () => ({ items: [], total: 0, page: 1, hasMore: false })

/**
 * Paginates a pre-filtered array.
 * Used by all static repositories to apply page/limit consistently.
 *
 * @param {Array}  items
 * @param {number} page
 * @param {number} limit
 * @returns {PaginatedResult}
 */
export function paginate(items, page = 1, limit = 50) {
  const total = items.length
  const start = (page - 1) * limit
  return {
    items:   items.slice(start, start + limit),
    total,
    page,
    hasMore: start + limit < total,
  }
}
