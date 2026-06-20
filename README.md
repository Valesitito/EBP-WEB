# El Barbón de los Perfumes — Catálogo web

Catálogo + motor de leads (no e-commerce) para una perfumería en Mérida. La
conversión ocurre por WhatsApp. El catálogo ES el home: rápido en el navegador
interno de Instagram, en celular y 4G.

- **Stack:** Vite + React + Tailwind v4.
- **Ruta:** `/` (landing + catálogo en la misma página). La ficha `/p/:slug`
  queda para más adelante. El test guiado `/descubre` está fuera de alcance
  (upsell posterior).
- **Diseño y decisiones:** ver [CLAUDE.md](CLAUDE.md).

## Arranque

```bash
npm install
cp .env.example .env   # y llena los valores reales
npm run dev
```

### Variables de entorno (`.env`)
| Variable | Qué es |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Número en formato internacional, sin `+`/espacios (ej. `5219991234567`). |
| `VITE_MAPS_URL` | Link de Google Maps del local. |

Sin `.env`, la app corre con placeholders (los CTAs apuntan a un número de ejemplo).

## Agregar / actualizar la foto de un producto

Las imágenes se sirven optimizadas desde `public/products/` como WebP responsive
(`{slug}-400.webp`, `{slug}-800.webp`). El pipeline las genera a partir de fotos
fuente:

1. Pon la foto en `assets-src/products/` con el **slug** como nombre
   (ej. `lattafa-khamrah.jpg`). El slug es el campo `slug` del producto en
   `src/data/products.json`.
2. Corre el pipeline:
   ```bash
   npm run optimize:images
   ```
3. Se generan los WebP en `public/products/`. Listo.

Mientras una foto no exista, la card muestra un skeleton y luego un fallback con
el monograma **EB** (no se rompe el layout).

## Scripts
| Script | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Build de producción. |
| `npm run preview` | Sirve el build. |
| `npm run optimize:images` | Genera los WebP responsive desde `assets-src/products/`. |

## Estructura
La capa de datos (`src/data/products.js`) es la **única** costura de acceso a
productos: hoy lee `products.json`, mañana hará `fetch` a una REST API sin tocar
componentes. Decisiones de diseño y arquitectura en [CLAUDE.md](CLAUDE.md).
