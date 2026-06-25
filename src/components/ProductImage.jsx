import { useState } from 'react'
import { hasPhoto } from '@/data/products'

// Imagen de producto con reserva de aspect-ratio (sin saltos de layout).
// Mientras el slug no tenga foto optimizada, muestra el placeholder con
// monograma EB. Cuando la tiene, sirve el <img> responsive desde
// /public/products. `eager` = sin lazy (para las primeras cards above-the-fold).

const MONOGRAM_TONE = {
  dark: 'from-char to-espresso text-brass/40',
  light: 'from-sand-2 to-sand text-amaderado/40',
}

export default function ProductImage({ slug, alt, eager = false, tone = 'dark', dimmed = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showMonogram = !hasPhoto(slug) || failed

  return (
    <div
      className={`relative w-full overflow-hidden ${dimmed ? 'opacity-60 saturate-[0.25]' : ''} ${className}`}
    >
      {showMonogram ? (
        <div
          className={`grid h-full w-full place-items-center bg-gradient-to-b ${MONOGRAM_TONE[tone] ?? MONOGRAM_TONE.dark}`}
          aria-hidden="true"
        >
          <span className="font-serif text-5xl font-medium tracking-tight">EB</span>
        </div>
      ) : (
        <img
          src={`/products/${slug}-800.webp`}
          srcSet={`/products/${slug}-400.webp 400w, /products/${slug}-800.webp 800w`}
          sizes="(max-width: 1024px) 33vw, 22vw"
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
