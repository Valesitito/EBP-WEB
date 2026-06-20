import { config, waMessages } from '@/config'

// ¿El producto se puede apartar ya, o solo avisar cuando llegue?
export function isApartable(stock) {
  return stock === 'disponible' || stock === 'ultimas'
}

// Texto del CTA según el stock.
export function waCtaLabel(stock) {
  return isApartable(stock) ? 'Apartar por WhatsApp' : 'Avísame cuando llegue'
}

// Construye el link wa.me con el mensaje pre-llenado correcto según el stock.
export function buildWaLink(producto) {
  const texto = isApartable(producto.stock)
    ? waMessages.apartar(producto)
    : waMessages.avisar(producto)
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(texto)}`
}
