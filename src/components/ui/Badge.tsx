import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div className={`inline-flex w-fit px-6 py-1 rounded-[32px] bg-zinc-100 border border-stone-300 ${className}`}>
      <p className="font-geist text-base md:text-lg font-light text-zinc-800 leading-6 md:leading-[27px]">
        {children}
      </p>
    </div>
  );
}