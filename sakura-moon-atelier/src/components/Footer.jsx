const LINKS = ['Home', 'Games', 'About', 'Contact']

export default function Footer({ setPage }) {
  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-navy text-cream">
      {/* Petal border top */}
      <div className="text-center text-petal text-xs tracking-widest py-2 border-b border-white/5 opacity-60">
        🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸 · 🌸
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="text-3xl mb-3 tracking-wider">🌸 🌙 🐱</div>
        <p className="font-nunito font-bold text-base tracking-wide mb-1">Sakura Moon Atelier</p>
        <p className="font-lato italic text-xs text-petal/70 mb-8">
          "Cosy games made with care"
        </p>

        {/* Nav */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {LINKS.map(l => (
            <button
              key={l}
              onClick={() => go(l)}
              className="font-nunito font-semibold text-xs text-cream/50 hover:text-petal transition-colors duration-200 cursor-pointer"
            >
              {l}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3 mb-8">
          {['🐦', '📷', '🎮', '💬'].map((icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full border border-petal/30 flex items-center justify-center text-sm
                         hover:border-petal hover:bg-petal/10 transition-all duration-200 cursor-pointer"
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/7 pt-6">
          <p className="font-nunito text-xs text-cream/25">
            © 2026 Sakura Moon Atelier · Made with 🌸 · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
