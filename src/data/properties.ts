import edificioImg from '../assets/images/edificio.png';
import heroBgImg from '../assets/images/HeroBackground.png';
import casaLemmiImg from '../assets/images/casa-lemmi.png';
import casaImg from '../assets/images/Casa.png';

export interface Property {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly type: string;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly sqft: string; // m²
  readonly image: string;
  readonly href: string;
}

export const featuredProperties: Property[] = [
  {
    id: 'edificio-centro',
    title: 'Edificio Corporativo Centro',
    location: 'Centro, Mar del Plata',
    type: 'Inversión',
    bathrooms: 4,
    sqft: '950',
    image: edificioImg,
    href: './properties/edificio-centro'
  },
  {
    id: 'desarrollo-costero',
    title: 'Desarrollo Costero',
    location: 'Playa Grande, Mar del Plata',
    type: 'Proyecto',
    sqft: '1200',
    image: heroBgImg,
    href: './properties/desarrollo-costero'
  },
  {
    id: 'casa-lemmi',
    title: 'Casa Lemmi',
    location: 'Barrio Privado, Mar del Plata',
    type: 'En Venta',
    bedrooms: 5,
    bathrooms: 3,
    sqft: '340',
    image: casaLemmiImg,
    href: './properties/casa-lemmi'
  },
  {
    id: 'residencia-moderna',
    title: 'Residencia Moderna',
    location: 'Zona Residencial, Mar del Plata',
    type: 'En Venta',
    bedrooms: 4,
    bathrooms: 2,
    sqft: '285',
    image: casaImg,
    href: './properties/residencia-moderna'
  }
] as const;
// Duplicados temporales para completar 6 (se reemplazarán luego con nuevas fotos)
export const extendedProperties: Property[] = [
  ...featuredProperties,
  {
    id: 'casa-lemmi-2',
    title: 'Casa Lemmi (Proyecto)',
    location: 'Barrio Privado, Mar del Plata',
    type: 'Proyecto',
    bedrooms: 5,
    bathrooms: 3,
    sqft: '340',
    image: casaLemmiImg,
    href: './properties/casa-lemmi-2'
  },
  {
    id: 'edificio-centro-2',
    title: 'Edificio Corporativo Centro II',
    location: 'Centro, Mar del Plata',
    type: 'Inversión',
    bathrooms: 4,
    sqft: '950',
    image: edificioImg,
    href: './properties/edificio-centro-2'
  }
] as const;
  