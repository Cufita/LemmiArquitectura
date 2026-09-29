import { describe, expect, it } from 'vitest';
import { faqItems } from '../faq';
import { serviceLines } from '../services';
import { site } from '../site';

describe('faq', () => {
  it('has unique ids and complete answers', () => {
    expect(new Set(faqItems.map((i) => i.id)).size).toBe(faqItems.length);
    for (const item of faqItems) {
      expect(item.question.endsWith('?')).toBe(true);
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });
});

describe('services', () => {
  it('covers selling, buying and building', () => {
    expect(serviceLines.map((s) => s.id)).toEqual(['venta', 'compra', 'llave-en-mano']);
    for (const line of serviceLines) expect(line.bullets.length).toBe(3);
  });
});

describe('site metadata', () => {
  it('targets architecture studios in Mar del Plata', () => {
    expect(site.title).toMatch(/arquitectura/i);
    expect(site.title).toContain('Mar del Plata');
    expect(site.description).toContain('Mar del Plata');
  });

  it('keeps title and description within what search results show', () => {
    expect(site.title.length).toBeLessThanOrEqual(65);
    expect(site.description.length).toBeLessThanOrEqual(175);
  });
});
