import { brand } from '../../data/brand';
import { socialLinks } from '../../data/social';
import Wordmark from '../ui/Wordmark';

/** Credit for the site's author. */
const CREDIT_NAME = 'Facundo Amores';
const CREDIT_LINKEDIN = 'https://www.linkedin.com/in/facundoamores/';

const linkClass = 'text-[0.9375rem] font-normal text-zinc-700 transition-colors duration-200 hover:text-zinc-950';
const headingClass = 'text-xs font-medium uppercase tracking-[0.14em] text-zinc-600';

/**
 * Light on purpose: the section above it is a dark photograph, so the page
 * ends on a clearly separate, quiet surface instead of sliding from one black
 * block into another.
 */
export default function Footer() {
  return (
    <footer
      className="w-full bg-[#dadada] px-5 pb-24 pt-16 md:px-10 md:pb-8 md:pt-20 lg:px-20"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Wordmark size="lg" className="self-start" />
            <p className="max-w-[280px] text-[0.9375rem] font-normal leading-relaxed text-zinc-700">
              {brand.tagline}.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className={headingClass}>Contacto</h2>
            <ul className="flex flex-col gap-3">
              {brand.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:+54${phone.replace(/\D/g, '')}`} className={linkClass}>
                    {phone}
                  </a>
                </li>
              ))}
              <li className="text-[0.9375rem] font-normal text-zinc-600">{brand.city}, Argentina</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className={headingClass}>Redes</h2>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.label}
                    <span className="text-zinc-600"> · {brand.instagramHandle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-zinc-600">
            © {new Date().getFullYear()} {brand.legalName}
          </p>
          <div className="flex items-center justify-between gap-6 md:justify-end md:gap-8">
            <a
              href={CREDIT_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sitio web hecho por ${CREDIT_NAME}, LinkedIn`}
              className="group inline-flex items-center gap-2.5 text-caption text-zinc-600 transition-colors hover:text-zinc-950"
            >
              <span>
                Sitio web hecho por <span className="font-normal text-zinc-800 group-hover:text-zinc-950">{CREDIT_NAME}</span>
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full border border-black/15 text-zinc-700 transition-colors duration-200 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </span>
            </a>
            <a href="#top" className="text-caption text-zinc-700 transition-colors hover:text-zinc-950">
              Volver arriba ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
