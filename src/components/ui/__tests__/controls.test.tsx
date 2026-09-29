import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Project } from '../../../data/projects';
import type { Testimonial } from '../../../data/testimonials';
import Avatar from '../Avatar';
import BeforeAfter from '../BeforeAfter';
import Button from '../Button';
import ProjectGallery from '../ProjectGallery';
import TestimonialCarousel from '../TestimonialCarousel';

describe('Avatar', () => {
  it('shows up to two initials, hidden from screen readers', () => {
    const { container } = render(<Avatar name="Mariana Gómez Paz" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.textContent).toBe('MG');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('uses the photograph when a client supplied one', () => {
    render(<Avatar name="Diego Ferrari" src="/d.webp" />);
    expect(screen.getByRole('img', { name: 'Diego Ferrari' }).getAttribute('src')).toBe('/d.webp');
  });
});

describe('Button', () => {
  it('renders a link when given an href, with an optional arrow', () => {
    const { container } = render(
      <Button href="#obras" showArrow variant="outline">
        Ver
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Ver' }).getAttribute('href')).toBe('#obras');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders a button that fires onClick', () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} variant="ghost">
        Enviar
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('BeforeAfter', () => {
  const setup = () => {
    const utils = render(<BeforeAfter before="/a.webp" after="/b.webp" alt="Plaza" />);
    const root = utils.container.firstElementChild as HTMLElement;
    root.getBoundingClientRect = () =>
      ({ left: 0, width: 200, top: 0, height: 100, right: 200, bottom: 100, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    return { root, slider: screen.getByRole('slider') };
  };

  it('starts centred and moves with the keyboard', () => {
    const { slider } = setup();
    expect(slider.getAttribute('aria-valuenow')).toBe('50');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('52');
    fireEvent.keyDown(slider, { key: 'ArrowLeft', shiftKey: true });
    expect(slider.getAttribute('aria-valuenow')).toBe('42');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
    fireEvent.keyDown(slider, { key: 'a' });
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
  });

  it('follows the pointer while dragging and stops on release', () => {
    const { root, slider } = setup();
    fireEvent.pointerDown(root, { button: 0, clientX: 50 });
    expect(slider.getAttribute('aria-valuenow')).toBe('25');
    fireEvent.pointerMove(window, { clientX: 150 });
    expect(slider.getAttribute('aria-valuenow')).toBe('75');
    fireEvent.pointerMove(window, { clientX: 999 });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');
    fireEvent.pointerUp(window);
    fireEvent.pointerMove(window, { clientX: 20 });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');
  });

  it('ignores secondary buttons and can be dragged from the handle', () => {
    const { root, slider } = setup();
    fireEvent.pointerDown(root, { button: 2, clientX: 10 });
    expect(slider.getAttribute('aria-valuenow')).toBe('50');
    fireEvent.pointerDown(slider, { button: 2 });
    fireEvent.pointerDown(slider, { button: 0 });
    fireEvent.pointerMove(window, { clientX: 40 });
    expect(slider.getAttribute('aria-valuenow')).toBe('20');
    fireEvent.pointerCancel(window);
  });
});

const project = {
  id: 'p1',
  title: 'Casa Bosque',
  kind: 'Vivienda',
  location: 'Mar del Plata',
  year: '2024',
  surface: '180 m²',
  summary: 'Resumen',
  images: ['/1.webp', '/2.webp', '/3.webp'],
} as unknown as Project;

describe('ProjectGallery', () => {
  it('renders nothing without a project', () => {
    render(<ProjectGallery project={null} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('navigates by button, thumbnail, keyboard and swipe, and closes with Escape', () => {
    const onClose = vi.fn();
    render(<ProjectGallery project={project} onClose={onClose} />);
    expect(screen.getByRole('dialog', { name: /casa bosque/i })).toBeTruthy();
    expect(screen.getByRole('img', { name: /imagen 1 de 3/ })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Imagen siguiente' }));
    expect(screen.getByRole('img', { name: /imagen 2 de 3/ })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Imagen anterior' }));
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByRole('img', { name: /imagen 3 de 3/ })).toBeTruthy();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.click(screen.getByRole('button', { name: 'Ver imagen 2 de 3' }));
    expect(screen.getByRole('img', { name: /imagen 2 de 3/ })).toBeTruthy();

    const stage = screen.getByRole('img', { name: /imagen 2 de 3/ }).parentElement as HTMLElement;
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 0 }] });
    fireEvent.touchStart(stage, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100 }] });
    expect(screen.getByRole('img', { name: /imagen 3 de 3/ })).toBeTruthy();
    fireEvent.touchStart(stage, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 200 }] });
    expect(screen.getByRole('img', { name: /imagen 2 de 3/ })).toBeTruthy();
    fireEvent.touchStart(stage, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 110 }] });
    expect(screen.getByRole('img', { name: /imagen 2 de 3/ })).toBeTruthy();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes from the button or the backdrop, and locks page scroll while open', () => {
    const onClose = vi.fn();
    const { unmount } = render(<ProjectGallery project={project} onClose={onClose} />);
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
    fireEvent.click(screen.getByRole('dialog'));
    fireEvent.click(screen.getByRole('heading', { name: 'Casa Bosque' }));
    expect(onClose).toHaveBeenCalledTimes(2);
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('traps focus with Tab', () => {
    render(<ProjectGallery project={project} onClose={() => {}} />);
    const buttons = screen.getAllByRole('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    last.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
    first.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(window, { key: 'Tab' });
  });

  it('hides navigation for a single image and omits missing metadata', () => {
    const single = { ...project, year: undefined, surface: undefined, images: ['/1.webp'] } as unknown as Project;
    render(<ProjectGallery project={single} onClose={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Imagen siguiente' })).toBeNull();
  });
});

const quotes: Testimonial[] = [
  { id: 'a', name: 'Ana Uno', role: 'Compró', content: 'Uno' },
  { id: 'b', name: 'Beto Dos', role: 'Vendió', content: 'Dos' },
  { id: 'c', name: 'Cami Tres', role: 'Construyó', content: 'Tres' },
];

describe('TestimonialCarousel', () => {
  it('pages with arrows (wrapping) and with the segments', () => {
    render(<TestimonialCarousel items={quotes} />);
    expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Recomendación anterior' }));
    expect(screen.getAllByRole('tab')[2].getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Recomendación siguiente' }));
    expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true');
  });

  it('advances when the running segment finishes, and pauses on hover and focus', () => {
    const { container } = render(<TestimonialCarousel items={quotes} interval={100} />);
    const region = screen.getByRole('region');
    const fill = () => container.querySelector('[style*="lemmi-fill"]') as HTMLElement;
    expect(fill().style.animationPlayState).toBe('running');
    fireEvent.mouseEnter(region);
    expect(fill().style.animationPlayState).toBe('paused');
    fireEvent.mouseLeave(region);
    fireEvent.focus(region);
    expect(fill().style.animationPlayState).toBe('paused');
    fireEvent.blur(region);
    // jsdom has no CSS animations, so React never wires up `animationend`;
    // call the handler React attached instead of dispatching the event.
    const el = fill();
    const propsKey = Object.keys(el).find((k) => k.startsWith('__reactProps$')) as string;
    act(() => {
      (el as unknown as Record<string, { onAnimationEnd: () => void }>)[propsKey].onAnimationEnd();
    });
    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true');
  });
});
