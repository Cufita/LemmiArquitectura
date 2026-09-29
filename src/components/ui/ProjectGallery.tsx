import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '../../data/projects';
import { transition, travelSpring } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';

interface ProjectGalleryProps {
  project: Project | null;
  onClose: () => void;
}

/** Below this drag distance a swipe is treated as a tap, not a navigation. */
const SWIPE_THRESHOLD = 60;

/**
 * Full-screen gallery. The cover travels from the card into the overlay via a
 * shared `layoutId`, so the visitor never loses track of which project they
 * opened.
 *
 * Everything needed to leave or move on is visible without hunting: a labelled
 * close button, arrows on both sides, a thumbnail strip, and a counter.
 */
export default function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const count = project?.images.length ?? 0;
  const hasMany = count > 1;

  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(count, 1)), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + Math.max(count, 1)) % Math.max(count, 1)),
    [count]
  );

  useEffect(() => {
    setIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      (restoreFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, [project, next, prev, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex cursor-zoom-out flex-col bg-black/[0.97]"
          // Clicking anywhere that is not the photo, a control or the text closes it.
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest('img, button, h3, p')) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: transition.exit }}
          transition={transition.state}
          role="dialog"
          aria-modal="true"
          aria-label={`Obra: ${project.title}`}
        >
          <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 md:px-8 md:pt-6">
            <div className="min-w-0 text-white">
              <h3 className="heading-sm truncate">{project.title}</h3>
              <p className="text-caption mt-1 text-white/60">
                {project.kind} · {project.location}{project.year ? ` · ${project.year}` : ''}
                {project.surface ? ` · ${project.surface}` : ''}
              </p>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Cerrar
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 md:px-20"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > SWIPE_THRESHOLD) {
                if (delta < 0) next();
                else prev();
              }
              touchStartX.current = null;
            }}
          >
            <motion.img
              // Shared element with the card cover: the image travels rather
              // than cross-fading, so the origin stays legible.
              layoutId={index === 0 ? `project-cover-${project.id}` : undefined}
              key={project.images[index]}
              src={project.images[index]}
              alt={`${project.title}, ${project.kind.toLowerCase()} en ${project.location} — imagen ${index + 1} de ${count}`}
              className="max-h-full max-w-full cursor-default rounded-xl object-contain md:rounded-2xl"
              transition={reduced ? transition.state : travelSpring}
              initial={index === 0 ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Imagen anterior"
                  className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 md:left-5"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Imagen siguiente"
                  className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 md:right-5"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                <span className="tabular absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-light text-white/90 backdrop-blur-sm md:hidden">
                  {index + 1} / {count}
                </span>
              </>
            )}
          </div>

          <div className="shrink-0 px-5 pb-6 md:px-8 md:pb-7">
            <p className="text-body mx-auto max-w-[70ch] text-center text-white/70">
              {project.summary}
            </p>

            {hasMany && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                {project.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver imagen ${i + 1} de ${count}`}
                    aria-current={i === index}
                    className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition-all duration-200 md:h-16 md:w-16 ${
                      i === index
                        ? 'border-white opacity-100'
                        : 'border-transparent opacity-45 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
