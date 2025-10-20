export interface FormField {
    readonly name: string;
    readonly label: string;
    readonly type: string;
    readonly placeholder: string;
    readonly required: boolean;
    readonly validation?: {
      pattern?: string;
      minLength?: number;
      maxLength?: number;
    };
  }
  
  export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }
  
  export const contactFormFields: FormField[] = [
    { 
      name: 'firstName', 
      label: 'Nombre', 
      type: 'text', 
      placeholder: 'Nombre', 
      required: true,
      validation: { minLength: 2, maxLength: 50 }
    },
    { 
      name: 'lastName', 
      label: 'Apellido', 
      type: 'text', 
      placeholder: 'Apellido', 
      required: true,
      validation: { minLength: 2, maxLength: 50 }
    },
    { 
      name: 'email', 
      label: 'Correo Electrónico', 
      type: 'email', 
      placeholder: 'Correo Electrónico', 
      required: true,
      validation: { pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
    },
    { 
      name: 'phone', 
      label: 'Teléfono', 
      type: 'tel', 
      placeholder: 'Teléfono', 
      required: false,
      validation: { pattern: '^[\\+]?[1-9][\\d]{0,15}$' }
    },
    { 
      name: 'message', 
      label: 'Mensaje', 
      type: 'textarea', 
      placeholder: '¿En qué podemos ayudarte?', 
      required: true,
      validation: { minLength: 10, maxLength: 500 }
    }
  ] as const;
  
  export const initialFormData: ContactFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  