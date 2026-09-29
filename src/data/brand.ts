/**
 * Brand facts. Everything here is sourced from Lemmi's own material — the two
 * linktree flyers ("Asesoramiento en la compra" / "Asesoramiento en la venta"),
 * the Instagram account @lemmiarquitectura, and the phone numbers printed on
 * the flyers. Do not add claims that are not on one of those.
 */

export const brand = {
  name: 'LEMMI',
  nameSub: 'arquitectura',
  legalName: 'LEMMI arquitectura & Asociados',
  city: 'Mar del Plata',
  tagline: 'Maximizando espacios de calidad',
  phones: ['223-4231162', '223-6237191'],
  whatsappNumber: '5492236237191',
  instagram: 'https://www.instagram.com/lemmiarquitectura/',
  instagramHandle: '@lemmiarquitectura',
} as const;

/**
 * Builds the WhatsApp deep link with a prefilled opener so the studio knows
 * which part of the page the person came from.
 */
export function whatsappLink(message?: string): string {
  const base = `https://api.whatsapp.com/send/?phone=${brand.whatsappNumber}&type=phone_number&app_absent=0`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : `${base}&text`;
}

export const whatsappMessages = {
  general: 'Hola, quiero consultar por un asesoramiento técnico.',
  venta: 'Hola, quiero certificar el estado real de mi propiedad para venderla.',
  compra: 'Hola, estoy por comprar una propiedad y quiero un informe técnico.',
  llaveEnMano: 'Hola, quiero una cotización de obra llave en mano con presupuesto fijo.',
} as const;
