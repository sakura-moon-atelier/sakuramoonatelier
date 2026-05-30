/**
 * DEBUG PAGE — access via #debug (never linked from nav/footer)
 * Navigate to any route instantly for testing, including special states.
 * Also shows current config (site mode, data source).
 */
import { DATA_SOURCE } from '../../config/repositories.js'
import { INTEGRATIONS, getMissingIntegrations } from '../../config/integrations.js'
import { SITE } from '../../config/site.js'
import { SITE_MODE, ROUTE_OVERRIDES } from '../../config/siteMode.js'

const ROUTES_META = [
  { id:'home',          label:'🏠 Home',                   badge:'page' },
  { id:'games',         label:'🎮 Games (list)',            badge:'page' },
  { id:'game-detail',   label:'🎮 Game Detail (FARMED.COM)',badge:'page' },
  { id:'about',         label:'🌸 About',                  badge:'page' },
  { id:'contact',       label:'📬 Contact',                badge:'page' },
  { id:'press-kit',     label:'📋 Press Kit',              badge:'page' },
  { id:'news',          label:'📰 News',                   badge:'page' },
  { id:'news-detail',   label:'📰 News Detail',            badge:'page' },
  { id:'social',        label:'📱 Social',                 badge:'page' },
  { id:'privacy',       label:'🔒 Privacy Policy',         badge:'page' },
  { id:'construction',  label:'🏗 Construction',           badge:'special' },
  { id:'maintenance',   label:'🌸 Maintenance',            badge:'special' },
  { id:'offline',       label:'📡 Offline',                badge:'special' },
  { id:'404',           label:'🐱 404 Not Found',          badge:'special' },
  { id:'error',         label:'🌩 Error',                  badge:'special' },
]

const COLORS = {
  page:    { bg:'rgba(200,56,96,.12)',  color:'#C83860', border:'rgba(200,56,96,.25)' },
  special: { bg:'rgba(200,144,64,.12)', color:'#A87028', border:'rgba(200,144,64,.25)' },
}

export default function Debug({ setPage, setNewsId, setGameSlug }) {
  const hasOverrides = Object.keys(ROUTE_OVERRIDES).length > 0

  const go = (id) => {
    if (id === 'news-detail') { setNewsId?.('farmed-gdd-complete') }
    if (id === 'game-detail') { setGameSlug?.('farmed-com') }
    setPage(id)
    window.scrollTo({ top:0 })
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--color-bg-page)', padding:'5rem 2rem 4rem', transition:'background var(--ease-theme)' }}>
      <div style={{ maxWidth:'760px', margin:'0 auto' }}>

        {/* Header */}
        <div style={{ background:'rgba(200,56,96,.08)', border:'1.5px dashed rgba(200,56,96,.35)', borderRadius:'12px', padding:'1rem 1.5rem', marginBottom:'2rem' }}>
          <p style={{ fontSize:'.80rem', fontWeight:700, color:'var(--color-brand)', letterSpacing:'.06em', textTransform:'uppercase' }}>🔧 Debug Page</p>
          <p style={{ fontSize:'.70rem', color:'var(--color-text-tertiary)', marginTop:'.2rem' }}>
            Access via <code style={{ background:'var(--color-bg-surface-3)', padding:'.1rem .35rem', borderRadius:'4px' }}>localhost:5173/#debug</code> · Not linked in production
          </p>
        </div>

        {/* Config status */}
        <div className="card" style={{ padding:'var(--space-6)', marginBottom:'var(--space-6)' }}>
          <p style={{ fontSize:'.70rem', fontWeight:700, color:'var(--color-text-muted)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'var(--space-4)' }}>⚙ Current Config</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-3)' }}>
            {[
              { label:'SITE_MODE',     value: SITE_MODE,     warn: SITE_MODE !== 'live' },
              { label:'DATA_SOURCE',   value: DATA_SOURCE,   warn: false },
              { label:'ROUTE_OVERRIDES', value: hasOverrides ? JSON.stringify(ROUTE_OVERRIDES) : 'none', warn: hasOverrides },
              { label:'SITE_URL',       value: SITE.url,    warn: SITE.url.includes('localhost') },
              { label:'FORMSPREE',      value: INTEGRATIONS.formspree ?? 'not set', warn: !INTEGRATIONS.formspree },
              { label:'MAILCHIMP',      value: INTEGRATIONS.mailchimp ? 'configured' : 'not set', warn: !INTEGRATIONS.mailchimp },
              { label:'SENTRY',         value: INTEGRATIONS.sentry ? 'configured' : 'not set', warn: false },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:'var(--text-xs)', borderBottom:'1px solid var(--color-border-subtle)', paddingBottom:'var(--space-2)', transition:'border-color var(--ease-theme)' }}>
                <code style={{ color:'var(--color-text-muted)', fontFamily:'monospace' }}>{row.label}</code>
                <code style={{ color: row.warn ? 'var(--color-accent)' : 'var(--color-brand)', fontFamily:'monospace', fontWeight:700 }}>
                  {row.warn ? '⚠ ' : ''}{row.value}
                </code>
              </div>
            ))}
          </div>
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-2)', transition:'color var(--ease-theme)' }}>
          Page Navigator
        </h1>
        <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-tertiary)', marginBottom:'var(--space-6)', transition:'color var(--ease-theme)' }}>
          Click any route to navigate directly.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'var(--space-3)' }}>
          {ROUTES_META.map(route => {
            const cs = COLORS[route.badge]
            return (
              <button key={route.id} onClick={() => go(route.id)}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'.75rem 1rem', background:'var(--color-bg-surface)', border:'1px solid var(--color-border-default)', borderRadius:'var(--radius-md)', cursor:'pointer', textAlign:'left', transition:'all var(--ease-normal)', gap:'var(--space-3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--color-brand)'; e.currentTarget.style.transform='translateX(3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--color-border-default)'; e.currentTarget.style.transform='none' }}>
                <span style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
                  {route.label}
                </span>
                <span style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', padding:'.18rem .55rem', borderRadius:'4px', flexShrink:0, background:cs.bg, color:cs.color, border:`1px solid ${cs.border}` }}>
                  {route.badge}
                </span>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop:'var(--space-8)', padding:'var(--space-4)', background:'var(--color-bg-surface-2)', borderRadius:'var(--radius-md)', fontSize:'var(--text-xs)', color:'var(--color-text-muted)', lineHeight:1.8, transition:'all var(--ease-theme)' }}>
          💡 <strong style={{ color:'var(--color-text-secondary)' }}>To put the whole site in maintenance:</strong>
          set <code style={{ background:'var(--color-bg-surface-3)', padding:'.1rem .3rem', borderRadius:'3px' }}>SITE_MODE = 'maintenance'</code> in <code style={{ background:'var(--color-bg-surface-3)', padding:'.1rem .3rem', borderRadius:'3px' }}>src/config/siteMode.js</code>
        </div>
      </div>
    </div>
  )
}
