import { useState, useMemo } from 'react'
import SEOHead from '../components/ui/SEOHead.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ViewToggle from '../components/ui/ViewToggle.jsx'
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx'
import { LoadingState, ErrorState, EmptyState } from '../components/ui/States.jsx'
import TagList from '../components/ui/TagList.jsx'
import { useNews } from '../hooks/useNews.js'
import { NEWS_CATEGORIES } from '../data/news.js'

const ALL = 'all'
const SORT_OPTIONS = [
  { value:'date-desc',  label:'Newest first' },
  { value:'date-asc',   label:'Oldest first' },
  { value:'title-asc',  label:'Title A–Z' },
]

function countActiveFilters({ category, tags, dateFrom, dateTo }) {
  let n = 0
  if (category && category !== ALL) n++
  if (tags?.length) n++
  if (dateFrom) n++
  if (dateTo) n++
  return n
}

function NewsCard({ post, onClick, view }) {
  const date = new Date(post.date).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' })
  const isList = view === 'list'

  if (isList) {
    return (
      <article className="card card-hover news-card"
        onClick={() => onClick(post.id)} tabIndex={0} role="article"
        onKeyDown={e => e.key === 'Enter' && onClick(post.id)}
        aria-label={`Read: ${post.title}`}
        style={{ display:'flex', flexDirection:'row', overflow:'hidden', alignItems:'stretch' }}>
        {/* Image strip — fixed width, full card height */}
        <div className="news-card-image-strip">
          <PlaceholderImage emoji={post.emoji} aspectRatio="1/1"
            style={{ width:'100%', height:'100%', minHeight:'110px', borderRadius:0 }} />
        </div>
        {/* Content — padded on all sides */}
        <div style={{ flex:1, padding:'var(--space-5) var(--space-6)', display:'flex', flexDirection:'column', justifyContent:'center', gap:'var(--space-2)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)', flexWrap:'wrap' }}>
            <span className="badge badge-brand" style={{ fontSize:'.65rem' }}>{post.category}</span>
            <span style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', transition:'color var(--ease-theme)' }}>{date}</span>
          </div>
          <h3 className="news-card-title" style={{ marginBottom:0 }}>{post.title}</h3>
          <p className="news-card-excerpt" style={{ display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
            {post.excerpt}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article className="card card-hover news-card"
      onClick={() => onClick(post.id)} tabIndex={0} role="article"
      onKeyDown={e => e.key === 'Enter' && onClick(post.id)}
      aria-label={`Read: ${post.title}`}
      style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      {/* Image slot — fixed 16/9 */}
      <div className="news-card-image-slot" style={{ flexShrink:0 }}>
        <PlaceholderImage emoji={post.emoji} aspectRatio="16/9" label={post.title}
          style={{ width:'100%', height:'100%', borderRadius:0 }} />
      </div>
      <div className="news-card-body" style={{ flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)', marginBottom:'var(--space-3)', flexWrap:'wrap' }}>
          <span className="badge badge-brand" style={{ fontSize:'.65rem' }}>{post.category}</span>
          <span style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', transition:'color var(--ease-theme)' }}>{date}</span>
        </div>
        <h3 className="news-card-title">{post.title}</h3>
        <p className="news-card-excerpt" style={{ display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:'var(--space-3)' }}>
          {post.excerpt}
        </p>
        <div style={{ flex:1 }} />
        <TagList tags={post.tags} max={3} />
      </div>
    </article>
  )
}

export default function News({ setPage, setNewsId }) {
  const [view,       setView]      = useState('grid')
  const [sort,       setSort]      = useState('date-desc')
  const [query,      setQuery]     = useState('')
  const [showFilters,setShowFilters]= useState(false)
  // Filter state (inside panel)
  const [category,  setCategory]  = useState(ALL)
  const [tags,      setTags]       = useState([])
  const [dateFrom,  setDateFrom]   = useState('')
  const [dateTo,    setDateTo]     = useState('')

  const [sortBy, order] = useMemo(() => sort.split('-'), [sort])

  const filter = useMemo(() => ({
    query:    query.trim() || undefined,
    category: category === ALL ? undefined : category,
    tags:     tags.length ? tags : undefined,
    dateFrom: dateFrom || undefined,
    dateTo:   dateTo   || undefined,
    sortBy, order, limit:50,
  }), [query, category, tags, dateFrom, dateTo, sortBy, order])

  const { data, loading, error, refetch } = useNews(filter)

  const activeFilterCount = countActiveFilters({ category, tags, dateFrom, dateTo })

  // Unique tags from all loaded results
  const allTags = useMemo(() => {
    const set = new Set()
    data.items.forEach(n => n.tags.forEach(t => set.add(t)))
    return [...set].sort()
  }, [data.items])

  const toggleTag = (tag) =>
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const clearAll = () => { setCategory(ALL); setTags([]); setDateFrom(''); setDateTo(''); setQuery('') }
  const hasAny = activeFilterCount > 0 || !!query

  const openPost = (id) => { setNewsId(id); setPage('news-detail'); window.scrollTo({ top:0 }) }

  return (
    <>
      <SEOHead
        title="News — Sakura Moon Atelier"
        description="Development updates, devlogs, and announcements from Sakura Moon Atelier and FARMED.COM."
      />
      <main>
        <section className="page-hero">
          <Reveal>
            <div className="badge badge-brand" style={{ marginBottom:'var(--space-4)' }}>📰 Devlog &amp; Updates</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
              Latest News
            </h1>
            <p style={{ color:'var(--color-text-tertiary)', fontStyle:'italic', fontWeight:300, transition:'color var(--ease-theme)' }}>
              Development updates, announcements, and studio news.
            </p>
          </Reveal>
        </section>

        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-12) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'920px', margin:'0 auto' }}>

            {/* ── COMPACT TOOLBAR ── */}
            <div style={{ marginBottom: showFilters ? 'var(--space-2)' : 'var(--space-8)' }}>
              <div style={{ display:'flex', gap:'var(--space-3)', alignItems:'center', flexWrap:'wrap' }}>
                {/* Search */}
                <div className="search-bar" style={{ flex:'1', minWidth:'200px' }}>
                  <span style={{ color:'var(--color-text-muted)', fontSize:'.9rem' }}>🔍</span>
                  <input type="search" value={query} onChange={e => setQuery(e.target.value)}
                    placeholder="Search articles…" aria-label="Search news" />
                  {query && <button onClick={() => setQuery('')} style={{ background:'none', border:'none', color:'var(--color-text-muted)', cursor:'pointer' }} aria-label="Clear search">✕</button>}
                </div>
                {/* Sort */}
                <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort by"
                  style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', fontWeight:700, background:'var(--color-bg-surface)', color:'var(--color-text-secondary)', border:'1.5px solid var(--color-border-default)', borderRadius:'var(--radius-full)', padding:'.42rem 1rem', cursor:'pointer', transition:'all var(--ease-theme)', outline:'none' }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {/* Filters toggle */}
                <button
                  className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(v => !v)}
                  aria-expanded={showFilters}
                  aria-controls="filter-panel">
                  <span>⚙ Filters</span>
                  {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
                </button>
                <ViewToggle view={view} onChange={setView} />
                {hasAny && (
                  <button className="btn btn-ghost" style={{ fontSize:'var(--text-xs)', padding:'.3rem .7rem', color:'var(--color-text-muted)' }}
                    onClick={clearAll}>✕ Clear all</button>
                )}
              </div>

              {/* ── COLLAPSIBLE FILTER PANEL ── */}
              {showFilters && (
                <div id="filter-panel" className="filter-panel" role="region" aria-label="Filter options">
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'var(--space-6)' }}>
                    {/* Category */}
                    <div>
                      <p style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--color-text-muted)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
                        Category
                      </p>
                      <div className="filter-pills" role="group">
                        <button className={`filter-pill ${category===ALL?'active':''}`} onClick={() => setCategory(ALL)}>All</button>
                        {NEWS_CATEGORIES.map(cat => (
                          <button key={cat} className={`filter-pill ${category===cat?'active':''}`}
                            onClick={() => setCategory(cat)}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Date range */}
                    <div>
                      <p style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--color-text-muted)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
                        Date Range
                      </p>
                      <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-2)' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)' }}>
                          <label style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--color-text-tertiary)', width:'28px', flexShrink:0, transition:'color var(--ease-theme)' }}>From</label>
                          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                            style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', background:'var(--color-bg-surface-2)', color:'var(--color-text-secondary)', border:'1.5px solid var(--color-border-default)', borderRadius:'var(--radius-md)', padding:'.3rem .6rem', transition:'all var(--ease-theme)', outline:'none', cursor:'pointer', flex:1 }} />
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-2)' }}>
                          <label style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--color-text-tertiary)', width:'28px', flexShrink:0, transition:'color var(--ease-theme)' }}>To</label>
                          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                            style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', background:'var(--color-bg-surface-2)', color:'var(--color-text-secondary)', border:'1.5px solid var(--color-border-default)', borderRadius:'var(--radius-md)', padding:'.3rem .6rem', transition:'all var(--ease-theme)', outline:'none', cursor:'pointer', flex:1 }} />
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    {allTags.length > 0 && (
                      <div>
                        <p style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--color-text-muted)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
                          Tags
                        </p>
                        <div className="filter-pills" role="group">
                          {allTags.map(tag => (
                            <button key={tag} className={`filter-pill ${tags.includes(tag)?'active':''}`}
                              onClick={() => toggleTag(tag)}>
                              #{tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results summary */}
            {!loading && (
              <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', marginBottom:'var(--space-4)', transition:'color var(--ease-theme)' }}>
                {data.total} article{data.total !== 1 ? 's' : ''}{hasAny ? ' matching your filters' : ''}
              </p>
            )}

            {/* Content */}
            {loading ? <LoadingState message="Loading articles…" />
            : error   ? <ErrorState message={error} onRetry={refetch} />
            : data.items.length === 0
              ? <EmptyState emoji="🌾" message="No articles found.">
                  <button className="btn btn-outline" style={{ fontSize:'var(--text-xs)' }} onClick={clearAll}>
                    Clear filters
                  </button>
                </EmptyState>
              : (
                <div style={view === 'grid'
                  ? { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'var(--space-6)', alignItems:'stretch' }
                  : { display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                  {data.items.map((post, i) => (
                    <Reveal key={post.id} delay={i < 6 ? i * 60 : 0}>
                      <NewsCard post={post} onClick={openPost} view={view} />
                    </Reveal>
                  ))}
                </div>
              )
            }
          </div>
        </section>
      </main>
    </>
  )
}
