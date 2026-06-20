import { ESTADOS_STOCK } from '@/data/products'

// Badge de stock: pastilla clara con borde y texto del color del estado.
// Legible sobre la imagen sin el peso visual de un fondo oscuro.
const ESTILO = {
  disponible: 'text-[#1c7a40] border-wa/60',
  ultimas: 'text-amaderado border-brass/70',
  porllegar: 'text-ink-soft border-ink/30',
  agotado: 'text-ink-soft border-ink/30',
}

export default function StockTag({ stock, className = '' }) {
  const info = ESTADOS_STOCK[stock]
  if (!info) return null
  return (
    <span
      className={`inline-block rounded border bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm ${ESTILO[stock]} ${className}`}
    >
      {info.label}
    </span>
  )
}
