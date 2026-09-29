import edificioImg from '../assets/images/edificio.webp';
import balneariosImg from '../assets/images/balnearios.webp';
import plazaNoche from '../assets/proyectos/plaza-2867/noche.webp';
import plazaAntes from '../assets/proyectos/plaza-2867/antes.webp';
import plazaDespues from '../assets/proyectos/plaza-2867/despues.webp';

/** Every photo in a project folder, in file-name order (01.webp, 02.webp, …). */
const gallery = (files: Record<string, string>): string[] =>
  Object.keys(files)
    .sort()
    .map((path) => files[path]);

const casaPergolaPileta = gallery(import.meta.glob('../assets/proyectos/casa-pergola-pileta/*.webp', { eager: true, import: 'default' }));
const casaBlancaPileta = gallery(import.meta.glob('../assets/proyectos/casa-blanca-pileta/*.webp', { eager: true, import: 'default' }));
const casaPatioCentral = gallery(import.meta.glob('../assets/proyectos/casa-patio-central/*.webp', { eager: true, import: 'default' }));
const edificioVidriado = gallery(import.meta.glob('../assets/proyectos/edificio-vidriado/*.webp', { eager: true, import: 'default' }));
const casaBosque = gallery(import.meta.glob('../assets/proyectos/casa-bosque/*.webp', { eager: true, import: 'default' }));
const casaDeckPatio = gallery(import.meta.glob('../assets/proyectos/casa-deck-patio/*.webp', { eager: true, import: 'default' }));

/**
 * Built work. Metadata is the studio's own — what it is, where, when, and what
 * state it is in — not the bedroom/bathroom count of a listings portal.
 *
 * To add photographs: drop them in src/assets/proyectos/<slug>/ and list them
 * in `images`. See src/assets/proyectos/README.md for the contract.
 */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly kind: string;
  /** Only shown when known — never guess it. */
  readonly year?: string;
  readonly status: 'Terminada' | 'En obra' | 'Proyecto';
  readonly surface?: string;
  /** First image is the cover. */
  readonly images: readonly string[];
  readonly summary: string;
}

export const projects: Project[] = [
  {
    id: 'plaza-2867',
    title: 'Plaza 2867',
    location: 'Mar del Plata',
    kind: 'Refuncionalización integral',
    year: '2024',
    status: 'Terminada',
    // Replace with the real gallery — see README in src/assets/proyectos/
    images: [plazaNoche, plazaDespues, plazaAntes],
    summary:
      'Una fachada deteriorada de los años setenta convertida en tres niveles habitables sin demoler la estructura existente.',
  },
  {
    id: 'balneario-costero',
    title: 'Balneario Punta Iglesias',
    location: 'Punta Iglesias, Mar del Plata',
    kind: 'Obra pública / gastronomía',
    year: '2022',
    status: 'Terminada',
    surface: '1.200 m²',
    images: [balneariosImg],
    summary:
      'Estructura liviana y galería continua sobre la rambla: sombra, circulación y vista al mar en un solo gesto.',
  },
  {
    id: 'edificio-centro',
    title: 'Edificio LeMarche',
    location: 'Centro, Mar del Plata',
    kind: 'Obra nueva en altura',
    year: '2023',
    status: 'Terminada',
    surface: '950 m²',
    images: [edificioImg],
    summary:
      'Unidades compactas con frente vidriado y control solar, resueltas en un lote entre medianeras.',
  },
  {
    id: 'casa-pergola-pileta',
    title: 'Casa Lemmi',
    location: 'Mar del Plata',
    kind: 'Vivienda unifamiliar',
    status: 'Terminada',
    images: casaPergolaPileta,
    summary:
      'Ladrillo visto, hormigón y una pérgola de madera que cubre la terraza y la pileta frente a la calle.',
  },
  {
    id: 'casa-blanca-pileta',
    title: 'Casa Barcos',
    location: 'Mar del Plata',
    kind: 'Vivienda unifamiliar',
    status: 'Terminada',
    images: casaBlancaPileta,
    summary:
      'Volúmenes blancos encastrados, deck de madera y pileta integrados al jardín.',
  },
  {
    id: 'casa-patio-central',
    title: 'Casa Mirador',
    location: 'Mar del Plata',
    kind: 'Vivienda unifamiliar',
    status: 'Terminada',
    images: casaPatioCentral,
    summary:
      'Fachada de volúmenes encastrados, cubierta de madera y un patio central que ordena los ambientes.',
  },
  {
    id: 'edificio-vidriado',
    title: 'Biblioteca Central de la Universidad Nacional de Mar del Plata',
    location: 'Mar del Plata',
    kind: 'Obra institucional',
    status: 'Terminada',
    images: edificioVidriado,
    summary:
      'Volumen liviano de tres niveles con fachada vidriada y circulaciones luminosas.',
  },
  {
    id: 'casa-bosque',
    title: 'Casa Los Pinos',
    location: 'Mar del Plata',
    kind: 'Vivienda unifamiliar',
    status: 'Terminada',
    images: casaBosque,
    summary:
      'Casa revestida en madera gris, con pérgola y escalera de acceso entre árboles. Incluye el registro de la obra en proceso.',
  },
  {
    id: 'casa-deck-patio',
    title: 'Casa Glicinas',
    location: 'Mar del Plata',
    kind: 'Vivienda unifamiliar',
    status: 'Terminada',
    images: casaDeckPatio,
    summary:
      'Un patio-deck de madera que vincula los niveles con una escalera liviana y vegetación.',
  },
] as const;

/**
 * Before/after pairs. This is Lemmi's own device — the split image the flyers
 * and the Instagram posts are built on — so it gets a first-class component.
 *
 * `before` and `after` must be the same framing of the same building for the
 * slider to read correctly.
 */
export interface BeforeAfterPair {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly beforeLabel: string;
  readonly afterLabel: string;
  readonly before: string;
  readonly after: string;
  readonly caption: string;
}


export const beforeAfter: BeforeAfterPair[] = [
  {
    id: 'plaza-2867',
    title: 'Plaza 2867',
    location: 'Mar del Plata',
    beforeLabel: 'Antes',
    afterLabel: 'Después',
    before: plazaAntes,
    after: plazaDespues,
    caption: 'Refuncionalizando el pasado para construir el futuro.',
  },
] as const;
