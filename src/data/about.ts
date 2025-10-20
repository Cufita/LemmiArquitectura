export interface AboutStat {
    readonly id: string;
    readonly prefix: string;
    readonly value: string;
    readonly suffix: string;
    readonly label: string;
  }
  
  export const aboutStats: AboutStat[] = [
    { id: 'projects', prefix: '', value: '200', suffix: '+', label: 'Proyectos Completados' },
    { id: 'clients', prefix: '', value: '70', suffix: '+', label: 'Clientes Satisfechos' },
    { id: 'value', prefix: '$', value: '10M', suffix: '+', label: 'Valor de Proyectos' },
    { id: 'retention', prefix: '', value: '90', suffix: '%', label: 'Tasa de Retención de Clientes' }
  ] as const;