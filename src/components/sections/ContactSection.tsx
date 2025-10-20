import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactFormFields, initialFormData, ContactFormData } from '../../data/forms';
import AnimatedSection from '../ui/AnimatedSection';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateField = (name: string, value: string): string | null => {
    const field = contactFormFields.find(f => f.name === name);
    if (!field) return null;

    if (field.required && !value.trim()) {
      return `${field.placeholder} es requerido`;
    }

    if (field.validation) {
      const { pattern, minLength, maxLength } = field.validation;
      
      if (pattern && value && !new RegExp(pattern).test(value)) {
        return `Por favor ingrese un ${field.placeholder.toLowerCase()} válido`;
      }
      
      if (minLength && value.length < minLength) {
        return `${field.placeholder} debe tener al menos ${minLength} caracteres`;
      }
      
      if (maxLength && value.length > maxLength) {
        return `${field.placeholder} no debe tener más de ${maxLength} caracteres`;
      }
    }

    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<ContactFormData> = {};
    let hasErrors = false;

    contactFormFields.forEach(field => {
      const error = validateField(field.name, formData[field.name as keyof ContactFormData]);
      if (error) {
        newErrors[field.name as keyof ContactFormData] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData(initialFormData);
    }
  };

  return (
    <AnimatedSection>
      <section className="relative flex flex-col items-center justify-start w-full overflow-hidden py-10 md:py-20" style={{ backgroundImage: 'url(https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/MNaTdWhKQ4PCxwtMgQRe9ROUJo.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative flex flex-col items-center justify-start max-w-[1440px] gap-y-10 w-full z-[2] px-4 md:gap-y-12 md:px-0">
          <div className="flex flex-col items-center justify-start max-w-[780px] gap-y-4 w-full">
            <div className="bg-zinc-100 flex items-center justify-center px-6 py-1 rounded-[32px] border border-stone-300">
              <p className="text-body text-zinc-800 text-nowrap">Contáctanos</p>
            </div>
            <div className="w-full">
              <h2 className="section-title text-white text-center uppercase">
                Hagamos Tu Viaje Inmobiliario Sin Esfuerzo
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 max-w-[780px] w-full">
            <div className="w-full">
              <p className="text-body text-white text-center md:text-lg">¿Tienes preguntas o estás listo para dar el siguiente paso? Ya sea que busques comprar, alquilar o invertir, nuestro equipo está aquí para guiarte en cada paso del camino. Convirtamos tus objetivos inmobiliarios en realidad.</p>
            </div>
          </div>
          
          <motion.form 
            className="backdrop-blur-[5px] bg-white flex flex-col gap-4 w-full p-6 rounded-[32px] md:gap-8 md:w-[800px] md:p-8 border border-stone-300" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col gap-4 w-full md:flex-row md:gap-10">
              <label className="flex flex-col gap-2.5 w-full md:basis-0 md:grow">
                <div className="w-full border-b border-stone-300">
                  <motion.input 
                    type="text" 
                    name="firstName" 
                    placeholder="Nombre" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="text-body text-zinc-800 bg-transparent w-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.firstName && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.firstName}
                    </span>
                  )}
                </div>
              </label>
              
              <label className="flex flex-col gap-2.5 w-full md:basis-0 md:grow">
                <div className="w-full border-b border-stone-300">
                  <motion.input 
                    type="text" 
                    name="lastName" 
                    placeholder="Apellido" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="text-body text-zinc-800 bg-transparent w-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.lastName && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </label>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:flex-row md:gap-10">
              <label className="flex flex-col gap-2.5 w-full md:basis-0 md:grow">
                <div className="w-full h-10 border-b border-stone-300">
                  <motion.input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-body text-zinc-800 bg-transparent h-full w-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.email && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </label>
              
              <label className="flex flex-col gap-2.5 w-full md:basis-0 md:grow">
                <div className="w-full h-10 border-b border-stone-300">
                  <motion.input 
                    type="tel" 
                    name="phone" 
                    placeholder="Teléfono" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-body text-zinc-800 bg-transparent h-full w-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.phone && (
                    <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </label>
            </div>
            
            <label className="flex flex-col gap-2.5 w-full">
              <div className="w-full min-h-[100px] border-b border-stone-300">
                <motion.textarea 
                  name="message" 
                  placeholder="¿En qué podemos ayudarte?" 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="text-body text-zinc-800 bg-transparent min-h-[100px] resize-y w-full p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
                {errors.message && (
                  <span style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>
            </label>
            
            <div className="flex justify-center w-full">
              <motion.button 
                type="submit" 
                className="bg-black flex items-center justify-center w-full px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-lg text-white">Reservar una Llamada</p>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </AnimatedSection>
  );
}
