import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { whatsappLink, whatsappMessages } from '../../data/brand';
import useReducedMotion from '../../hooks/useReducedMotion';
import { transition } from '../../lib/motion';

const LINES = ['Coordinemos', 'la visita', 'sin cargo.'] as const;
const TOTAL = LINES.join('').length;

/** One letter that lights up as the scroll passes its slot in the headline. */
function Letter({
  char,
  index,
  progress,
  reduced,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = (index / TOTAL) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.2], [0.14, 1]);
  return (
    <motion.span aria-hidden="true" style={reduced ? undefined : { opacity }}>
      {char}
    </motion.span>
  );
}

/** Architectural line work behind the headline: a minimal floor plan with a
 *  door swing and dimension lines, and a set square. It draws itself in once
 *  when the section comes into view. */
const PLAN_LINES = [
  // walls (outer + inner face)
  'M40 60H400V380H40Z',
  'M52 72H388V368H52Z',
  // partitions, with an opening for the door
  'M222 72V232H300M340 232H388M222 244H300M340 244H388M222 232V244',
  // window on the top wall
  'M110 60v12M190 60v12M110 66H190',
  // door leaf and swing
  'M300 244V284A40 40 0 0 0 340 244',
  // structural axis
  'M222 24V416',
  // dimension lines, horizontal and vertical
  'M40 400H400M40 386V414M400 386V414M34 406l12-12M394 406l12-12',
  'M10 60V380M-4 60h28M-4 380h28M4 66l12-12M4 386l12-12',
] as const;

const SQUARE_LINES = [
  // set square: outer, cut-out and the graduated edge
  'M320 560H520V445Z',
  'M500 542H400V482Z',
  'M320 560v-12M330 560v-6M340 560v-6M350 560v-6M360 560v-6M370 560v-12M380 560v-6M390 560v-6M400 560v-6M410 560v-6M420 560v-12M430 560v-6M440 560v-6M450 560v-6M460 560v-6M470 560v-12M480 560v-6M490 560v-6M500 560v-6M510 560v-6M520 560v-12',
] as const;

function PlanDrawing({ reduced }: { reduced: boolean }) {
  const draw = (i: number) => ({
    initial: { pathLength: reduced ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduced ? 0 : 1.6, delay: reduced ? 0 : i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="-10 0 540 580"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="pointer-events-none absolute -right-16 top-1/2 hidden h-[min(120%,780px)] w-auto -translate-y-1/2 text-white opacity-[0.28] md:block lg:right-4 xl:right-16"
    >
      <g stroke="currentColor" strokeWidth="1.25">
        {PLAN_LINES.map((d, i) => (
          <motion.path key={d} d={d} {...draw(i)} />
        ))}
        {SQUARE_LINES.map((d, i) => (
          <motion.path key={d} d={d} {...draw(i + PLAN_LINES.length)} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The last thing on the page, and the only place that asks for the action in
 * full. No photograph: the surface is a drafting sheet — a faint grid, a
 * dimension line — and the headline is drawn in as you scroll into it, so the
 * impact comes from the type and the movement rather than from an image.
 * The footer below is light, so the page ends on a clearly separate surface.
 */
export default function ContactSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(sectionProgress, [0, 1], ['-6%', '6%']);

  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ['start 88%', 'start 35%'],
  });

  let cursor = 0;

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-28 md:py-40"
    >
      {/* Drafting-sheet grid, fading out toward the edges. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-[10%] inset-x-0"
        style={{
          ...(reduced ? {} : { y: gridY }),
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, #000 20%, transparent 80%)',
        }}
      />

      <PlanDrawing reduced={reduced} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-5 md:gap-20 md:px-10 lg:px-20">
        <h2
          ref={titleRef}
          aria-label={LINES.join(' ')}
          className="text-[clamp(3.25rem,12.5vw,11.5rem)] font-light leading-[0.92] tracking-[-0.055em] text-white"
        >
          {LINES.map((line) => (
            <span key={line} className="block">
              {line.split('').map((char) => {
                const i = cursor++;
                return <Letter key={i} char={char} index={i} progress={titleProgress} reduced={reduced} />;
              })}
            </span>
          ))}
        </h2>

        <motion.div
          className="flex"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={transition.focal}
        >
          <a
            href={whatsappLink(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-10 text-lg font-semibold text-zinc-950 transition-colors duration-200 hover:bg-[#3ddc7a] active:translate-y-px sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
            </svg>
            Escribir por WhatsApp
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 ease-arrive group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
