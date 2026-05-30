import { useState, useEffect, useCallback, useRef } from 'react'
import { useRepositories } from '../contexts/RepositoryContext.jsx'
import { emptyResult } from '../repositories/index.js'

const DEBOUNCE_MS = 280

/**
 * useNews — fetches and filters news articles.
 *
 * @param {import('../repositories/types').QueryFilter} filter
 * @returns {{ data: PaginatedResult, loading: boolean, error: string|null, refetch: Function }}
 *
 * Works identically with StaticNewsRepository and RemoteNewsRepository.
 * AbortController cancels in-flight remote requests on filter change.
 * Debounce prevents excessive calls during text input.
 */
export function useNews(filter = {}) {
  const { news } = useRepositories()
  const [data,    setData]    = useState(emptyResult)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const timerRef   = useRef(null)
  const controlRef = useRef(null)

  const fetch_ = useCallback((f) => {
    // Cancel previous request
    controlRef.current?.abort()
    controlRef.current = new AbortController()
    const signal = controlRef.current.signal

    setLoading(true)
    setError(null)

    news
      .getAll({ ...f, signal })
      .then(result => { if (!signal.aborted) { setData(result); setLoading(false) } })
      .catch(err  => { if (!signal.aborted) { setError(err.message ?? 'Error'); setLoading(false) } })
  }, [news])

  useEffect(() => {
    // Debounce — wait for typing to settle before fetching
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => fetch_(filter), DEBOUNCE_MS)
    return () => {
      clearTimeout(timerRef.current)
      controlRef.current?.abort()
    }
  }, [
    filter.query, filter.category, filter.tags?.join(','),
    filter.gameId, filter.dateFrom, filter.dateTo,
    filter.sortBy, filter.order, filter.page, filter.limit,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: () => fetch_(filter) }
}

/**
 * useNewsItem — fetches a single news article by id.
 */
export function useNewsItem(id) {
  const { news } = useRepositories()
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    setLoading(true)
    news.getById(id)
      .then(item => { setData(item); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [id, news])

  return { data, loading, error }
}
