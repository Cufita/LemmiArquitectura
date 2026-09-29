import { describe, expect, it } from 'vitest';
import { brand, whatsappLink, whatsappMessages } from '../brand';

describe('whatsappLink', () => {
  it('points at the studio number', () => {
    expect(whatsappLink()).toContain(`phone=${brand.whatsappNumber}`);
  });

  it('encodes the opener so accents and spaces survive', () => {
    const url = whatsappLink(whatsappMessages.venta);
    expect(url).toContain(`text=${encodeURIComponent(whatsappMessages.venta)}`);
    expect(url).not.toContain(' ');
  });

  it('has an opener for every path the page offers', () => {
    for (const key of ['general', 'venta', 'compra', 'llaveEnMano'] as const) {
      expect(whatsappMessages[key].length).toBeGreaterThan(10);
    }
  });
});
