import { motion } from 'motion/react';
import { testimonials } from '../../data/testimonials';
import { clients } from '../../data/clients';
import { transition, staggerDelay } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import TestimonialCarousel from '../ui/TestimonialCarousel';
import Badge from '../ui/Badge';

export default function TestimonialsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="testimonios" className="bg-white">
      {/* Trust strip. The logos were supplied with a yellow, a navy and a cyan
          background each, so they are single-colour silhouettes here: one ink,
          one height, one rhythm. Colour is not the proof; the names are. */}
      <div className="section-shell !pb-0">
        <div className="section-inner items-center gap-8">
          <Badge>Confían en nosotros</Badge>

          <ul className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 md:grid-cols-4">
            {clients.map((client, index) => {
              const Tag = client.href ? 'a' : 'div';
              return (
                <motion.li
                  key={client.id}
                  className="bg-white"
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ ...transition.layout, delay: reduced ? 0 : staggerDelay(index, 0.08) }}
                >
                  <Tag
                    {...(client.href
                      ? { href: client.href, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group flex h-28 items-center justify-center px-6 transition-colors duration-300 hover:bg-zinc-50 md:h-36"
                    title={client.name}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-9 w-auto max-w-[130px] object-contain opacity-40 transition-opacity duration-300 group-hover:opacity-100 md:max-h-11"
                      loading="lazy"
                      decoding="async"
                    />
                  </Tag>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="section-shell">
        <div className="section-inner">
          <TestimonialCarousel items={testimonials} />
        </div>
      </div>
    </section>
  );
}
