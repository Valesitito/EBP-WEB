import ProductCard from './ProductCard'
import { getFeatured } from '@/data/products'

// "Lo más buscado" — banda oxblood con las piezas destacadas (curadas en la
// costura de datos vía getFeatured).
export default function Signature() {
  const destacados = getFeatured()
  if (!destacados.length) return null

  return (
    <section className="border-t border-brass/20 bg-gradient-to-b from-oxblood-2 to-oxblood py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-10 text-center">
          <div className="eyebrow text-brass-soft/90">Lo más buscado</div>
          <h2 className="mt-1.5 font-serif text-[clamp(34px,5vw,52px)] font-medium text-cream">
            Colección Signature
          </h2>
        </div>
        <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p, i) => (
            <ProductCard key={p.slug} producto={p} variant="dark" eager={i < 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
