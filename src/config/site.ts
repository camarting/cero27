export const siteConfig = {
  name: 'CERO27',
  slogan: 'Seguridad que te permite avanzar',
  siteUrl: 'https://cero27.co',
  diagnosticUrl: 'https://diagn-stico-iso-iec-27001.ai.studio/',
  email: 'info@cero27.co',
  location: 'Medellín, Colombia',
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Soluciones', href: '/soluciones/' },
    { label: 'Recursos', href: '/recursos/' },
    { label: 'Nosotros', href: '/nosotros/' },
    { label: 'Conversemos', href: '/conversemos/' },
  ],
  solutions: [
    { label: 'Seguridad de la información', href: '/soluciones/seguridad-de-la-informacion/' },
    { label: 'IA y gobernanza', href: '/soluciones/ia-y-gobernanza/' },
    { label: 'Print Management', href: '/soluciones/print-management/' },
    { label: 'Capacitación', href: '/soluciones/capacitacion/' },
  ],
} as const;
