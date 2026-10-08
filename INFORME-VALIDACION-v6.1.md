# Informe de validación — CERO27 v6.1

Fecha: 6 de octubre de 2026  
Versión revisada: Propuesta v6.1, basada en CERO27 V6 y los documentos adjuntos `CERO27_MASTER.md`, `CERO27_CONTENIDO_APROBADO.md` y `CERO27_CONTENIDO_PENDIENTE.md`.

## Resultado general

Las cuatro pasadas de revisión de código y arquitectura se completaron. Las rutas internas definidas tienen archivos Astro, no quedan enlaces de navegación hacia los antiguos anclajes de sección, el diagnóstico usa la URL centralizada, y el sitemap enumera las diez rutas requeridas. El logo y la referencia de landing protegida son idénticos a V6 por SHA-256.

El build real de Astro **se intentó y no se completó**. Después de instalar Astro 5.18.2 y permitir únicamente los scripts de `esbuild` y `sharp`, la compilación se detuvo porque esbuild no pudo acceder a directorios internos durante su resolución (`Acceso denegado` / `Cannot read directory "../../../../../.."`). Por ello esta propuesta **no se presenta como compilada ni validada para producción**.

## Pasada 1 — Inventario de enlaces

- Revisados `src/pages/**/*.astro`, `src/components/**/*.astro`, `src/layouts/**/*.astro` y `src/config/site.ts`.
- Navegación común en escritorio y menú móvil toma Inicio, Soluciones, Recursos, Nosotros y Conversemos de la configuración central.
- Los cuatro enlaces de solución en la franja de Inicio, las tarjetas de soluciones y el footer usan los destinos oficiales de `siteConfig.solutions`.
- CTA de header, menú móvil, Hero, CTA final, y atajo de diagnóstico de Recursos usan `siteConfig.diagnosticUrl`.
- La URL del diagnóstico aparece una sola vez como literal de configuración: `https://diagn-stico-iso-iec-27001.ai.studio/`.
- Se inventariaron enlaces al logo de Inicio, salto al contenido, contacto por correo y política de privacidad.

## Pasada 2 — Existencia de destinos

Comprobada la correspondencia entre ruta y archivo Astro:

| Ruta | Archivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/soluciones/` | `src/pages/soluciones/index.astro` |
| `/soluciones/seguridad-de-la-informacion/` | `src/pages/soluciones/seguridad-de-la-informacion.astro` |
| `/soluciones/ia-y-gobernanza/` | `src/pages/soluciones/ia-y-gobernanza.astro` |
| `/soluciones/print-management/` | `src/pages/soluciones/print-management.astro` |
| `/soluciones/capacitacion/` | `src/pages/soluciones/capacitacion.astro` |
| `/recursos/` | `src/pages/recursos.astro` |
| `/nosotros/` | `src/pages/nosotros.astro` |
| `/conversemos/` | `src/pages/conversemos.astro` |
| `/politica-de-privacidad/` | `src/pages/politica-de-privacidad.astro` |

Los imports relativos entre páginas, layout y componentes se comprobaron y resuelven a archivos existentes. El sitemap XML contiene las diez rutas.

## Pasada 3 — Comparación con documentos aprobados y pendientes

- La arquitectura, nombres de navegación, slugs de solución, URL y nueva pestaña del diagnóstico corresponden al documento maestro.
- La metodología conserva el orden **Evaluamos → Orientamos → Priorizamos → Acompañamos**.
- Las soluciones usan los nombres y subtítulos aprobados; ISO/IEC 27001 e ISO/IEC 42001 se expresan como marcos de referencia.
- No se añadieron Sectores, Tecnología como categoría, soporte general, pentesting, garantías de resultados, cifras, casos, clientes ni certificaciones.
- Recursos indica que no hay guías, artículos ni FAQ publicados y marca estos materiales como pendientes.
- Capacitación conserva la solución aprobada y señala el contenido detallado pendiente.
- Conversemos muestra los campos aprobados deshabilitados; el texto aclara que no se envían ni almacenan datos hasta configurar su procesamiento. Correo y ubicación son los datos aprobados; teléfono y horario se marcan pendientes.
- Política de privacidad indica **BORRADOR — DATOS JURÍDICOS PENDIENTES DE VALIDACIÓN** y no inventa términos jurídicos.
- Nosotros explica el propósito, principios, metodología y significado aprobado de CERO27; los antecedentes profesionales concretos quedan pendientes.
- No se incorporaron analítica ni integraciones adicionales.

## Pasada 4 — Revisión cruzada de navegación, CTA y footer

- Logo del header enlaza a `/`; se conservan el archivo y la marca originales.
- Navegación desktop y móvil usa el mismo conjunto de rutas oficiales; el CTA móvil permanece identificable dentro del menú.
- CTA del header desktop, CTA del menú móvil, CTA del Hero y CTA final abren la misma URL externa en una pestaña nueva con `rel="noopener noreferrer"`.
- El enlace secundario «Conversemos» del Hero va a `/conversemos/`.
- Footer de todas las páginas enlaza las cuatro soluciones, navegación oficial, correo, ubicación y política. El footer de Inicio también incluye correo y política.
- No quedan `href` hacia `#soluciones`, `#recursos`, `#nosotros` o `#conversemos`; el salto accesible `#contenido` permanece y tiene destino en cada página.
- SHA-256 de `public/assets/CERO27-Logo-Original.png`: `849E54FFD64AEFD20AF8E96F9BF6CC51C342E4E88D74CC93DCB35441F75C4AA0` en V6 y v6.1.
- SHA-256 de `references/CERO27-Landing-Aprobada.png`: `18052BF79E3F79754C260AA671AE843AAC21A23F0350A6EDCFA6F3B1EB251DC1` en V6 y v6.1.

## Build Astro

Intento ejecutado con `pnpm build` y Astro 5.18.2. Resultado: **fallido por restricción de acceso del entorno durante la resolución de dependencias de esbuild**. No se pudo confirmar compilación exitosa ni salida `dist/`. Se recomienda ejecutar `pnpm install` y `pnpm build` en un entorno local con acceso normal a `node_modules` antes de presentar el sitio como compilado o desplegable.

No se modificaron GitHub, Cloudflare, DNS ni dominio.
