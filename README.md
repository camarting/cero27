# CERO27 — Inicio Astro — Propuesta v6.1

Paquete de propuesta para reemplazo manual en el repositorio. Preparado el 6 de octubre de 2026 a partir de CERO27 V6 y de los documentos maestro, contenido aprobado y contenido pendiente.

## Incluye

- Proyecto Astro completo con sus archivos de configuración y fuentes.
- Las rutas oficiales: Inicio, Soluciones, cuatro páginas de solución, Recursos, Nosotros, Conversemos y Política de privacidad.
- Navegación unificada, CTA del diagnóstico y footer con enlaces revisados.
- Logo original, fotografía de V6 y referencia protegida de la landing, conservados sin cambios.
- `INFORME-VALIDACION-v6.1.md` con cuatro pasadas documentadas.

## Ejecutar localmente

Requiere Node.js y pnpm. Desde esta carpeta:

```sh
pnpm install
pnpm build
pnpm preview
```

La configuración de pnpm permite los scripts de instalación de `esbuild` y `sharp`, requeridos por dependencias de Astro.

## Pendientes explícitos

- Recursos concretos, guías, artículos y FAQ: pendientes de creación/aprobación.
- Contenido profundo de Capacitación: pendiente de aprobación.
- Procesamiento y almacenamiento del formulario: pendientes; los controles aparecen deshabilitados y no envían datos.
- Política de privacidad: borrador con datos jurídicos pendientes de validación.
- Experiencia profesional verificable, teléfono/WhatsApp y horario: pendientes de validación/configuración.
- No se incorpora analítica ni integraciones externas adicionales.

## Estado

**Propuesta v6.1; no aprobada ni validada para producción.** El build de Astro se intentó, pero el entorno de ejecución impidió a esbuild leer directorios internos de dependencias; detalles en el informe. No se modificaron GitHub, Cloudflare, DNS ni dominio.
