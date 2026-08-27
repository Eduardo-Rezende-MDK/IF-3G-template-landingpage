import { reasons } from "@/data/landing";

export function Reasons() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="razoes-title">
      <div className="container-page">
        <h2 id="razoes-title" className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Por que comprar com a 3G Foods
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title} className="border-l-4 border-primary pl-5">
              <h3 className="text-lg font-bold">{reason.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{reason.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
