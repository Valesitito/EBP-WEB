import ProductImage from './ProductImage'
import NoteCircles from './NoteCircles'
import StockTag from './StockTag'
import WhatsAppButton from './WhatsAppButton'
import { isApartable } from '@/lib/whatsapp'
import { formatPrecio } from '@/lib/format'

// Card de producto con dos variantes: `dark` (sobre fondo oscuro) y `light`
// (catálogo, sobre arena). `eager` desactiva el lazy en las primeras cards
// visibles. Mismo contenido, distinta piel.

const VARIANTS = {
  dark: {
    card: 'border-brass/20 bg-gradient-to-b from-espresso-2 to-[#160f0a] hover:border-brass/50',
    photo: 'from-char to-[#15100a]',
    brand: 'text-cream-soft',
    name: 'text-cream',
    price: 'text-brass',
    desc: 'text-cream-soft',
    tone: 'dark',
  },
  light: {
    card: 'border-sand-line bg-sand-2 hover:shadow-xl hover:shadow-amaderado/10',
    photo: 'from-sand-2 to-sand',
    brand: 'text-ink-soft',
    name: 'text-ink',
    price: 'text-amaderado',
    desc: 'text-ink-soft',
    tone: 'light',
  },
}

export default function ProductCard({ producto, variant = 'light', eager = false, showDesc = true }) {
  const v = VARIANTS[variant] ?? VARIANTS.light
  const apartable = isApartable(producto.stock)

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-1 ${v.card}`}
    >
      <div className="relative">
        <ProductImage
          slug={producto.slug}
          alt={`${producto.marca} ${producto.nombre}`}
          eager={eager}
          tone={v.tone}
          dimmed={!apartable}
          className={`aspect-[4/5] bg-gradient-to-b ${v.photo}`}
        />
        {producto.stock === 'ultimas' && (
          <StockTag stock={producto.stock} className="absolute left-2 top-2 md:left-3 md:top-3" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 md:gap-3 md:p-4">
        <div>
          <div className={`hidden text-[10px] uppercase tracking-[0.22em] md:block ${v.brand}`}>
            {producto.marca}
          </div>
          <h3 className={`line-clamp-2 min-h-[2.5em] font-serif text-base leading-tight md:min-h-0 md:text-2xl md:leading-none ${v.name}`}>
            {producto.nombre}
          </h3>
        </div>
        <div className={`whitespace-nowrap text-sm font-semibold md:text-base ${v.price}`}>
          ${formatPrecio(producto.precio)} MXN
        </div>
        <div className="hidden md:block">
          <NoteCircles producto={producto} tone={v.tone} />
        </div>
        {showDesc && (
          <p className={`hidden text-[12.5px] font-medium leading-snug md:block ${v.desc}`}>
            {producto.teVaAGustarSi}
          </p>
        )}
        <WhatsAppButton producto={producto} className="mt-auto" />
      </div>
    </article>
  )
}
