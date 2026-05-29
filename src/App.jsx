import { useState, useEffect } from 'react'
import Nav     from './components/Nav.jsx'
import Footer  from './components/Footer.jsx'
import Home    from './pages/Home.jsx'
import Games   from './pages/Games.jsx'
import About   from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

const PAGES = { Home, Games, About, Contact }

// Read initial page from URL hash so direct links work on GitHub Pages
function getInitialPage() {
  const hash = window.location.hash.replace('#', '')
  return PAGES[hash] ? hash : 'Home'
}

export default function App() {
  const [page, setPage] = useState(getInitialPage)

  // Keep URL hash in sync so the back button works
  useEffect(() => {
    window.location.hash = page === 'Home' ? '' : page
    document.title = page === 'Home'
      ? 'Sakura Moon Atelier — Cosy Indie Games'
      : `${page} — Sakura Moon Atelier`
  }, [page])

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (PAGES[hash]) setPage(hash)
      else setPage('Home')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const PageComponent = PAGES[page]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Nav page={page} setPage={setPage} />

      {/* Page transition wrapper */}
      <div key={page} className="flex-1 animate-fade-up">
        <PageComponent setPage={setPage} />
      </div>

      <Footer setPage={setPage} />
    </div>
  )
}
