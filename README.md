# IF-3G-template-landingpage

> **Template oficial evolutivo de Landing Pages B2B da 3G Foods.**
>
> Este repositório é a base técnica mantida pela equipa. Pode e deve receber melhorias de componentes, performance, SEO, tracking, acessibilidade, validação e governança. **Não é o repositório de desenvolvimento de uma campanha específica.** Cada nova landing page deve ser criada num repositório novo a partir de uma versão deste template.

## Modelo de governança

O fluxo correcto é:

```text
TEMPLATE BASE (este repositório)
        │
        ├── melhorias comuns, correcções e novas capacidades
        │
        └── copiar uma versão aprovada
                    │
                    ▼
          NOVO REPOSITÓRIO DA CAMPANHA
          ├── configuração e copy próprios
          ├── assets próprios
          ├── branch e deploy próprios
          └── sem desenvolvimento da campanha no template base
```

O template evolui através de pull requests e versões identificáveis. Uma landing não deve ser desenvolvida directamente na `main` deste repositório. A configuração actual de mussarela funciona como **campanha de demonstração e fixture de QA**; ao criar uma nova landing, ela deve ser substituída no novo repositório, não alterada aqui para servir a campanha.

## O que é reutilizável

A base fornece componentes React, estilos Tailwind, estrutura de dados por campanha, cards de produto, hero, aplicações, passos, estatísticas, FAQ, CTA, footer, tracking via dataLayer, preservação de UTMs, pré-renderização estática e geração de Schema.org configurada.

A base não garante automaticamente que uma nova landing terá bons dados, imagens, links, copy, claims, tracking ou mobile. A Rita deve validar cada cópia com a fonte de verdade da campanha e só aprovar a publicação depois do QA.

## Estrutura

```text
IF-3G-template-landingpage/
├── IA/                              # decisões e governança
├── public/                          # favicon, robots e assets públicos
├── scripts/
│   ├── prerender.mjs                # SSG configurado pela campanha
│   └── validate-campaign.mjs        # validação executada no build
├── src/
│   ├── components/landing/          # componentes reutilizáveis
│   ├── data/
│   │   ├── landing.config.json      # configuração da campanha fixture
│   │   └── landing.ts               # adaptador tipado para os componentes
│   ├── lib/                         # analytics e utilitários
│   ├── App.tsx
│   └── styles.css
├── index.html                       # placeholders preenchidos no prerender
├── package.json
└── vite.config.ts
```

## Como criar uma nova landing

### 1. Actualizar o template primeiro

Partir de uma tag, release ou commit aprovado. Não copiar alterações locais incompletas. Registar no novo repositório a versão de origem, por exemplo `template-source: IF-3G-template-landingpage@v1.1.0`.

### 2. Criar um repositório novo

O repositório da campanha deve ter nome próprio, por exemplo `IF-3G-lp-mussarela`, `IF-3G-lp-frios` ou `IF-3G-lp-carnes`. A campanha deve ser desenvolvida, testada e publicada nesse novo repositório.

Uma cópia inicial pode ser feita com:

```bash
git clone https://github.com/Eduardo-Rezende-MDK/IF-3G-template-landingpage.git IF-3G-lp-nova-campanha
cd IF-3G-lp-nova-campanha
rm -rf .git
git init
git remote add origin git@github.com:Eduardo-Rezende-MDK/IF-3G-lp-nova-campanha.git
npm install
```

Alternativamente, a equipa pode usar um template de GitHub ou criar um repositório novo a partir deste repositório. O ponto obrigatório é que o novo repositório tenha histórico, configuração, assets e deploy próprios.

### 3. Configurar a campanha

Editar `src/data/landing.config.json`. Esse ficheiro é a fonte única para nome da campanha, variante, GTM, URLs, canonical, metadata, hero, produtos, aplicações, estatísticas, FAQ e dados estruturados.

Não alterar directamente `scripts/prerender.mjs` para inserir nome, URL, preço, FAQ, prazo, frete ou claims da campanha. Se surgir uma necessidade comum a várias landings, melhorar o template-base e depois actualizar o novo repositório a partir de uma nova versão.

### 4. Validar e compilar

```bash
npm run validate:campaign
npm run build
npm run preview
```

O build falha quando faltam campos obrigatórios, URLs HTTPS, imagens, IDs, destinos ou quando são detectados placeholders de teste. A validação não substitui a confirmação comercial de preço, disponibilidade, stock, gramagem, região ou claims.

### 5. Fazer QA antes do deploy

Validar no mínimo: HTML pré-renderizado; CSS e fontes; imagens; title, description, canonical e Open Graph; schema; header e CTA; links para produto/categoria; UTMs; eventos; consentimento; acessibilidade; 360/390/430 px; desktop; navegador; CEP; cadastro; carrinho; checkout; e compra de teste quando autorizada.

### 6. Publicar no repositório de landing pages

O repositório novo deve gerar a pasta ou artefacto com o slug definido pelo pipeline de produção, sem copiar a campanha de volta para este template. O deploy deve ser independente e permitir rollback da campanha sem alterar o template-base.

## Como melhorar o template-base

Melhorias comuns devem ser feitas neste repositório através de branch e pull request. São apropriadas melhorias como novos componentes, correcções de acessibilidade, optimização de imagens, novas regras de validação, melhoria do prerender, eventos de analytics, tokens visuais da 3G Foods e suporte a novos tipos de página.

Uma melhoria não deve incluir copy, preço, SKU, imagem, URL, FAQ ou claim exclusivo de uma campanha. Esses dados pertencem ao repositório novo da campanha. A configuração de mussarela existente deve ser tratada como fixture de demonstração; se a arquitectura mudar, actualizar a fixture apenas para manter o template executável e testável.

## Versionamento recomendado

Usar tags semânticas para o template, por exemplo:

```text
v1.0.0  primeira base funcional
v1.1.0  nova capacidade compatível, como validação de campanha
v1.1.1  correcção sem alteração de interface
v2.0.0  alteração estrutural que exige migração das landings
```

Cada repositório de landing deve guardar a versão de origem e registar quais melhorias do template foram incorporadas. Não actualizar uma landing em produção automaticamente só porque o template-base mudou; testar e promover cada actualização de forma controlada.

## Comandos

| Comando                     | Uso                                                        |
| --------------------------- | ---------------------------------------------------------- |
| `npm run dev`               | Desenvolvimento local.                                     |
| `npm run validate:campaign` | Valida a configuração da campanha.                         |
| `npm run build`             | Valida, compila cliente/SSR e pré-renderiza HTML e schema. |
| `npm run preview`           | Pré-visualiza o build de produção.                         |
| `npm run lint`              | Executa o lint do projecto.                                |

## Responsabilidade da Rita

A Rita decide a rota de implementação, mantém o template tecnicamente saudável, valida cópias de campanha, bloqueia publicação com dados ou recursos quebrados e garante que novas landing pages são desenvolvidas em repositórios próprios. Lovable, Gemini, Webflow, Framer ou código próprio podem ser usados como auxiliares, mas a landing final deve passar pelo template controlado e pelo QA da Rita quando essa for a rota escolhida.

## Licença e manutenção

Repositório mantido pela equipa de engenharia e marketing digital da **3G Foods / IntegraFoods**. O conteúdo da campanha de demonstração não deve ser interpretado como catálogo ou oferta permanente; os dados comerciais devem ser confirmados antes de qualquer publicação.

## Extensibilidade por secções

O template utiliza um manifesto de secções em `src/data/landing.config.json`. A chave `sections` define a ordem e a activação dos blocos, enquanto `src/components/landing/SectionRenderer.tsx` encaminha cada tipo para o componente correspondente.

```json
"sections": [
  { "id": "hero", "type": "hero", "enabled": true },
  { "id": "products", "type": "products", "enabled": true },
  { "id": "reasons", "type": "reasons", "enabled": false },
  { "id": "faq", "type": "faq", "enabled": true }
]
```

Para personalizar uma nova campanha, alterar o manifesto no repositório próprio da landing. Para criar uma nova capacidade comum, adicionar um componente ao template-base, registá-lo no `SectionRenderer`, definir os dados e tipos necessários, adicionar validação e documentar a utilização. Não duplicar a lógica do `App.tsx` para resolver uma necessidade de uma campanha.

Uma melhoria comum deve entrar neste template através de branch e pull request. A configuração específica de campanha — copy, produtos, preços, imagens, URLs, FAQ, claims, ordem de secções e variantes — deve permanecer no repositório novo da campanha. Assim, o template pode evoluir continuamente sem ficar contaminado por decisões exclusivas de uma landing.
