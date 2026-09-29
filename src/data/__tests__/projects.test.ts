import { describe, expect, it } from 'vitest';
import { projects } from '../projects';

describe('projects', () => {
  it('has unique ids', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every work a name, a place and at least one photo', () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe('');
      expect(project.location).toContain('Mar del Plata');
      expect(project.images.length).toBeGreaterThan(0);
      expect(project.images.every((src) => typeof src === 'string' && src.length > 0)).toBe(true);
    }
  });

  it('does not repeat a photo inside one gallery', () => {
    for (const project of projects) {
      expect(new Set(project.images).size).toBe(project.images.length);
    }
  });
});
