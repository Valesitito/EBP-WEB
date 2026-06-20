import { familiaInfo } from '@/lib/olfactory'

// Pirámide olfativa: el motivo firma del sitio. Reusada en hero, signature y
// catálogo. Los puntos se colorean por la familia del producto (olfactory.js).

const TIERS = [
  ['salida', 'Salida'],
  ['corazon', 'Corazón'],
  ['fondo', 'Fondo'],
]

// `tone` ajusta los neutros según el fondo (oscuro vs arena).
const TONES = {
  dark: { label: 'text-cream-soft', chip: 'border-white/10 bg-white/5 text-cream' },
  light: { label: 'text-ink-soft', chip: 'border-sand-line bg-ink/[0.04] text-ink' },
}

export default function Pyramid({ producto, max = 2, tone = 'dark', className = '' }) {
  const { color } = familiaInfo(producto.familia)
  const t = TONES[tone] ?? TONES.dark

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {TIERS.map(([key, label]) => (
        <div key={key} className="grid grid-cols-[52px_1fr] items-start gap-2">
          <span className={`pt-0.5 text-[9.5px] uppercase tracking-[0.14em] ${t.label}`}>
            {label}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {producto.notas[key].slice(0, max).map((nota) => (
              <span
                key={nota}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] ${t.chip}`}
              >
                <span className="h-2 w-2 flex-none rounded-full" style={{ background: color }} />
                {nota}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
