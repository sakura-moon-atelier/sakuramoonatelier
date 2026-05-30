import { useState, useEffect, useCallback, useRef } from 'react'
import { useRepositories } from '../contexts/RepositoryContext.jsx'
import { emptyResult } from '../repositories/index.js'

const DEBOUNCE_MS = 280

/**
 * useSocialFeed — fetches and filters social posts.
 * Identical contract to useNews. Works with static and remote.
 */
export function useSocialFeed(filter = {}) {
  const { social } = useRepositories()
  const [data,    setData]    = useState(emptyResult)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const timerRef   = useRef(null)
  const controlRef = useRef(null)

  const fetch_ = useCallback((f) => {
    controlRef.current?.abort()
    controlRef.current = new AbortController()
    const signal = controlRef.current.signal

    setLoading(true)
    setError(null)

    social
      .getAll({ ...f, signal })
      .then(result => { if (!signal.aborted) { setData(result); setLoading(false) } })
      .catch(err  => { if (!signal.aborted) { setError(err.message ?? 'Error'); setLoading(false) } })
  }, [social])

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => fetch_(filter), DEBOUNCE_MS)
    return () => {
      clearTimeout(timerRef.current)
      controlRef.current?.abort()
    }
  }, [
    filter.query, filter.platform, filter.gameId,
    filter.sortBy, filter.order, filter.page, filter.limit,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: () => fetch_(filter) }
}
