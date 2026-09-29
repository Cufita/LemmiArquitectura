import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navigationLinks } from '../../data/navigation';
import { transition } from '../../lib/motion';
import Wordmark from '../ui/Wordmark';
import WhatsAppCTA from '../ui/WhatsAppCTA';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-zinc-900 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>

      <nav
        className={`w-full bg-[#dadada] transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.07)]' : ''
        }`}
        aria-label="Principal"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 md:px-10 lg:px-20">
          <a href="#top" aria-label="Lemmi arquitectura — inicio">
            <Wordmark size="md" />
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] font-normal text-zinc-700 transition-colors duration-200 hover:text-zinc-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <WhatsAppCTA className="px-5 py-2.5 text-sm">Escribinos</WhatsAppCTA>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-lg text-zinc-900 transition-colors hover:bg-black/10 xl:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#dadada] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: transition.exit }}
            transition={transition.state}
          >
            <motion.div
              className="flex h-full w-full flex-col"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: transition.exit }}
              transition={transition.layout}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
          >
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <Wordmark size="md" />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid h-10 w-10 place-items-center rounded-full text-zinc-900 transition-colors hover:bg-black/10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-1 flex-col overflow-y-auto p-5">
                {navigationLinks.map((link) => (
                  <li key={link.id} className="border-b border-black/10 last:border-b-0">
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-5 text-3xl font-light tracking-[-0.03em] text-zinc-900"
                    >
                      {link.label}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-zinc-500">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="border-t border-black/10 p-5">
                <WhatsAppCTA className="w-full">Escribinos por WhatsApp</WhatsAppCTA>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
