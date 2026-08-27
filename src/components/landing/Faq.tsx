import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/landing";

export function Faq() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="faq-title">
      <div className="container-page max-w-3xl">
        <h2 id="faq-title" className="text-3xl font-bold sm:text-4xl">
          Dúvidas sobre mussarela no atacado
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {faq.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
