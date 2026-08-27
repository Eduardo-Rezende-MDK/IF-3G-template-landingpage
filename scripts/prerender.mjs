import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const htmlPath = path.join(distDir, "index.html");
const configPath = path.join(rootDir, "src", "data", "landing.config.json");
const tempSsrDir = path.join(rootDir, ".temp-ssr");
const ssrBundlePath = path.join(tempSsrDir, "App.js");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildStructuredData(config) {
  const storeId = `${config.storeUrl}#store`;
  const graph = [
    {
      "@type": "WholesaleStore",
      "@id": storeId,
      name: "3G Foods - Distribuidora Food Service",
      url: config.storeUrl,
      logo: config.seo.ogImage,
      description: config.structuredData.storeDescription,
      areaServed: config.structuredData.areaServed,
      ...(config.structuredData.paymentAccepted
        ? { paymentAccepted: config.structuredData.paymentAccepted }
        : {}),
      ...(config.structuredData.priceRange ? { priceRange: config.structuredData.priceRange } : {}),
    },
    {
      "@type": "ItemList",
      "@id": `${config.canonicalUrl}#products`,
      name: config.hero.headline,
      numberOfItems: config.products.length,
      itemListElement: config.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: product.destinationUrl,
        item: {
          "@type": "Product",
          "@id": `${product.destinationUrl}#product`,
          name: product.name,
          image: product.image,
          brand: { "@type": "Brand", name: product.brand },
          category: "Alimentos e Bebidas",
          url: product.destinationUrl,
        },
      })),
    },
  ];

  if (config.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${config.canonicalUrl}#faq`,
      mainEntity: config.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

async function prerender() {
  console.log("[SSG] Iniciando pré-renderização da campanha configurada...");
  if (!fs.existsSync(configPath)) throw new Error(`Configuração não encontrada: ${configPath}`);
  if (!fs.existsSync(htmlPath))
    throw new Error(`HTML base não encontrado: ${htmlPath}. Execute vite build primeiro.`);
  if (!fs.existsSync(ssrBundlePath))
    throw new Error(`Bundle SSR não encontrado: ${ssrBundlePath}.`);

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const appModule = await import(`file://${ssrBundlePath}`);
  const App = appModule.default || appModule;
  const appHtml = renderToString(React.createElement(App));
  let html = fs.readFileSync(htmlPath, "utf8");
  const rootPlaceholder = '<div id="root"></div>';
  if (!html.includes(rootPlaceholder))
    throw new Error('Placeholder <div id="root"></div> não encontrado.');
  html = html.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`);

  const replacements = {
    __LANDING_LANG__: config.seo.lang,
    __LANDING_TITLE__: config.seo.title,
    __LANDING_DESCRIPTION__: config.seo.description,
    __LANDING_CANONICAL__: config.canonicalUrl,
    __LANDING_OG_TITLE__: config.seo.ogTitle,
    __LANDING_OG_DESCRIPTION__: config.seo.ogDescription,
    __LANDING_OG_IMAGE__: config.seo.ogImage,
    __LANDING_GTM_ID__: config.gtmContainerId,
  };
  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.replaceAll(placeholder, escapeHtml(value));
  }

  const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(buildStructuredData(config))}</script>`;
  html = html.replace("</head>", `${jsonLdTag}\n</head>`);
  if (html.includes("__LANDING_"))
    throw new Error("Existem placeholders de campanha por substituir no HTML final.");
  fs.writeFileSync(htmlPath, html, "utf8");
  fs.rmSync(tempSsrDir, { recursive: true, force: true });
  console.log(`SSG concluído: ${(Buffer.byteLength(html, "utf8") / 1024).toFixed(2)} KB.`);
}

prerender().catch((error) => {
  console.error("SSG falhou:", error);
  process.exit(1);
});
