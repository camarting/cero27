// Autodiagnóstico de seguridad de la información para PYMES.
// Basado en ISO/IEC 27001:2022 (cláusulas 4–10 y controles del Anexo A).
// peso 2 = práctica crítica: pesa el doble en el puntaje y en las prioridades.

export interface Pregunta {
  id: string;
  texto: string;
  porque: string;
  recomendacion: string;
  iso: string;
  peso: 1 | 2;
}

export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
}

export const areas: Area[] = [
  {
    id: 'gobierno',
    nombre: 'Gobierno y riesgos',
    descripcion: 'Quién responde por la seguridad y qué tan claro está lo que hay que proteger.',
    preguntas: [
      {
        id: 'g1',
        texto: '¿Hay una persona responsable de la seguridad de la información, con tiempo y autoridad para ello?',
        porque: 'Sin un responsable claro, la seguridad queda en manos de todos y de nadie.',
        recomendacion: 'Designa formalmente a un responsable de seguridad de la información, define sus funciones y el tiempo que le dedicará.',
        iso: 'Cl. 5.3 · A.5.2',
        peso: 1,
      },
      {
        id: 'g2',
        texto: '¿La empresa tiene una política de seguridad aprobada por la gerencia y conocida por el equipo?',
        porque: 'La política fija las reglas básicas y muestra que la gerencia respalda la seguridad.',
        recomendacion: 'Redacta una política de seguridad corta y clara, haz que la gerencia la apruebe y compártela con todo el equipo.',
        iso: 'Cl. 5.2 · A.5.1',
        peso: 1,
      },
      {
        id: 'g3',
        texto: '¿Tienen identificada la información y los equipos más importantes, y quién responde por cada uno?',
        porque: 'No se puede proteger lo que no se sabe que existe ni dónde está.',
        recomendacion: 'Haz un inventario sencillo de la información y los equipos críticos (qué es, dónde está, quién es su dueño).',
        iso: 'A.5.9',
        peso: 2,
      },
      {
        id: 'g4',
        texto: '¿Han evaluado qué riesgos pueden afectar esa información y qué harían frente a cada uno?',
        porque: 'Evaluar riesgos permite invertir primero donde el impacto sería mayor.',
        recomendacion: 'Haz una evaluación de riesgos básica: amenazas, probabilidad, impacto y una acción definida para los riesgos más altos.',
        iso: 'Cl. 6.1.2 · Cl. 6.1.3',
        peso: 2,
      },
    ],
  },
  {
    id: 'personas',
    nombre: 'Personas y cultura',
    descripcion: 'Qué tan preparado está el equipo para cuidar la información en su día a día.',
    preguntas: [
      {
        id: 'p1',
        texto: '¿El equipo recibe capacitación en seguridad de la información al menos una vez al año?',
        porque: 'Muchos incidentes empiezan con un correo engañoso o un error humano.',
        recomendacion: 'Programa una capacitación práctica anual (correos fraudulentos, contraseñas, manejo de información) y refuerzos cortos durante el año.',
        iso: 'Cl. 7.3 · A.6.3',
        peso: 2,
      },
      {
        id: 'p2',
        texto: '¿Empleados y contratistas firman acuerdos de confidencialidad?',
        porque: 'Los acuerdos dejan claras las obligaciones sobre la información, incluso después de terminar la relación.',
        recomendacion: 'Incluye cláusulas o acuerdos de confidencialidad en los contratos de empleados y contratistas.',
        iso: 'A.6.6',
        peso: 1,
      },
      {
        id: 'p3',
        texto: 'Cuando alguien sale de la empresa, ¿se le retiran todos los accesos el mismo día?',
        porque: 'Una cuenta activa de alguien que ya no trabaja con la empresa es una puerta abierta.',
        recomendacion: 'Crea una lista de verificación de salida que incluya el retiro de todas las cuentas, accesos y equipos el último día.',
        iso: 'A.5.18 · A.6.5',
        peso: 2,
      },
      {
        id: 'p4',
        texto: '¿Hay reglas claras sobre qué información se puede usar en herramientas de inteligencia artificial?',
        porque: 'Sin reglas, información confidencial puede terminar en servicios externos sin que la empresa lo sepa.',
        recomendacion: 'Define qué herramientas de IA están permitidas y qué información nunca debe ingresarse en ellas.',
        iso: 'A.5.10',
        peso: 1,
      },
    ],
  },
  {
    id: 'accesos',
    nombre: 'Accesos e identidades',
    descripcion: 'Quién puede entrar a qué y qué tan difícil es suplantar a alguien.',
    preguntas: [
      {
        id: 'a1',
        texto: '¿Cada persona tiene su propio usuario, sin cuentas compartidas?',
        porque: 'Con cuentas compartidas no se sabe quién hizo qué ni se puede retirar el acceso a una sola persona.',
        recomendacion: 'Asigna un usuario personal a cada persona y elimina las cuentas compartidas o genéricas.',
        iso: 'A.5.16',
        peso: 1,
      },
      {
        id: 'a2',
        texto: '¿El correo y los sistemas importantes usan verificación en dos pasos?',
        porque: 'La verificación en dos pasos bloquea la mayoría de intentos de robo de cuentas con contraseñas filtradas.',
        recomendacion: 'Activa la verificación en dos pasos en el correo, la nube y los sistemas críticos, empezando por gerencia y administradores.',
        iso: 'A.8.5',
        peso: 2,
      },
      {
        id: 'a3',
        texto: '¿Cada persona accede solo a lo que necesita y esos accesos se revisan periódicamente?',
        porque: 'Los accesos de más amplían el daño de un error o de una cuenta comprometida.',
        recomendacion: 'Revisa cada seis meses quién tiene acceso a qué y retira lo que ya no se necesita.',
        iso: 'A.5.15 · A.5.18',
        peso: 1,
      },
      {
        id: 'a4',
        texto: '¿Las cuentas de administrador están limitadas a pocas personas y se usan solo cuando hace falta?',
        porque: 'Una cuenta de administrador comprometida da control total de los sistemas.',
        recomendacion: 'Limita las cuentas de administrador, sepáralas de las cuentas de uso diario y protégelas con verificación en dos pasos.',
        iso: 'A.8.2',
        peso: 1,
      },
    ],
  },
  {
    id: 'tecnica',
    nombre: 'Protección de equipos y redes',
    descripcion: 'Qué tan protegidos están los computadores, celulares y la red de la empresa.',
    preguntas: [
      {
        id: 't1',
        texto: '¿Los equipos y programas se actualizan de forma regular, sin depender de la memoria de cada persona?',
        porque: 'Las actualizaciones corrigen fallas que los atacantes ya conocen y aprovechan.',
        recomendacion: 'Activa las actualizaciones automáticas y revisa cada mes que todos los equipos estén al día.',
        iso: 'A.8.8',
        peso: 2,
      },
      {
        id: 't2',
        texto: '¿Todos los equipos tienen antivirus o protección contra software malicioso, activa y actualizada?',
        porque: 'Es la primera barrera contra programas maliciosos y secuestro de información.',
        recomendacion: 'Instala una protección contra malware gestionada en todos los equipos y verifica que esté activa.',
        iso: 'A.8.7',
        peso: 1,
      },
      {
        id: 't3',
        texto: '¿Los portátiles y celulares con información de la empresa tienen bloqueo y cifrado?',
        porque: 'Un equipo perdido o robado sin cifrado expone toda la información que contiene.',
        recomendacion: 'Activa el cifrado de disco y el bloqueo automático en portátiles y celulares que manejan información de la empresa.',
        iso: 'A.8.1 · A.8.24',
        peso: 1,
      },
      {
        id: 't4',
        texto: '¿La red Wi-Fi de visitantes está separada de la red de trabajo y los equipos de red tienen claves propias?',
        porque: 'Una red sin separar permite que un visitante o un equipo infectado llegue a la información de la empresa.',
        recomendacion: 'Separa la red de visitantes, cambia las claves de fábrica del router y revisa quién está conectado.',
        iso: 'A.8.20 · A.8.22',
        peso: 1,
      },
    ],
  },
  {
    id: 'continuidad',
    nombre: 'Copias y respuesta a incidentes',
    descripcion: 'Qué tan rápido se recupera la empresa si algo sale mal.',
    preguntas: [
      {
        id: 'c1',
        texto: '¿Hacen copias de seguridad automáticas y al menos una queda fuera de la oficina o desconectada?',
        porque: 'Frente a un secuestro de información, una copia aislada es lo que permite recuperarse.',
        recomendacion: 'Automatiza las copias de seguridad y mantén al menos una copia fuera de la oficina o desconectada de la red.',
        iso: 'A.8.13',
        peso: 2,
      },
      {
        id: 'c2',
        texto: '¿Han probado recuperar información desde las copias en los últimos seis meses?',
        porque: 'Una copia que nunca se ha probado no garantiza que se pueda recuperar.',
        recomendacion: 'Haz una prueba de recuperación al menos cada seis meses y deja registro del resultado.',
        iso: 'A.8.13',
        peso: 2,
      },
      {
        id: 'c3',
        texto: 'Si ocurre un incidente de seguridad, ¿está claro qué hacer y a quién avisar?',
        porque: 'Reaccionar rápido y en orden reduce el daño y el tiempo sin operar.',
        recomendacion: 'Define un procedimiento corto de respuesta a incidentes: cómo reportar, a quién avisar y los primeros pasos.',
        iso: 'A.5.24 · A.5.25 · A.5.26',
        peso: 1,
      },
      {
        id: 'c4',
        texto: '¿Sabrían seguir operando si el sistema principal deja de funcionar un día o más?',
        porque: 'Saber cómo seguir operando evita que una falla técnica se convierta en una crisis del negocio.',
        recomendacion: 'Identifica los procesos críticos y define cómo seguir operando y en cuánto tiempo recuperarse si fallan los sistemas.',
        iso: 'A.5.29 · A.5.30',
        peso: 1,
      },
    ],
  },
  {
    id: 'terceros',
    nombre: 'Proveedores, datos y documentos',
    descripcion: 'Cómo se cuida la información que manejan terceros, los datos personales y los documentos.',
    preguntas: [
      {
        id: 'f1',
        texto: '¿Saben qué proveedores y servicios en la nube manejan información de la empresa?',
        porque: 'La información sigue siendo responsabilidad de la empresa aunque esté en manos de un proveedor.',
        recomendacion: 'Haz una lista de proveedores y servicios en la nube que manejan información y del tipo de información que tiene cada uno.',
        iso: 'A.5.19 · A.5.23',
        peso: 1,
      },
      {
        id: 'f2',
        texto: '¿Los contratos con proveedores incluyen obligaciones de confidencialidad y seguridad?',
        porque: 'Sin obligaciones por escrito es difícil exigir protección o responsabilidad ante un incidente.',
        recomendacion: 'Incluye cláusulas de confidencialidad, seguridad y aviso de incidentes en los contratos con proveedores críticos.',
        iso: 'A.5.20',
        peso: 1,
      },
      {
        id: 'f3',
        texto: '¿La empresa cumple la Ley 1581 de protección de datos personales (política, autorizaciones y registro ante la SIC cuando aplica)?',
        porque: 'El incumplimiento puede generar sanciones y afectar la confianza de clientes y empleados.',
        recomendacion: 'Revisa la política de tratamiento de datos, las autorizaciones que recoges y la obligación de registro de bases de datos ante la SIC.',
        iso: 'A.5.34',
        peso: 2,
      },
      {
        id: 'f4',
        texto: '¿Controlan la impresión de documentos confidenciales y su destrucción segura?',
        porque: 'Los documentos impresos olvidados o mal desechados también exponen información.',
        recomendacion: 'Activa la impresión segura (liberación con código o tarjeta) y define cómo destruir documentos confidenciales.',
        iso: 'A.7.7 · A.7.14',
        peso: 1,
      },
    ],
  },
];

export const perfil = {
  sector: [
    'Servicios profesionales',
    'Contable o financiero',
    'Comercio',
    'Manufactura o industria',
    'Salud',
    'Educación',
    'Tecnología',
    'Otro',
  ],
  tamano: ['1 a 10 personas', '11 a 50 personas', '51 a 200 personas', 'Más de 200 personas'],
  datos: ['Sí, en gran cantidad', 'Algunos', 'No manejamos datos personales'],
};

export const niveles = [
  { min: 75, nombre: 'Base sólida', riesgo: 'Riesgo bajo', texto: 'Tu empresa tiene varias prácticas importantes en marcha. El siguiente paso es comprobar que funcionan como crees y cerrar las brechas que quedan.' },
  { min: 50, nombre: 'En construcción', riesgo: 'Riesgo moderado', texto: 'Hay prácticas en marcha, pero también brechas que pueden exponer tu información. Priorizar bien te permite avanzar sin complicar la operación.' },
  { min: 25, nombre: 'Brechas importantes', riesgo: 'Riesgo alto', texto: 'Varios aspectos básicos todavía no están cubiertos. Con prioridades claras se puede avanzar rápido y sin burocracia.' },
  { min: 0, nombre: 'Punto de partida', riesgo: 'Riesgo crítico', texto: 'La mayoría de las protecciones básicas no están cubiertas. Es el momento de empezar por lo esencial, en el orden correcto.' },
];
