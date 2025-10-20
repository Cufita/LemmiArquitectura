export interface HeroStat {
    readonly id: string;
    readonly prefix: string;
    readonly value: string;
    readonly suffix: string;
    readonly label: string;
  }
  
  export interface FeaturedAgent {
    readonly id: string;
    readonly image: string;
  }
  
  export const heroStats: HeroStat[] = [
    { id: 'projects', prefix: '', value: '200', suffix: '+', label: 'Proyectos Completados' },
    { id: 'clients', prefix: '', value: '70', suffix: '+', label: 'Clientes Satisfechos' },
    { id: 'value', prefix: '$', value: '10M', suffix: '+', label: 'Valor de Proyectos' }
  ] as const;
  
  export const featuredAgents: FeaturedAgent[] = [
    { id: 'agent1', image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/21.avif" },
    { id: 'agent2', image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/K3lTUnsHMJPPzmVtq4wer4cvpIE.jpg" },
    { id: 'agent3', image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/70dKU6vekIZYs1utSl8EZ1DGPA.jpg" },
    { id: 'agent4', image: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/5j9m2jqbiSJDp56NHoSIQkB2YaU.jpg" }
  ] as const;
  