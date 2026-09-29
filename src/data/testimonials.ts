export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly content: string;
}

/**
 * ⚠️ PLACEHOLDER COPY — reemplazar antes de publicar.
 *
 * Estas voces son ficticias. Están escritas sobre el beneficio real del
 * servicio para que la sección se pueda maquetar y revisar, pero ninguna
 * corresponde a un cliente real y NINGUNA se atribuye al Automóvil Club
 * Argentino, la UNMdP ni Punta Iglesia — esas instituciones aparecen sólo en
 * el muro de logos, que sí es factual.
 *
 * Al reemplazar: pedí autorización al cliente para usar su nombre.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1', // TODO: reemplazar por testimonio real
    name: 'Mariana Gómez',
    role: 'Compró en Playa Grande',
    content:
      'El informe encontró humedad en los cimientos. Negocié con el costo de la reparación en mano y bajé el precio.',
  },
  {
    id: 'placeholder-2', // TODO: reemplazar por testimonio real
    name: 'Diego Ferrari',
    role: 'Vendió un PH en el centro',
    content:
      'Tenía una ampliación sin declarar y no lo sabía. La regularizaron antes de publicar y la venta salió sin discusiones.',
  },
  {
    id: 'placeholder-3', // TODO: reemplazar por testimonio real
    name: 'Laura Bentivegna',
    role: 'Refacción integral',
    content:
      'Pensábamos tirar todo abajo. Nos mostraron que la estructura estaba sana y hicimos la mitad de la obra.',
  },
  {
    id: 'placeholder-4', // TODO: reemplazar por testimonio real
    name: 'Sebastián Aguirre',
    role: 'Compró para inversión',
    content:
      'En una de las dos finalistas encontraron una grieta estructural tapada. Esa visita me ahorró el problema.',
  },
  {
    id: 'placeholder-5', // TODO: reemplazar por testimonio real
    name: 'Carolina Ruiz Díaz',
    role: 'Llave en mano',
    content:
      'El presupuesto fue el mismo de principio a fin. Entregaron en fecha.',
  },
  {
    id: 'placeholder-6', // TODO: reemplazar por testimonio real
    name: 'Martín Elizalde',
    role: 'Vendió una casa familiar',
    content:
      'Con el estado de la casa documentado, dejaron de buscar defectos para bajar el precio.',
  },
] as const;
