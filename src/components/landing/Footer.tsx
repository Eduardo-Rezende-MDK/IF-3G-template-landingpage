import logoBranco from "@/assets/logos/logo_horizontal-branco.png";
import { CtaLink } from "./CtaLink";
import { CATEGORY_URL, SIGNUP_URL, STORE_URL } from "@/data/landing";

export function Footer() {
  return (
    <footer className="bg-ink py-12 text-ink-foreground">
      <div className="container-page flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <img
            src={logoBranco}
            alt="3G Foods Distribuidora Food Service"
            width={168}
            height={48}
            className="h-9 w-auto"
            loading="lazy"
            decoding="async"
          />
          <p className="mt-4 text-sm text-ink-foreground/80">
            Distribuidora food service que atende negócios de alimentação no Estado de São Paulo.
            Disponibilidade, preço e condições de entrega são confirmados por CEP.
          </p>
        </div>
        <nav aria-label="Links úteis" className="flex flex-col gap-2 text-sm">
          <CtaLink
            href={STORE_URL}
            ctaName="footer_loja"
            ctaLocation="footer"
            destinationType="store"
            variant="quiet"
            className="text-brand justify-start"
          >
            Loja 3G Foods
          </CtaLink>
          <CtaLink
            href={CATEGORY_URL}
            ctaName="footer_categoria"
            ctaLocation="footer"
            destinationType="category"
            variant="quiet"
            className="text-brand justify-start"
          >
            Mussarela e laticínios
          </CtaLink>
          <CtaLink
            href={SIGNUP_URL}
            ctaName="footer_cadastro"
            ctaLocation="footer"
            destinationType="signup"
            extraEvent={{ name: "begin_signup", params: { source_location: "footer" } }}
            variant="quiet"
            className="text-brand justify-start"
          >
            Cadastro empresarial
          </CtaLink>
        </nav>
      </div>
      <div className="container-page mt-10 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/70">
        © {new Date().getFullYear()} 3G Foods. Conteúdo de campanha B2B. Imagens ilustrativas.
      </div>
    </footer>
  );
}
