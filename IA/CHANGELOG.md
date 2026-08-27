# 📦 Histórico de Versões & Changelog

Todas as alterações notáveis deste projeto são registradas neste documento, seguindo o padrão de **Versionamento Semântico (SemVer)** e diretrizes de governança técnica.

---

## [2.0.0] - 2026-08-26 — Implementação da Arquitetura SSG (Static Site Generation)

### 🌟 Adicionado
* **Pipeline de Build SSG (`scripts/prerender.mjs`):**
  * Script automatizado que compila e executa o bundle React no build via `renderToString`, injetando 100% do HTML estático no `dist/index.html`.
  * Injeção automática de dados estruturados **Schema.org (JSON-LD)** (`WholesaleStore`, `Product` e `FAQPage`).
* **Hidratação Inteligente no Cliente (`src/main.tsx`):**
  * Detecção de nós pré-renderizados com `ReactDOM.hydrateRoot`, mantendo a transição de renderização invisível para o usuário e garantindo interatividade total.
* **Governança em `IA/`:**
  * Diagnóstico de arquitetura e infraestrutura da EC2 (`IA/01_investigacao_spa_vs_ssr_ec2.md`).
  * Especificação de evolução técnica (`IA/02_plano_de_evolucao_ssg.md`).

### ⚡ Melhorias de Performance & SEO
* **SEO Orgânico Nota 10:** Robôs de busca (Googlebot, Bingbot, Yahoo) e crawlers de redes sociais recebem imediatamente todos os textos, `<h1>`, descrições, tabela de produtos e FAQs no primeiro byte.
* **First Contentful Paint (FCP):** O conteúdo textual é renderizado instantaneamente pelo navegador antes mesmo do carregamento e execução do JavaScript.
* **Zero Impacto na Infraestrutura da EC2:** Mantém a compatibilidade estática do Nginx (`alias /var/www/ads_lps/`) sem exigir processos de servidor Node.js/PM2 rodando na máquina.

---

## [1.1.0] - 2026-08-26 — Adaptação Estática para EC2 (SPA Vite)

### 🔄 Modificado
* Conversão da aplicação para SPA tradicional via `@vitejs/plugin-react` e `base: './'`.
* Criação de `index.html`, `src/main.tsx` e `src/App.tsx`.
* Ajuste da URL canônica para `https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas`.
* Integração direta do container oficial GTM (`GTM-PNBB7STW`).

---

## [1.0.0] - 2026-08-26 — Versão Inicial Lovable (TanStack Start SSR)

### 🚀 Inicialização
* Criação da Landing Page de Muçarela Atacado no Lovable.
* Arquitetura inicial fullstack baseada em **TanStack Start** (`@tanstack/react-start`, `@tanstack/react-router`) com servidor Nitro para deploy em Cloudflare Workers.
* Rotas declarativas em `src/routes/__root.tsx` e `src/routes/mussarela-atacado.tsx`.
