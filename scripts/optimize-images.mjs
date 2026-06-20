// Pipeline de optimización de imágenes (se corre a mano; NO entra al bundle).
// Toma fotos fuente y genera WebP responsive por slug en /public/products/.
//
//   npm run optimize:images            # lee de assets-src/products/
//   npm run optimize:images ruta/      # lee de otra carpeta
//
// El nombre del archivo fuente debe ser el slug del producto
// (ej. lattafa-khamrah.jpg -> lattafa-khamrah-400.webp y -800.webp).

import { readdir, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2] ?? 'assets-src/products'
const OUT = 'public/products'
const WIDTHS = [400, 800]
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

async function run() {
  if (!existsSync(SRC)) {
    console.error(`No existe la carpeta fuente: ${SRC}`)
    console.error('Crea la carpeta y pon dentro las fotos nombradas por slug.')
    process.exit(1)
  }
  await mkdir(OUT, { recursive: true })

  const files = (await readdir(SRC)).filter((f) =>
    EXTS.has(path.extname(f).toLowerCase()),
  )
  if (files.length === 0) {
    console.warn(`Sin imágenes en ${SRC}.`)
    return
  }

  let count = 0
  for (const file of files) {
    const slug = path.basename(file, path.extname(file))
    for (const w of WIDTHS) {
      const dest = path.join(OUT, `${slug}-${w}.webp`)
      await sharp(path.join(SRC, file))
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest)
      count++
    }
    console.log(`✓ ${slug}  ->  ${WIDTHS.map((w) => `${w}w`).join(', ')}`)
  }
  console.log(`\nListo: ${files.length} producto(s), ${count} archivos WebP en ${OUT}/`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
