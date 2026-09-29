export interface NavLink {
  readonly id: string;
  readonly href: string;
  readonly label: string;
}

export const navigationLinks: NavLink[] = [
  { id: 'servicios', href: '#servicios', label: 'Servicios' },
  { id: 'obras', href: '#obras', label: 'Obras' },
  { id: 'reels', href: '#reels', label: 'Instagram' },
  { id: 'testimonios', href: '#testimonios', label: 'Clientes' },
  { id: 'equipo', href: '#equipo', label: 'Equipo' },
  { id: 'faq', href: '#faq', label: 'Preguntas' },
  { id: 'contacto', href: '#contacto', label: 'Contacto' },
] as const;
