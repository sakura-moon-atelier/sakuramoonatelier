import { useState, useEffect, useRef, Suspense, lazy, Component } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx'
import { RepositoryProvider } from './contexts/RepositoryContext.jsx'
import Nav           from './components/layout/Nav.jsx'
import Footer        from './components/layout/Footer.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import { ROUTES, getInitialPage } from './router.jsx'
import { SITE_MODE, ROUTE_OVERRIDES, PASSTHROUGH_ROUTES } from './config/siteMode.js'

const srOnly = { position:'absolute', width:'1px', height:'1px', padding:0, margin:'-1px', overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap', border:0 }

function LoadingScreen() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--color-bg-page)', transition:'background .5s' }}>
      <span style={{ fontSize:'2rem', animation:'float 2s ease-in-out infinite' }} aria-hidden="true">🌸</span>
      <span style={srOnly}>Loading…</span>
    </div>
  )
}

const ErrorPage = lazy(() => import('./pages/special/Error.jsx'))

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err, info) {
    console.error('[SMA ErrorBoundary]', err, info)
    // TODO: Sentry.captureException(err, { extra: info })
  }
  render() {
    if (this.state.hasError)
      return (
        <Suspense fallback={<LoadingScreen />}>
          <ErrorPage setPage={this.props.setPage} onRetry={() => this.setState({ hasError: false })} />
        </Suspense>
      )
    return this.props.children
  }
}

/**
 * Resolves which page to actually render, accounting for:
 *   1. ROUTE_OVERRIDES — per-route special page
 *   2. SITE_MODE       — global site state
 *   3. PASSTHROUGH_ROUTES — always render as-is
 */
function resolveRoute(page) {
  if (PASSTHROUGH_ROUTES.has(page)) return page
  if (ROUTE_OVERRIDES[page])        return ROUTE_OVERRIDES[page]
  if (SITE_MODE !== 'live')         return SITE_MODE  // 'maintenance' | 'construction'
  return page
}

function AppContent() {
  const { dark }   = useTheme()
  const [page,      setPage]      = useState(getInitialPage)
  const [newsId,    setNewsId]    = useState(null)
  const [gameSlug,  setGameSlug]  = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const mainRef = useRef(null)

  const navigate = (key) => { setPage(key); window.scrollTo({ top:0 }) }

  useEffect(() => {
    window.location.hash = page === 'home' ? '' : page
    const route = ROUTES[page]
    if (route?.title) {
      document.title = route.title
      setTimeout(() => setAnnouncement(route.title.split(' — ')[0]), 100)
    }
    const main = mainRef.current
    if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll:true }) }
  }, [page])

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '')
      if (!hash) { setPage('home'); return }
      setPage(ROUTES[hash] ? hash : '404')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const goOffline = () => navigate('offline')
    const goOnline  = () => navigate(getInitialPage())
    window.addEventListener('offline', goOffline)
    window.addEventListener('online',  goOnline)
    return () => { window.removeEventListener('offline', goOffline); window.removeEventListener('online', goOnline) }
  }, [])

  const resolvedPage  = resolveRoute(page)
  const route         = ROUTES[resolvedPage] || ROUTES['404']
  const PageComponent = route.component
  const showNav       = route.showNav ?? true

  return (
    <div
      data-theme={dark ? 'dark' : 'light'}
      style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--color-bg-page)', color:'var(--color-text-primary)', transition:'background var(--ease-theme),color var(--ease-theme)' }}
    >
      <Helmet><meta name="theme-color" content={dark ? '#080614' : '#FAF5EE'} /></Helmet>

      {/* Screen reader page announcements */}
      <div aria-live="polite" aria-atomic="true" style={srOnly}>{announcement}</div>

      {showNav && <Nav page={page} setPage={navigate} />}

      <main id="main-content" ref={mainRef}
        style={{ flex:1, paddingTop: showNav ? '58px' : 0, outline:'none' }}
        tabIndex={-1}>
        <ErrorBoundary setPage={navigate}>
          <Suspense fallback={<LoadingScreen />}>
            <PageComponent
              setPage={navigate}
              setNewsId={setNewsId}
              setGameSlug={setGameSlug}
              newsId={newsId}
              gameSlug={gameSlug}
            />
          </Suspense>
        </ErrorBoundary>
      </main>

      {showNav && <Footer setPage={navigate} />}
      <CookieConsent setPage={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RepositoryProvider>
          <Suspense fallback={<LoadingScreen />}>
            <AppContent />
          </Suspense>
        </RepositoryProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
