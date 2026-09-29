import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('has a single H1 that says what the studio does and where', () => {
    render(<HeroSection />);
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toMatch(/vender, comprar o construir/i);
    expect(h1[0].textContent).toContain('Mar del Plata');
  });

  it('names the studio and the city in the lead, for search', () => {
    render(<HeroSection />);
    expect(screen.getByText(/estudio de arquitectura en Mar del Plata/i)).toBeTruthy();
  });

  it('offers a WhatsApp action and a way to browse the work', () => {
    render(<HeroSection />);
    expect(screen.getByRole('link', { name: /coordinar visita sin cargo/i }).getAttribute('href')).toContain('whatsapp');
    expect(screen.getByRole('link', { name: /ver obras/i }).getAttribute('href')).toBe('#obras');
  });

  it('describes the photograph', () => {
    render(<HeroSection />);
    expect(screen.getByRole('img').getAttribute('alt')).toMatch(/LEMMI arquitectura/);
  });
});
