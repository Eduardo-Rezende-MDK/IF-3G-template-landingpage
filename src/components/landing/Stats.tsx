import { stats } from "@/data/landing";

export function Stats() {
  return (
    <section className="bg-ink py-14 text-ink-foreground lg:py-20" aria-labelledby="prova-title">
      <div className="container-page">
        <h2 id="prova-title" className="text-3xl font-bold sm:text-4xl">
          Uma operação de distribuição food service
        </h2>
        <p className="mt-3 max-w-2xl text-ink-foreground/80">
          Números institucionais da 3G Foods. Prazo, estoque e condições de entrega são confirmados
          por CEP e por pedido.
        </p>
        <dl className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-extrabold text-brand">{stat.value}</span>
                <span className="mt-1 block text-sm text-ink-foreground/80">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
