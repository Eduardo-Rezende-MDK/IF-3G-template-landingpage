# 🔍 Relatório de Investigação: Origem da Mudança para SPA, Infraestrutura EC2 e Impacto em SEO

> **Projeto:** Landing Page de Muçarela Atacado para Food Service (3G Foods)  
> **URL Oficial em Produção:** `https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas/`  
> **Servidor de Produção:** AWS EC2 (`177.71.204.112`)  
> **Data do Diagnóstico:** 26/08/2026  

---

## 📌 1. Resumo Executivo & Conclusão Direta

A sua suspeita inicial está **100% confirmada tecnicamente**:

1. **O projeto original era SSR:** Inicializado no Lovable com **TanStack Start + Nitro** (`@tanstack/react-start`, `@tanstack/react-router`, `nitro`), projetado para rodar sob um runtime de servidor (Cloudflare Workers ou Node.js).
2. **O motivo da mudança para SPA:** A infraestrutura de produção na EC2 (`177.71.204.112`) hospeda o e-commerce principal (`c3g-web` em Vue 3/Vike) e foi configurada no Nginx para servir as Landing Pages como **arquivos estáticos puros** no diretório `/var/www/ads_lps/`. Não havia suporte na EC2 para gerenciar processos de servidor Node.js/Nitro dedicados para cada subpasta de Landing Page.
3. **A alteração feita no commit `96cb6f7`:** O projeto foi convertido para **SPA (Client-Side Rendering)** com Vite (`@vitejs/plugin-react`) e `base: './'` para que o comando `npm run build` gerasse uma pasta `dist/` com `index.html` estático, compatível com o Nginx da EC2.
4. **O efeito colateral no SEO:** Embora o `index.html` tenha metatags básicas no `<head>`, o `<body>` servido pelo Nginx entrega apenas `<div id="root"></div>`. Todo o conteúdo rico (títulos `<h1>`/`<h2>`, lista de queijos, tabelas, FAQs, argumentos de venda e dados estruturados) depende da execução de JavaScript no navegador, prejudicando o rastreamento orgânico e o tempo de renderização em conexões móveis.

---

## 🏛️ 2. Mapeamento da Infraestrutura na EC2 e Especificações (`IF_GADS`)

A partir da análise dos documentos em `C:\INTEGRAFOODS\github\marduka.ia\IF_GADS` (especialmente `IA_MDK/knowledge/mkt_digital/specs/arquitetura_lps_lovable_3g.md` e `TAREFA_3G_ADS.md`), identificamos a seguinte arquitetura:

### 2.1. Roteamento no Nginx da EC2
O Nginx do domínio `loja.3gfoods.com.br` foi configurado para tratar a rota `/ads/` através de um `alias` para um diretório local estático:

```nginx
# Bloco Nginx em /etc/nginx/sites-available/loja.3gfoods.com.br
location /ads/ {
    alias /var/www/ads_lps/;
    index index.html;
    try_files $uri $uri/ =404;
}
```

### 2.2. Pipeline de CI/CD e Publicação
O fluxo automatizado no GitHub Actions (`.github/workflows/deploy.yml`) realiza:
1. `npm ci`
2. `npm run build`
3. Sincronização via `rsync`/SSH da pasta compilada `dist/` diretamente para `/var/www/ads_lps/mussarela-atacado-sp-campinas/`.

```
[Lovable / GitHub] 
       │
       ▼ (npm run build)
   [dist/] (Arquivos Estáticos: index.html + assets)
       │
       ▼ (Deploy SSH / Rsync)
[AWS EC2: /var/www/ads_lps/mussarela-atacado-sp-campinas/]
       │
       ▼ (Nginx entrega arquivo estático)
[Navegador / Googlebot: https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas/]
```

---

## ⚠️ 3. Por que o SSR Original falhava na EC2?

O projeto gerado pelo Lovable utilizava **TanStack Start**, que não gera um site estático por padrão:
* O `npm run build` do TanStack Start gerava `dist/server/index.mjs` (um servidor Nitro/H3) e `dist/client/`.
* Para rodar SSR na EC2, seria necessário:
  1. Instalar e manter um gerenciador de processos (ex: `PM2` ou `Systemd`) para cada landing page rodando em portas distintas (ex: `localhost:3001`, `localhost:3002`).
  2. Configurar o Nginx com `proxy_pass` dinâmico para cada landing page.
  3. Consumir memória RAM e CPU constantes na EC2 para sustentar os servidores Node.js.

Para contornar essa complexidade e permitir criar dezenas de landing pages sem tocar no Nginx, a equipe adotou a diretriz do **Prompt Mestre Técnico do Lovable** descrita em `IF_GADS`:
> *"No arquivo `vite.config.ts`, configure: `base: './'` e compile para pasta `dist/` estática."*

Isso converteu a aplicação em SPA tradicional, simplificando o deploy para cópia de arquivos estáticos, mas sacrificando a renderização no servidor.

---

## 📊 4. Diagnóstico Técnico do Impacto em SEO & Tráfego Pago

| Aspecto | No SSR Original (TanStack Start) | No SPA Atual (Vite CSR) | Impacto Real |
| :--- | :--- | :--- | :--- |
| **HTML Inicial Entregue** | HTML completo com todos os textos, FAQs e produtos dentro do `<body>`. | `<div id="root"></div>` (vazio). | 🔴 **Negativo:** Bots que não executam JS não leem o conteúdo. |
| **Indexação Googlebot** | Indexação imediata no primeiro passe (*First Wave*). | Vai para a fila de renderização JS (*Two-Wave Indexing*). | 🟡 **Atraso:** Pode demorar dias para reconhecer alterações de copy e palavras-chave. |
| **Outros Buscadores (Bing, Yahoo, DuckDuckGo)** | Suporte completo. | Suporte deficiente / parcial a SPAs pesados. | 🔴 **Negativo:** Perda de tráfego orgânico alternativo. |
| **Preview em Mensageiros (WhatsApp, Telegram)** | Leitura imediata de metadados e conteúdo. | Depende estritamente das tags estáticas do `<head>`. | 🟡 **Neutro/Atenuado:** Funciona porque o `index.html` possui metatags manuais. |
| **First Contentful Paint (FCP)** | Imediato (navegador renderiza o texto antes do JS carregar). | Atrasado (exige download, parse e execução do bundle JS). | 🔴 **Negativo:** Piora métricas de Core Web Vitals. |
| **Google Ads (Quality Score)** | Experiência de página ultrarrápida em conexões 3G/4G. | Maior tempo de bloqueio (TBT) em dispositivos móveis modestos. | 🟡 **Moderado:** Pode encarecer levemente o CPC em leilões concorridos. |

---

## 🚀 5. A Solução Definitiva: SSG (Static Site Generation / Prerender)

Para resolver o problema de SEO **sem exigir nenhuma mudança de infraestrutura na EC2** (mantendo o Nginx estático e o deploy via SSH intactos), a estratégia recomendada é o **SSG / Prerendering no Build**:

### Como funciona o SSG:
1. No momento em que o GitHub Actions roda `npm run build`:
   * O Vite compila a aplicação React.
   * Um script de pré-renderização renderiza o componente `<App />` para HTML estático usando `react-dom/server` (`renderToString`).
   * O HTML resultante com todos os H1, seções, produtos, FAQs e Schema JSON-LD é injetado diretamente dentro do `<div id="root">...</div>` do arquivo `dist/index.html`.
2. O resultado publicado na EC2 continua sendo um simples conjunto de **arquivos estáticos**.
3. Quando qualquer usuário ou crawler acessa `https://loja.3gfoods.com.br/ads/mussarela-atacado-sp-campinas/`:
   * O Nginx entrega instantaneamente o HTML 100% preenchido com todos os textos e tags (FCP instantâneo e SEO 100% indexável).
   * O React no navegador faz a hidratação (*hydrateRoot*) de forma transparente para manter a interatividade (carrosséis, cliques de analytics, FAQ expansível).

---

## 🎯 6. Próximos Passos de Alinhamento

1. [x] Criação do repositório de conhecimento em `IA/`.
2. [x] Documentação da causa-raiz e da relação com a infraestrutura EC2.
3. [ ] Avaliação conjunta da implementação de **Prerendering SSG** no build do Vite.
4. [ ] Injeção de dados estruturados **Schema.org (Product, FAQPage, WholesaleStore)** para potencializar o SEO no atacado de muçarela.
