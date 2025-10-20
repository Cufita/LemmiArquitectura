import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';
import balneariosImg from '../../assets/images/balnearios.png';
import edificioImg from '../../assets/images/edificio.png';
import casaImg from '../../assets/images/Casa.png';

interface ServiceMeta {
  id: number;
  label: string;
  image: string;
  description: string;
}

const services: ServiceMeta[] = [
  {
    id: 1,
    label: 'Balnearios Costeros',
    image: balneariosImg,
    description: 'Disfruta de una experiencia de bienestar inigualable en este balneario, donde el diseño exquisito, las comodidades de primera clase y una ubicación privilegiada se unen para satisfacer los gustos más exigentes.'
  },
  {
    id: 2,
    label: 'Edificios Ecológicos',
    image: edificioImg,
    description: 'Arquitectura sostenible con materiales responsables, eficiencia energética y armonía con el entorno natural.'
  },
  {
    id: 3,
    label: 'Casas Vacacionales',
    image: casaImg,
    description: 'Escapadas exclusivas que combinan diseño contemporáneo, confort premium y localizaciones extraordinarias.'
  }
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<number>(1);
  const [previousId, setPreviousId] = useState<number>(1);
  const activeService = services.find(s => s.id === activeId) || services[0];

  const handleHover = (id: number) => {
    setPreviousId(activeId);
    setActiveId(id);
  };
  return (
    <AnimatedSection>
      <section className="relative flex flex-col w-full overflow-hidden px-4 py-10 md:p-20 gap-20 md:gap-40">
        <motion.div
            className="flex flex-col w-full max-w-[1440px] mx-auto gap-10 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          {/* Versión móvil: Header + Lista de servicios */}
          <div className="flex flex-col gap-8 md:hidden">
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col w-full max-w-[780px] gap-4 px-4">
                <Badge>
                  Que ofrecemos
                </Badge>
                <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px]">Integralidad</h2>
                <p className="font-geist text-base md:text-lg font-light text-zinc-800 leading-6 md:leading-[27px]">
                  Nuestros servicios integrales abarcan ventas de propiedades de lujo, inversiones en construcción verde sostenible y alquileres vacacionales premium.
                </p>
              </div>
            </AnimatedSection>

            {services.map((service) => (
              <div key={service.id} className="flex flex-col gap-4 max-w-[calc(100%-2rem)] mx-auto">
                <div className="relative w-full h-[280px] rounded-[32px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.label}
                    className="w-full h-full object-cover rounded-[32px]"
                  />
                  {/* Toast con información */}
                  <div className="absolute bottom-4 ml-3 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="font-geist text-zinc-800 text-base font-medium uppercase leading-tight">
                          {service.label}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-geist text-zinc-800 text-3xl font-light leading-none">
                          {String(service.id).padStart(2,'0')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Información debajo de la imagen */}
                <div className="flex flex-col gap-4 max-w-[calc(100%-2rem)] mx-auto px-2">
                  <p className="font-geist text-base font-light text-zinc-800 leading-6">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Versión desktop: Header + Carousel */}
          <div className="hidden md:flex flex-col md:flex-row w-full gap-16 md:gap-20">
            <div className="flex flex-col md:pr-12 md:h-[420px]">
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col gap-4 mb-8">
                  <Badge>
                    Que ofrecemos
                  </Badge>
                  <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px]">Integralidad</h2>
                  <p className="font-geist text-base md:text-lg font-light text-zinc-800 leading-6 md:leading-[27px]">
                    Nuestros servicios integrales abarcan ventas de propiedades de lujo, inversiones en construcción verde sostenible y alquileres vacacionales premium.
                  </p>
                </div>
              </AnimatedSection>
              <div className="mt-auto flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/icon-4.svg" 
                      alt={activeService.label + ' icon'} 
                      className="w-12 h-12 object-contain"
                    />
                    <p className="font-geist text-zinc-800 text-[26px] leading-[28.6px] font-semibold">
                      {activeService.label}
                    </p>
                  </div>
                  <p className="font-geist text-base md:text-lg font-light text-zinc-800 leading-6 md:leading-[27px]">
                    {activeService.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full md:w-auto items-stretch relative">
              <div className="relative w-full md:w-[800px] h-[420px] rounded-[32px] overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeService.image}
                    initial={{ 
                      opacity: 1,
                      scale: 1,
                      x: activeId > previousId ? 100 : activeId < previousId ? -100 : 0
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: 0
                    }}
                    exit={{ 
                      opacity: 1,
                      scale: 1,
                      x: activeId > previousId ? -100 : activeId < previousId ? 100 : 0
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeService.image}
                      alt={activeService.label}
                      className="w-full h-full object-cover rounded-[32px]"
                    />
                    
                    {/* Overlay con información en esquina inferior derecha */}
                    <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="font-geist text-zinc-800 text-base font-medium uppercase leading-tight">
                            {activeService.label}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-geist text-zinc-800 text-3xl font-light leading-none">
                            {String(activeService.id).padStart(2,'0')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hidden md:flex absolute left-0 top-0 z-10 flex-row" style={{ transform: `translateX(${-80 * services.filter(s => s.id < activeId).length}px)` }}>
                {services
                  .filter(s => s.id < activeId)
                  .map((s) => (
                    <React.Fragment key={s.id}>
                      <motion.div
                        onMouseEnter={() => handleHover(s.id)}
                        className="flex flex-col h-[420px] items-center justify-end py-4 relative cursor-pointer transition-all duration-700 ease-in-out bg-white/20 backdrop-blur-sm hover:bg-white/30 gap-48"
                        style={{ 
                          width: '80px', 
                          minWidth: '80px'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(255,255,255,0.4)',
                          transition: { duration: 0.4 }
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-stone-400 transition-colors duration-300">
                            <path d="M15 5l-7 7 7 7" />
                          </svg>
                        </div>
                        
                        <p className="font-geist text-2xl font-light text-stone-400 uppercase rotate-[270deg] whitespace-nowrap origin-center transition-all duration-500 ease-in-out">
                          {s.label}
                        </p>
                        
                        <p className="font-geist text-6xl leading-[60px] font-light rotate-[270deg] origin-center text-stone-400 transition-all duration-500 ease-in-out">
                          {String(s.id).padStart(2,'0')}
                        </p>
                      </motion.div>
                      {/* Línea divisoria */}
                      <div className="w-[1px] h-[420px] bg-stone-300/60 mx-0"></div>
                    </React.Fragment>
                  ))
                }
              </div>

              {/* Opciones activa y siguientes a la derecha */}
              <div className="hidden md:flex flex-row">
                {services
                  .filter(s => s.id > activeId)
                  .map((s, index, array) => (
                    <React.Fragment key={s.id}>
                      <motion.div
                        onMouseEnter={() => handleHover(s.id)}
                        className="flex flex-col h-[420px] items-center justify-end py-4 relative cursor-pointer transition-all duration-700 ease-in-out gap-48 hover:bg-white/20"
                        style={{ width: '80px', minWidth: '80px' }}
                        layout
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(255,255,255,0.25)',
                          transition: { duration: 0.4 }
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-stone-400 transition-colors duration-300">
                            <path d="M15 5l-7 7 7 7" />
                          </svg>
                        </div>
                        
                        <p className="font-geist font-light uppercase rotate-[270deg] whitespace-nowrap origin-center transition-all duration-500 ease-in-out text-xl leading-[24px] font-medium text-stone-400">
                          {s.label}
                        </p>
                        
                        <p className="font-geist font-light origin-center transition-all duration-500 ease-in-out rotate-[270deg] text-6xl leading-[60px] text-stone-400">
                          {String(s.id).padStart(2,'0')}
                        </p>
                      </motion.div>
                      {index < array.length - 1 && (
                        <div className="w-[1px] h-[420px] bg-stone-300/60 mx-0"></div>
                      )}
                    </React.Fragment>
                  ))
                }
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </AnimatedSection>
  );
}
