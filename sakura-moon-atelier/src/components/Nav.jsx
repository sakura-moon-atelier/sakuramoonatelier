const LINKS = ['Home', 'Games', 'About', 'Contact']

export default function Nav({ page, setPage, dark, toggleDark }) {
  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      {/* Logo */}
      <button onClick={() => go('Home')} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', background: 'none', border: 'none' }}>
        <div style={{ position: 'relative', width: '30px', height: '30px' }}>
          <div className="logo-crescent" />
          <span style={{ position: 'absolute', bottom: '-4px', right: '-5px', fontSize: '10px', zIndex: 2 }}>🐱</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--fj)', fontWeight: 700, fontSize: '0.80rem', color: 'var(--text)', letterSpacing: '0.04em' }}>
            Sakura Moon Atelier
          </div>
          <div style={{ fontSize: '0.54rem', fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Indie Game Studio
          </div>
        </div>
      </button>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '1.6rem' }}>
        {LINKS.map(l => (
          <button
            key={l}
            onClick={() => go(l)}
            className={`nav-link ${page === l ? 'active' : ''}`}
            style={{ background: 'none', border: 'none' }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Right: toggle + wishlist */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className="theme-toggle"
          onClick={toggleDark}
          title={dark ? 'Switch to Sakura Garden' : 'Switch to Moonlight'}
          aria-label="Toggle theme"
        />
        <button className="btn-primary" style={{ fontSize: '0.72rem', padding: '0.34rem 1rem' }}>
          Wishlist 🌸
        </button>
      </div>
    </nav>
  )
}
