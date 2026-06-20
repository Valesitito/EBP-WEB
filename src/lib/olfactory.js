// Única fuente de verdad de las familias olfativas: etiqueta + color.
// Los puntos de la pirámide y la tira de familias se colorean por la
// `familia` del producto desde aquí. Si luego se quiere color por nota,
// se enriquece este mapa sin tocar los componentes.

export const FAMILIAS = {
  gourmand: { label: 'Gourmand', color: '#D9A441' },
  especiado: { label: 'Especiado', color: '#C8642E' },
  amaderado: { label: 'Amaderado', color: '#9A6B3F' },
  fresco: { label: 'Fresco', color: '#7FB9A6' },
  floral: { label: 'Floral', color: '#D98AA6' },
}

const FALLBACK = { label: 'Aromático', color: '#9A6B3F' }

export function familiaInfo(familia) {
  return FAMILIAS[familia] ?? FALLBACK
}
