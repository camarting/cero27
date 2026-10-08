# Informe de validación — CERO27 v6.2

Fecha: 6 de octubre de 2026  
Base: `CERO27-Inicio-Astro-Propuesta-v6.1.zip`  
Resultado: cambios limitados a la política de privacidad; `/soluciones/` ya utilizaba `PageLayout` en el ZIP recibido, por lo que se conservó sin modificar.

## Resumen

- `/soluciones/` usa el `PageLayout` común, que incorpora `SiteHeader`, `SiteFooter` y los estilos globales. Su contenido visual se conserva igual al de la base recibida.
- `/politica-de-privacidad/` presenta ahora un borrador funcional con su estado claramente visible, información por validar y sin redactar términos jurídicos como hechos confirmados.
- Las diez rutas oficiales continúan en el sitemap y tienen archivo Astro correspondiente.
- El logo y la referencia visual de landing conservan exactamente los SHA-256 indicados en el informe v6.1.
- Se intentó preparar y lanzar el build. El proceso quedó bloqueado antes de compilar: pnpm no puede acceder al registro npm (EACCES) y el paquete Astro no está disponible como ejecutable local. Por ello, v6.2 **no se declara compilada ni validada para producción**.
- No se modificaron GitHub, Cloudflare, DNS ni el dominio.

## Pasada 1 — Inventario de enlaces y arquitectura

Revisión de `src/pages/**/*.astro`, `src/components/**/*.astro`, `src/layouts/**/*.astro`, `src/config/site.ts` y `public/sitemap.xml`.

- La navegación común se define en `siteConfig.navigation`: Inicio, Soluciones, Recursos, Nosotros y Conversemos.
- Las cuatro soluciones están definidas en `siteConfig.solutions` y enlazan a sus rutas oficiales.
- El header desktop y móvil usan la configuración central. Sus CTA externos usan `siteConfig.diagnosticUrl`.
- Se identificaron además salto accesible `#contenido`, enlaces de correo, política de privacidad y enlaces del footer.
- No se cambió el CTA ni su URL literal centralizada `https://diagn-stico-iso-iec-27001.ai.studio/`.

Resultado: inventario consistente con la arquitectura del informe v6.1 y el encargo actual.

## Pasada 2 — Existencia de destinos

Se cotejaron sitemap y archivos fuente:

| Ruta | Archivo Astro | Resultado |
|---|---|---|
| `/` | `src/pages/index.astro` | Existe |
| `/soluciones/` | `src/pages/soluciones/index.astro` | Existe; usa `PageLayout` |
| `/soluciones/seguridad-de-la-informacion/` | `src/pages/soluciones/seguridad-de-la-informacion.astro` | Existe |
| `/soluciones/ia-y-gobernanza/` | `src/pages/soluciones/ia-y-gobernanza.astro` | Existe |
| `/soluciones/print-management/` | `src/pages/soluciones/print-management.astro` | Existe |
| `/soluciones/capacitacion/` | `src/pages/soluciones/capacitacion.astro` | Existe |
| `/recursos/` | `src/pages/recursos.astro` | Existe |
| `/nosotros/` | `src/pages/nosotros.astro` | Existe |
| `/conversemos/` | `src/pages/conversemos.astro` | Existe |
| `/politica-de-privacidad/` | `src/pages/politica-de-privacidad.astro` | Existe; borrador funcional |

Resultado: 10 de 10 destinos del sitemap tienen archivo fuente. Los imports de `PageLayout`, `siteConfig`, header y footer examinados apuntan a archivos incluidos en el paquete.

## Pasada 3 — Contraste con documentos y contenido aprobado

Se contrastó contra el informe v6.1 adjunto y las restricciones explícitas de este encargo. El ZIP no contiene copias de `CERO27_MASTER.md`, `CERO27_CONTENIDO_APROBADO.md` ni `CERO27_CONTENIDO_PENDIENTE.md`; por ello no fue posible hacer una comparación independiente, línea por línea, con esos documentos fuente. Se conservaron las pautas que el informe v6.1 atribuye a dichos documentos:

- Se mantiene la navegación, las cuatro soluciones, las rutas oficiales y el CTA aprobados.
- Se conserva la indicación existente de que el formulario de Conversemos está deshabilitado y no envía ni almacena datos hasta configurar su procesamiento.
- La página de privacidad está marcada como borrador y deja la información legal para validación. La lista es una lista de asuntos pendientes, no declara finalidades, bases jurídicas, plazos ni prácticas no confirmadas.
- No se añadieron términos jurídicos, promesas, integraciones, servicios o rutas nuevos.

Resultado: coherente con el informe suministrado; contraste directo con los documentos maestros originales queda limitado porque no venían dentro del ZIP ni como adjuntos separados disponibles.

## Pasada 4 — Revisión cruzada de header, navegación, CTA, footer y páginas

- `src/pages/soluciones/index.astro` ya tenía el wrapper `PageLayout` en la base entregada; se verificó que el layout compone `SiteHeader` y `SiteFooter`. No se tocó la presentación de la página.
- El header conserva logo enlazado a `/`, navegación desktop/móvil y CTA externo con `target="_blank"` y `rel="noopener noreferrer"`.
- El footer común incluye navegación, soluciones, correo, ubicación y política de privacidad.
- Las páginas mantienen `id="contenido"` como destino del salto accesible.
- La página de privacidad utiliza el layout compartido y sus enlaces internos permanecen dentro de destinos disponibles.
- SHA-256 de `public/assets/CERO27-Logo-Original.png`: `849E54FFD64AEFD20AF8E96F9BF6CC51C342E4E88D74CC93DCB35441F75C4AA0`.
- SHA-256 de `references/CERO27-Landing-Aprobada.png`: `18052BF79E3F79754C260AA671AE843AAC21A23F0350A6EDCFA6F3B1EB251DC1`.

Resultado: revisión cruzada satisfactoria para los archivos disponibles. Ambos hashes coinciden con los valores reportados para V6 y v6.1.

## Build real de Astro

Se intentó `pnpm build` y un arranque directo de Astro. pnpm pudo resolver paquetes desde caché, pero intentó consultar el registro npm y recibió `EACCES`; se interrumpió la espera. No había `node_modules/.bin/astro.cmd` utilizable. El build no llegó a ejecutarse ni produjo validación de compilación. Se debe correr `pnpm install` y `pnpm build` en un entorno con acceso normal al registro o con dependencias instaladas para confirmar compilación.

## Alcance de cambios

El contenido de `/soluciones/` y demás archivos de sitio se mantuvo. El único archivo de código que requería modificación en la base recibida fue `src/pages/politica-de-privacidad.astro`. El archivo de informe es un entregable de validación.

