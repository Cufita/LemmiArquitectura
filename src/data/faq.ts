export interface FAQItem {
    readonly id: string;
    readonly question: string;
    readonly answer: string;
  }
  
  export const faqItems: FAQItem[] = [
    {
      id: 'buying-process',
      question: '¿Cuál es el proceso para comprar una propiedad?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 'affordability',
      question: '¿Cómo determino cuánto puedo permitirme gastar?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 'design-process',
      question: '¿Qué documentos se requieren para el proceso de diseño?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.'
    },
    {
      id: 'project-timeline',
      question: '¿Puedo modificar el diseño durante la construcción?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
    },
    {
      id: 'investment-risks',
      question: '¿Cuáles son los riesgos de invertir en arquitectura sustentable?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
    },
    {
      id: 'property-selection',
      question: '¿Cómo elijo el estilo arquitectónico correcto para mi proyecto?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit. Pellentesque habitant morbi tristique senectus.'
    },
    {
      id: 'virtual-tours',
      question: '¿Los proyectos de alta gama incluyen renderizados virtuales?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
    },
    {
      id: 'transfer-timeline',
      question: '¿Cuánto tiempo toma el proceso de construcción completo?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus.'
    }
  ] as const;
  