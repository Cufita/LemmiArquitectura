export interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

/**
 * The objections someone actually has before hiring a technical survey.
 * Written from the two flyers; adjust the timings and scope to match what the
 * studio really commits to before publishing.
 */
export const faqItems: FAQItem[] = [
  {
    id: 'que-es',
    question: '¿Qué es el informe técnico y qué incluye?',
    answer:
      'Es un relevamiento profesional del estado real de una propiedad, hecho por arquitectos en el lugar. Incluye revisión técnica, diagnóstico constructivo, identificación de vicios ocultos, análisis del potencial del inmueble y una estimación del costo de remodelación. Lo recibís por escrito, con fotos y con el detalle de cada hallazgo.',
  },
  {
    id: 'cuanto-tarda',
    question: '¿Cuánto tarda?',
    answer:
      'La visita a la propiedad se coordina dentro de la semana y lleva entre una y tres horas según el tamaño. El informe escrito se entrega en los días siguientes. Si estás con una oferta en curso y necesitás una respuesta urgente, avisanos al contactarnos y lo priorizamos.',
  },
  {
    id: 'vicios-ocultos',
    question: '¿Qué son los vicios ocultos y por qué me afectan?',
    answer:
      'Son defectos que no se ven en una visita común: grietas estructurales tapadas por revoque, humedad en cimientos, cañerías perdiendo dentro de la pared, instalación eléctrica obsoleta. Aparecen después de la escritura, cuando ya son tu problema y tu costo. Detectarlos antes cambia el precio que estás dispuesto a pagar.',
  },
  {
    id: 'ya-tengo-escritura',
    question: 'Ya compré la propiedad. ¿Todavía me sirve?',
    answer:
      'Sí. El informe ordena en qué gastar y en qué orden, y evita que rehagas algo que después haya que romper. Es el punto de partida del servicio llave en mano: primero sabemos qué hay, después definimos la obra y el presupuesto.',
  },
  {
    id: 'planos-municipales',
    question: '¿Pueden regularizar obras no declaradas?',
    answer:
      'Sí. Preparamos y presentamos los planos municipales para regularizar ampliaciones o modificaciones que nunca se declararon. Es uno de los motivos más frecuentes por los que una operación se cae sobre la fecha de escritura, y se resuelve mucho mejor antes de publicar la propiedad que durante la negociación.',
  },
  {
    id: 'problemas-graves',
    question: '¿Qué pasa si el informe encuentra problemas graves?',
    answer:
      'Te lo decimos con el costo estimado de resolverlo. A veces la conclusión es no comprar; a veces es comprar por menos. Separamos el patrimonio sólido del deterioro superficial: mucho de lo que asusta a primera vista es barato de arreglar, y algo de lo que parece menor no lo es.',
  },
  {
    id: 'presupuesto-fijo',
    question: '¿Cómo funciona el presupuesto fijo del llave en mano?',
    answer:
      'Diseño, mano de obra, materiales y dirección van en un solo paquete con un número cerrado desde el principio. Es posible porque partimos del informe técnico: ya sabemos qué hay detrás de las paredes antes de cotizar, así que no hay sorpresas que trasladarte a mitad de obra.',
  },
  {
    id: 'que-hace-un-estudio',
    question: '¿Qué hace un estudio de arquitectura al comprar o vender?',
    answer:
      'Revisa el estado real de la propiedad, regulariza los planos que hagan falta y te dice cuánto costaría arreglar lo que encuentra, para que compres o vendas con datos y no con suposiciones. En LEMMI lo hacemos con arquitectos e ingenieros matriculados, en Mar del Plata.',
  },
  {
    id: 'servicios',
    question: '¿Qué servicios ofrece LEMMI arquitectura en Mar del Plata?',
    answer:
      'Tres: para vender, informe técnico firmado y planos al día; para comprar, diagnóstico constructivo y costo real de arreglar la propiedad; y para construir, proyecto, dirección, mano de obra y materiales con un presupuesto fijo.',
  },
  {
    id: 'zona',
    question: '¿Trabajan fuera de Mar del Plata?',
    answer:
      'Nuestra base es Mar del Plata y trabajamos en la ciudad y la zona. Para propiedades más lejanas consultanos: según la distancia y el tipo de trabajo lo coordinamos igual.',
  },
] as const;
