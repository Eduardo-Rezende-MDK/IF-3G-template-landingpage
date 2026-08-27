# Publicar a landing page pelo repositório

A landing page (`/mussarela-atacado`) é uma app **TanStack Start com SSR**, ou seja: o build gera
um servidor + os assets estáticos. Não existe pasta `build/` de site estático — é por isso que o
código "que gera a publicação" não estava aparente.

## 1. Build local

```sh
npm ci          # ou: bun install
npm run build
```

Saída gerada:

| Pasta                       | Conteúdo                                              |
| --------------------------- | ----------------------------------------------------- |
| `dist/client`               | assets estáticos (JS, CSS, imagens)                   |
| `dist/server/index.mjs`     | servidor SSR (por padrão em formato Cloudflare Worker) |
| `dist/server/wrangler.json` | config de deploy do Worker já preenchida               |

Pré-visualizar exatamente o que foi buildado:

```sh
npm run preview
```

Abrir em `http://localhost:4173/mussarela-atacado`.

## 2. Deploy

O ambiente do Lovable publica esse mesmo build em Cloudflare Workers. Para reproduzir:

### Cloudflare Workers (mesmo runtime do lovable.app)

```sh
npx wrangler deploy --config dist/server/wrangler.json
```

Antes disso, edite o campo `name` em `dist/server/wrangler.json` (ou defina
`--name mussarela-landing`) para o nome do Worker desejado.

### Node.js (VPS / Docker / Render / Railway)

```sh
NITRO_PRESET=node-server npm run build
node dist/server/index.mjs
```

O servidor sobe em `http://localhost:3000` (variável `PORT` para trocar).

### Netlify / Vercel

```sh
NITRO_PRESET=netlify npm run build
NITRO_PRESET=vercel  npm run build
```

Nas duas plataformas basta apontar o build command para o comando acima; o preset já gera a
estrutura esperada por cada host.

## 3. Deploy automático via GitHub Actions

O workflow `.github/workflows/deploy.yml` roda a cada push na branch `main` e publica em
Cloudflare Workers. Configure em **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN` — token com permissão *Edit Cloudflare Workers*
- `CLOUDFLARE_ACCOUNT_ID` — ID da conta Cloudflare

## Observações

- A rota canônica é `/mussarela-atacado`; `/` redireciona/apresenta a mesma landing.
- Não edite `src/routeTree.gen.ts` (arquivo gerado no build).
- O ID de analytics (`G-7CQV85CBHN`) está em `src/routes/__root.tsx`.
