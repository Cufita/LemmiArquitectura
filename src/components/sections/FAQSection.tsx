import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '../../data/faq';
import AnimatedSection from '../ui/AnimatedSection';
import Badge from '../ui/Badge';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <AnimatedSection>
      <section className="flex flex-col w-full px-4 py-10 md:p-20 gap-20 md:gap-40">
        <div className="flex flex-col md:flex-row w-full max-w-[1440px] mx-auto gap-10 md:gap-12">
          <div className="w-full md:w-[30%] md:sticky md:top-32 self-start">
            <div className="flex flex-col gap-4 w-full">
              <Badge>
                Centro de Ayuda
              </Badge>
              <h2 className="font-geist uppercase text-zinc-800 text-[22px] md:text-4xl font-semibold leading-[26.4px] md:leading-[43.2px]">
                Preguntas frecuentes
              </h2>
            </div>
          </div>
          {/* FAQ Items */}
          <div className="w-full md:w-[70%]">
            <div className="w-full">
              {faqItems.map((faq, index) => (
                    <motion.div 
                      key={faq.id} 
                      className="border-b border-zinc-200 last:border-b-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="flex items-center justify-between w-full py-6 px-2 -mx-2 cursor-pointer rounded-lg"
                        onClick={(e) => {
                          if (e.target === e.currentTarget || !e.currentTarget.contains(e.target as Node)) {
                            return;
                          }
                          toggleItem(faq.id);
                        }}
                        whileHover={{ 
                          backgroundColor: "rgba(249, 250, 251, 0.8)",
                          scale: 1.002
                        }}
                        whileTap={{ scale: 0.998 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <div 
                          className="flex-1 pr-4 cursor-pointer"
                          onClick={() => toggleItem(faq.id)}
                        >
                          <motion.h3 
                            className="font-geist text-zinc-800 text-lg md:text-xl font-semibold select-none"
                            animate={{
                              color: openItems.includes(faq.id) ? "#000000" : "#27272a"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {faq.question}
                          </motion.h3>
                        </div>
                        <motion.button 
                          className="flex items-center justify-center w-12 h-12 rounded-full border-2 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(faq.id);
                          }}
                          animate={{ 
                            rotate: openItems.includes(faq.id) ? 45 : 0,
                            backgroundColor: openItems.includes(faq.id) ? "rgba(0, 0, 0, 0.1)" : "rgba(249, 250, 251, 1)",
                            borderColor: openItems.includes(faq.id) ? "rgba(0, 0, 0, 0.4)" : "rgba(212, 212, 216, 1)"
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          whileHover={{ 
                            scale: 1.08,
                            backgroundColor: openItems.includes(faq.id) ? "rgba(0, 0, 0, 0.15)" : "rgba(243, 244, 246, 1)",
                            borderColor: openItems.includes(faq.id) ? "rgba(0, 0, 0, 0.5)" : "rgba(156, 163, 175, 1)"
                          }}
                          whileTap={{ scale: 0.92 }}
                          aria-label={openItems.includes(faq.id) ? "Cerrar respuesta" : "Abrir respuesta"}
                        >
                          <motion.svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ 
                              color: openItems.includes(faq.id) ? "#000000" : "#374151"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.line 
                              x1="12" 
                              y1="5" 
                              x2="12" 
                              y2="19"
                              animate={{
                                opacity: openItems.includes(faq.id) ? 0 : 1
                              }}
                              transition={{ duration: 0.15 }}
                            />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </motion.svg>
                        </motion.button>
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {openItems.includes(faq.id) && (
                          <motion.div 
                            className="overflow-hidden w-full pr-0 md:pr-12"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: "auto", 
                              marginTop: 12,
                              transition: {
                                height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                                opacity: { duration: 0.2, delay: 0.05 },
                                marginTop: { duration: 0.25, ease: "easeOut" }
                              }
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0, 
                              marginTop: 0,
                              transition: {
                                height: { duration: 0.18, ease: "easeIn" },
                                opacity: { duration: 0.12 },
                                marginTop: { duration: 0.18, ease: "easeIn" }
                              }
                            }}
                          >
                            {/* Separador visual */}
                            <motion.div 
                              className="w-12 h-0.5 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-full mb-4"
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ 
                                width: 48, 
                                opacity: 1,
                                transition: {
                                  width: { duration: 0.3, delay: 0.1, ease: "easeOut" },
                                  opacity: { duration: 0.2, delay: 0.15 }
                                }
                              }}
                              exit={{ 
                                width: 0, 
                                opacity: 0,
                                transition: {
                                  duration: 0.15,
                                  ease: "easeIn"
                                }
              }}
                            />
                            
                            <motion.div 
                              className="pb-6"
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ 
                                y: 0, 
                                opacity: 1,
                                transition: {
                                  duration: 0.25,
                                  delay: 0.12,
                                  ease: "easeOut"
                                }
                              }}
                              exit={{ 
                                y: -6, 
                                opacity: 0,
                                transition: {
                                  duration: 0.12,
                                  ease: "easeIn"
                                }
                              }}
                            >
                              <p className="font-geist text-zinc-600 text-base md:text-lg font-light leading-relaxed">{faq.answer}</p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
