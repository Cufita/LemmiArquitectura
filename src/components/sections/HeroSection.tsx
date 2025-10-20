import { motion } from 'framer-motion';
import { heroStats } from '../../data/hero';
import HeroBackground from '../../assets/images/HeroBackground.png';
import AnimatedCounter from '../ui/AnimatedCounter';
import Button from '../ui/Button';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section 
      className="relative content-center items-center box-border caret-transparent gap-x-0 flex flex-col shrink-0 h-[750px] md:h-[1000px] justify-center gap-y-0 w-full overflow-hidden pt-24 pb-8 px-4 rounded-[32px] md:flex-row md:pt-32 md:pb-10 md:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
  <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row h-full">
  <div className="relative content-start items-start bg-black box-border caret-transparent gap-x-0 flex basis-0 flex-col grow shrink-0 h-px justify-center gap-y-0 w-full overflow-hidden px-6 rounded-[32px] md:h-full md:w-px md:pl-20 md:pr-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HeroBackground})` }} />
        <div className="absolute bg-black/60 box-border caret-transparent shrink-0 h-full w-full z-[1] overflow-hidden left-0 top-0 rounded-[32px]"></div>
        <div className="w-full max-w-[1400px] mx-auto">
        <motion.div 
          className="relative content-start items-start box-border caret-transparent gap-x-6 flex flex-col shrink-0 h-min justify-start max-w-[450px] gap-y-6 w-full z-[2] overflow-hidden md:gap-x-8 md:max-w-[800px] md:gap-y-8 md:w-3/5"
          variants={itemVariants}
        >
          <motion.div 
            className="relative box-border caret-transparent flex flex-col shrink-0 justify-start break-words w-full"
            variants={itemVariants}
          >
            <motion.h1 
              className="hero-title text-white flex flex-wrap gap-x-3 md:gap-x-5 leading-[1.0]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {['Lleva', 'tu', 'idea', 'inmobiliaria', 'a', 'la', 'realidad'].map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          <motion.div 
            className="relative content-center items-center box-border caret-transparent gap-x-2.5 flex shrink-0 h-min justify-center max-w-[85%] gap-y-2.5 w-full overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative box-border caret-transparent flex basis-0 flex-col grow shrink-0 justify-start break-words w-px">
              <motion.p 
                className="hero-subtitle text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                En Lemmi Arquitectura llevamos décadas creando casas, edificios y balnearios que combinan minimalismo, calidez y funcionalidad.
              </motion.p>
            </div>
          </motion.div>
          <motion.div 
            className="relative box-border caret-transparent shrink-0"
            variants={itemVariants}
          >
            <div className="box-content caret-black block md:aspect-auto md:box-border md:caret-transparent md:contents md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto]">
              <Button
                href="./#property"
                showArrow={false}
              >
                Ver Propiedades
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="relative content-start items-start box-border caret-transparent gap-x-4 flex shrink-0 flex-wrap h-min justify-start gap-y-4 w-full overflow-hidden md:gap-x-10 md:flex-nowrap md:gap-y-10"
            variants={itemVariants}
          >
            {heroStats.map((stat, index) => (
              <motion.div 
                key={stat.id} 
                className="relative box-border caret-transparent shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.8 + index * 0.2,
                  ease: "easeOut"
                }}
              >
                <div className="relative content-start items-start box-border caret-transparent gap-x-1 flex flex-col h-min justify-start gap-y-1 w-min overflow-hidden">
                  <div className="relative content-start items-start box-border caret-transparent gap-x-0 flex shrink-0 h-min justify-start gap-y-0 w-min overflow-hidden">
                    <div className="flex flex-col justify-start text-nowrap">
                      <p className="stat-number text-white text-nowrap">{stat.prefix}</p>
                    </div>
                    <div className="flex flex-col justify-start text-nowrap">
                      <AnimatedCounter
                        end={parseInt(stat.value.replace(/\D/g, ''))}
                        suffix={stat.value.replace(/\d/g, '')}
                        className="stat-number text-white text-nowrap"
                        duration={2}
                      />
                    </div>
                    <div className="flex flex-col justify-start text-nowrap">
                      <p className="stat-number text-white text-nowrap">{stat.suffix}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start text-nowrap">
                    <p className="stat-label text-white text-nowrap">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
  </motion.div>
  </div>
        
      </div>
      </div>
    </motion.section>
  );
}
