export interface Testimonial {
    readonly id: string;
    readonly name: string;
    readonly role: string;
    readonly content: string;
    readonly avatar: string;
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 'nathan-harper',
      name: 'Nathan Harper',
        role: 'Desarrollador de Software',
        content: 'Comprar mi casa de veraneo fue sorprendentemente fácil. Sophia realmente sabía lo que hacía e hizo que todo el proceso fuera muy fluido. No tuve que preocuparme por nada.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/E5AsaejLQHxiJ8J4v37OOQX1o.jpg"
    },
    {
      id: 'logan-price',
      name: 'Logan Price',
        role: 'Consultor Ambiental',
        content: 'Emily me acompañó en cada paso de mi inversión en una vivienda sostenible. Explicó todo con claridad, dio excelentes consejos y sinceramente hizo que todo se sintiera posible.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/aIxx1WpEvRciZyt4ZtxxEyc.jpg"
    },
    {
      id: 'aria-sullivan',
      name: 'Aria Sullivan',
        role: 'Nómada Digital',
        content: 'Isabella fue increíble: muy amable y súper detallista. Encontré el alquiler perfecto sin el estrés de siempre. De hecho se sintió divertido.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/70vyypRi1KNFqhUIRRXm76uj98.jpg"
    },
    {
      id: 'grace-powell',
      name: 'Grace Powell',
        role: 'Consultora Financiera',
        content: 'No tenía idea por dónde empezar con la inversión inmobiliaria, pero Emily hizo que todo tuviera sentido. Fue paciente, clara y estuvo completamente de mi lado todo el tiempo.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/xOeiV3jc57a69GjC0fZf3MEo6c4.jpg"
    },
    {
      id: 'scarlett-mitchell',
      name: 'Scarlett Mitchell',
        role: 'Organizadora de Eventos',
        content: 'Pensé que el proceso de alquiler sería un problema, pero Olivia lo hizo simple. Es inteligente, atenta y me dio mucha confianza.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/n14MFK4DU5H0hb4MTYmtuAZqbE.jpg"
    },
    {
      id: 'samuel-brooks',
      name: 'Samuel Brooks',
        role: 'Diseñador de Interiores',
        content: 'Charlotte entendió totalmente lo que buscaba. Su sensibilidad estética y su guía me ayudaron a encontrar un hogar que encaja perfecto conmigo. Me encantó trabajar con ella.',
      avatar: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/nLFFMJtHilTRgtclZRKdSmfdAsg.jpg"
    }
  ] as const;
  