import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const tempSsrDir = path.join(rootDir, ".temp-ssr");
const htmlPath = path.join(distDir, "index.html");
const ssrBundlePath = path.join(tempSsrDir, "App.js");

async function prerender() {
  console.log("⚡ [SSG Prerender] Iniciando pré-renderização estática da Landing Page...");

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Arquivo HTML base não encontrado em: ${htmlPath}. Execute vite build primeiro.`);
  }

  if (!fs.existsSync(ssrBundlePath)) {
    throw new Error(`Bundle SSR não encontrado em: ${ssrBundlePath}. Execute vite build --ssr src/App.tsx primeiro.`);
  }

  // 1. Carrega o componente App do bundle SSR
  const appModule = await import(`file://${ssrBundlePath}`);
  const App = appModule.default || appModule;

  // 2. Renderiza o App para HTML estático
  let appHtml = renderToString(React.createElement(App));
  console.log(`✅ [SSG Prerender] Componente <App /> renderizado com sucesso (${appHtml.length} caracteres).`);

  // 3. Lê o index.html gerado pelo Vite
  let html = fs.readFileSync(htmlPath, "utf-8");

  // 4. Injeta o HTML dentro de <div id="root">
  const rootPlaceholder = '<div id="root"></div>';
  if (!html.includes(rootPlaceholder)) {
    throw new Error('Placeholder <div id="root"></div> não encontrado no index.html.');
  }

  // 4. Normaliza caminhos de assets gerados pelo SSR para caminhos relativos (./assets/...)
  // Isso é essencial para subpastas de produção como /ads/[slug]/
  appHtml = appHtml
    .replace(/src="\/assets\//g, 'src="./assets/')
    .replace(/href="\/assets\//g, 'href="./assets/')
    .replace(/src='\/assets\//g, "src='./assets/")
    .replace(/href='\/assets\//g, "href='./assets/");

  html = html.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`);

  // 5. Dados estruturados Schema.org (JSON-LD) para máxima relevância em SEO B2B
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WholesaleStore",
        "@id": "https://loja.3gfoods.com.br/#store",
        "name": "3G Foods - Distribuidora Food Service",
        "url": "https://loja.3gfoods.com.br/",
        "logo": "https://loja.3gfoods.com.br/assets/logo.png",
        "description": "Distribuidora de alimentos e laticínios para pizzarias, restaurantes, lanchonetes e padarias em São Paulo e Campinas.",
        "areaServed": [
          { "@type": "City", "name": "São Paulo", "sameAs": "https://pt.wikipedia.org/wiki/S%C3%A3o_Paulo" },
          { "@type": "City", "name": "Campinas", "sameAs": "https://pt.wikipedia.org/wiki/Campinas" },
          { "@type": "AdministrativeArea", "name": "Grande São Paulo" }
        ],
        "paymentAccepted": "Boleto Faturado PJ, Cartão de Crédito, PIX",
        "priceRange": "$$"
      },
      {
        "@type": "Product",
        "@id": "https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas/#product",
        "name": "Mussarela no Atacado para Pizzarias e Food Service (Peça 4kg)",
        "description": "Queijo mussarela em barra de 4kg com alto rendimento, derretimento uniforme e padrão industrial para pizzarias, lanchonetes e restaurantes.",
        "brand": { "@type": "Brand", "name": "3G Foods" },
        "category": "Alimentos e Bebidas > Laticínios > Queijos > Muçarela",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://loja.3gfoods.com.br/busca/1?termo=mussarela",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": { "@id": "https://loja.3gfoods.com.br/#store" }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual o pedido mínimo para comprar mussarela no atacado?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O pedido mínimo para entrega com frete grátis é de R$ 300,00 para São Paulo capital e Campinas e região."
            }
          },
          {
            "@type": "Question",
            "name": "Como funciona o faturamento para empresas (PJ)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Trabalhamos com faturamento via boleto a prazo (sujeito a análise de crédito do CNPJ), PIX e cartão de crédito."
            }
          },
          {
            "@type": "Question",
            "name": "Qual é o prazo de entrega em SP e Campinas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Entregas em até 24 a 48 horas úteis com frota refrigerada própria para manter o queijo na temperatura ideal."
            }
          }
        ]
      }
    ]
  };

  const jsonLdTag = `\n  <script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n  </script>`;

  // Injeta o Schema JSON-LD antes do </head>
  if (!html.includes('application/ld+json')) {
    html = html.replace("</head>", `${jsonLdTag}\n</head>`);
  }

  // 6. Grava o HTML final pré-renderizado
  fs.writeFileSync(htmlPath, html, "utf-8");
  console.log(`🎉 [SSG Prerender] dist/index.html gerado com sucesso! Tamanho final: ${(Buffer.byteLength(html, 'utf-8') / 1024).toFixed(2)} KB.`);

  // 7. Limpa a pasta temporária de SSR
  try {
    fs.rmSync(tempSsrDir, { recursive: true, force: true });
    console.log("🧹 [SSG Prerender] Diretório temporário .temp-ssr removido.");
  } catch (err) {
    console.warn("⚠️ [SSG Prerender] Não foi possível remover .temp-ssr:", err.message);
  }
}

prerender().catch((err) => {
  console.error("❌ [SSG Prerender Erro]:", err);
  process.exit(1);
});
