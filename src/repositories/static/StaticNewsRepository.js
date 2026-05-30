import { NewsRepository } from '../interfaces/NewsRepository.js'
import { paginate } from '../types.js'
import { NEWS } from '../../data/news.js'

export class StaticNewsRepository extends NewsRepository {
  async getAll(filter = {}) {
    const { query, category, tags, gameId, dateFrom, dateTo, sortBy, order = 'desc', page = 1, limit = 20 } = filter

    let items = [...NEWS]

    if (query) {
      const q = query.toLowerCase()
      items = items.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (category) items = items.filter(n => n.category === category)
    if (tags?.length) items = items.filter(n => tags.some(t => n.tags.includes(t)))
    if (gameId)   items = items.filter(n => n.tags.some(t => t.toLowerCase() === gameId.toLowerCase()))
    if (dateFrom) items = items.filter(n => n.date >= dateFrom)
    if (dateTo)   items = items.filter(n => n.date <= dateTo)

    // Sort
    items.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return a.date < b.date ? 1 : -1 // default: newest first
    })
    if (order === 'asc') items.reverse()

    return paginate(items, page, limit)
  }

  async getById(id) {
    return NEWS.find(n => n.id === id) ?? null
  }
}
