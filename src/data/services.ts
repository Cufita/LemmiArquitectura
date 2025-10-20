export interface ExpertService {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly image: string;
  }
  
  export const expertServices: ExpertService[] = [
    {
      id: 'property-sales',
      title: 'Venta de Propiedades',
      description: 'Promocionamos y vendemos expertamente su propiedad para atraer compradores calificados.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/60I8oVND3PJCd7FcOGJQZhfM2OA.svg"
    },
    {
      id: 'buyer-representation',
      title: 'Representación de Compradores',
      description: 'Lo guiamos a través del proceso de compra de vivienda, priorizando sus intereses.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/TNP7UPmDw89ewsYev4uptdsgx4.svg"
    },
    {
      id: 'rental-management',
      title: 'Gestión de Alquileres',
      description: 'Gestionamos las relaciones con inquilinos, mantenimiento y finanzas para maximizar los retornos de alquiler.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/lVu6LE1fsM53Oq8fhxNXIYQKfp0.svg"
    },
    {
      id: 'investment-consulting',
      title: 'Consultoría de Inversiones',
      description: 'Brindamos asesoramiento estratégico para ayudarlo a capitalizar las oportunidades inmobiliarias.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/sirS60WTqxz8oFTqaiiNLbQgRR8.svg"
    },
    {
      id: 'property-valuation',
      title: 'Valuación de Propiedades',
      description: 'Evaluamos con precisión el valor de su propiedad para ventas, compras o inversiones.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/Zp6zyYVhddlJVxncB280LQIpQ4.svg"
    },
    {
      id: 'tailored-solutions',
      title: 'Soluciones Personalizadas',
      description: 'Ofrecemos servicios inmobiliarios personalizados alineados con sus objetivos específicos.',
      image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/qoTuGOt5NMoM4uRLc1E4bofrE.svg"
    }
  ] as const;