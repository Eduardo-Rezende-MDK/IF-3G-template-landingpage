import { useEffect } from "react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { SectionRenderer } from "@/components/landing/SectionRenderer";
import { landingConfig, VIEW_EVENT } from "@/data/landing";
import { track } from "@/lib/analytics";

export default function App() {
  useEffect(() => {
    const sessionKey = `${VIEW_EVENT}:sent`;
    if (sessionStorage.getItem(sessionKey) === "1") return;
    sessionStorage.setItem(sessionKey, "1");
    track(VIEW_EVENT, { page_location: window.location.href });
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
        {landingConfig.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
}
