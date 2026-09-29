import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'light' | 'outline' | 'ghost';
  showArrow?: boolean;
  className?: string;
}

const variants = {
  solid: 'bg-zinc-900 text-white hover:bg-black',
  light: 'bg-white text-zinc-900 hover:bg-zinc-100',
  outline: 'border border-zinc-300 text-zinc-900 hover:border-zinc-900',
  ghost: 'border border-white/40 text-white hover:bg-white/10',
} as const;

export default function Button({
  children,
  href,
  onClick,
  variant = 'solid',
  showArrow = false,
  className = '',
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200 md:px-7 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 ease-arrive group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
