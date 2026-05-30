import { SocialRepository } from '../interfaces/SocialRepository.js'
import { paginate } from '../types.js'
import { SOCIAL_POSTS } from '../../data/socialFeed.js'

export class StaticSocialRepository extends SocialRepository {
  async getAll(filter = {}) {
    const { query, platform, gameId, sortBy, order = 'desc', page = 1, limit = 20 } = filter

    let items = [...SOCIAL_POSTS]

    if (query) {
      const q = query.toLowerCase()
      items = items.filter(p => p.text.toLowerCase().includes(q))
    }
    if (platform) items = items.filter(p => p.platform === platform)
    if (gameId)   items = items.filter(p => p.relatedGame === gameId)

    items.sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes
      return a.date < b.date ? 1 : -1
    })
    if (order === 'asc') items.reverse()

    return paginate(items, page, limit)
  }
}
