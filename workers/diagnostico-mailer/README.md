# Envío del diagnóstico por correo

El diagnóstico (`/diagnostico/`) se ejecuta en el navegador. Si la persona pide el reporte completo, la página envía **solo** su contacto, el perfil de la empresa y el resumen del resultado a `/api/diagnostico`. No se guarda nada en bases de datos.

```
Navegador ──POST──▶ Pages Function /api/diagnostico ──Service binding MAILER──▶ Worker cero27-diagnostico-mailer ──send_email──▶ tu buzón
```

## Configuración (una sola vez)

1. **Buzón de destino verificado.** Cloudflare → Email Routing → *Destination addresses*. El buzón real donde quieres recibir los diagnósticos debe aparecer como **verificado**.
2. **Alias `diagnostico@cero27.co`** (opcional, recomendado). Email Routing → *Routing rules* → `diagnostico` → *Send to an email* → ese mismo buzón. Así, si alguien responde o escribe a esa dirección, también te llega.
3. **`wrangler.toml`** ya tiene `DESTINO` y `destination_address` con el buzón verificado (deben ser iguales si lo cambias).
4. **Despliega el Worker.** Desde esta carpeta: `npx wrangler deploy`.
5. **Conecta el Worker al sitio.** Workers & Pages → proyecto de cero27 → *Settings* → *Bindings* → *Add* → *Service binding*: nombre `MAILER`, servicio `cero27-diagnostico-mailer`. Hazlo para **Production** y **Preview**, y vuelve a desplegar.

Sin el paso 5, el diagnóstico funciona igual, pero el envío responde 503 y la persona ve un aviso para escribir por WhatsApp.

## Qué contiene el correo

Asunto: `Nuevo diagnóstico: {empresa} — {nivel} ({%})`. Incluye contacto, sector, tamaño, manejo de datos personales, porcentaje por área, cantidad de respuestas "No sé" y las 3 prioridades. *Responder* escribe directamente al contacto.

## Protección básica

- Campo trampa oculto y tiempo mínimo de 45 s: los envíos de bots se descartan en silencio.
- Límite de 8 KB por petición; campos recortados y escapados.
- Si llega spam, el siguiente paso es añadir Cloudflare Turnstile.
