# 🧠 Governança e Inteligência Técnica — Mussarela Landing Showcase (3G Foods)

Este diretório centraliza os diagnósticos técnicos, histórico de decisões arquiteturais, alinhamentos estratégicos e planos de evolução da landing page.

---

## 📑 Índice de Documentos

1. **[CHANGELOG.md](file:///c:/INTEGRAFOODS/github/IF-3G-template-landingpage/IA/CHANGELOG.md)**
   * Registro histórico de todas as versões do projeto (**v1.0.0**, **v1.1.0** e **v2.0.0 SSG**).

2. **[01_investigacao_spa_vs_ssr_ec2.md](file:///c:/INTEGRAFOODS/github/IF-3G-template-landingpage/IA/01_investigacao_spa_vs_ssr_ec2.md)**
   * Diagnóstico detalhado de por que o projeto original (TanStack Start SSR) foi convertido para SPA (Vite/React).
   * Relação direta com a infraestrutura da EC2 (`177.71.204.112`), Nginx estático em `/var/www/ads_lps/` e pipeline de CI/CD.
   * Análise dos impactos no SEO orgânico e Quality Score do Google Ads.

3. **[02_plano_de_evolucao_ssg.md](file:///c:/INTEGRAFOODS/github/IF-3G-template-landingpage/IA/02_plano_de_evolucao_ssg.md)**
   * Arquitetura implementada para pré-renderização estática (SSG) sem necessidade de runtime Node.js na EC2.
   * Estrutura de dados estruturados (Schema.org / JSON-LD) e metatags canônicas.

4. **[03_blueprint_landingpage.md](file:///c:/INTEGRAFOODS/github/IF-3G-template-landingpage/IA/03_blueprint_landingpage.md)**
   * Blueprint arquitetural, estrutural e visual completo da landing page.
   * Wireframe ASCII de todas as seções, anatomia dos componentes, matriz de conversão e eventos de GA4/GTM.
   * Design system, tokens semânticos OKLCH e guia prático para criação de novas páginas a partir do template.
