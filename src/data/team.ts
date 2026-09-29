import DarioLemmiImg from '../assets/images/DarioLemmi.webp';
import GonzaloVelazcoImg from '../assets/images/GonzaloVelazco.webp';
import JuanManuelEscuderoImg from '../assets/images/JuanManuelEscudero.webp';
import MatiasLemmiImg from '../assets/images/MatiasLemmi.webp';
import NicolasLemmiImg from '../assets/images/NicolasLemmi.webp';

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly image: string;
}

export const team: TeamMember[] = [
  { id: 'dario-lemmi', name: 'Darío Lemmi', role: 'Arquitecto', image: DarioLemmiImg },
  { id: 'nicolas-lemmi', name: 'Nicolás Lemmi', role: 'Arquitecto', image: NicolasLemmiImg },
  { id: 'matias-lemmi', name: 'Matías Lemmi', role: 'Ingeniero', image: MatiasLemmiImg },
  { id: 'gonzalo-velazco', name: 'Gonzalo Velazco', role: 'Arquitecto', image: GonzaloVelazcoImg },
  { id: 'juan-manuel-escudero', name: 'Juan Manuel Escudero', role: 'Arquitecto', image: JuanManuelEscuderoImg },
] as const;
