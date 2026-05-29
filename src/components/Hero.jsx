export default function Hero({ title, subtitle, full = false }) {
  return (
    <div className={`hero-gradient flex flex-col items-center justify-center text-center px-6
                     ${full ? 'min-h-screen' : 'py-16'}`}>
      <p className="font-nunito font-bold text-3xl md:text-4xl text-cream tracking-wide mb-2">
        {title}
      </p>
      {subtitle && (
        <p className="font-lato italic text-base text-petal/90">{subtitle}</p>
      )}
    </div>
  )
}
