export const siteConfig = {
  name: 'CERO27',
  slogan: 'Seguridad que te permite avanzar',
  siteUrl: 'https://cero27.co',
  diagnosticUrl: 'https://diagn-stico-iso-iec-27001.ai.studio/',
  email: 'info@cero27.co',
  location: 'Medellín, Colombia',
  navigation: [
    { label: 'Inicio', href: '/', available: true },
    { label: 'Soluciones', href: '/soluciones/', available: false },
    { label: 'Recursos', href: '/recursos/', available: false },
    { label: 'Nosotros', href: '/nosotros/', available: false },
    { label: 'Conversemos', href: '/conversemos/', available: false }
  ],
  solutions: [
    { label: 'Seguridad de la información', href: '/soluciones/seguridad-de-la-informacion/' },
    { label: 'IA y gobernanza', href: '/soluciones/ia-y-gobernanza/' },
    { label: 'Print Management', href: '/soluciones/print-management/' },
    { label: 'Capacitación', href: '/soluciones/capacitacion/' }
  ]
} as const;
