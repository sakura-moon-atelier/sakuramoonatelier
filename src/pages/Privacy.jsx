import Reveal from '../components/ui/Reveal.jsx'

export default function Privacy() {
  return (
    <main>
      <section className="page-hero">
        <Reveal>
          <div className="badge badge-brand" style={{marginBottom:'var(--space-4)'}}>🔒 Legal</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'.5rem',transition:'color var(--ease-theme)'}}>
            Privacy Policy
          </h1>
          <p style={{fontSize:'var(--text-xs)',color:'var(--color-text-muted)',transition:'color var(--ease-theme)'}}>
            Last updated: January 2025
          </p>
        </Reveal>
      </section>
      <section style={{background:'var(--color-bg-page)',padding:'var(--space-12) var(--space-8)',transition:'background var(--ease-theme)'}}>
        <div style={{maxWidth:'680px',margin:'0 auto'}}>
          {[
            {
              title:'Who we are',
              body:'Sakura Moon Atelier is a sole trader indie game studio based in Lisbon, Portugal. Our website address is sakuramoonatelier.com.',
            },
            {
              title:'What data we collect',
              body:'This website stores your theme preference (light/dark) and language preference (EN/PT) in your browser\'s localStorage. This data never leaves your device. If you subscribe to our newsletter or use the contact form, we collect only the email address and message content you voluntarily provide.',
            },
            {
              title:'How we use your data',
              body:'Theme and language preferences are used solely to personalise your experience on this site. Contact form submissions are used only to respond to your inquiry. Newsletter email addresses are used only to send studio updates. We never sell, rent, or share your data with third parties.',
            },
            {
              title:'Cookies',
              body:'This website does not use analytics, advertising, or tracking cookies. We use localStorage (not cookies) for preference storage. No third-party cookies are set by this website.',
            },
            {
              title:'Your rights (GDPR)',
              body:'You have the right to access, correct, or delete any personal data we hold about you. To exercise any of these rights, contact us at hello@sakuramoonatelier.com. We will respond within 30 days.',
            },
            {
              title:'Data retention',
              body:'Contact form submissions are retained for up to 12 months for correspondence purposes. Newsletter email addresses are retained until you unsubscribe. localStorage data is retained in your browser until you clear it.',
            },
            {
              title:'Contact',
              body:'For any questions about this privacy policy or your data, contact: hello@sakuramoonatelier.com · Sakura Moon Atelier · Lisbon, Portugal.',
            },
          ].map((s,i) => (
            <Reveal key={s.title} delay={i*50}>
              <div style={{marginBottom:'var(--space-8)'}}>
                <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,color:'var(--color-text-primary)',marginBottom:'var(--space-3)',transition:'color var(--ease-theme)'}}>
                  {s.title}
                </h2>
                <p style={{fontSize:'var(--text-sm)',lineHeight:2,color:'var(--color-text-secondary)',transition:'color var(--ease-theme)'}}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
