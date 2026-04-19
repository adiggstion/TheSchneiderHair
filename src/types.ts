

export interface SectionProps {
  HeightRatio?: number;
  SectionType?: SectionType;
  CustomStyle?: string ;
  minHeight?: string ;
  id?: string;
}

export const SectionTypes = {
  header: 'section-header',
  hero: 'section-hero',
  authority: 'section-authority',
  about: 'section-about',
  services: 'section-services',
  gallery: 'section-gallery',
  experience: 'section-experience',
  location: 'section-location',
  footer: 'section-footer',
} as const;

export type SectionType = typeof SectionTypes[keyof typeof SectionTypes];

// src/layouts/index.ts
export { default as Layout }            from './layouts/Layout.astro';
export { default as HeaderLayout }      from './layouts/HeaderLayout.astro';
export { default as HeroLayout }        from './layouts/HeroLayout.astro';
export { default as AuthorityLayout }   from './layouts/AuthorityLayout.astro';
export { default as AboutLayout }       from './layouts/AboutLayout.astro';
export { default as ServicesLayout }    from './layouts/ServicesLayout.astro';
export { default as GalleryLayout }     from './layouts/GalleryLayout.astro';
export { default as ExperienceLayout }  from './layouts/ExperienceLayout.astro';
export { default as LocationLayout }    from './layouts/LocationLayout.astro';
export { default as FooterLayout }      from './layouts/FooterLayout.astro';