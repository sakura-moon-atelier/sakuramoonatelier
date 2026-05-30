import { NotImplementedError } from './NewsRepository.js'
export class GamesRepository {
  /** @param {import('../types').QueryFilter} filter @returns {Promise<import('../types').PaginatedResult>} */
  async getAll(filter = {})   { throw new NotImplementedError('getAll',   'GamesRepository') }
  /** @param {string} slug @returns {Promise<Object|null>} */
  async getBySlug(slug)       { throw new NotImplementedError('getBySlug','GamesRepository') }
}
