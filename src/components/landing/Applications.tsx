import { applications } from "@/data/landing";

export function Applications() {
  return (
    <section className="border-y border-border bg-surface py-14 lg:py-20" aria-labelledby="aplicacoes-title">
      <div className="container-page">
        <h2 id="aplicacoes-title" className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Aplicações por tipo de negócio
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((item) => (
            <article key={item.title} className="rounded-xl border border-border bg-card p-6">
              <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-brand" />
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
