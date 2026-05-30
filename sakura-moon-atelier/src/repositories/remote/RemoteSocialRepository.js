import { SocialRepository } from '../interfaces/SocialRepository.js'
import { NotImplementedError } from '../interfaces/NewsRepository.js'
import { REMOTE_BASE_URL } from '../../config/repositories.js'

/**
 * RemoteSocialRepository — fetches from your API.
 * Expected contract:
 *   GET /api/social?platform=&q=&gameId=&sortBy=&order=&page=&limit=
 *   → { items: [], total: number, page: number, hasMore: boolean }
 */
export class RemoteSocialRepository extends SocialRepository {
  #base = `${REMOTE_BASE_URL}/api/social`

  async getAll(filter = {}) {
    throw new NotImplementedError('getAll', 'RemoteSocialRepository')
    /* Template: same pattern as RemoteNewsRepository.getAll */
  }
}
