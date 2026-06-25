import { buildWaLink, waCtaLabel } from '@/lib/whatsapp'

// Glifo de WhatsApp (lucide no trae iconos de marca). Reusado en el header.
export function WaIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.1 2.1 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  )
}

// CTA de conversión: link wa.me con mensaje pre-llenado. El texto y el destino
// cambian según el stock (apartar vs avísame cuando llegue) — toda esa lógica
// vive en lib/whatsapp.js.
export default function WhatsAppButton({ producto, className = '' }) {
  const label = waCtaLabel(producto.stock)
  return (
    <a
      href={buildWaLink(producto)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex items-center justify-center gap-2 rounded-md bg-wa px-2 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-wa-hi md:px-4 ${className}`}
    >
      <WaIcon />
      <span className="hidden md:inline">{label}</span>
    </a>
  )
}
