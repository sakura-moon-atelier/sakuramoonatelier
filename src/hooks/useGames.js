import { useState, useEffect } from 'react'
import { useRepositories } from '../contexts/RepositoryContext.jsx'
import { emptyResult } from '../repositories/index.js'

/**
 * useGames — fetches the full list of games.
 */
export function useGames(filter = {}) {
  const { games } = useRepositories()
  const [data,    setData]    = useState(emptyResult)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    setLoading(true)
    games.getAll(filter)
      .then(result => { setData(result); setLoading(false) })
      .catch(err   => { setError(err.message); setLoading(false) })
  }, [filter.query, filter.order]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}

/**
 * useGame — fetches a single game by slug.
 */
export function useGame(slug) {
  const { games } = useRepositories()
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    setLoading(true)
    games.getBySlug(slug)
      .then(game => { setData(game); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [slug, games])

  return { data, loading, error }
}
