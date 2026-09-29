import estadoRealPoster from '../assets/reels/estado-real.jpg';
import estadoRealLoop from '../assets/reels/estado-real.loop.mp4';
import estadoRealFull from '../assets/reels/estado-real.mp4';
import galponPoster from '../assets/reels/galpon.jpg';
import galponLoop from '../assets/reels/galpon.loop.mp4';
import galponFull from '../assets/reels/galpon.mp4';
import sinSorpresasPoster from '../assets/reels/sin-sorpresas.jpg';
import sinSorpresasLoop from '../assets/reels/sin-sorpresas.loop.mp4';
import sinSorpresasFull from '../assets/reels/sin-sorpresas.mp4';
import inversionPoster from '../assets/reels/inversion.jpg';
import inversionLoop from '../assets/reels/inversion.loop.mp4';
import inversionFull from '../assets/reels/inversion.mp4';
import { brand } from './brand';

/**
 * Reels from @lemmiarquitectura, self-hosted.
 *
 * Nothing goes here straight from Instagram: a downloaded reel has its `moov`
 * atom at the end of the file, so the browser must fetch the whole thing before
 * it can paint a frame. Run `npm run media reel <archivo> <slug>` to produce the
 * three artefacts each card needs — a short muted loop, a faststart full
 * version, and a poster — then reference them below.
 */
export interface Reel {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly poster: string;
  /** Short, muted, autoplays only while the card is focused. */
  readonly loop?: string;
  /** Full clip with audio, plays when opened. */
  readonly full?: string;
}

export const reels: Reel[] = [
  {
    id: 'galpon',
    title: '¿Tenés un galpón en desuso?',
    caption: 'No hace falta tirarlo abajo. Refuncionalizamos el pasado cuidando tu economía.',
    poster: galponPoster,
    loop: galponLoop,
    full: galponFull,
  },
  {
    id: 'estado-real',
    title: 'Así sabés dónde te estás metiendo',
    caption: 'Nos llamás, vamos a la propiedad y te decimos qué sirve y qué no.',
    poster: estadoRealPoster,
    loop: estadoRealLoop,
    full: estadoRealFull,
  },
  {
    id: 'sin-sorpresas',
    title: 'Sin sorpresas',
    caption: 'Diseñamos, dirigimos y cerramos el presupuesto. Así de simple.',
    poster: sinSorpresasPoster,
    loop: sinSorpresasLoop,
    full: sinSorpresasFull,
  },
  {
    id: 'inversion',
    title: 'Cuánto rinde invertir en ladrillos',
    caption: 'Números reales de inversión inmobiliaria, contados en la obra.',
    poster: inversionPoster,
    loop: inversionLoop,
    full: inversionFull,
  },
] as const;

export const instagramProfile = brand.instagram;
