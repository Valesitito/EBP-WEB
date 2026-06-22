import data from './products.json'

// ============================================================================
// Costura ÚNICA de acceso a productos (CLAUDE.md): los componentes NO leen el
// JSON crudo, todo pasa por aquí. Hoy lee el JSON local; mañana puede hacer
// `fetch` a una API REST sin que cambie un solo componente.
// ============================================================================

// --- Casas (tipo de perfumería) -------------------------------------------
export const CASAS = {
  arabe: { label: 'Árabe' },
  nicho: { label: 'Nicho' },
  disenador: { label: 'Diseñador' },
}
const ORDEN_CASA = ['arabe', 'nicho', 'disenador']

// Mostramos todas las casas aunque alguna esté vacía (el catálogo maneja el
// estado de cero resultados). El usuario reetiqueta `casa` conforme crece el
// inventario.
export function getCasas() {
  return ORDEN_CASA
}

// --- Stock -----------------------------------------------------------------
export const ESTADOS_STOCK = {
  disponible: { label: 'Disponible' },
  ultimas: { label: 'Últimas piezas' },
  porllegar: { label: 'Por llegar' },
  agotado: { label: 'Agotado' },
}
// Para ordenar "destacados": disponibles primero, agotados al final.
const PESO_STOCK = { disponible: 0, ultimas: 1, porllegar: 2, agotado: 3 }

// --- Fotos -----------------------------------------------------------------
// Slugs con foto real ya optimizada en /public/products. Mientras un slug no
// esté aquí, la card muestra el placeholder con monograma — así evitamos
// disparar requests 404 por cada producto sin foto (clave en 4G).
const CON_FOTO = new Set([
  'french-avenue-safari-breeze',
  'lattafa-khamrah-waha',
  'arabiyat-marwa',
  'sospiro-vibrato',
  // ← al agregar una foto: pon el .png/.jpg en assets-src/products con el slug
  //   como nombre, corre `npm run optimize:images` y agrega el slug aquí.
])
export function hasPhoto(slug) {
  return CON_FOTO.has(slug)
}

// --- Acceso básico ---------------------------------------------------------
export function getProducts() {
  return data
}

export function getProductBySlug(slug) {
  return data.find((p) => p.slug === slug) ?? null
}

// Notas clave: las 3 notas más características del perfume (para los círculos
// de la card). Si el producto trae `notasClave` curadas, se usan; si no, se
// derivan tomando una nota representativa de cada nivel de la pirámide.
export function getNotasClave(producto) {
  if (producto.notasClave?.length) return producto.notasClave.slice(0, 3)
  const { salida = [], corazon = [], fondo = [] } = producto.notas ?? {}
  const pick = [salida[0], corazon[0], fondo[0]].filter(Boolean)
  return [...new Set(pick)].slice(0, 3)
}

// Familias olfativas presentes en el catálogo, en orden de aparición.
export function getFamilies() {
  const out = []
  for (const p of data) if (!out.includes(p.familia)) out.push(p.familia)
  return out
}

// Destacados de la Colección Signature — curados por slug (una sola fuente).
const FEATURED = [
  'armaf-club-de-nuit-intense-man',
  'afnan-9pm-night-out',
  'armaf-dunescape',
]
export function getFeatured() {
  return FEATURED.map(getProductBySlug).filter(Boolean)
}

// --- Filtro + orden del catálogo -------------------------------------------
// Filtros anidados: primero `casa`, dentro `stock` y criterio de `sort`.
export function filterProducts({ casa = 'todas', stock = 'todos', sort = 'destacados' } = {}) {
  const list = data.filter((p) => {
    if (casa !== 'todas' && p.casa !== casa) return false
    if (stock !== 'todos' && p.stock !== stock) return false
    return true
  })
  return sortProducts(list, sort)
}

export function sortProducts(list, sort = 'destacados') {
  const arr = [...list]
  switch (sort) {
    case 'precio-asc':
      return arr.sort((a, b) => a.precio - b.precio)
    case 'precio-desc':
      return arr.sort((a, b) => b.precio - a.precio)
    case 'nuevos':
      return arr.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    case 'destacados':
    default:
      // Productos con foto real primero (lucen mejor), luego por stock y marca.
      return arr.sort(
        (a, b) =>
          Number(hasPhoto(b.slug)) - Number(hasPhoto(a.slug)) ||
          PESO_STOCK[a.stock] - PESO_STOCK[b.stock] ||
          a.marca.localeCompare(b.marca, 'es') ||
          a.nombre.localeCompare(b.nombre, 'es'),
      )
  }
}
