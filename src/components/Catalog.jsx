import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { CASAS, ESTADOS_STOCK, filterProducts, getCasas } from '@/data/products'

// Filtros anidados: nivel 1 = casa (Árabe/Nicho/Diseñador); dentro de cada
// casa, nivel 2 = stock + orden. Toda la lógica de filtrado/orden vive en la
// costura de datos (products.js); aquí solo el estado de UI.

const CASA_TABS = [
  { key: 'todas', label: 'Todas' },
  ...getCasas().map((k) => ({ key: k, label: CASAS[k].label })),
]
const STOCK_CHIPS = [
  { key: 'todos', label: 'Todos' },
  ...Object.entries(ESTADOS_STOCK).map(([k, v]) => ({ key: k, label: v.label })),
]
const SORTS = [
  { key: 'destacados', label: 'Destacados' },
  { key: 'precio-asc', label: 'Menor precio' },
  { key: 'precio-desc', label: 'Mayor precio' },
  { key: 'nuevos', label: 'Novedades' },
]

export default function Catalog() {
  const [casa, setCasa] = useState('todas')
  const [stock, setStock] = useState('todos')
  const [sort, setSort] = useState('destacados')

  const productos = useMemo(() => filterProducts({ casa, stock, sort }), [casa, stock, sort])
  const casaLabel = CASA_TABS.find((c) => c.key === casa)?.label ?? 'esta casa'

  return (
    <section id="catalogo" className="bg-sand py-16 text-ink">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-6">
          <div className="eyebrow text-amaderado">Colección completa</div>
          <h2 className="mt-1 font-serif text-[clamp(30px,4.5vw,46px)] font-medium text-ink">
            El catálogo
          </h2>
        </div>

        {/* Nivel 1 — casa */}
        <div className="flex flex-wrap gap-2 border-b border-sand-line pb-4">
          {CASA_TABS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCasa(c.key)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                casa === c.key
                  ? 'bg-ink text-sand'
                  : 'border border-sand-line bg-sand-2 text-ink-soft hover:border-ink/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Nivel 2 — stock + orden */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {STOCK_CHIPS.map((s) => (
              <button
                key={s.key}
                onClick={() => setStock(s.key)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  stock === s.key
                    ? 'bg-amaderado text-sand-2'
                    : 'border border-sand-line text-ink-soft hover:border-amaderado/50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 self-start text-xs text-ink-soft sm:self-auto">
            Ordenar
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-sand-line bg-sand-2 px-2 py-1.5 text-xs text-ink"
            >
              {SORTS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Grid o estado vacío */}
        {productos.length ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productos.map((p, i) => (
              <ProductCard key={p.slug} producto={p} variant="light" eager={i < 4} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-sand-line bg-sand-2/60 px-6 py-16 text-center">
            <p className="font-serif text-2xl text-ink">Aún no hay piezas aquí</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
              No tenemos productos en <strong>{casaLabel}</strong> con ese filtro por
              ahora. Pronto sumamos más.
            </p>
            <button
              onClick={() => {
                setCasa('todas')
                setStock('todos')
              }}
              className="mt-5 rounded-full bg-ink px-5 py-2 text-sm text-sand transition-colors hover:bg-ink/90"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
