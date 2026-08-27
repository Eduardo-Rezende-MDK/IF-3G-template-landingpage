import type { ComponentType } from "react";
import { Applications } from "./Applications";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Hero } from "./Hero";
import { HowToBuy } from "./HowToBuy";
import { ProductGrid } from "./ProductGrid";
import { Reasons } from "./Reasons";
import { Stats } from "./Stats";

export type SectionType =
  "hero" | "products" | "applications" | "howToBuy" | "stats" | "reasons" | "faq" | "finalCta";

export type SectionDefinition = {
  id: string;
  type: SectionType;
  enabled?: boolean;
};

const sectionRegistry: Record<SectionType, ComponentType> = {
  hero: Hero,
  products: ProductGrid,
  applications: Applications,
  howToBuy: HowToBuy,
  stats: Stats,
  reasons: Reasons,
  faq: Faq,
  finalCta: FinalCta,
};

export function SectionRenderer({ section }: { section: SectionDefinition }) {
  if (section.enabled === false) return null;
  const Component = sectionRegistry[section.type];
  if (!Component) return null;
  return <Component key={section.id} />;
}
