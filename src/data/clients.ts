/* Single-colour silhouettes of the supplied logos (originals stay in
   assets/images). Each one had a different background — yellow, navy, cyan —
   so in grey they read as boxes. As silhouettes they sit on any surface. */
import acaLogo from '../assets/logos/aca.mono.png';
import unmdpLogo from '../assets/logos/unmdp.mono.png';
import puntaIglesiaLogo from '../assets/logos/punta-iglesia.mono.png';
import lecerLogo from '../assets/logos/lecer.mono.png';

/**
 * Institutions the studio has worked with. These are factual — the logos ship
 * in the repository as brand assets. Only add an entry when there is real work
 * behind it; this block is the strongest proof on the page precisely because
 * every name on it is verifiable.
 */
export interface Client {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly href?: string;
  /** What the studio did for them. Keep it factual. */
  readonly work: string;
}

export const clients: Client[] = [
  { id: 'aca', name: 'Automóvil Club Argentino', work: 'Obra institucional', logo: acaLogo },
  { id: 'unmdp', name: 'Universidad Nacional de Mar del Plata', work: 'Obra universitaria', logo: unmdpLogo },
  { id: 'punta-iglesia', name: 'Balneario Punta Iglesia', work: 'Balneario sobre la rambla', logo: puntaIglesiaLogo },
  { id: 'lecer', name: 'Lecer', work: 'Locales comerciales', logo: lecerLogo, href: 'https://www.lecer.com.ar/' },
] as const;
