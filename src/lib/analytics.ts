// Camada fina de tracking: envia eventos para o dataLayer (GTM) e gtag (GA4),
// se existirem. Nunca envia PII (nome, telefone, e-mail, CNPJ).
import { CAMPAIGN_NAME, PAGE_VARIANT } from "@/data/landing";

type Params = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Params[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    campaign_name: CAMPAIGN_NAME,
    page_variant: PAGE_VARIANT,
    ...params,
  };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.("event", event, payload);
}

/** Preserva UTMs e demais parâmetros de campanha ao sair para a loja. */
export function withCampaignParams(url: string) {
  if (typeof window === "undefined") return url;
  try {
    const current = new URLSearchParams(window.location.search);
    const target = new URL(url, window.location.origin);
    current.forEach((value, key) => {
      if (/^(utm_|gclid|wbraid|gbraid|gad_)/i.test(key) && !target.searchParams.has(key)) {
        target.searchParams.set(key, value);
      }
    });
    return target.toString();
  } catch {
    return url;
  }
}
