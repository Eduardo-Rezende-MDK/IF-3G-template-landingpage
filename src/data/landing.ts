import config from "./landing.config.json";

export type SeoConfig = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  lang: string;
};

export type HeroConfig = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  microcopy: string;
};

export type Product = {
  productId: string;
  product_id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  priceLabel: string;
  destinationUrl: string;
  trackingLabel: string;
};

export type SectionType =
  "hero" | "products" | "applications" | "howToBuy" | "stats" | "reasons" | "faq" | "finalCta";

export type SectionConfig = {
  id: string;
  type: SectionType;
  enabled?: boolean;
};

export type LandingConfig = Omit<typeof config, "sections"> & {
  sections: SectionConfig[];
};

export const landingConfig: LandingConfig = config;
export const CAMPAIGN_NAME = config.campaignName;
export const PAGE_VARIANT = config.pageVariant;
export const VIEW_EVENT = config.viewEvent;
export const GA4_MEASUREMENT_ID = config.ga4MeasurementId;
export const GTM_CONTAINER_ID = config.gtmContainerId;
export const STORE_URL = config.storeUrl;
export const CATEGORY_URL = config.categoryUrl;
export const SIGNUP_URL = config.signupUrl;
export const CANONICAL_URL = config.canonicalUrl;
export const seo: SeoConfig = config.seo;
export const hero: HeroConfig = config.hero;
export const applications = config.applications;
export const reasons = config.reasons;
export const steps = config.steps;
export const stats = config.stats;
export const faq = config.faq;
export const products: Product[] = config.products.map((product) => ({
  ...product,
  product_id: product.productId,
}));
