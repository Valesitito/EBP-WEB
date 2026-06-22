// Imágenes de notas olfativas (los círculos de la card). Cada nota se sirve
// desde /public/notes/{slug}.webp. Mientras una nota no tenga imagen, la card
// muestra un círculo de color como placeholder.

// Normaliza el nombre de una nota a slug de archivo: minúsculas, sin acentos.
export function noteSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Notas con imagen real ya disponible en /public/notes. Al agregar una imagen:
// pon el .webp en /public/notes con el slug como nombre y registra el slug aquí.
const NOTAS_CON_IMAGEN = new Set([
  // 'toronja', 'vainilla', 'te-negro', ...
])

export function hasNoteImage(nombre) {
  return NOTAS_CON_IMAGEN.has(noteSlug(nombre))
}
