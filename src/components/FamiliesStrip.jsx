import { getFamilies } from '@/data/products'
import { familiaInfo } from '@/lib/olfactory'

// Tira de familias olfativas presentes en el catálogo, con su color firma.
export default function FamiliesStrip() {
  const familias = getFamilies()

  return (
    <section className="border-t border-brass/15 bg-espresso py-7">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-x-8 gap-y-5 px-6">
        {familias.map((f) => {
          const { label, color } = familiaInfo(f)
          return (
            <div
              key={f}
              className="flex flex-col items-center gap-2 text-[10px] tracking-wide text-cream-soft"
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-full border"
                style={{ borderColor: `${color}88`, background: `${color}22` }}
              >
                <span className="h-3 w-3 rounded-full" style={{ background: color }} />
              </span>
              {label}
            </div>
          )
        })}
      </div>
    </section>
  )
}
