import { motion } from 'motion/react';
import { serviceLines, type ServiceLine } from '../../data/services';
import { transition, staggerDelay } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { whatsappMessages } from '../../data/brand';
import WhatsAppCTA from '../ui/WhatsAppCTA';
import Badge from '../ui/Badge';

/** Line illustrations that say what each path is, instead of a photo of some
 *  other building. Same stroke and grid so the three read as a set. */
function PathIcon({ name }: { name: ServiceLine['icon'] }) {
  const common = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'h-10 w-10',
  };
  if (name === 'informe') {
    // Signed report with a check.
    return (
      <svg {...common}>
        <path d="M18 8h20l10 10v38H18z" />
        <path d="M38 8v10h10" />
        <path d="M25 30h16M25 37h12" />
        <path d="M26 47l4 4 9-9" />
      </svg>
    );
  }
  if (name === 'inspeccion') {
    // House under a magnifier.
    return (
      <svg {...common}>
        <path d="M8 32 28 14l20 18" />
        <path d="M14 30v22h28" />
        <circle cx="42" cy="42" r="9" />
        <path d="m49 49 8 8" />
      </svg>
    );
  }
  // Plan and set square.
  return (
    <svg {...common}>
      <rect x="8" y="12" width="48" height="40" rx="2" />
      <path d="M8 24h48M24 24v28" />
      <path d="M34 34h14v10H34z" />
    </svg>
  );
}

/**
 * Three situations in one hairline grid. The cell you hover turns to ink,
 * which is the only interaction: the section's job is recognition ("that's
 * me"), not another button.
 */
export default function PathsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="servicios" className="section-shell bg-white">
      <div className="section-inner gap-8 md:gap-10">
        <header className="flex flex-col gap-5">
          <Badge>Servicios</Badge>
          <h2 className="display max-w-[16ch] text-zinc-900">¿En qué momento estás?</h2>
        </header>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 md:grid-cols-3">
          {serviceLines.map((service, index) => (
            <motion.li
              key={service.id}
              className="group flex flex-col gap-6 bg-white p-6 transition-colors duration-500 ease-arrive hover:bg-zinc-950 md:p-8"
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...transition.layout, delay: reduced ? 0 : staggerDelay(index, 0.08) }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="text-zinc-900 transition-colors duration-500 group-hover:text-white">
                    <PathIcon name={service.icon} />
                  </div>
                  <h3 className="text-2xl font-light leading-none tracking-[-0.035em] text-zinc-900 transition-colors duration-500 group-hover:text-white md:text-3xl">
                    {service.label}
                  </h3>
                  <p className="text-[0.9375rem] font-light leading-snug text-zinc-500 transition-colors duration-500 group-hover:text-white/65">
                    {service.hook}
                  </p>
                </div>

                <ul className="flex flex-col">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="border-t border-zinc-200 py-2.5 text-[0.9375rem] text-zinc-800 transition-colors duration-500 group-hover:border-white/15 group-hover:text-white/90"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Whatever the case, the next step is the same: talk to the studio. */}
        <motion.div
          className="flex flex-col gap-5 rounded-2xl bg-zinc-950 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-7"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={transition.layout}
        >
          <p className="text-xl font-light tracking-[-0.02em] text-white md:text-2xl">
            Vendas, compres o construyas, te acompañamos.
          </p>
          <WhatsAppCTA message={whatsappMessages.general} variant="light" className="w-full sm:w-auto md:shrink-0">
            Hablá con nosotros
          </WhatsAppCTA>
        </motion.div>
      </div>
    </section>
  );
}
