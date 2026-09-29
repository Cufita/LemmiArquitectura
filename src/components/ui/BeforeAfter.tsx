import { useCallback, useEffect, useRef, useState } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  className?: string;
}

/**
 * Draggable split view. This is Lemmi's own device — the flyers and the reels
 * are built on the same before/after cut — so the interaction is the content,
 * not decoration.
 *
 * The reveal is a `clip-path` inset on the top layer rather than a width
 * change, so the image never reflows and the two photographs stay in register
 * while dragging.
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  alt,
  className = '',
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Pointer events are captured on the window so the drag survives the cursor
  // leaving the image, which is where a naive implementation drops it.
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [isDragging, setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-zinc-100 md:rounded-3xl ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      onPointerDown={(e) => {
        // Ignore secondary buttons so a right-click never starts a drag.
        if (e.button !== 0) return;
        setIsDragging(true);
        setFromClientX(e.clientX);
      }}
    >
      {/* After sits underneath and is fully painted; the before layer is clipped
          over it. Both are the same size so nothing shifts. */}
      <img
        src={after}
        alt={`${alt} — ${afterLabel.toLowerCase()}`}
        className="block h-full w-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={before}
          alt=""
          className="block h-full w-full object-cover"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Labels fade out as the divider passes over them so they never sit on
          top of the wrong half. */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full bg-zinc-900/85 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-200 md:left-5 md:top-5"
        style={{ opacity: position > 14 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-900 backdrop-blur-sm transition-opacity duration-200 md:right-5 md:top-5"
        style={{ opacity: position < 86 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle — the actual control, focusable and operable from the keyboard. */}
      <button
        type="button"
        role="slider"
        aria-label={`Comparar ${beforeLabel.toLowerCase()} y ${afterLabel.toLowerCase()} de ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel.toLowerCase()}`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.stopPropagation();
          setIsDragging(true);
        }}
        className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-900 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.35)] transition-transform duration-150 hover:scale-105 active:scale-95"
        style={{ left: `${position}%`, touchAction: 'none' }}
      >
        {/* Two chevrons set adjacent read as a diamond, so they are spaced
            apart with the drag axis drawn between them. */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 8.5 5.5 12 9 15.5" />
          <path d="M15 8.5 18.5 12 15 15.5" />
          <path d="M12 5.5v13" strokeWidth="1.3" opacity="0.35" />
        </svg>
      </button>
    </div>
  );
}
