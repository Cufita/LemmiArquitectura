import DarioLemmiImg from '../assets/images/DarioLemmi.png';
import GonzaloVelazcoImg from '../assets/images/GonzaloVelazco.png';
import JuanManuelEscuderoImg from '../assets/images/JuanManuelEscudero.png';
import MatiasLemmiImg from '../assets/images/MatiasLemmi.png';
import NicolasLemmiImg from '../assets/images/NicolasLemmi.png';

export interface Agent {
  readonly id: string;
  readonly name: string;
  readonly specialty: string;
  readonly image: string;
}

// Usamos algunas imágenes institucionales/personales para completar carrusel.
export const agents: Agent[] = [
  {
    id: 'dario-lemmi',
    name: 'Darío Lemmi',
    specialty: 'Arquitecto',
    image: DarioLemmiImg
  },
  {
    id: 'gonzalo-velazco',
    name: 'Gonzalo Velazco',
    specialty: 'Arquitecto',
    image: GonzaloVelazcoImg
  },
  {
    id: 'juan-manuel-escudero',
    name: 'Juan Manuel Escudero',
    specialty: 'Arquitecto',
    image: JuanManuelEscuderoImg
  },
  {
    id: 'matias-lemmi',
    name: 'Matías Lemmi',
    specialty: 'Ingeniero',
    image: MatiasLemmiImg
  },
  {
    id: 'nicolas-lemmi',
    name: 'Nicolás Lemmi',
    specialty: 'Arquitecto',
    image: NicolasLemmiImg
  }
] as const;