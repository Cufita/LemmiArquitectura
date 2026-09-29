import { useCallback, useState } from 'react';
import type { Testimonial } from '../../data/testimonials';
import useReducedMotion from '../../hooks/useReducedMotion';
import Avatar from './Avatar';

interface TestimonialCarouselProps {
  items: readonly Testimonial[];
  /** Milliseconds each recommendation stays on screen. */
  interval?: number;
}


/**
 * One recommendation at a time, set large. Read together, six quotes say
 * nothing; read one by one, each gets its moment.
 *
 * All quotes share one grid cell, so the block is as tall as the longest one
 * and nothing jumps when it changes. The story-style segments underneath are
 * the timer: each fills while its quote is up, and the fill ending is what
 * advances the carousel. Hover or focus pauses it; reduced motion never
 * autoplays.
 */
const pad = (n: number) => String(n).padStart(2, '0');

export default function TestimonialCarousel({ items, interval = 7000 }: TestimonialCarouselProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length],
  );

  return (
    <div
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] lg:gap-16"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Recomendaciones de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Side rail: label, counter, arrows. */}
      <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
            Lo que dicen nuestros clientes
          </h2>
          <p className="tabular hidden text-6xl font-light leading-none tracking-[-0.04em] text-zinc-900 md:block md:text-7xl" aria-hidden="true">
            {pad(index + 1)}
            <span className="text-zinc-300">/{pad(items.length)}</span>
          </p>
        </div>

        <div className="flex gap-2">
          {(['prev', 'next'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(index + (dir === 'next' ? 1 : -1))}
              aria-label={dir === 'next' ? 'Recomendación siguiente' : 'Recomendación anterior'}
              className="grid h-12 w-12 place-items-center rounded-full border border-zinc-300 text-zinc-900 transition-colors duration-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir === 'next' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10 md:gap-12">
        <div className="grid">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <figure
                key={item.id}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 flex flex-col gap-8 transition-all duration-500 ease-arrive ${
                  active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                <svg viewBox="0 0 48 36" className="h-8 w-10 text-zinc-200 md:h-10 md:w-12" fill="currentColor" aria-hidden="true">
                  <path d="M0 36V21.6C0 9.6 6.3 2.4 18 0v6.6C12.3 8.4 9.6 12 9.6 16.8H18V36H0Zm27 0V21.6C27 9.6 33.3 2.4 45 0v6.6c-5.7 1.8-8.4 5.4-8.4 10.2H45V36H27Z" />
                </svg>
                <blockquote className="max-w-[26ch] text-[1.75rem] font-light leading-[1.15] tracking-[-0.03em] text-zinc-900 md:max-w-[28ch] md:text-5xl">
                  {item.content}
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <Avatar name={item.name} />
                  <span className="flex flex-col gap-0.5">
                    <cite className="text-[0.9375rem] font-medium not-italic text-zinc-900">{item.name}</cite>
                    <span className="text-caption text-zinc-500">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Segments double as the timer and the pager. */}
        <div className="flex gap-2" role="tablist" aria-label="Elegir recomendación">
          {items.map((item, i) => {
            const done = i < index || (reduced && i === index);
            const running = i === index && !reduced;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Recomendación ${i + 1} de ${items.length}`}
                onClick={() => go(i)}
                className="group flex h-6 flex-1 items-center"
              >
                <span className="relative block h-px w-full overflow-hidden bg-zinc-300 transition-all duration-200 group-hover:h-0.5">
                  <span
                    key={running ? `run-${index}` : `idle-${i}`}
                    className={`absolute inset-0 origin-left bg-zinc-900 ${done ? 'scale-x-100' : 'scale-x-0'}`}
                    style={
                      running
                        ? {
                            animation: `lemmi-fill ${interval}ms linear forwards`,
                            animationPlayState: paused ? 'paused' : 'running',
                          }
                        : undefined
                    }
                    onAnimationEnd={running ? () => go(index + 1) : undefined}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
