import heroPizzaria from "@/assets/hero-pizzaria.jpg";
import { CtaLink } from "./CtaLink";
import { CATEGORY_URL, hero } from "@/data/landing";

export function Hero() {
  return (
    <section className="relative isolate bg-ink" aria-labelledby="hero-title">
      <img
        src={heroPizzaria}
        alt="Pizzaria artesanal com forno a lenho, mussarela fresca e pizza margherita"
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
      />

      <div className="container-page relative flex min-h-[520px] items-center py-20 lg:min-h-[600px] lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-brand">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-4xl leading-[1.05] font-extrabold text-ink-foreground sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">{hero.subheadline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink
              href="#mussarelas"
              ctaName={hero.ctaPrimary}
              ctaLocation="hero"
              destinationType="anchor"
              variant="onDark"
              size="lg"
            >
              {hero.ctaPrimary}
            </CtaLink>
            <CtaLink
              href={CATEGORY_URL}
              ctaName={hero.ctaSecondary}
              ctaLocation="hero"
              destinationType="category"
              variant="outlineOnDark"
              size="lg"
            >
              {hero.ctaSecondary}
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-ink-foreground/70">{hero.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
