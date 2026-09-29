import { useCallback, useEffect, useRef, useState } from 'react';
import { reels, instagramProfile, type Reel } from '../../data/instagram';
import { brand } from '../../data/brand';
import logoLemmi from '../../assets/images/logo-lemmi.webp';
import useReducedMotion from '../../hooks/useReducedMotion';
import Badge from '../ui/Badge';

function PlayGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a.5.5 0 0 0 .76.43l11.14-6.86a.5.5 0 0 0 0-.86L8.76 4.71a.5.5 0 0 0-.76.43Z" />
    </svg>
  );
}

/**
 * One card. Only the active card is sharp and playing; the rest sit back,
 * blurred and dimmed.
 *
 * That is both the look the studio asked for and the cheap way to run four
 * videos: one decoder at a time instead of four. The blur is a CSS filter over
 * a still poster for inactive cards, so nothing decodes off-focus.
 */
function ReelCard({
  reel,
  index,
  isActive,
  onActivate,
  onOpen,
}: {
  reel: Reel;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
  onOpen: (reel: Reel) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const showVideo = isActive && !reduced && Boolean(reel.loop);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (showVideo) {
      video.currentTime = 0;
      void video.play().catch(() => {
        /* Autoplay may be refused; the poster underneath still reads. */
      });
    } else {
      video.pause();
    }
  }, [showVideo]);

  return (
    <li data-reel-card className="w-[228px] shrink-0 snap-center sm:w-[252px] lg:w-[268px]">
      <button
        type="button"
        onMouseEnter={() => onActivate(index)}
        onFocus={() => onActivate(index)}
        onClick={() => (isActive ? onOpen(reel) : onActivate(index))}
        aria-label={
          isActive ? `Reproducir con sonido: ${reel.title}` : `Ver ${reel.title}`
        }
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-zinc-800 text-left"
      >
        <img
          src={reel.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-arrive"
          style={{
            filter: isActive ? 'none' : 'blur(7px) brightness(0.55) saturate(0.7)',
            transform: isActive ? 'scale(1)' : 'scale(1.07)',
          }}
          loading="lazy"
          decoding="async"
        />

        {reel.loop && (
          <video
            ref={videoRef}
            src={reel.loop}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: showVideo ? 1 : 0 }}
          />
        )}

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
        />

        {/* Inactive cards say what they are and how to reveal them, so the blur
            reads as a control rather than as a broken image. */}
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4">
          <span className="text-[0.9375rem] font-semibold leading-snug text-white">
            {reel.title}
          </span>
          <span
            className="text-[0.8125rem] font-light leading-snug text-white/75 transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {reel.caption}
          </span>
        </span>

        <span
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-white group-hover:text-zinc-900"
          aria-hidden="true"
        >
          <PlayGlyph className="ml-0.5 h-4 w-4" />
        </span>

        {!isActive && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 px-3.5 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
            Ver
          </span>
        )}
      </button>
    </li>
  );
}

export default function ReelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openReel, setOpenReel] = useState<Reel | null>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const activate = useCallback((index: number) => setActiveIndex(index), []);

  /**
   * On touch screens there is no hover to reveal a card, and asking for two
   * taps (one to focus, one to open) is a poor trade. Instead the card the
   * visitor has swiped to the centre becomes the active one, so swiping alone
   * plays the videos and a single tap opens whatever is already sharp.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (window.matchMedia('(hover: hover)').matches) return;

    const cards = [...scroller.querySelectorAll('[data-reel-card]')];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const index = cards.indexOf(best.target);
        if (index >= 0) setActiveIndex(index);
      },
      { root: scroller, threshold: [0.5, 0.75, 0.95] }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openReel) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenReel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openReel]);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 280, behavior: 'smooth' });
  };

  return (
    <section id="reels" className="section-shell bg-zinc-950">
      <div className="section-inner gap-10">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[600px] flex-col gap-5">
            <Badge tone="dark">En Instagram</Badge>
            <h2 className="heading-lg text-white">Así miramos una casa</h2>
            <p className="text-body text-white/65">
              Recorremos propiedades en {brand.city} y mostramos lo que encontramos. Tocá
              cualquiera para verlo completo, con sonido.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Ver anteriores"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white hover:text-zinc-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Ver siguientes"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white hover:text-zinc-900"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </header>

        <ul
          ref={scrollerRef}
          onMouseLeave={() => setActiveIndex(0)}
          data-hscroll
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10 lg:-mx-20 lg:px-20"
        >
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              isActive={index === activeIndex}
              onActivate={activate}
              onOpen={setOpenReel}
            />
          ))}

          {/* The last card is the exit to Instagram, so "more videos" is part of
              the same row rather than a link stranded in the header. */}
          <li className="w-[228px] shrink-0 snap-center sm:w-[252px] lg:w-[268px]">
            <a
              href={instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-[9/16] w-full flex-col items-center justify-center gap-5 rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-center transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.08]"
            >
              <img
                src={logoLemmi}
                alt=""
                aria-hidden="true"
                className="h-16 w-16 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="flex flex-col gap-1.5">
                <span className="text-[0.9375rem] font-semibold text-white">Ver más videos</span>
                <span className="text-[0.8125rem] font-light text-white/60">
                  {brand.instagramHandle}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[0.8125rem] font-medium text-white transition-colors duration-200 group-hover:bg-white group-hover:text-zinc-900">
                Ir a Instagram
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>

      {openReel && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/94 p-4 backdrop-blur-sm"
          onClick={() => setOpenReel(null)}
          role="dialog"
          aria-modal="true"
          aria-label={openReel.title}
        >
          <button
            type="button"
            onClick={() => setOpenReel(null)}
            aria-label="Cerrar video"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Sound is on here because opening the video is the action that earns
              it; the card loops stay muted. */}
          <video
            src={openReel.full ?? openReel.loop}
            poster={openReel.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[86vh] w-auto max-w-full rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
