import { ESTADOS_STOCK } from '@/data/products'

// Badge de estado de stock. `tone` adapta colores al fondo (oscuro vs arena).
const STYLES = {
  dark: {
    disponible: 'bg-wa/15 text-wa-hi border-wa/40',
    ultimas: 'bg-brass/15 text-brass-soft border-brass/45',
    porllegar: 'bg-cream/10 text-cream-soft border-cream/20',
    agotado: 'bg-black/30 text-cream-soft border-white/15',
  },
  light: {
    disponible: 'bg-wa/15 text-[#1c7a40] border-wa/35',
    ultimas: 'bg-brass/25 text-amaderado border-brass/50',
    porllegar: 'bg-ink/5 text-ink-soft border-sand-line',
    agotado: 'bg-ink/10 text-ink-soft border-sand-line',
  },
}

export default function StockTag({ stock, tone = 'dark', className = '' }) {
  const info = ESTADOS_STOCK[stock]
  if (!info) return null
  const styles = STYLES[tone] ?? STYLES.dark
  return (
    <span
      className={`inline-block rounded border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${styles[stock]} ${className}`}
    >
      {info.label}
    </span>
  )
}
