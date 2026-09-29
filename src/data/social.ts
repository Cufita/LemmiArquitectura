import { brand } from './brand';

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

/**
 * Only accounts the studio actually runs. The previous list linked "instagram"
 * to YouTube and "twitter" to LinkedIn.
 */
export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: brand.instagram },
] as const;
