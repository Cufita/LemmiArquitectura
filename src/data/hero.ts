export interface HeroStat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

/**
 * ⚠️ Verificar antes de publicar.
 *
 * Las cifras del template anterior (200+ proyectos, 70+ clientes, $10M+) no son
 * verificables y son exactamente el dato que un cliente chequea. Estas son
 * afirmaciones defendibles; ajustalas a los números reales del estudio.
 */
export const heroStats: HeroStat[] = [
  { id: 'ciudad', value: 'Mar del Plata', label: 'Estudio con base en la ciudad' },
  { id: 'equipo', value: 'Arquitectos e ingenieros', label: 'Matriculados, en la propiedad' },
  { id: 'presupuesto', value: 'Presupuesto fijo', label: 'Cerrado antes de empezar la obra' },
] as const;
