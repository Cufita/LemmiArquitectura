import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { faqItems } from '../../data/faq';
import { transition } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import Badge from '../ui/Badge';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="section-shell bg-white">
      <div className="section-inner gap-10 lg:flex-row lg:gap-20">
        {/* Static on purpose: it stays at the top of the section instead of
            following the visitor down the list. */}
        <div className="flex flex-col gap-6 lg:w-[320px] lg:shrink-0">
          <Badge>Preguntas</Badge>
          <h2 className="display text-zinc-900">Preguntas frecuentes</h2>
        </div>

        <ul className="flex-1 border-t border-zinc-200">
          {faqItems.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;

            return (
              <li key={faq.id} className="border-b border-zinc-200">
                {/* One control, one handler. The original nested three onClick
                    handlers, one of which could never fire. */}
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`heading-sm transition-colors duration-200 ${
                        isOpen ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-300 text-zinc-600 group-hover:border-zinc-900'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <motion.line
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                          animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                          style={{ originX: '12px', originY: '12px' }}
                          transition={transition.instant}
                        />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { height: transition.layout, opacity: transition.state }
                      }
                    >
                      <p className="max-w-[68ch] pb-7 pr-4 text-[0.9375rem] font-light leading-relaxed text-zinc-600 md:pr-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
