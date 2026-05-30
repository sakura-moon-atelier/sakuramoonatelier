import { GamesRepository } from '../interfaces/GamesRepository.js'
import { paginate } from '../types.js'
import { GAMES } from '../../data/games.js'

export class StaticGamesRepository extends GamesRepository {
  async getAll(filter = {}) {
    const { query, order = 'asc', page = 1, limit = 20 } = filter
    let items = [...GAMES]
    if (query) {
      const q = query.toLowerCase()
      items = items.filter(g => g.title.toLowerCase().includes(q))
    }
    if (order === 'desc') items.reverse()
    return paginate(items, page, limit)
  }

  async getBySlug(slug) {
    return GAMES.find(g => g.slug === slug) ?? null
  }
}
