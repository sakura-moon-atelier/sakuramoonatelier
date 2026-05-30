import { GamesRepository } from '../interfaces/GamesRepository.js'
import { NotImplementedError } from '../interfaces/NewsRepository.js'
import { REMOTE_BASE_URL } from '../../config/repositories.js'

/**
 * RemoteGamesRepository — fetches from your API.
 * Expected contract:
 *   GET /api/games          → PaginatedResult<Game>
 *   GET /api/games/:slug    → Game | 404
 */
export class RemoteGamesRepository extends GamesRepository {
  #base = `${REMOTE_BASE_URL}/api/games`

  async getAll(filter = {}) {
    throw new NotImplementedError('getAll', 'RemoteGamesRepository')
  }
  async getBySlug(slug) {
    throw new NotImplementedError('getBySlug', 'RemoteGamesRepository')
  }
}
