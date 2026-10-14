// Worker "cero27-diagnostico-mailer"
// Recibe el resumen del diagnóstico (desde la Pages Function) y lo envía por correo
// a la dirección verificada de Email Routing. No guarda nada en ninguna base de datos.

const LIM = { corto: 120, correo: 160, tel: 40, item: 400 };

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const txt = (v, max = LIM.corto) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const num = (v) => Math.max(0, Math.min(100, Math.round(Number(v) || 0)));

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return json(405, { ok: false });

    let d;
    try { d = await request.json(); } catch { return json(400, { ok: false, error: 'json' }); }

    // Anti-spam básico: campo trampa vacío y tiempo mínimo para responder 24 preguntas.
    if (d.sitio_web) return json(200, { ok: true });
    if (Number(d.duracionSeg) < 45) return json(200, { ok: true });
    if (d.consentimiento !== true) return json(400, { ok: false, error: 'consentimiento' });

    const c = d.contacto || {};
    const contacto = {
      nombre: txt(c.nombre), cargo: txt(c.cargo), empresa: txt(c.empresa),
      correo: txt(c.correo, LIM.correo).toLowerCase(), telefono: txt(c.telefono, LIM.tel),
    };
    if (!contacto.nombre || !contacto.empresa || !contacto.cargo || !emailOk(contacto.correo)) {
      return json(400, { ok: false, error: 'datos' });
    }

    const p = d.perfil || {};
    const perfil = { sector: txt(p.sector), tamano: txt(p.tamano), datos: txt(p.datos) };
    const r = d.resultado || {};
    const porcentaje = num(r.porcentaje);
    const nivel = txt(r.nivel);
    const areas = (Array.isArray(r.areas) ? r.areas : []).slice(0, 10).map((a) => ({ nombre: txt(a.nombre), porcentaje: num(a.porcentaje) }));
    const prioridades = (Array.isArray(r.prioridades) ? r.prioridades : []).slice(0, 3).map((x) => txt(x, LIM.item));
    const noSabe = Math.max(0, Math.min(50, Math.round(Number(r.noSabe) || 0)));
    const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'long', timeStyle: 'short' });
    const tel = contacto.telefono.replace(/[^\d+]/g, '');
    const wa = tel ? `https://wa.me/${tel.startsWith('+') ? tel.slice(1) : (tel.length === 10 ? '57' + tel : tel)}` : '';

    const text = [
      `Nuevo diagnóstico de seguridad — ${fecha}`,
      '',
      'CONTACTO',
      `Nombre: ${contacto.nombre}`,
      `Cargo: ${contacto.cargo}`,
      `Empresa: ${contacto.empresa}`,
      `Correo: ${contacto.correo}`,
      `Celular/WhatsApp: ${contacto.telefono || '(no indicó)'}`,
      '',
      'EMPRESA',
      `Sector: ${perfil.sector}`,
      `Tamaño: ${perfil.tamano}`,
      `Datos personales: ${perfil.datos}`,
      '',
      'RESULTADO',
      `Nivel: ${nivel} (${porcentaje}% de prácticas cubiertas)`,
      ...areas.map((a) => `- ${a.nombre}: ${a.porcentaje}%`),
      `Respuestas "No sé": ${noSabe}`,
      '',
      'PRIORIDADES',
      ...prioridades.map((x, i) => `${i + 1}. ${x}`),
      '',
      'El contacto autorizó el tratamiento de sus datos (Ley 1581 de 2012) al enviar el formulario.',
    ].join('\n');

    const fila = (k, v) => `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
    const html = `<!doctype html><html lang="es"><body style="margin:0;padding:24px;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:640px;margin:0 auto;background:#fff;border-top:4px solid #ff5a00;padding:28px">
<p style="margin:0 0 4px;color:#ff5a00;font-weight:700;letter-spacing:.1em;font-size:12px;text-transform:uppercase">Nuevo diagnóstico · ${esc(fecha)}</p>
<h1 style="margin:0 0 4px;font-size:24px;color:#111">${esc(contacto.empresa)}</h1>
<p style="margin:0 0 20px;font-size:18px;color:#111"><strong style="color:#ff5a00">${porcentaje}%</strong> · ${esc(nivel)}</p>
<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#111;border-bottom:1px solid #eee;padding-bottom:6px">Contacto</h2>
<table style="border-collapse:collapse;font-size:15px">
${fila('Nombre', esc(contacto.nombre))}
${fila('Cargo', esc(contacto.cargo))}
${fila('Correo', `<a href="mailto:${esc(contacto.correo)}" style="color:#d14a00">${esc(contacto.correo)}</a>`)}
${fila('Celular', contacto.telefono ? (wa ? `<a href="${esc(wa)}" style="color:#d14a00">${esc(contacto.telefono)}</a>` : esc(contacto.telefono)) : '<span style="color:#999">No indicó</span>')}
${fila('Sector', esc(perfil.sector))}
${fila('Tamaño', esc(perfil.tamano))}
${fila('Datos personales', esc(perfil.datos))}
</table>
<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#111;border-bottom:1px solid #eee;padding-bottom:6px;margin-top:24px">Resultado por área</h2>
<table style="border-collapse:collapse;font-size:15px;width:100%">
${areas.map((a) => `<tr><td style="padding:5px 12px 5px 0;color:#111;width:45%">${esc(a.nombre)}</td><td style="padding:5px 0"><div style="background:#eee;height:8px"><div style="background:#ff5a00;height:8px;width:${a.porcentaje}%"></div></div></td><td style="padding:5px 0 5px 12px;text-align:right;font-weight:700">${a.porcentaje}%</td></tr>`).join('')}
</table>
<p style="font-size:13px;color:#666">Respuestas "No sé": ${noSabe}</p>
<h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#111;border-bottom:1px solid #eee;padding-bottom:6px;margin-top:24px">Prioridades</h2>
<ol style="font-size:15px;color:#111;padding-left:20px;line-height:1.5">${prioridades.map((x) => `<li style="margin-bottom:8px">${esc(x)}</li>`).join('')}</ol>
<p style="font-size:12px;color:#999;margin-top:28px">El contacto autorizó el tratamiento de sus datos (Ley 1581 de 2012) al enviar el formulario. Responde a este correo para escribirle directamente.</p>
</div></body></html>`;

    try {
      await env.EMAIL.send({
        to: env.DESTINO,
        from: { email: env.REMITENTE, name: 'Diagnóstico CERO27' },
        replyTo: contacto.correo,
        subject: `Nuevo diagnóstico: ${contacto.empresa} — ${nivel} (${porcentaje}%)`,
        text,
        html,
      });
      return json(200, { ok: true });
    } catch (e) {
      console.error('Fallo al enviar correo', e && e.message);
      return json(502, { ok: false, error: 'envio' });
    }
  },
};
