import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { STUDIO } from '../data/studio.js'
import { INTEGRATIONS } from '../config/integrations.js'


const SOCIAL_ITEMS = [
  { key:'discord',   icon:'💬', label:'Discord' },
  { key:'twitter',   icon:'𝕏',  label:'X / Twitter' },
  { key:'bluesky',   icon:'🦋', label:'Bluesky' },
  { key:'instagram', icon:'📷', label:'Instagram' },
  { key:'tiktok',    icon:'🎵', label:'TikTok' },
  { key:'twitch',    icon:'🎮', label:'Twitch' },
  { key:'itchio',    icon:'🕹', label:'itch.io' },
]

const STATUS = { idle:'idle', sending:'sending', success:'success', error:'error' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState(STATUS.idle)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(STATUS.sending)
    try {
      if (!INTEGRATIONS.formspree) {
        await new Promise(r => setTimeout(r, 800))
        setStatus(STATUS.success)
        setForm({ name:'', email:'', subject:'', message:'' })
        return
      }
      const res = await fetch(`https://formspree.io/f/${INTEGRATIONS.formspree}`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Formspree error ${res.status}`)
      setStatus(STATUS.success)
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch (err) {
      console.error('[Contact]', err)
      setStatus(STATUS.error)
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: connect Mailchimp/ConvertKit endpoint
    setSubscribed(true)
    setEmail('')
  }

  return (
    <>
      <SEOHead
        title="Contact — Sakura Moon Atelier"
        description="Get in touch with Sakura Moon Atelier — press inquiries, partnerships, or just to say hello."
      />
      <main>
        {/* Page hero */}
        <section className="page-hero">
          <Reveal>
            <div className="badge badge-brand" style={{ marginBottom:'var(--space-4)' }}>{t('contact.badge')}</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--color-text-primary)', transition:'color var(--ease-theme)' }}>
              {t('contact.title')}
            </h1>
            <p style={{ color:'var(--color-text-tertiary)', fontStyle:'italic', fontWeight:300, transition:'color var(--ease-theme)' }}>
              {t('contact.subtitle')}
            </p>
          </Reveal>
        </section>

        {/* Contact form + social */}
        <section style={{ background:'var(--color-bg-page)', padding:'var(--space-16) var(--space-8)', transition:'background var(--ease-theme)' }}>
          <div style={{ maxWidth:'880px', margin:'0 auto' }}>
            <div className="grid-2col">
              {/* Form */}
              <Reveal>
                <div className="card" style={{ padding:'var(--space-8)' }}>
                  {status === STATUS.success ? (
                    <div style={{ textAlign:'center', padding:'var(--space-8)' }}>
                      <div style={{ fontSize:'3rem', marginBottom:'var(--space-4)' }}>🌸</div>
                      <p style={{ color:'var(--color-brand)', fontWeight:700, fontSize:'var(--text-lg)' }}>{t('contact.form.success')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="field">
                        <label htmlFor="contact-name">{t('contact.form.name')}</label>
                        <input id="contact-name" type="text" name="name" value={form.name}
                          onChange={update('name')} autoComplete="name" required />
                      </div>
                      <div className="field">
                        <label htmlFor="contact-email">{t('contact.form.email')}</label>
                        <input id="contact-email" type="email" name="email" value={form.email}
                          onChange={update('email')} autoComplete="email" required />
                      </div>
                      <div className="field">
                        <label htmlFor="contact-subject">{t('contact.form.subject')}</label>
                        <select id="contact-subject" name="subject" value={form.subject} onChange={update('subject')} required>
                          <option value="">—</option>
                          {t('contact.form.subjects',{returnObjects:true}).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="contact-message">{t('contact.form.message')}</label>
                        <textarea id="contact-message" name="message" value={form.message}
                          onChange={update('message')} rows={5} required />
                      </div>
                      {status === STATUS.error && (
                        <p role="alert" style={{ color:'var(--color-brand)', fontSize:'var(--text-sm)', marginBottom:'var(--space-4)' }}>
                          {t('contact.form.error')}
                        </p>
                      )}
                      <button type="submit" className="btn btn-primary btn-full"
                        disabled={status === STATUS.sending} aria-busy={status === STATUS.sending}>
                        {status === STATUS.sending ? t('contact.form.sending') : t('contact.form.send')}
                      </button>
                      <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', textAlign:'center', marginTop:'var(--space-3)', transition:'color var(--ease-theme)' }}>
                        {t('contact.form.note')}
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>

              {/* Sidebar */}
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-6)' }}>
                {/* Social links */}
                <Reveal delay={100}>
                  <div>
                    <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-4)', transition:'color var(--ease-theme)' }}>
                      {t('contact.social.title')}
                    </h2>
                    <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-2)' }}>
                      {SOCIAL_ITEMS.map(item => (
                        <a key={item.key} href={STUDIO.social[item.key] ?? '#'} target="_blank" rel="noopener noreferrer"
                          aria-label={`${item.label} (opens in new tab)`}
                          style={{ display:'flex', alignItems:'center', gap:'var(--space-3)', padding:'var(--space-3) var(--space-4)', background:'var(--color-bg-surface)', border:'1px solid var(--color-border-subtle)', borderRadius:'var(--radius-md)', color:'var(--color-text-secondary)', fontSize:'var(--text-sm)', fontWeight:600, textDecoration:'none', transition:'all var(--ease-normal)' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--color-brand)';e.currentTarget.style.color='var(--color-brand)'}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--color-border-subtle)';e.currentTarget.style.color='var(--color-text-secondary)'}}>
                          <span style={{ fontSize:'1.1rem' }} aria-hidden="true">{item.icon}</span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Press kit */}
                <Reveal delay={200}>
                  <div className="card" style={{ padding:'var(--space-6)' }}>
                    <h3 style={{ fontFamily:'var(--font-label)', fontSize:'var(--text-base)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
                      📋 {t('contact.press.title')}
                    </h3>
                    <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-tertiary)', lineHeight:1.85, marginBottom:'var(--space-4)', transition:'color var(--ease-theme)' }}>
                      {t('contact.press.body')}
                    </p>
                    <a href="#press-kit" onClick={e => e.preventDefault()}
                      className="btn btn-outline" style={{ width:'100%', display:'flex', justifyContent:'center', fontSize:'var(--text-xs)' }}>
                      {t('contact.press.cta')}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER — Stay in the loop ── */}
        <section style={{ background:'var(--color-bg-surface-2)', padding:'var(--space-16) var(--space-8)', borderTop:'1px solid var(--color-border-subtle)', transition:'background var(--ease-theme)' }}>
          <Reveal style={{ maxWidth:'480px', margin:'0 auto', textAlign:'center' }}>
            <div className="badge badge-brand" style={{ marginBottom:'var(--space-4)' }}>
              📬 {t('home.newsletter.badge')}
            </div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-2xl)', fontWeight:700, color:'var(--color-text-primary)', marginBottom:'var(--space-3)', transition:'color var(--ease-theme)' }}>
              {t('home.newsletter.title')}
            </h2>
            <p style={{ fontSize:'var(--text-sm)', color:'var(--color-text-secondary)', lineHeight:1.9, marginBottom:'var(--space-6)', transition:'color var(--ease-theme)' }}>
              {t('home.newsletter.body')}
            </p>
            {subscribed ? (
              <p style={{ color:'var(--color-brand)', fontWeight:700, fontSize:'var(--text-base)' }}>
                {t('home.newsletter.success')}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display:'flex', gap:'var(--space-2)' }} noValidate>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={t('home.newsletter.placeholder')}
                  required aria-label="Email address"
                  style={{ flex:1, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', background:'var(--color-bg-surface)', color:'var(--color-text-primary)', border:'1.5px solid var(--color-border-default)', borderRadius:'var(--radius-full)', padding:'.65rem 1rem', outline:'none', transition:'border-color var(--ease-normal),background var(--ease-theme)' }}
                  onFocus={e => e.target.style.borderColor='var(--color-brand)'}
                  onBlur={e => e.target.style.borderColor='var(--color-border-default)'}
                />
                <button type="submit" className="btn btn-primary">{t('home.newsletter.cta')}</button>
              </form>
            )}
            <p style={{ fontSize:'var(--text-xs)', color:'var(--color-text-muted)', marginTop:'var(--space-3)', transition:'color var(--ease-theme)' }}>
              {t('home.newsletter.disclaimer')}
            </p>
          </Reveal>
        </section>
      </main>
    </>
  )
}
