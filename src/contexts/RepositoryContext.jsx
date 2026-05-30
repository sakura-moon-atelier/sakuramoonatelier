import { createContext, useContext, useMemo } from 'react'
import { RepositoryFactory } from '../repositories/index.js'

/**
 * RepositoryContext
 * Provides repository instances to the entire component tree.
 * Components never import repositories directly — they use useRepositories().
 *
 * To swap implementations in tests, wrap the tree with a custom provider
 * and pass mock repositories as `value`.
 */
const RepositoryContext = createContext(null)

export function RepositoryProvider({ children }) {
  // Memoised so repositories are created once, not on every render.
  const repositories = useMemo(() => RepositoryFactory.createAll(), [])

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  )
}

/**
 * Returns all three repository instances.
 * @returns {{ news: NewsRepository, social: SocialRepository, games: GamesRepository }}
 */
export function useRepositories() {
  const ctx = useContext(RepositoryContext)
  if (!ctx) throw new Error('useRepositories must be used within RepositoryProvider')
  return ctx
}
