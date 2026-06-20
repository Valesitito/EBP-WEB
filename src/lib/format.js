// Formatea un precio en MXN con separador de miles, sin decimales.
// Ej: 7499 -> "7,499"  ·  890 -> "890"
export function formatPrecio(mxn) {
  return mxn.toLocaleString('es-MX')
}
