import { whatsappMessages } from './brand';

/**
 * The three paths a visitor can be on. This is the page: everything else is
 * proof. Each one is deliberately short — a hook, three things you get, one
 * action. The longer explanations live in the FAQ, where someone who wants
 * them goes looking.
 */
export interface ServiceLine {
  readonly id: string;
  readonly index: number;
  /** The visitor's situation, in their words. */
  readonly label: string;
  readonly hook: string;
  readonly bullets: readonly string[];
  /** Which illustration the card shows; the mark lives in PathsSection. */
  readonly icon: 'informe' | 'inspeccion' | 'obra';
  readonly cta: string;
  readonly whatsapp: string;
}

export const serviceLines: ServiceLine[] = [
  {
    id: 'venta',
    index: 1,
    label: 'Voy a vender',
    hook: 'Llegá con todo en regla y evitá las rebajas.',
    bullets: [
      'Informe técnico firmado',
      'Planos al día',
      'Listo para publicar',
    ],
    icon: 'informe',
    cta: 'Certificar mi propiedad',
    whatsapp: whatsappMessages.venta,
  },
  {
    id: 'compra',
    index: 2,
    label: 'Voy a comprar',
    hook: 'Sabé qué estás comprando antes de firmar.',
    bullets: [
      'Vicios ocultos a la vista',
      'Diagnóstico constructivo',
      'Costo real de arreglarla',
    ],
    icon: 'inspeccion',
    cta: 'Revisar una propiedad',
    whatsapp: whatsappMessages.compra,
  },
  {
    id: 'llave-en-mano',
    index: 3,
    label: 'Quiero construir',
    hook: 'Tu obra, con un solo precio cerrado.',
    bullets: [
      'Proyecto y dirección',
      'Mano de obra y materiales',
      'Presupuesto fijo',
    ],
    icon: 'obra',
    cta: 'Cotizar mi obra',
    whatsapp: whatsappMessages.llaveEnMano,
  },
] as const;
