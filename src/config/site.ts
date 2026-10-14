export const siteConfig = {
  name: 'CERO27',
  slogan: 'Seguridad que te permite avanzar',
  siteUrl: 'https://cero27.co',
  diagnosticUrl: '/diagnostico/',
  email: 'info@cero27.co',
  whatsappDisplay: '316 865 9331',
  whatsappUrl: 'https://wa.me/573168659331?text=Hola%20CERO27%2C%20quiero%20conversar%20sobre%20mi%20empresa',
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
