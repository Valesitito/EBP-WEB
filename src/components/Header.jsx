import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Árabe', href: '#catalogo' },
  { label: 'Nicho', href: '#catalogo' },
  { label: 'Diseñador', href: '#catalogo' },
  { label: 'Catálogo', href: '#catalogo' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brass/15 bg-espresso/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-brass font-serif text-xl text-brass-soft">
            B
          </span>
          <span className="font-serif text-xl leading-none text-cream">
            El Barbón
            <span className="mt-0.5 block font-sans text-[9px] tracking-[0.28em] text-cream-soft">
              DE LOS PERFUMES
            </span>
          </span>
        </a>

        {/* Categorías centradas en la barra: posición absoluta para centrarlas
            respecto al header completo, sin que el logo las empuje. */}
        <nav className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[13px] text-cream-soft md:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="transition-colors hover:text-brass-soft">
              {n.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-cream md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brass/15 px-6 py-3 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-cream-soft"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
