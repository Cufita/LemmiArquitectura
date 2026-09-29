import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ContactSection from './components/sections/ContactSection';
import FAQSection from './components/sections/FAQSection';
import PathsSection from './components/sections/PathsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ReelsSection from './components/sections/ReelsSection';
import TeamSection from './components/sections/TeamSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import { brand } from './data/brand';
import { clients } from './data/clients';
import { faqItems } from './data/faq';
import { reels } from './data/instagram';
import { navigationLinks } from './data/navigation';
import { projects } from './data/projects';
import { serviceLines } from './data/services';
import { team } from './data/team';

afterEach(() => {
  vi.useRealTimers();
  document.body.style.overflow = '';
});

describe('App', () => {
  it('renders every section, with a single h1', () => {
    render(<App />);
    for (const link of navigationLinks) {
      expect(document.getElementById(link.id), link.id).toBeTruthy();
    }
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders on the server without touching browser globals', () => {
    expect(renderToString(<App />)).toContain(brand.city);
  });
});

describe('Header', () => {
  it('opens the mobile menu with every link and closes it with Escape', async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const dialog = screen.getByRole('dialog', { name: 'Menú' });
    expect(within(dialog).getAllByRole('link')).toHaveLength(navigationLinks.length + 1);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(window, { key: 'Escape' });
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('closes the menu from its button and when a link is chosen', async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar menú' }));
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Equipo' }));
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('adds a divider once the page is scrolled', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(nav.className).not.toContain('shadow-[');
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(nav.className).toContain('shadow-[');
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });
});

describe('Footer', () => {
  it('lists phones as tel links, the Instagram account and the site credit', () => {
    render(<Footer />);
    const tels = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('tel:+54'));
    expect(tels).toHaveLength(brand.phones.length);
    expect(screen.getByRole('link', { name: new RegExp(brand.instagramHandle) }).getAttribute('href')).toBe(
      brand.instagram,
    );
    expect(screen.getByRole('link', { name: /sitio web hecho por/i }).getAttribute('href')).toContain('linkedin.com');
  });
});

describe('FAQSection', () => {
  it('opens the first answer and toggles the others', () => {
    render(<FAQSection />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(faqItems.length);
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(buttons[1]);
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(buttons[1]);
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
  });
});

describe('content sections', () => {
  it('lists the whole team with photos', () => {
    render(<TeamSection />);
    for (const member of team) expect(screen.getByRole('img', { name: member.name })).toBeTruthy();
  });

  it('shows each service line', () => {
    render(<PathsSection />);
    for (const line of serviceLines) expect(screen.getByText(line.label)).toBeTruthy();
    expect(screen.getByRole('link', { name: /hablá con nosotros/i }).getAttribute('href')).toContain('whatsapp');
  });

  it('shows the client wall, linking out only where there is a url', () => {
    render(<TestimonialsSection />);
    for (const client of clients) expect(screen.getByRole('img', { name: client.name })).toBeTruthy();
    const linked = clients.filter((c) => c.href).length;
    const external = screen.getAllByRole('link').filter((a) => a.getAttribute('rel')?.includes('noopener'));
    expect(external).toHaveLength(linked);
  });

  it('ends on a WhatsApp call to action', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { level: 2 }).getAttribute('aria-label')).toBe(
      'Coordinemos la visita sin cargo.',
    );
    expect(screen.getByRole('link', { name: /escribir por whatsapp/i }).getAttribute('href')).toContain('whatsapp');
  });
});

describe('ProjectsSection', () => {
  it('renders three runs of the projects and opens a gallery from a card', () => {
    render(<ProjectsSection />);
    const cards = screen.getAllByRole('button', { name: /ver la galería de/i, hidden: true });
    expect(cards).toHaveLength(projects.length * 3);
    fireEvent.click(cards[projects.length]);
    expect(screen.getByRole('dialog', { name: new RegExp(projects[0].title) })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
  });

  it('steps the track one project per click and loops back into the middle run', () => {
    const { container } = render(<ProjectsSection />);
    const track = container.querySelector('ul[aria-label="Obras realizadas"]') as HTMLUListElement;
    const width = 100;
    // jsdom clamps scrollLeft to 0 (no layout), so drive it by hand; cards sit
    // at fixed offsets in the content, so their viewport rects move with it.
    let scrollLeft = 0;
    Object.defineProperty(track, 'scrollLeft', { get: () => scrollLeft, configurable: true });
    [...track.querySelectorAll<HTMLElement>('[data-card]')].forEach((card, i) => {
      card.getBoundingClientRect = () => ({ left: i * width - scrollLeft }) as DOMRect;
    });
    track.getBoundingClientRect = () => ({ left: 0 }) as DOMRect;
    Object.defineProperty(track, 'clientWidth', { value: 250, configurable: true });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;

    fireEvent.click(screen.getByRole('button', { name: 'Obras siguientes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Obras anteriores' }));
    expect(scrollTo).toHaveBeenCalledTimes(2);

    vi.useFakeTimers();
    fireEvent.scroll(track);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: projects.length * width, behavior: 'instant' });

    scrollLeft = projects.length * 2 * width + 10;
    fireEvent.scroll(track);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: projects.length * width + 10, behavior: 'instant' });

    fireEvent(window, new Event('resize'));
    expect(scrollTo).toHaveBeenLastCalledWith({ left: projects.length * width, behavior: 'instant' });
  });
});

describe('ReelsSection', () => {
  const play = (title: string) => screen.getByRole('button', { name: `Reproducir con sonido: ${title}` });
  const see = (title: string) => screen.getByRole('button', { name: `Ver ${title}` });

  it('activates a card on hover, then opens the full video with sound', () => {
    render(<ReelsSection />);
    fireEvent.mouseEnter(see(reels[1].title));
    expect(play(reels[1].title)).toBeTruthy();

    fireEvent.click(see(reels[0].title));
    fireEvent.click(play(reels[0].title));
    const dialog = screen.getByRole('dialog', { name: reels[0].title });
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(dialog.querySelector('video') as Element);
    expect(screen.getByRole('dialog')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar video' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes the video with Escape and resets the active card when the pointer leaves', () => {
    const { container } = render(<ReelsSection />);
    fireEvent.focus(see(reels[2].title));
    fireEvent.mouseLeave(container.querySelector('ul[data-hscroll]') as Element);
    expect(play(reels[0].title)).toBeTruthy();

    fireEvent.click(play(reels[0].title));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('scrolls the row with the arrows and links out to Instagram', () => {
    const { container } = render(<ReelsSection />);
    const scroller = container.querySelector('ul[data-hscroll]') as HTMLElement;
    const scrollBy = vi.fn();
    scroller.scrollBy = scrollBy;
    fireEvent.click(screen.getByRole('button', { name: 'Ver siguientes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ver anteriores' }));
    expect(scrollBy).toHaveBeenNthCalledWith(1, { left: 280, behavior: 'smooth' });
    expect(scrollBy).toHaveBeenNthCalledWith(2, { left: -280, behavior: 'smooth' });
    expect(screen.getByRole('link', { name: /ver más videos/i }).getAttribute('href')).toBe(brand.instagram);
  });

  it('follows the centred card on touch screens', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;

    type Stub = { callback: IntersectionObserverCallback; targets: Element[] };
    const instances = (globalThis.IntersectionObserver as unknown as { instances: Stub[] }).instances;
    const before = instances.length;
    render(<ReelsSection />);
    const observer = instances.slice(before).find((o) => o.targets.some((t) => t.hasAttribute('data-reel-card')))!;
    expect(observer.targets).toHaveLength(reels.length);

    const entry = (target: Element, ratio: number, isIntersecting = true) =>
      ({ target, intersectionRatio: ratio, isIntersecting }) as IntersectionObserverEntry;
    const fire = (entries: IntersectionObserverEntry[]) =>
      act(() => observer.callback(entries, {} as IntersectionObserver));

    fire([entry(observer.targets[0], 0.5), entry(observer.targets[3], 0.95), entry(observer.targets[1], 1, false)]);
    expect(play(reels[3].title)).toBeTruthy();
    fire([entry(observer.targets[0], 1, false)]);
    fire([entry(document.createElement('li'), 1)]);
    expect(play(reels[3].title)).toBeTruthy();

    window.matchMedia = original;
  });
});
