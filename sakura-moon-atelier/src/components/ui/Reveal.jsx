import { useReveal } from '../../hooks/useReveal.js'

export default function Reveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  )
}
