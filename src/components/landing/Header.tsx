import logoAmarelo from "@/assets/logos/logo_horizontal-color.png";
import { CtaLink } from "./CtaLink";
import { CATEGORY_URL } from "@/data/landing";

export function TrustBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-center text-xs font-semibold uppercase tracking-wide sm:text-sm">
        <span>Distribuidora food service em São Paulo e Campinas</span>
        <span aria-hidden="true" className="hidden text-primary-foreground/40 sm:inline">
          |
        </span>
        <span>Atendimento para empresas (CNPJ)</span>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink text-ink-foreground">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <a href="#conteudo" className="flex items-center" aria-label="3G Foods, página inicial">
          <img
            src={logoAmarelo}
            alt="3G Foods Distribuidora Food Service"
            width={252}
            height={72}
            className="h-9 w-auto sm:h-12 lg:h-14"
            decoding="async"
          />
        </a>
        <nav aria-label="Ações principais" className="flex items-center gap-2 sm:gap-4">
          <CtaLink
            href={CATEGORY_URL}
            ctaName="comprar_agora_header"
            ctaLocation="header"
            destinationType="category"
            size="sm"
          >
            Comprar agora
          </CtaLink>
        </nav>
      </div>
      <TrustBar />
    </header>
  );
}
