import { formatPrecio } from '@/lib/format'

// Configuración centralizada: los valores de negocio viven en un solo lugar
// (CLAUDE.md). Ningún componente hardcodea número de WhatsApp, links ni copy
// de mensajes.

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '5219990000000'

// Dirección física de la tienda (fuente única, para mostrar y como referencia).
const DIRECCION = 'C. 75 650-x 44, Tixcacal Opichen, 97249 Mérida, Yuc.'

// Link directo al pin del negocio en Google Maps. Override por VITE_MAPS_URL.
const MAPS_URL =
  import.meta.env.VITE_MAPS_URL ||
  'https://www.google.com/maps/place/El+Barb%C3%B3n+de+los+Perfumes/@20.952532,-89.6994489,17z/data=!3m1!4b1!4m6!3m5!1s0x8f5673000b39e629:0x6574395aa2766a79!8m2!3d20.952532!4d-89.696874!16s%2Fg%2F11vwgtl727?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D'

export const config = {
  whatsappNumber: WHATSAPP_NUMBER,
  mapsUrl: MAPS_URL,
  negocio: {
    nombre: 'El Barbón de los Perfumes',
    direccion: DIRECCION,
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
