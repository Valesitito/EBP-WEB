import { getNotasClave } from '@/data/products'
import { hasNoteImage, noteSlug } from '@/data/notes'
import { familiaInfo } from '@/lib/olfactory'

// Notas clave en círculos (3-4 notas más características del perfume), con la
// foto del ingrediente cuando existe; mientras tanto, un círculo de color de
// la familia como placeholder. Reemplaza la antigua pirámide salida/corazón/fondo.

const LABEL_TONE = { dark: 'text-cream-soft', light: 'text-ink-soft' }
const RING_TONE = { dark: 'ring-white/10', light: 'ring-ink/10' }

export default function NoteCircles({ producto, tone = 'dark', className = '' }) {
  const notas = getNotasClave(producto)
  const { color } = familiaInfo(producto.familia)
  const label = LABEL_TONE[tone] ?? LABEL_TONE.dark
  const ring = RING_TONE[tone] ?? RING_TONE.dark

  return (
    <ul className={`flex gap-1 ${className}`}>
      {notas.map((nota) => (
        <li key={nota} className="flex flex-1 flex-col items-center gap-1.5 text-center">
          {hasNoteImage(nota) ? (
            <img
              src={`/notes/${noteSlug(nota)}.webp`}
              alt={nota}
              loading="lazy"
              decoding="async"
              className={`h-[52px] w-[52px] rounded-full object-cover ring-1 ${ring}`}
            />
          ) : (
            <span
              aria-hidden="true"
              className={`h-[52px] w-[52px] rounded-full ring-1 ring-inset ${ring}`}
              style={{ background: `radial-gradient(circle at 35% 28%, ${color}, ${color}33)` }}
            />
          )}
          <span className={`text-[10px] leading-tight ${label}`}>{nota}</span>
        </li>
      ))}
    </ul>
  )
}
