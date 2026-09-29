import type { ReactNode } from 'react';
import { whatsappLink, whatsappMessages } from '../../data/brand';

interface WhatsAppCTAProps {
  children: ReactNode;
  /** Prefilled opener so the studio knows which block the person came from. */
  message?: string;
  variant?: 'solid' | 'outline' | 'light';
  className?: string;
}

const variants = {
  solid: 'bg-zinc-900 text-white hover:bg-black',
  outline: 'border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white',
  light: 'bg-white text-zinc-900 hover:bg-zinc-100',
} as const;

function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

/**
 * Every conversion on this page ends in WhatsApp, because that is where the
 * studio actually answers.
 */
export default function WhatsAppCTA({
  children,
  message = whatsappMessages.general,
  variant = 'solid',
  className = '',
}: WhatsAppCTAProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200 md:px-7 ${variants[variant]} ${className}`}
    >
      <WhatsAppGlyph className="h-[1.125rem] w-[1.125rem] shrink-0" />
      <span>{children}</span>
    </a>
  );
}

/**
 * Persistent reach on small screens, where the header CTA scrolls away.
 * Hidden on desktop, where the header keeps its own button in view.
 */
export function WhatsAppFloating() {
  return (
    <a
      href={whatsappLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
