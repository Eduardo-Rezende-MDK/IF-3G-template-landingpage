# 🚀 IF-3G-template-landingpage

> **Template Oficial de Landing Pages B2B da 3G Foods**  
> Arquitetura moderna com **React 19 + Vite + Tailwind CSS + SSG (Static Site Generation)**, pré-renderização nativa no build para SEO máximo e compatibilidade total com o Nginx da EC2 (`loja.3gfoods.com.br/ads/*`).

---

## 🌟 Diferenciais & Arquitetura Técnica

```
                    CICLO DE VIDA DA LANDING PAGE
                    
  1. Configuração do Conteúdo (src/data/landing.ts)
                    │
                    ▼
  2. Build com SSG (npm run build)
     ├─► vite build (Gera assets estáticos com base: './')
     ├─► vite build --ssr (Compila bundle SSR em memória)
     └─► scripts/prerender.mjs (Injeta HTML renderizado + Schema.org em dist/index.html)
                    │
                    ▼
  3. Deploy Automático na EC2 (3g-ads-landingpages)
     └─► Sincroniza dist/ para /var/www/ads_lps/[slug]/
                    │
                    ▼
  4. https://loja.3gfoods.com.br/ads/[slug]/
     ├─► HTML 100% preenchido para Googlebot e Bingbot (First Byte)
     ├─► FCP (First Contentful Paint) < 0.5s
     └─► Hidratação suave via React hydrateRoot no cliente
```

---

## 📁 Estrutura do Projeto

```text
IF-3G-template-landingpage/
│
├── IA/                              # Governança, diagnósticos e specs
│   ├── README.md
│   ├── CHANGELOG.md
│   └── 01_investigacao_spa_vs_ssr_ec2.md
│
├── public/                          # Favicon e robots.txt
│
├── scripts/
│   └── prerender.mjs                # Pipeline de pré-renderização SSG + Schema.org
│
├── src/
│   ├── assets/                      # Logos e imagens institucionais
│   ├── components/
│   │   ├── landing/                 # Seções da LP (Hero, ProductGrid, FAQ, etc.)
│   │   └── ui/                      # Componentes Radix UI / Tailwind
│   ├── data/
│   │   └── landing.ts               # 🎯 ARQUIVO PRINCIPAL DE DADOS DA LP
│   ├── hooks/
│   ├── lib/                         # Analytics (GTM/dataLayer) e utilitários
│   ├── App.tsx                      # Componente raiz da Landing Page
│   ├── main.tsx                     # Ponto de entrada com hidratação (hydrateRoot)
│   └── styles.css                   # Tailwind CSS e tokens visuais
│
├── index.html                       # HTML base com GTM e metatags
├── package.json                     # Scripts de build SSG
└── vite.config.ts                   # Configuração Vite com base: './'
```

---

## 🛠️ Como Criar uma Nova Landing Page

### 1. Clonar ou Copiar este Template
Copie esta pasta para o slug desejado (ex: `contra-file`, `hamburguer-artesanal`, etc.):

```bash
git clone https://github.com/Eduardo-Rezende-MDK/IF-3G-template-landingpage.git contra-file
cd contra-file
npm install
```

### 2. Customizar os Dados da Campanha (`src/data/landing.ts`)
Edite apenas o arquivo [`src/data/landing.ts`](file:///src/data/landing.ts) para trocar:
* Título, eyebrow e subtítulo do Hero.
* Lista de produtos com imagens, nomes e preços por quilo.
* Seções de aplicações para food service (pizzarias, hamburguerias, restaurantes).
* Dúvidas frequentes (FAQ).
* Links da loja oficial (`loja.3gfoods.com.br/busca/...`).

### 3. Ajustar as Metatags e Canonical Tag (`index.html`)
No arquivo `index.html`, atualize:
```html
<title>[TÍTULO DA LP] | 3G Foods</title>
<meta name="description" content="[DESCRIÇÃO DA LP]">
<link rel="canonical" href="https://loja.3gfoods.com.br/ads/[SLUG-DA-LP]">
```

### 4. Testar Localmente
```bash
npm run dev
```

### 5. Compilar com SSG (Static Site Generation)
```bash
npm run build
```
O script compilará a aplicação e gerará o `dist/index.html` com mais de 30 KB contendo **100% do HTML pré-renderizado** e os dados estruturados **Schema.org**.

Você pode pré-visualizar a versão de produção com:
```bash
npm run preview
```

### 6. Publicação em Produção (EC2)
Copie a pasta da sua nova LP para o repositório [`3g-ads-landingpages`](https://github.com/Eduardo-Rezende-MDK/3g-ads-landingpages):
```bash
cp -r . C:/INTEGRAFOODS/github/3g-ads-landingpages/[slug-da-lp]
cd C:/INTEGRAFOODS/github/3g-ads-landingpages
git add -A
git commit -m "feat: adicionar landing page [slug-da-lp]"
git push origin main
```
O GitHub Actions compilará automaticamente com SSG e fará o deploy via SSH para a EC2 em menos de 30 segundos!

---

## 📊 Rastreamento & Analytics (Google Tag Manager)

O template já vem com o container oficial da 3G Foods (`GTM-PNBB7STW`) integrado e dispara automaticamente os seguintes eventos no `window.dataLayer`:

| Evento | Quando dispara | Parâmetros |
| :--- | :--- | :--- |
| `view_landing_[categoria]` | Ao carregar a página (uma vez por sessão) | `page_location` |
| `click_cta` | Ao clicar em qualquer botão de compra ou contato | `cta_label`, `destination_url` |

---

## 📜 Licença & Governança

Projeto mantido pela equipe de engenharia e marketing digital da **3G Foods / IntegraFoods**.
