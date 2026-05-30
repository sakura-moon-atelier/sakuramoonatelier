/**
 * Repository layer — public API
 * Import from here, never from individual files.
 *
 * @example
 *   import { RepositoryFactory } from '../repositories'
 *   import { emptyResult, paginate } from '../repositories'
 */
export { RepositoryFactory }               from './RepositoryFactory.js'
export { emptyResult, paginate }           from './types.js'
export { NotImplementedError }             from './interfaces/NewsRepository.js'
