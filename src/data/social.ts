export interface SocialLink {
    readonly id: string;
    readonly href: string;
    readonly icon: string;
  }
  
  export const socialLinks: SocialLink[] = [
    { id: 'facebook', href: "https://www.facebook.com/", icon: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/i2RPgtOPDYoQpanXiZ7aAvxI8j8.svg" },
    { id: 'twitter', href: "https://www.linkedin.com/", icon: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/LlN2QI2t5NPERnasaXD1DGaFC4.svg" },
    { id: 'instagram', href: "https://www.youtube.com/", icon: "https://c.animaapp.com/mfcy9o7uz0QDGJ/assets/rcDl3mPAWECqUKIhdzsWdzeOAbc.svg" }
  ] as const;
  