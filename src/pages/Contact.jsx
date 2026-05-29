import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

const SUBJECTS = [
  'Just saying hi! 👋',
  'Press inquiry 📰',
  'Collaboration 🤝',
  'Bug report 🐛',
  'Other',
]

const SOCIALS = [
  { icon: '🐦', label: 'Twitter / X',  href: '#' },
  { icon: '📷', label: 'Instagram',    href: '#' },
  { icon: '🎮', label: 'itch.io',      href: '#' },
  { icon: '🚂', label: 'Steam',        href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Replace this with your actual form handler (Formspree, Netlify Forms, etc.)
    // For now we just show a thank-you state
    setSent(true)
  }

  const inputClass = `w-full border border-petal/30 rounded-xl px-4 py-2.5
    font-nunito text-sm bg-cream text-ink placeholder-muted/60
    focus:outline-none focus:border-petal transition-colors duration-200`

  return (
    <main>
      <Hero title="Say Hello 🌸" subtitle="We are a small studio and we love hearing from you" />

      <section className="bg-cream py-16 px-6">
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 items-start">

          {/* FORM */}
          <Reveal>
            <div className="bg-white border border-petal/30 rounded-2xl p-8">
              <h2 className="font-nunito font-bold text-lg text-navy mb-6">
                Send us a message
              </h2>

              {sent ? (
                <div className="text-center py-8">
                  <span className="text-5xl block mb-4 animate-float">🌸</span>
                  <p className="font-nunito font-bold text-base text-navy mb-2">
                    Message sent!
                  </p>
                  <p className="font-lato italic text-sm text-muted">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 btn-outline text-xs px-5 py-2"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  <div>
                    <label className="block font-nunito font-bold text-xs text-muted mb-1.5 tracking-wide uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block font-nunito font-bold text-xs text-muted mb-1.5 tracking-wide uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block font-nunito font-bold text-xs text-muted mb-1.5 tracking-wide uppercase">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-nunito font-bold text-xs text-muted mb-1.5 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      required
                      rows={5}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-center">
                    Send ✉
                  </button>

                  <p className="font-nunito text-xs text-muted/60 text-center">
                    {/* Replace with your Formspree endpoint for real email delivery */}
                    We read every message. Usually reply within a few days.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* SIDEBAR */}
          <Reveal delay={150} className="flex flex-col gap-5">

            {/* Cat */}
            <div className="text-center">
              <span className="text-6xl block animate-float">🐱</span>
            </div>

            {/* Social links */}
            <div className="bg-white border border-petal/30 rounded-xl p-5">
              <p className="font-nunito font-bold text-xs text-muted tracking-widest uppercase mb-3">
                Find us online
              </p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="bg-cream border border-petal/30 rounded-lg px-3 py-2
                               font-nunito font-bold text-xs text-navy text-center
                               hover:border-petal transition-colors duration-200 block"
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

          </Reveal>
        </div>
      </section>

      {/* NOTE about form backend */}
      <section className="bg-blush py-8 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-nunito text-xs text-muted">
            💡 <strong>Developer note:</strong> To make the contact form send real emails, add your{' '}
            <a href="https://formspree.io" className="text-navy underline hover:text-petal transition-colors" target="_blank" rel="noopener noreferrer">
              Formspree
            </a>
            {' '}endpoint to the form action — it is free and works perfectly with static GitHub Pages sites.
          </p>
        </div>
      </section>
    </main>
  )
}
