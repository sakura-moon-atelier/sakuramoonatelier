/**
 * RepositoryFactory
 * Creates the correct repository implementation based on config.
 * Supports global DATA_SOURCE and per-resource RESOURCE_SOURCE overrides.
 *
 * Usage: RepositoryFactory.create('news') → StaticNewsRepository | RemoteNewsRepository
 */
import { DATA_SOURCE, RESOURCE_SOURCE } from '../config/repositories.js'

import { StaticNewsRepository }   from './static/StaticNewsRepository.js'
import { StaticSocialRepository } from './static/StaticSocialRepository.js'
import { StaticGamesRepository }  from './static/StaticGamesRepository.js'

import { RemoteNewsRepository }   from './remote/RemoteNewsRepository.js'
import { RemoteSocialRepository } from './remote/RemoteSocialRepository.js'
import { RemoteGamesRepository }  from './remote/RemoteGamesRepository.js'

const STATIC_MAP = {
  news:   StaticNewsRepository,
  social: StaticSocialRepository,
  games:  StaticGamesRepository,
}

const REMOTE_MAP = {
  news:   RemoteNewsRepository,
  social: RemoteSocialRepository,
  games:  RemoteGamesRepository,
}

export class RepositoryFactory {
  /**
   * @param {'news'|'social'|'games'} resource
   * @returns {NewsRepository|SocialRepository|GamesRepository}
   */
  static create(resource) {
    const source = RESOURCE_SOURCE[resource] ?? DATA_SOURCE
    const map    = source === 'remote' ? REMOTE_MAP : STATIC_MAP
    const Repo   = map[resource]

    if (!Repo) throw new Error(`[RepositoryFactory] Unknown resource: "${resource}"`)
    return new Repo()
  }

  /** Convenience — creates all three at once. */
  static createAll() {
    return {
      news:   RepositoryFactory.create('news'),
      social: RepositoryFactory.create('social'),
      games:  RepositoryFactory.create('games'),
    }
  }
}
