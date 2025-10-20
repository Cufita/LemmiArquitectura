import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';
import Badge from '../ui/Badge';
import TypewriterText from '../ui/TypewriterText';

export default function TestimonialsSection() {
  return (
    <AnimatedSection>
      <section className="w-full px-4 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 px-2 md:px-4">
          {/* Intro left */}
          <div className="w-full md:w-[340px] lg:w-[360px] space-y-6 md:sticky md:top-32 self-start">
            <Badge>
              Lo Que Dicen Nuestros Clientes
            </Badge>
            <h2 className="text-zinc-800 font-semibold uppercase text-2xl md:text-4xl leading-tight font-geist">
              <span>Confiados por muchos, valorados por todos</span>
            </h2>
            <p className="text-zinc-700 font-light text-base md:text-lg leading-relaxed font-geist">
              Las historias de éxito de nuestros clientes reflejan nuestro compromiso con la excelencia. Descubre cómo les ayudamos a encontrar hogares ideales, inversiones sostenibles y escapadas perfectas.
            </p>
          </div>
          
          {/* Testimonials grid */}
          <motion.div
            className="flex flex-wrap gap-6 md:ml-auto md:w-[1004px] md:flex-shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {testimonials.map((t, i) => (
              <AnimatedCard key={t.id} delay={i * 0.1} className="w-full md:w-[490px] md:h-[240px]">
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.10)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex flex-col bg-white rounded-3xl border border-zinc-300 p-5 md:p-6 h-full overflow-hidden"
                >
                  <div className="flex-1 overflow-hidden">
                    <TypewriterText 
                      text={t.content}
                      delay={i * 500}
                      speed={30}
                      className="text-zinc-800 font-light leading-relaxed font-geist text-sm md:text-[15px]"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-4 shrink-0">
                    <img src={t.avatar} alt={`Foto de ${t.name}`} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-800 font-geist">{t.name}</span>
                      <span className="text-xs font-light text-zinc-500 font-geist md:text-[13px]">{t.role}</span>
                    </div>
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