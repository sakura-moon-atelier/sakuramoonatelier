/**
 * NewsRepository — Interface (base class acting as contract)
 * All implementations MUST extend this class and implement every method.
 * Calling any method on the base class throws NotImplementedError.
 */
export class NewsRepository {
  /** @param {import('../types').QueryFilter} filter @returns {Promise<import('../types').PaginatedResult>} */
  async getAll(filter = {})  { throw new NotImplementedError('getAll',  'NewsRepository') }
  /** @param {string} id @returns {Promise<Object|null>} */
  async getById(id)          { throw new NotImplementedError('getById', 'NewsRepository') }
}

export class NotImplementedError extends Error {
  constructor(method, repo) {
    super(
      `[${repo}].${method}() is not implemented.\n` +
      `→ Set DATA_SOURCE='static' in src/config/repositories.js,\n` +
      `  or implement this method in the Remote repository.`
    )
    this.name = 'NotImplementedError'
  }
}
