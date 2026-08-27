import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { Applications } from "@/components/landing/Applications";
import { HowToBuy } from "@/components/landing/HowToBuy";
import { Stats } from "@/components/landing/Stats";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { track } from "@/lib/analytics";

export default function App() {
  useEffect(() => {
    if (sessionStorage.getItem("view_landing_mussarela") === "1") return;
    sessionStorage.setItem("view_landing_mussarela", "1");
    track("view_landing_mussarela", { page_location: window.location.href });
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <ProductGrid />
        <Applications />
        <HowToBuy />
        <Stats />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
