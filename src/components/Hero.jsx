// Hero image-led: foto de colección a sangre completa. El copy va abajo (sobre
// la base, con degradado) para no tapar los frascos. La imagen es el LCP →
// eager + alta prioridad + preload en index.html. WebP responsive en /public/hero.
//
// Para probar otra foto de header, cambia HERO por 'head1' (cuadrada) o 'head2'
// (y actualiza el preload en index.html al mismo nombre).
const HERO = 'head3'
const HERO_SRCSET =
  `/hero/${HERO}-768.webp 768w, /hero/${HERO}-1280.webp 1280w, /hero/${HERO}-1920.webp 1920w`

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso">
      <img
        src={`/hero/${HERO}-1280.webp`}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt="Colección de perfumes árabes y de nicho de El Barbón"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Scrim: oscuro abajo (legibilidad del copy) sin tapar los frascos de arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1180px] items-end px-6 pb-14 md:min-h-[640px]">
        <div className="max-w-xl">
          <div className="eyebrow text-brass">La esencia del lujo árabe</div>
          <h1 className="mt-4 font-serif text-[clamp(40px,6.5vw,72px)] font-medium leading-[1.02] text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            Donde el aroma
            <br />
            es <em className="font-normal italic text-brass-soft">textura</em>
          </h1>
          <p className="mt-4 max-w-md text-[15.5px] font-medium leading-relaxed text-cream/85">
            Fragancias árabes y de nicho seleccionadas a mano. Cada pieza cuenta una
            historia olfativa en capas: salida, corazón y fondo.
          </p>
          <a
            href="#catalogo"
            className="mt-6 inline-flex items-center gap-2.5 rounded-sm border border-brass bg-brass/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brass-soft backdrop-blur-sm transition-colors hover:bg-brass hover:text-espresso"
          >
            Ver catálogo →
          </a>
        </div>
      </div>
    </section>
  )
}
