import { CtaLink } from "./CtaLink";
import { CATEGORY_URL, finalCta } from "@/data/landing";

export function FinalCta() {
  return (
    <section
      className="border-y border-border bg-surface py-14 lg:py-20"
      aria-labelledby="cta-final-title"
    >
      <div className="container-page max-w-3xl text-center">
        <h2 id="cta-final-title" className="text-3xl font-bold sm:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{finalCta.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaLink
            href={CATEGORY_URL}
            ctaName="comprar_agora_final"
            ctaLocation="final_cta"
            destinationType="category"
            size="lg"
          >
            {finalCta.cta}
          </CtaLink>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{finalCta.microcopy}</p>
      </div>
    </section>
  );
}
