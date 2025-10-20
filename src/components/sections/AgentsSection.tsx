import { agents } from '../../data/agents';
import AnimatedSection from '../ui/AnimatedSection';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

export default function AgentsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % agents.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  return (
    <AnimatedSection>
      <section className="flex flex-col w-full px-4 py-10 md:p-20 gap-20 md:gap-40">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-10 md:gap-12">
          {/* Header */}
          <div className="flex flex-col w-full max-w-[580px] gap-4 mx-auto text-center">
            <Badge className="mx-auto">
              Conoce a Nuestros Expertos
            </Badge>
            <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px]">
              Orientación Personalizada, Experiencia Comprobada
            </h2>
          </div>

          {/* Mobile Carousel */}
          <div className="relative w-full md:hidden">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center hover:bg-white transition-all duration-300 group"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="stroke-zinc-600 group-hover:stroke-zinc-800 transition-colors duration-300"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center hover:bg-white transition-all duration-300 group"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="stroke-zinc-600 group-hover:stroke-zinc-800 transition-colors duration-300"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden w-full">
              <motion.div 
                className="flex"
                animate={{ 
                  x: `${-currentIndex * (100 / agents.length)}%`
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                  duration: 0.6
                }}
                style={{ width: `${agents.length * 100}%` }}
              >
                {agents.map((agent) => (
                  <div 
                    key={agent.id} 
                    className="flex flex-col items-center px-4 w-full flex-shrink-0"
                    style={{ width: `${100 / agents.length}%` }}
                  >
                    <div className="w-full max-w-[320px]">
                      <div className="relative h-[400px] w-full rounded-[32px] overflow-hidden">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="h-full w-full object-cover rounded-[32px]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center text-center">
                      <p className="text-zinc-800 text-lg font-semibold font-geist leading-[23.4px]">
                        {agent.name}
                      </p>
                      <p className="text-zinc-500 text-sm font-light font-geist leading-[20.8px]">
                        {agent.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {agents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-zinc-800 w-6' 
                      : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex flex-row gap-6 justify-center items-start w-full max-w-[1440px] mx-auto px-8">
            {agents.map((agent) => (
              <div key={agent.id} className="flex flex-col items-center">
                <div className="w-full max-w-[320px]">
                  <div className="relative h-[400px] w-[320px] rounded-[32px] overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="h-full w-full object-cover rounded-[32px]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-center text-center">
                  <p className="text-zinc-800 text-lg font-semibold font-geist leading-[23.4px]">
                    {agent.name}
                  </p>
                  <p className="text-zinc-500 text-base font-light font-geist leading-[20.8px]">
                    {agent.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
