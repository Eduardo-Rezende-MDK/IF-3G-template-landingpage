# Fluxo oficial de publicação

Este repositório é o **template-base evolutivo**. O workflow local valida e compila a landing, mas não faz deploy directo e não exige secrets de servidor.

## Nova landing

Cada campanha deve nascer num repositório próprio a partir da release aprovada mais recente:

```bash
git clone --branch v1.1.0 https://github.com/Eduardo-Rezende-MDK/IF-3G-template-landingpage.git IF-3G-lp-minha-campanha
```

A campanha deve configurar `src/data/landing.config.json`, executar `npm run validate:campaign` e `npm run build`, e fazer push para o seu repositório próprio. O workflow `Validar landing page` confirma o build e os artefactos, sem pedir `EC2_SSH_KEY`, `EC2_HOST` ou `EC2_USER`.

## Publicação na EC2

A Rita ou o agente executor deve então preparar a pasta da campanha no repositório central:

`Eduardo-Rezende-MDK/3g-ads-landingpages/<slug>/`

O nome da pasta corresponde ao slug público. O workflow central mantém os três secrets da EC2 num único local e publica todas as subpastas em `/var/www/ads_lps/`. O utilizador não precisa adicionar secrets para cada nova campanha.

## Separação de responsabilidades

O template recebe apenas melhorias comuns de arquitectura, componentes, validação, performance, SEO e tracking. O repositório da campanha recebe copy, imagens, produtos, preços, URLs, claims e personalizações específicas. O repositório central recebe apenas o artefacto/source aprovado para publicação e o slug correspondente.

## Checklist da Rita

1. Criar o repositório próprio a partir da release aprovada.
2. Configurar a campanha e validar dados reais.
3. Executar build e QA no repositório próprio.
4. Copiar a campanha para a pasta `<slug>/` do repositório central de deploy.
5. Fazer push no repositório central.
6. Acompanhar o workflow central.
7. Verificar a URL pública e os assets.
8. Reportar commit, workflow, URL e pendências.
