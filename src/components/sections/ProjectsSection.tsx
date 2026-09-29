import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { projects, type Project } from '../../data/projects';
import { transition, staggerDelay } from '../../lib/motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { cardLefts, jump, nearestIndex } from '../../lib/carousel';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import ProjectGallery from '../ui/ProjectGallery';
import Badge from '../ui/Badge';

const pad = (n: number) => String(n).padStart(2, '0');

/** Same two-column rhythm as the recommendations: a narrow rail for the label
 *  and controls, a wide column for the content. */
const railGrid = 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] lg:gap-16';

const COUNT = projects.length;
/** The track holds three identical runs of the projects. You always rest in the
 *  middle one; when a scroll settles in an outer run it is moved, invisibly, to
 *  the same spot in the middle run. That is what makes the loop endless. */
const COPIES = [0, 1, 2] as const;

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<number>();
  const [scroll, setScroll] = useState({ current: 0, start: 0, size: 1 });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const lefts = cardLefts(el);
    if (lefts.length < COUNT * 3) return;
    const runStart = lefts[COUNT];
    const runWidth = runStart - lefts[0];
    const size = Math.min(100, (el.clientWidth / runWidth) * 100);
    const into = (((el.scrollLeft - runStart) % runWidth) + runWidth) % runWidth;
    setScroll({
      current: nearestIndex(lefts, el.scrollLeft) % COUNT,
      start: Math.min((into / runWidth) * 100, 100 - size),
      size,
    });
  }, []);

  /** Once a scroll has settled, move it back into the middle run. */
  const recenter = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const lefts = cardLefts(el);
    if (lefts.length < COUNT * 3) return;
    const runStart = lefts[COUNT];
    const runWidth = runStart - lefts[0];
    if (el.scrollLeft < runStart - 1) jump(el, el.scrollLeft + runWidth);
    else if (el.scrollLeft >= runStart + runWidth - 1) jump(el, el.scrollLeft - runWidth);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    jump(el, cardLefts(el)[COUNT]);
    measure();
  }, [measure]);

  useEffect(() => {
    const onResize = () => {
      const el = trackRef.current;
      if (!el) return;
      const lefts = cardLefts(el);
      jump(el, lefts[COUNT + (nearestIndex(lefts, el.scrollLeft) % COUNT)]);
      measure();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(settleTimer.current);
    };
  }, [measure]);

  const onTrackScroll = () => {
    measure();
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(recenter, 120);
  };

  /** Step exactly one project per click; the loop has no ends. */
  const scrollTrack = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const lefts = cardLefts(track);
    const target = nearestIndex(lefts, track.scrollLeft) + direction;
    track.scrollTo({ left: lefts[target], behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="obras" className="section-shell bg-white">
      <div className="section-inner gap-24 md:gap-32">
        {/* Built work — a track you scroll sideways instead of a page you scroll down. */}
        <div className={railGrid}>
          <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-start lg:justify-between">
            <div className="flex flex-col gap-6">
              <Badge>Obras</Badge>
              <h2 className="display text-zinc-900">Obras en {projects[0].location}</h2>
            </div>

            <div className="flex flex-col gap-6">
              <p className="tabular hidden text-6xl font-light leading-none tracking-[-0.04em] text-zinc-900 md:block md:text-7xl" aria-hidden="true">
                {pad(scroll.current + 1)}
                <span className="text-zinc-300">/{pad(projects.length)}</span>
              </p>
              <div className="flex gap-2">
                {(['prev', 'next'] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollTrack(dir === 'next' ? 1 : -1)}
                    aria-label={dir === 'next' ? 'Obras siguientes' : 'Obras anteriores'}
                    className="grid h-12 w-12 place-items-center rounded-full border border-zinc-300 text-zinc-900 transition-colors duration-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={dir === 'next' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <ul
              ref={trackRef}
              onScroll={onTrackScroll}
              className="no-scrollbar -mr-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth md:-mr-10 lg:-mr-20"
              aria-label="Obras realizadas"
            >
              {COPIES.map((copy) =>
                projects.map((project, index) => {
                  const real = copy === 1;
                  return (
                    <motion.li
                      data-card
                      key={`${project.id}-${copy}`}
                      aria-hidden={real ? undefined : true}
                      className="w-[78%] shrink-0 snap-start sm:w-[46%]"
                      {...(real
                        ? {
                            initial: { opacity: 0, y: reduced ? 0 : 18 },
                            whileInView: { opacity: 1, y: 0 },
                            viewport: { once: true, margin: '-40px' },
                            transition: { ...transition.layout, delay: reduced ? 0 : staggerDelay(index) },
                          }
                        : {})}
                    >
                      <button
                        type="button"
                        tabIndex={real ? undefined : -1}
                        onClick={() => setOpenProject(project)}
                        className="group flex w-full flex-col gap-5 text-left"
                        aria-label={`Ver la galería de ${project.title}`}
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100">
                          <motion.img
                            layoutId={real ? `project-cover-${project.id}` : undefined}
                            src={project.images[0]}
                            alt={`${project.title}, ${project.kind.toLowerCase()} en ${project.location}`}
                            className="h-full w-full object-cover transition-transform duration-700 ease-arrive group-hover:scale-[1.04]"
                            loading="lazy"
                            decoding="async"
                          />
                          <span
                            aria-hidden="true"
                            className="eyebrow absolute bottom-4 right-4 rounded-full bg-white px-3.5 py-2 text-zinc-900 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100"
                          >
                            {project.images.length > 1 ? `${project.images.length} fotos` : 'Ver obra'}
                          </span>
                        </div>

                        <div className="flex items-start gap-4 border-t border-zinc-200 pt-4">
                          <span aria-hidden="true" className="tabular pt-1 text-sm font-light text-zinc-400">
                            {pad(index + 1)}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            <h3 className="text-2xl font-light leading-[1.1] tracking-[-0.03em] text-zinc-900">
                              {project.title}
                            </h3>
                            <p className="eyebrow text-zinc-500">{project.kind}</p>
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  );
                }),
              )}
            </ul>

            {/* Scroll position, drawn as a hairline with a thumb. */}
            <div className="mt-8 h-px w-full bg-zinc-200" aria-hidden="true">
              <div
                className="relative -top-px h-0.5 bg-zinc-900 transition-[margin,width] duration-150"
                style={{ marginLeft: `${scroll.start}%`, width: `${scroll.size}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <ProjectGallery project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
