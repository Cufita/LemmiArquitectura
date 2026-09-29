import { describe, expect, it } from 'vitest';
import { brand } from '../brand';
import { clients } from '../clients';
import { heroStats } from '../hero';
import { instagramProfile, reels } from '../instagram';
import { navigationLinks } from '../navigation';
import { socialLinks } from '../social';
import { team } from '../team';
import { testimonials } from '../testimonials';

const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe('site collections', () => {
  it('gives every collection unique ids', () => {
    for (const list of [clients, heroStats, reels, navigationLinks, socialLinks, team, testimonials]) {
      expect(list.length).toBeGreaterThan(0);
      expect(unique(list.map((item) => item.id))).toBe(true);
    }
  });

  it('points every navigation link at an in-page anchor', () => {
    for (const link of navigationLinks) {
      expect(link.href).toBe(`#${link.id}`);
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it('only links to accounts the studio runs', () => {
    expect(socialLinks.map((s) => s.href)).toEqual([brand.instagram]);
    expect(instagramProfile).toBe(brand.instagram);
  });

  it('names and describes each client, linking out only over https', () => {
    for (const client of clients) {
      expect(client.name && client.work && client.logo).toBeTruthy();
      if (client.href) expect(client.href.startsWith('https://')).toBe(true);
    }
  });

  it('gives every reel a poster and a playable source', () => {
    for (const reel of reels) {
      expect(reel.poster).toBeTruthy();
      expect(reel.full ?? reel.loop).toBeTruthy();
    }
  });

  it('has a photo, name and role for each team member', () => {
    for (const member of team) {
      expect(member.name && member.role && member.image).toBeTruthy();
    }
  });

  it('keeps the hero claims short enough to scan', () => {
    for (const stat of heroStats) {
      expect(stat.value.length).toBeLessThan(40);
      expect(stat.label.length).toBeGreaterThan(0);
    }
  });

  it('keeps every testimonial substantial', () => {
    for (const t of testimonials) {
      expect(t.name && t.role).toBeTruthy();
      expect(t.content.length).toBeGreaterThan(20);
    }
  });
});
