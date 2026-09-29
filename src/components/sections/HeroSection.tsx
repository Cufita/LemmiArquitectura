import { motion } from 'motion/react';
import { whatsappMessages } from '../../data/brand';
import { transition } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import WhatsAppCTA from '../ui/WhatsAppCTA';
import heroImg from '../../assets/hero/hero.webp';

/**
 * Full-bleed photograph of a real work, the promise over it, one primary action
 * and a way to browse.
 */
export default function HeroSection() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...transition.focal, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-zinc-950 pt-[72px] md:pt-[80px]">
      <img
        src={heroImg}
        alt="Maqueta arquitectónica de una construcción frente a la playa, LEMMI arquitectura, Mar del Plata"
        className="absolute inset-0 h-full w-full object-cover object-[65%_50%]"
        fetchpriority="high"
        decoding="async"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-950/40 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/20 md:bg-zinc-950/15 md:via-zinc-950/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950/85 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-16 md:px-10 md:py-20 lg:px-20">
        <div className="flex max-w-[52rem] flex-col gap-6 md:gap-7">
          <motion.h1
            className="display text-balance text-white lg:text-7xl"
            {...rise(0)}
          >
            Te acompañamos a vender, comprar o construir en Mar del Plata
          </motion.h1>

          <motion.p className="text-lead text-white/95" {...rise(0.1)}>
            Somos LEMMI arquitectura, estudio de arquitectura en Mar del Plata. Revisamos tu propiedad, ordenamos los planos y construimos a precio cerrado.
          </motion.p>

          <motion.div className="flex flex-col gap-3 pt-2 sm:flex-row" {...rise(0.18)}>
            <WhatsAppCTA message={whatsappMessages.general} variant="light" className="w-full px-8 py-4 sm:w-auto">
              Coordinar visita sin cargo
            </WhatsAppCTA>
            <a
              href="#obras"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/60 px-8 py-4 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-white hover:text-zinc-900 sm:w-auto"
            >
              Ver obras
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
