import { formatPrecio } from '@/lib/format'

// Configuración centralizada: los valores de negocio viven en un solo lugar
// (CLAUDE.md). Ningún componente hardcodea número de WhatsApp, links ni copy
// de mensajes.

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '5219990000000'

const MAPS_URL =
  import.meta.env.VITE_MAPS_URL ||
  'https://maps.google.com/?q=El+Barbon+de+los+Perfumes+Merida'

export const config = {
  whatsappNumber: WHATSAPP_NUMBER,
  mapsUrl: MAPS_URL,
  negocio: {
    nombre: 'El Barbón de los Perfumes',
    ciudad: 'Mérida, Yucatán',
  },
}

// Plantillas de mensaje de WhatsApp (única fuente de verdad del copy de venta).
export const waMessages = {
  apartar: (p) =>
    `Hola! Me interesa *${p.marca} ${p.nombre}* ($${formatPrecio(p.precio)} MXN). ¿Está disponible?`,
  avisar: (p) =>
    `Hola! ¿Me avisan cuando llegue *${p.marca} ${p.nombre}*? Me interesa apartarlo.`,
}
