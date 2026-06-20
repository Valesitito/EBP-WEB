import { config } from '@/config'

export default function Footer() {
  return (
    <footer className="border-t border-brass/10 bg-[#0e0a07] py-8 text-center text-xs text-cream-soft">
      <div className="mx-auto max-w-[1180px] px-6">
        {config.negocio.nombre} · Conservando y creando · {config.negocio.ciudad}
      </div>
    </footer>
  )
}
