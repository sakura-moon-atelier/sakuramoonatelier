import { useMemo } from 'react'

const STAR_COUNT = 36

export default function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left:     `${(i * 2.8 + 0.5) % 100}%`,
      top:      `${(i * 3.9 + 2) % 78}%`,
      size:     `${1.5 + (i * 0.38) % 2.5}px`,
      duration: `${2.5 + (i * 0.42) % 3}s`,
      delay:    `${(i * 0.55) % 6}s`,
    }))
  , [])

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    >
      {stars.map(s => (
        <span
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  )
}
