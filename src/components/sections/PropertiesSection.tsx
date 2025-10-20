import React from 'react';
import { motion } from 'framer-motion';
import { extendedProperties } from '../../data/properties';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';
import Badge from '../ui/Badge';

export default function PropertiesSection() {
  return (
    <AnimatedSection>
      <section className="flex flex-col w-full px-4 py-10 md:p-20 gap-20 md:gap-40">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-10 md:gap-12">
          {/* Header */}
          <div className="flex flex-col w-full max-w-[780px] gap-4">
            <Badge>
              Propiedades Destacadas
            </Badge>
            <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px]">
              Descubrí hogares a tu estilo de vida y necesidades
            </h2>
          </div>
          
          {/* Properties Grid */}
          <motion.div 
            className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-10 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {extendedProperties.map((property, index) => (
              <AnimatedCard 
                key={property.id} 
                delay={index * 0.1}
              >
                <motion.a 
                  href={property.href} 
                  className="flex flex-col gap-4 w-full group"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image */}
                  <div className="w-full h-[300px] md:h-[350px] rounded-2xl md:rounded-[32px] overflow-hidden" style={{ maxWidth: '500px' }}>
                    <motion.img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover" 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: [0.16,0.8,0.24,1] }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 md:gap-4">
                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/icon-7.svg" 
                        alt="Location" 
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                      <p className="font-geist text-zinc-800 text-sm md:text-base font-light leading-4 md:leading-6">
                        {property.location}
                      </p>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-geist text-zinc-800 text-lg md:text-[26px] font-semibold leading-tight md:leading-[28.6px]">
                      {property.title}
                    </h3>
                    
                    {/* Property Features */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {property.bedrooms && (
                        <div className="flex items-center gap-2">
                          <img 
                            src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/icon-8.svg" 
                            alt="Bedrooms" 
                            className="w-4 h-4 md:w-5 md:h-5"
                          />
                          <p className="font-geist text-zinc-800 text-sm md:text-base font-light">
                            {property.bedrooms}
                          </p>
                        </div>
                      )}
                      
                      {property.bathrooms && (
                        <div className="flex items-center gap-2">
                          <img 
                            src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/icon-9.svg" 
                            alt="Bathrooms" 
                            className="w-4 h-4 md:w-5 md:h-5"
                          />
                          <p className="font-geist text-zinc-800 text-sm md:text-base font-light">
                            {property.bathrooms}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <img 
                          src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/icon-10.svg" 
                          alt="Size" 
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <p className="font-geist text-zinc-800 text-sm md:text-base font-light">
                          {property.sqft} m²
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}
