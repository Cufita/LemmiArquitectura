import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks } from '../../data/navigation';
import Button from '../ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header 
      className="fixed w-full z-50 left-0 top-0"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.nav 
        className={`w-full transition-all duration-300 backdrop-blur-[10px] ${
          isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/90'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-4 md:px-8 py-4">
          
            <div className="flex items-center h-10">
              <h1 className="nav-brand text-zinc-800">
                Lemmi Arq
              </h1>
            </div>
          
          {/* Desktop Navigation - solo visible en pantallas grandes (>1240px) */}
          <div className="hidden xl:flex items-center justify-center gap-8 flex-grow">
            {navigationLinks.map((link, index) => (
              <motion.div 
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.a 
                  href={link.href} 
                  className="nav-link text-zinc-800 opacity-60 hover:opacity-100 transition-opacity duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button - solo visible en pantallas grandes (>1240px) */}
          <div className="hidden xl:block">
            <Button
              href="./#properties"
              showArrow={true}
              variant="header"
              className="focus-visible:ring-offset-zinc-900"
            >
              Contactanos
            </Button>
          </div>
          
          {/* Hamburger Menu Button - visible desde mobile hasta desktop (<1240px) */}
          <div className="flex items-center h-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-zinc-800 p-2 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
          </div>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[90%] max-w-[420px] md:w-[70%] md:max-w-[480px] bg-white shadow-2xl overflow-hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header del menú */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <h2 className="nav-brand text-zinc-800">
                  Lemmi Arq
                </h2>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  aria-label="Cerrar menú"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="space-y-2">
                  {navigationLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      className="block nav-link text-zinc-800 font-medium py-4 px-4 rounded-lg hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (0.05 * i) }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </motion.a>
                  ))}
                </nav>
                
                {/* CTA Button mejorado */}
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="./#properties"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-zinc-900 to-black text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-link font-medium">Ver Propiedades</span>
                    <motion.svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </a>
                </motion.div>
              </div>
              
              {/* Footer del menú */}
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <p className="text-caption text-center text-zinc-500">
                  © {new Date().getFullYear()} Lemmi Arquitectura
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
