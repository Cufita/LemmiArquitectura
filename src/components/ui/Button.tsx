import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'hero' | 'header';
}

export default function Button({ 
  children, 
  href, 
  showArrow = false, 
  className = "",
  onClick,
  variant = 'hero'
}: ButtonProps) {
  const baseClasses = "relative inline-flex items-center group overflow-hidden rounded-full bg-gradient-to-r from-white/95 to-white/80 backdrop-blur px-6 py-2.5 md:px-7 md:py-3 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:from-white hover:to-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  // Animaciones específicas por variante
  const getAnimationProps = () => {
    if (variant === 'header') {
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.8 }
      };
    }
    // Hero variant (default)
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut', delay: 1.2 }
    };
  };

  const content = (
    <>
      <span className="relative z-10 cta-text text-zinc-900">{children}</span>
      {showArrow && (
        <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors duration-300 group-hover:bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-90"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/30" />
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.06),transparent_60%)]" />
    </>
  );

  const animationProps = getAnimationProps();

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${className}`}
        whileTap={{ scale: 0.95 }}
        {...animationProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      whileTap={{ scale: 0.95 }}
      {...animationProps}
    >
      {content}
    </motion.button>
  );
}