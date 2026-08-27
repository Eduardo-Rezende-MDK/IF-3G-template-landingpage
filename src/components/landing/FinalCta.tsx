import { CtaLink } from "./CtaLink";
import { CATEGORY_URL } from "@/data/landing";

export function FinalCta() {
  return (
    <section className="border-y border-border bg-surface py-14 lg:py-20" aria-labelledby="cta-final-title">
      <div className="container-page max-w-3xl text-center">
        <h2 id="cta-final-title" className="text-3xl font-bold sm:text-4xl">
          Pronto para abastecer a sua operação?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Veja as opções de mussarela, confirme o atendimento na sua região e conclua o pedido
          online na loja oficial da 3G Foods.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaLink
            href={CATEGORY_URL}
            ctaName="comprar_agora_final"
            ctaLocation="final_cta"
            destinationType="category"
            size="lg"
          >
            Comprar agora
          </CtaLink>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Atendimento para empresas | Consulte regiões e condições de entrega
        </p>
      </div>
    </section>
  );
}
