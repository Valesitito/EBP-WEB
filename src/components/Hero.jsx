// Hero image-led: la escena montada del Khamrah a sangre completa, con el copy
// encima sobre un scrim para legibilidad. La imagen es el LCP → eager + alta
// prioridad + preload en index.html. WebP responsive en /public/hero.

const HERO_SRCSET =
  '/hero/home-768.webp 768w, /hero/home-1280.webp 1280w, /hero/home-1920.webp 1920w'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso">
      <img
        src="/hero/home-1280.webp"
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt="Lattafa Khamrah montado entre dátiles, canela y vainilla en un bosque cálido"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Scrims: oscuro a la izquierda (legibilidad) y abajo (transición + base) */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-[1180px] items-center px-6 py-20 md:min-h-[620px]">
        <div className="max-w-xl">
          <div className="eyebrow text-brass">La esencia del lujo árabe</div>
          <h1 className="mt-5 font-serif text-[clamp(44px,7vw,76px)] font-medium leading-[1.02] text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            Donde el aroma
            <br />
            es <em className="font-normal italic text-brass-soft">textura</em>
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-cream-soft">
            Fragancias árabes y de nicho seleccionadas a mano. Cada pieza cuenta una
            historia olfativa en capas: salida, corazón y fondo.
          </p>
          <a
            href="#catalogo"
            className="mt-7 inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brass-soft backdrop-blur-sm transition-colors hover:bg-brass hover:text-espresso"
          >
            Ver catálogo →
          </a>
        </div>
      </div>
    </section>
  )
}
