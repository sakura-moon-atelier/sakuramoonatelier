import { NotImplementedError } from './NewsRepository.js'
export class SocialRepository {
  /** @param {import('../types').QueryFilter} filter @returns {Promise<import('../types').PaginatedResult>} */
  async getAll(filter = {}) { throw new NotImplementedError('getAll',  'SocialRepository') }
}
