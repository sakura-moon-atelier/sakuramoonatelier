import { NewsRepository, NotImplementedError } from '../interfaces/NewsRepository.js'
import { REMOTE_BASE_URL } from '../../config/repositories.js'

/**
 * RemoteNewsRepository — fetches from your API.
 * Implement the methods below when your backend is ready.
 * Until then, calling any method throws NotImplementedError immediately.
 *
 * Expected API contract:
 *   GET /api/news?q=&category=&tags=&dateFrom=&dateTo=&sortBy=&order=&page=&limit=
 *   → { items: [], total: number, page: number, hasMore: boolean }
 *
 *   GET /api/news/:id
 *   → { ...newsObject } | 404
 */
export class RemoteNewsRepository extends NewsRepository {
  #base = `${REMOTE_BASE_URL}/api/news`

  async getAll(filter = {}) {
    // TODO: implement when API is ready
    throw new NotImplementedError('getAll', 'RemoteNewsRepository')

    /* Implementation template:
    const { signal, ...params } = filter
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([,v]) => v != null && v !== ''))
    ).toString()
    const res = await fetch(`${this.#base}?${qs}`, { signal })
    if (!res.ok) throw new Error(`News API error ${res.status}`)
    return res.json()  // must match PaginatedResult shape
    */
  }

  async getById(id) {
    // TODO: implement when API is ready
    throw new NotImplementedError('getById', 'RemoteNewsRepository')

    /* Implementation template:
    const res = await fetch(`${this.#base}/${id}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`News API error ${res.status}`)
    return res.json()
    */
  }
}
