import { motion } from 'framer-motion';
import React from 'react';

interface ArrowCTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  arrowClassName?: string;
  rotateDegrees?: number; // default 90
  fast?: boolean; // speed variant
  variant?: 'light' | 'dark';
}

export default function ArrowCTA({
  label,
  href,
  onClick,
  className = '',
  arrowClassName = '',
  rotateDegrees = 90,
  fast = true,
  variant = 'light'
}: ArrowCTAProps) {
  const base = variant === 'light'
    ? 'bg-white/95 text-zinc-900 hover:bg-white ring-white/30'
    : 'bg-black/80 text-white hover:bg-black ring-white/20';

  const content = (
    <motion.button
      type={href ? 'button' : 'button'}
      onClick={onClick}
      className={`relative inline-flex items-center group overflow-hidden rounded-full backdrop-blur px-7 py-3 md:px-8 md:py-4 shadow-sm ${base} ring-1 transition-colors ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 font-geist text-sm md:text-base font-light">{label}</span>
      <span className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full ${variant === 'light' ? 'bg-black text-white' : 'bg-white text-black'} transition-all ${fast ? 'duration-300' : 'duration-500'} group-hover:ml-5 ${arrowClassName}`}>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          initial={false}
          whileHover={{ rotate: rotateDegrees }}
          transition={{ duration: fast ? 0.25 : 0.45, ease: 'easeOut' }}
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </motion.svg>
      </span>
      <span className="absolute inset-0 rounded-full pointer-events-none" />
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
