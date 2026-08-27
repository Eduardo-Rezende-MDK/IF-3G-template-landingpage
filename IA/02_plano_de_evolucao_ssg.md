# 🛠️ Plano Técnico de Evolução: Implementação de SSG (Prerendering) & Otimização de SEO

> **Objetivo:** Transformar o build atual em **SSG (Static Site Generation)**, garantindo que o `dist/index.html` já contenha todo o HTML pré-renderizado no servidor de build, sem alterar a infraestrutura estática do Nginx na EC2.

---

## 🎯 1. Arquitetura da Solução SSG

```
                  ┌────────────────────────────────────────┐
                  │           GITHUB ACTIONS / BUILD       │
                  │                                        │
                  │  1. Compila os componentes React       │
                  │  2. Renderiza <App /> via SSR Build   │
                  │  3. Injeta o HTML em dist/index.html   │
                  │  4. Injeta Schema JSON-LD & Metatags   │
                  └───────────────────┬────────────────────┘
                                      │ (Gera dist/ estático)
                                      ▼
                  ┌────────────────────────────────────────┐
                  │             AWS EC2 (Nginx)            │
                  │                                        │
                  │  /var/www/ads_lps/mussarela-.../       │
                  │  - index.html (com HTML 100% preenchido)│
                  │  - assets/ (JS/CSS minificados)        │
                  └───────────────────┬────────────────────┘
                                      │
                 ┌────────────────────┴────────────────────┐
                 │                                         │
                 ▼                                         ▼
   [Googlebot / Bingbot / Crawlers]                [Usuários Reais]
   - Lê H1, H2, FAQs, Produtos e textos          - FCP instantâneo
   - Sem fila de renderização JS                 - Hidratação suave com React
   - Indexação orgânica máxima                   - Interatividade 100% preservada
```

---

## 📋 2. Etapas Técnicas Propostas

### 2.1. Hidratação Dual (`src/main.tsx`)
Ajustar o ponto de entrada do React para usar `ReactDOM.hydrateRoot` quando o HTML já vier pré-renderizado, com fallback para `createRoot`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```

### 2.2. Script de Pré-Renderização no Build (`prerender.ts` ou plugin Vite)
Criar um script executado pós-build que:
1. Carrega o bundle do componente `<App />`.
2. Executa `renderToString(<App />)`.
3. Injeta a string HTML dentro da `<div id="root">` do `dist/index.html`.
4. Injeta os metadados e scripts necessários.

### 2.3. Enriquecimento de SEO Estruturado (Schema.org / JSON-LD)
Adicionar tags `ld+json` diretamente no `<head>` do `index.html`:
* `WholesaleStore` / `Organization` (3G Foods Atacadista de Alimentos).
* `Product` / `OfferCatalog` (Muçarela Peça 4kg para Pizzarias e Restaurantes).
* `FAQPage` (Perguntas e respostas sobre pedido mínimo, frete em SP e Campinas, formas de pagamento).

---

## 📈 3. Benefícios Esperados

1. **Zero impacto na EC2:** O Nginx continua servindo arquivos estáticos sem precisar de processos Node ou PM2.
2. **SEO Orgânico Nota 10:** Robôs de busca capturam imediatamente todas as palavras-chave (`mussarela atacado`, `pizzarias sp`, `campinas`, `preço 4kg`).
3. **Core Web Vitals Impecável:** O First Contentful Paint (FCP) cai para menos de 0.5s pois o texto já é exibido antes de carregar o JavaScript.
4. **Índice de Qualidade no Google Ads:** Pontuação máxima de velocidade e relevância de destino.
