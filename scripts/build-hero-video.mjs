// Pipeline del video del hero (se corre a mano; NO entra al bundle).
// Toma varios videos fuente de 10s, recorta 3s de cada uno, los une con corte
// seco en un solo loop y genera los 3 archivos que consume HeroSplit.jsx:
//   public/hero/vibrato.webm  (VP9, Chrome/Android)
//   public/hero/vibrato.mp4   (H.264, fallback iOS/Instagram)
//   public/hero/vibrato-poster.webp  (primer frame, poster/LCP)
//
//   npm run build:hero                    # lee de References/Assets/Videos
//   npm run build:hero ruta/a/videos      # lee de otra carpeta
//
// Para cambiar el reel: edita CLIPS (archivo + ventana in→out en segundos),
// en el orden de aparición, y vuelve a correr. Requiere ffmpeg en el PATH.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const SRC = process.argv[2] ?? 'References/Assets/Videos'
const OUT = 'public/hero'

// Orden de aparición + ventana de 3s (inicio→fin) dentro de cada video de 10s.
const CLIPS = [
  { file: 'KhamrahVid.mp4', in: 7, out: 10 }, // 1 · Khamrah
  { file: 'HawasVid.mp4', in: 3, out: 6 }, //    2 · Hawas Ice
  { file: 'ClubDeNuitVid.mp4', in: 0, out: 3 }, // 3 · Club de Nuit
  { file: 'SospiroVid.mp4', in: 4, out: 7 }, //   4 · Vibrato
  { file: 'SupremacyVid.mp4', in: 7, out: 10 }, // 5 · Supremacy
  { file: 'AetherVid.mp4', in: 0, out: 3 }, //    6 · Aether
]

const ff = (args) => execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' })
const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2)

function run() {
  // Validaciones de entrada
  const missing = CLIPS.filter((c) => !existsSync(path.join(SRC, c.file)))
  if (missing.length) {
    console.error(`Faltan videos en ${SRC}/:`)
    for (const m of missing) console.error(`  - ${m.file}`)
    process.exit(1)
  }
  for (const c of CLIPS) {
    if (c.out - c.in !== 3) {
      console.warn(`⚠ ${c.file}: la ventana ${c.in}→${c.out} no dura 3s.`)
    }
  }
  mkdirSync(OUT, { recursive: true })

  const inputs = CLIPS.flatMap((c) => ['-i', path.join(SRC, c.file)])
  // Recorta cada clip y los concatena (corte seco). Sin scale/crop: las fuentes
  // ya son 1280×720/24fps, idéntico al hero. Audio descartado (el hero va muted).
  const parts = CLIPS.map((c, i) => `[${i}:v]trim=${c.in}:${c.out},setpts=PTS-STARTPTS,setsar=1[v${i}]`)
  const concat = `${CLIPS.map((_, i) => `[v${i}]`).join('')}concat=n=${CLIPS.length}:v=1:a=0[outv]`
  const filter = `${parts.join(';')};${concat}`

  // 1) Mezzanine de alta calidad (una sola decodificación/recorte/unión).
  const mezz = path.join(tmpdir(), 'ebp-hero-mezzanine.mp4')
  console.log(`Recortando y uniendo ${CLIPS.length} clips…`)
  ff([...inputs, '-filter_complex', filter, '-map', '[outv]', '-an',
    '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-pix_fmt', 'yuv420p', mezz])

  try {
    // 2) WebM (VP9) y MP4 (H.264) finales, calidad constante.
    const webm = path.join(OUT, 'vibrato.webm')
    const mp4 = path.join(OUT, 'vibrato.mp4')
    const poster = path.join(OUT, 'vibrato-poster.webp')

    console.log('Codificando WebM (VP9)…')
    ff(['-i', mezz, '-an', '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', webm])

    console.log('Codificando MP4 (H.264)…')
    ff(['-i', mezz, '-an', '-c:v', 'libx264', '-crf', '23', '-preset', 'slow',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4])

    console.log('Generando poster (primer frame)…')
    ff(['-i', mezz, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', poster])

    console.log('\nListo:')
    console.log(`  ✓ ${webm}   ${mb(webm)} MB`)
    console.log(`  ✓ ${mp4}    ${mb(mp4)} MB`)
    console.log(`  ✓ ${poster} ${mb(poster)} MB`)
    console.log(`\nDuración total: ${CLIPS.length} × 3s = ${CLIPS.length * 3}s`)
  } finally {
    rmSync(mezz, { force: true })
  }
}

run()
