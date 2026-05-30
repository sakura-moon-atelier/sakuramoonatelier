import { useMemo } from 'react'

const PETAL_COUNT = 18

export default function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left:     `${(i * 5.7 + 2) % 100}%`,
      size:     `${6 + (i * 1.9) % 6}px`,
      duration: `${7 + (i * 0.9) % 6}s`,
      delay:    `${(i * 1.3) % 12}s`,
    }))
  , [])

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}
    >
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
