import React from 'react';
import { motion } from 'framer-motion';
import { expertServices } from '../../data/services';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';
import Badge from '../ui/Badge';

export default function ExpertServicesSection() {
  return (
    <AnimatedSection>
      <section className="flex flex-col w-full px-4 py-10 md:p-20 gap-20 md:gap-40">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-10 md:gap-12">
          {/* Header */}
          <div className="flex flex-col w-full max-w-[580px] gap-4 mx-auto">
            <Badge className="mx-auto md:mx-0">
              Por Qué Elegirnos
            </Badge>
            <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px] text-center">
              Explora nuestra gama de servicios inmobiliarios expertos
            </h2>
          </div>
          
          {/* Services Grid */}
          <motion.div 
            className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {expertServices.map((service, index) => (
              <AnimatedCard 
                key={service.id} 
                delay={index * 0.1}
              >
                <motion.div 
                  className="flex flex-row items-center gap-4 p-6 bg-zinc-100 rounded-[24px] h-full md:flex-col md:items-center md:gap-8 md:p-8 md:rounded-[32px]"
                  whileHover={{ 
                    backgroundColor: "rgba(244, 244, 245, 1)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="flex items-center justify-center w-[48px] h-[48px] bg-white rounded-full p-3 flex-shrink-0 md:w-[60px] md:h-[60px] md:p-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-2 text-left md:gap-4 md:text-center">
                    <h3 className="font-geist text-zinc-800 text-base md:text-[26px] font-semibold leading-tight md:leading-[28.6px]">
                      {service.title}
                    </h3>
                    <p className="font-geist text-zinc-800 text-sm md:text-lg font-light leading-5 md:leading-[27px]">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}
