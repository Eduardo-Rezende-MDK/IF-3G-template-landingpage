import { CtaLink } from "./CtaLink";
import { CEP_URL, SIGNUP_URL, steps } from "@/data/landing";

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      className="scroll-mt-20 border-y border-border bg-surface py-14 lg:py-20"
      aria-labelledby="como-comprar-title"
    >
      <div className="container-page">
        <h2 id="como-comprar-title" className="text-3xl font-bold sm:text-4xl">
          Como comprar
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">Comprar é simples.</p>

        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.label} className="rounded-xl border border-border bg-card p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink
            href={CEP_URL}
            ctaName="consultar_cep"
            ctaLocation="how_to_buy"
            destinationType="store"
            extraEvent={{ name: "cep_check_start", params: { source_location: "how_to_buy" } }}
          >
            Consultar atendimento pelo CEP
          </CtaLink>
          <CtaLink
            href={SIGNUP_URL}
            ctaName="criar_conta"
            ctaLocation="how_to_buy"
            destinationType="signup"
            extraEvent={{ name: "begin_signup", params: { source_location: "how_to_buy" } }}
            variant="outline"
          >
            Criar conta empresarial
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
