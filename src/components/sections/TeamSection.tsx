import { motion } from 'motion/react';
import { team } from '../../data/team';
import { transition, staggerDelay } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import Badge from '../ui/Badge';

export default function TeamSection() {
  const reduced = useReducedMotion();

  return (
    <section id="equipo" className="section-shell bg-zinc-50">
      <div className="section-inner gap-12">
        <header className="flex max-w-[720px] flex-col gap-5">
          <Badge>Equipo</Badge>
          <h2 className="heading-lg text-zinc-900">
            Los que van a la propiedad son los que firman el informe
          </h2>
          <p className="text-lead text-zinc-600">
            Arquitectos e ingenieros matriculados. El que recorre la casa es el que te explica qué
            encontró.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((member, index) => (
            <motion.li
              key={member.id}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...transition.layout, delay: reduced ? 0 : staggerDelay(index) }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[0.9375rem] font-medium leading-snug text-zinc-900">
                  {member.name}
                </p>
                <p className="text-caption text-zinc-500">{member.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
