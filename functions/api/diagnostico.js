// Pages Function: recibe el resumen del diagnóstico y lo entrega al Worker
// "cero27-diagnostico-mailer" mediante un Service binding llamado MAILER.
// No guarda nada: solo valida el tamaño y reenvía la petición.

const MAX_BYTES = 8 * 1024;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'metodo-no-permitido' });
  if (!env.MAILER) return json(503, { ok: false, error: 'no-configurado' });

  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BYTES) return json(413, { ok: false, error: 'demasiado-grande' });

  const body = await request.text();
  if (body.length > MAX_BYTES) return json(413, { ok: false, error: 'demasiado-grande' });

  return env.MAILER.fetch('https://mailer.internal/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}
