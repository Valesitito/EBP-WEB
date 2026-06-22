// Hero split: IZQUIERDA imagen estática (head3) + texto legible; DERECHA el video
// del producto en loop, a calidad alta (VP9/WebM para Chrome-Android, H.264/MP4 de
// fallback para iOS/Instagram). Poster nítido (LCP del panel derecho). En móvil se
// apilan (texto arriba, video abajo).
const LEFT_IMG = 'head3'
const LEFT_SRCSET = `/hero/${LEFT_IMG}-768.webp 768w, /hero/${LEFT_IMG}-1280.webp 1280w`

export default function HeroSplit() {
  return (
    <section id="top" className="bg-espresso">
      <div className="mx-auto flex max-w-[1500px] flex-col md:min-h-[660px] md:flex-row">
        {/* IZQUIERDA — imagen estática + texto */}
        <div className="relative flex min-h-[56vh] items-center overflow-hidden md:min-h-0 md:flex-1">
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
          <div className="relative px-6 py-14 md:px-10 lg:px-14">
            <div className="max-w-md">
              <div className="eyebrow text-brass">La esencia del lujo árabe</div>
              <h1 className="mt-3 font-serif text-[clamp(40px,5.5vw,66px)] font-medium leading-[1.03] text-cream">
                Donde el aroma
                <br />
                es <em className="font-normal italic text-brass-soft">textura</em>
              </h1>
              <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-cream/85">
                Fragancias árabes y de nicho seleccionadas a mano. Pruébalas en tienda y
                apártalas por WhatsApp.
              </p>
              <a
                href="#catalogo"
                className="mt-6 inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brass-soft transition-colors hover:bg-brass hover:text-espresso"
              >
                Ver catálogo →
              </a>
            </div>
          </div>
        </div>

        {/* DERECHA — video loop en alta calidad */}
        <div className="relative min-h-[44vh] overflow-hidden md:min-h-0 md:flex-1">
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
