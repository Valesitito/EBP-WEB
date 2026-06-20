# El Barbón de los Perfumes — Instrucciones para Claude

## Norte del producto (esto gobierna todo)
- Caso de uso #1: alguien entra desde el link-in-bio de Instagram/Facebook,
  en el navegador interno de Instagram, en celular y con 4G. 
- Esto NO es e-commerce: no hay carrito, checkout ni cuentas de usuario.
  Nunca los agregues, aunque parezca "completar" la tienda. La conversión
  ocurre por WhatsApp.

## Modo de trabajo
- No me des la razón por default. Si algo que propongo está mal, no es la
  mejor forma, o hay una alternativa mejor, dilo con fundamento (código
  concreto del repo, buenas prácticas, métricas de performance).
- Si las instrucciones de una tarea no tienen sentido, hay una forma más
  simple, o el código actual ya resuelve parte del problema, dilo antes de
  hacer cambios.
- No hagas cambios innecesarios solo porque el plan lo dice — valida primero.
- El objetivo es maximizar la calidad del código final: limpio, correcto,
  con buenas prácticas, funcional y rápido. Eso está por encima de seguir
  instrucciones al pie de la letra.
- Prefiere editar archivos existentes sobre crear nuevos. Si vas a crear
  algo, justifica por qué no cabe en lo existente.
- No agregues lo que no se pidió: nada de librerías, abstracciones ni
  configuraciones que nadie pidió. YAGNI.
- Un fix se arregla en su causa raíz. No es excusa para refactorizar
  código no relacionado — si ves algo mejorable fuera del scope, pregúntame.
- Las convenciones del proyecto (estructura de carpetas, estilo, patrones)
  las defines tú en la primera pasada. Una vez establecidas, síguelas de
  forma consistente; no las cambies a media obra sin avisarme.

## Principios de calidad (el qué, no el cómo)
Estos principios aplican siempre. El mecanismo concreto para cumplirlos lo
eliges tú según lo que el proyecto amerite — no impongo la técnica, pero la
intención de hacerlo bien no se negocia.
- **Una sola fuente de verdad.** Un valor que se usa más de una vez (color,
  precio, número, string repetido) se define una vez y se reutiliza. Si lo
  ves duplicado, es señal de que falta centralizarlo.
- **Separación de responsabilidades.** Datos, lógica y presentación no se
  mezclan en el mismo lugar. La forma de lograrlo es tu decisión.
- **Nombres claros y consistentes.** Una vez que elijes una convención de
  nombres y estructura, se respeta en todo el proyecto.
- **Mantenible sobre clever.** Entre una solución ingeniosa y una obvia que
  cualquiera entienda en 6 meses, gana la obvia.
- **Accesible y semántico** en la medida razonable: HTML con sentido, foco
  navegable, contraste suficiente, alt en imágenes.
- **Maneja los casos borde** que el producto realmente tiene (sin stock,
  campos vacíos, listas filtradas a cero resultados, imagen que no carga) —
  sin inventar casos que no existen (YAGNI sigue aplicando).
- Si una buena práctica entra en conflicto con el norte del producto
  (ej: velocidad de carga de `/`), gana el producto — pero avísame del
  trade-off.

## Decisiones de arquitectura (son mías, no las re-decidas)
- **El acceso a datos debe poder migrar a una API REST sin reescribir
  componentes.** Mantén una sola costura de datos por la que pase todo el
  acceso a productos; los componentes no consumen el JSON crudo. Esto es lo
  que permite enchufar el backend en fase 2.
- **Ruta única por ahora:** `/` (landing + catálogo en la misma página).
  La ficha `/p/:slug` queda para más adelante.
- **`/descubre` (test guiado) está FUERA DE ALCANCE.** Es un upsell que se
  construirá hasta que el cliente acepte el producto terminado. No lo planees
  ni lo construyas; tampoco su librería de animación (GSAP).

## Performance (el corazón del proyecto, no un extra)
El usuario llega por el navegador interno de Instagram, en celular y 4G —
el peor escenario de carga posible. Estas reglas existen por eso.
- **El bundle de JS es el cuello de botella, no las imágenes.** Una SPA no
  pinta nada hasta descargar, parsear y ejecutar su JS, así que mantén el
  bundle de la ruta `/` lo más chico posible. Carga diferida (lazy) de todo
  lo que no se necesita para el primer render: imágenes fuera del viewport y
  cualquier librería pesada van fuera del camino crítico de `/`.
- **Las imágenes son el grueso del peso y mandan en el tiempo de carga
  percibido.** Trátalas como ciudadano de primera:
  - Formato moderno (WebP/AVIF), no los JPG pesados que vienen de Facebook.
  - Las imágenes visibles al entrar (primeras cards / above the fold) NO van
    en lazy — cargarlas tarde retrasaría justo lo primero que ve el cliente.
    El resto del grid sí carga diferido conforme se hace scroll.
  - Toda imagen reserva su espacio (dimensiones o contenedor con relación de
    aspecto fija) para que el grid no "salte" mientras cargan las fotos.
- **Presupuesto de performance:** Lighthouse mobile > 90 en `/`. Si un
  cambio lo baja de ahí, avísame antes de seguir.
- Mídelo en condiciones reales, no solo en tu máquina: throttle a 4G en
  DevTools y, antes del pitch, una prueba en celular físico.

## Reglas de negocio que el código debe respetar

### WhatsApp (único mecanismo de conversión)
- Links `wa.me` con mensaje pre-llenado. El número va en config, nunca
  hardcodeado en un componente.
- Formato apartar: `Hola! Me interesa *{producto}* ({precio}). ¿Está
  disponible?`
- Productos agotados: botón "Avísame cuando llegue" con su propio mensaje
  pre-llenado, en vez del CTA principal.

### Datos del producto
- Cada producto necesita, como mínimo: marca, nombre, precio (MXN), formato
  (botella/decant), género, familia olfativa, notas (salida/corazón/fondo),
  una línea "te va a gustar si...", tags para el matching, estado de stock
  (disponible/últimas piezas/agotado/por llegar) y bandera de novedad.
- Imágenes referenciadas por slug desde `/public/products/`. Carga diferida
  con skeleton (salvo las above the fold, ver sección Performance).
- Precios, número de WhatsApp, horarios y links de mapa centralizados en
  config, nunca repartidos por los componentes.


### Copy
- Todo el texto de UI en español de México, tono cercano pero experto
  ("Tu fragancia, tu estilo"). Sin voseo.

## Reglas de git
- NUNCA hacer merge — solo crear PR. Yo hago los merges.
- NUNCA tocar `main`. Todo PR apunta a `develop`. Ramas se crean desde
  `develop`.
  (Si en este proyecto trabajamos directo sobre `main` por ser chico,
  te lo aviso y ajustamos.)

## Workflow post-implementación
1. **Verificar con Chrome DevTools antes de darlo por terminado:** primero
   390px (grid visible above the fold), luego 768px y 1440px; probar cada
   combinación de filtros y cada link de wa.me. Throttle a Fast 4G
   para confirmar que `/` se siente instantáneo.
2. Dar guía de prueba manual paso a paso.
3. **Esperar aprobación explícita** antes de hacer commit, push o PR.