import { useEffect, useRef } from "react";
import { CtaLink } from "./CtaLink";
import { track } from "@/lib/analytics";
import { CATEGORY_URL, products } from "@/data/landing";

export function ProductGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            track("view_item_list", {
              item_list_name: "Mussarelas food service",
              items: products.map((product, index) => ({
                item_id: product.product_id,
                item_name: product.name,
                item_brand: product.brand,
                index: index + 1,
              })),
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mussarelas"
      ref={sectionRef}
      className="scroll-mt-20 py-14 lg:py-20"
      aria-labelledby="grelha-title"
    >
      <div className="container-page">
        <h2 id="grelha-title" className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Mussarelas disponíveis na loja 3G Foods
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Preços por quilo conforme a loja oficial. Sujeitos a alteração, disponibilidade e
          confirmação por CEP.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <li
              key={product.product_id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="eyebrow text-muted-foreground">Frios e laticínios</span>
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="mt-3 text-2xl font-extrabold text-foreground">
                  {product.priceLabel}
                </p>
                <CtaLink
                  href={product.destinationUrl}
                  ctaName={product.trackingLabel}
                  ctaLocation="product_card"
                  destinationType="product"
                  eventParams={{ product_id: product.product_id, position: index + 1 }}
                  extraEvent={{
                    name: "select_product",
                    params: {
                      product_id: product.product_id,
                      product_name: product.name,
                      brand: product.brand,
                      position: index + 1,
                    },
                  }}
                  className="mt-5 w-full"
                >
                  Comprar
                </CtaLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-muted-foreground">
            Quer ver o catálogo completo de laticínios e frios da 3G Foods?
          </p>
          <CtaLink
            href={CATEGORY_URL}
            ctaName="ver_categoria_pos_grelha"
            ctaLocation="after_grid"
            destinationType="category"
          >
            Ver na loja
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
