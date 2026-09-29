import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { whatsappLink, whatsappMessages } from '../../../data/brand';
import Badge from '../Badge';
import WhatsAppCTA, { WhatsAppFloating } from '../WhatsAppCTA';
import Wordmark from '../Wordmark';

describe('Badge', () => {
  it('renders its label in both tones', () => {
    render(
      <>
        <Badge>Servicios</Badge>
        <Badge tone="dark">En Instagram</Badge>
      </>,
    );
    expect(screen.getByText('Servicios')).toBeTruthy();
    expect(screen.getByText('En Instagram').className).toContain('text-white');
  });
});

describe('WhatsAppCTA', () => {
  it('opens WhatsApp with the given opener in a new tab', () => {
    render(<WhatsAppCTA message={whatsappMessages.compra}>Revisar</WhatsAppCTA>);
    const link = screen.getByRole('link', { name: /revisar/i });
    expect(link.getAttribute('href')).toBe(whatsappLink(whatsappMessages.compra));
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('has a floating shortcut for phones', () => {
    render(<WhatsAppFloating />);
    expect(screen.getByRole('link', { name: /whatsapp/i }).getAttribute('href')).toContain('whatsapp.com');
  });
});

describe('Wordmark', () => {
  it('is labelled for screen readers', () => {
    render(<Wordmark />);
    expect(screen.getByRole('img', { name: 'LEMMI arquitectura' })).toBeTruthy();
  });

  it('switches to white on dark grounds', () => {
    render(<Wordmark tone="light" />);
    expect(screen.getByRole('img').getAttribute('class')).toContain('text-white');
  });
});
