import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  /** Dark sections need their own palette — passing override classes does not
   *  work, because Tailwind resolves conflicts by stylesheet order, not by the
   *  order the classes appear in the attribute. */
  tone?: 'light' | 'dark';
  className?: string;
}

const tones = {
  light: 'border-zinc-300 bg-zinc-50 text-zinc-600',
  dark: 'border-white/25 bg-white/10 text-white/80',
} as const;

export default function Badge({ children, tone = 'light', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
