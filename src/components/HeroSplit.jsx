import { config } from '@/config'

// Hero split: IZQUIERDA imagen estática (head3) + texto legible; DERECHA el video
// del producto en loop, a calidad alta (VP9/WebM para Chrome-Android, H.264/MP4 de
// fallback para iOS/Instagram). Poster nítido (LCP del panel derecho). En móvil se
// apilan (texto arriba, video abajo).
const LEFT_IMG = 'head3'
const LEFT_SRCSET = `/hero/${LEFT_IMG}-768.webp 768w, /hero/${LEFT_IMG}-1280.webp 1280w`

// Pin rojo estilo Google Maps — icono a color que le da presencia al CTA de
// ubicación, junto al de "Ver catálogo".
function MapsPin({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path
        fill="#EA4335"
        d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 7.5 12.5 7.5 12.5s7.5-7.25 7.5-12.5C19.5 5.36 16.14 2 12 2z"
      />
      <circle cx="12" cy="9.5" r="2.6" fill="#fff" />
    </svg>
  )
}

export default function HeroSplit() {
  return (
    <section id="top" className="bg-espresso">
      <div className="mx-auto flex h-[calc(100svh-68px)] max-w-[1500px] flex-col md:h-auto md:min-h-[660px] md:flex-row">
        {/* IZQUIERDA — imagen estática + texto. En móvil su alto = el del
            contenido (no se recorta el texto); el video ocupa el resto. */}
        <div className="relative flex shrink-0 items-center overflow-hidden md:min-h-0 md:flex-1">
          <img
            src={`/hero/${LEFT_IMG}-1280.webp`}
            srcSet={LEFT_SRCSET}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Colección de perfumes árabes y de nicho de El Barbón"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/65 to-espresso/45" />
          <div className="relative px-6 py-8 md:px-10 md:py-14 lg:px-14">
            <div className="max-w-md">
              <div className="eyebrow text-brass">La esencia del lujo árabe</div>
              <h1 className="mt-3 font-serif text-[clamp(32px,7vw,66px)] font-medium leading-[1.03] text-cream md:text-[clamp(40px,5.5vw,66px)]">
                Donde el aroma
                <br />
                es <em className="font-normal italic text-brass-soft">textura</em>
              </h1>
              <p className="mt-3 max-w-sm text-[13px] font-medium leading-relaxed text-cream/85 md:mt-4 md:text-[15px]">
                Fragancias árabes y de nicho seleccionadas a mano. Pruébalas en tienda y
                apártalas por WhatsApp.
              </p>
              <div className="mt-5 flex flex-col items-start gap-2.5 md:mt-6 md:gap-3">
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass/10 px-7 py-3.5 text-base font-semibold uppercase tracking-[0.12em] text-brass-soft transition-colors hover:bg-espresso-2 hover:text-cream"
                >
                  Ver catálogo →
                </a>
                <a
                  href={config.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass/10 px-7 py-3.5 text-base font-semibold text-brass-soft transition-colors hover:bg-espresso-2 hover:text-cream"
                >
                  <MapsPin size={18} /> Conoce nuestra ubicación
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DERECHA — video loop en alta calidad. En móvil llena el alto restante. */}
        <div className="relative min-h-0 flex-1 overflow-hidden md:flex-1">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero/vibrato-poster.webp"
            aria-hidden="true"
          >
            <source src="/hero/vibrato.webm" type="video/webm" />
            <source src="/hero/vibrato.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
