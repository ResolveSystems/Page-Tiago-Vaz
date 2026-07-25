# Tiago Vaz — Landing Page (Next.js + TypeScript)

Stack: **Next.js 14 (App Router) · TypeScript · TailwindCSS · Framer Motion · shadcn/ui (Radix) · Zod**

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Para build de produção:

```bash
npm run build
npm run start
```

## Formulário de Diagnóstico → CSV local

Cada envio do formulário é validado, sanitizado e gravado como uma linha em
`data/leads.csv`, na raiz do projeto (`lib/csv-storage.ts`). O arquivo é criado
automaticamente no primeiro envio, com cabeçalho:

```
data_hora,nome,empresa,segmento,whatsapp,email,funcionarios,desafio,objetivo
```

Para abrir os leads, basta abrir `data/leads.csv` no Excel, Google Sheets ou
qualquer editor de planilhas.

- A pasta `data/` está no `.gitignore` — os leads (dados pessoais) nunca vão para
  o controle de versão.
- Depois do envio, a pessoa vê uma mensagem de agradecimento na própria página
  (não há envio de e-mail de confirmação nesta versão).

**⚠️ Limitação importante para escolher onde hospedar**: gravar em CSV depende de
um sistema de arquivos persistente. Funciona bem em hospedagem tradicional (VPS,
servidor próprio, Docker, Railway, Render). **Não funciona de forma confiável na
Vercel** (e em serverless em geral) — lá o disco é efêmero e cada requisição pode
cair numa instância diferente, sem enxergar o arquivo escrito por outra. Se for
hospedar na Vercel, troque `lib/csv-storage.ts` por um banco de dados (Postgres,
Supabase, Google Sheets via API etc.) antes de ir pra produção.

## Google Tag Manager

Usa o pacote oficial `@next/third-parties` (mantido pela própria equipe do Next.js) em vez de
colar o script manualmente — ele injeta o script e o `<noscript>` de fallback nos lugares certos
automaticamente, evitando problemas de hidratação. Configurado em `app/layout.tsx`:

```tsx
import { GoogleTagManager } from "@next/third-parties/google";
// ...
<GoogleTagManager gtmId="GTM-MM6JQFVK" />
```

Se precisar trocar o container do GTM, o ID está na constante `GTM_ID` no topo de `app/layout.tsx`.

A CSP (`next.config.js`) já libera `googletagmanager.com` e `google-analytics.com` em
`script-src`, `img-src`, `connect-src` e `frame-src` — se dentro do seu container GTM você
configurar outras tags (Meta Pixel, LinkedIn Insight, etc.), vai precisar liberar os domínios
delas na CSP também, ou elas serão bloqueadas silenciosamente pelo navegador.

## Segurança do formulário

O endpoint `/api/diagnostico` aplica, em camadas:

1. **Verificação de origem** — rejeita requisições cujo `Origin`/`Referer` não seja o seu domínio.
2. **Rate limiting por IP** — no máximo 5 envios por minuto por IP (`lib/rate-limit.ts` — em
   memória, por processo; para múltiplas instâncias em produção, troque por Upstash Redis ou
   Vercel KV).
3. **Validação de schema (Zod)** — mesmo schema no client e no server.
4. **Honeypot** — campo invisível (`website`) que só um bot preenche; se vier preenchido, a
   resposta finge sucesso, sem denunciar a armadilha.
5. **Checagem de tempo mínimo** — o client rejeita envios feitos em menos de 2 segundos após a
   página carregar.
6. **Sanitização** — remove tags HTML e caracteres de controle de todos os campos de texto livre.
7. **Headers de segurança** (`next.config.js`) — CSP, HSTS, `X-Frame-Options: DENY`,
   `X-Content-Type-Options: nosniff`, `Cache-Control: no-store` nas rotas de API.

## SEO

- Metadata API do Next.js (`app/layout.tsx`): title/description, Open Graph completo, Twitter
  Card, canonical, robots.
- `robots.ts` e `sitemap.ts` gerados automaticamente pelo Next.js.
- JSON-LD: `ProfessionalService` + `FAQPage` (rich snippets de FAQ no Google).
- **Ação necessária**: troque `https://tiagovaz.com.br` pelo domínio real em `app/layout.tsx`,
  `app/robots.ts`, `app/sitemap.ts` e `app/api/diagnostico/route.ts` (lista `ALLOWED_ORIGINS`)
  se o domínio final for diferente. Gere também um `/images/og-cover.jpg` definitivo (1200×630)
  — hoje usa sua foto como placeholder.

## Performance (mirando 95+ no Lighthouse)

- Fontes via `next/font` — self-hosted no build, sem requisição externa em runtime, sem layout shift.
- `next/image` na foto da seção "Quem sou" — AVIF/WebP automático, tamanhos responsivos, lazy loading.
- Seções abaixo da dobra carregadas via `next/dynamic` (code-splitting) em `app/page.tsx`.
- Sem 3D/WebGL — elimina a maior fonte de Total Blocking Time de versões anteriores.

Meça sempre contra o **build de produção** (`npm run build && npm run start`), nunca `npm run dev`.

## Tema claro/escuro

Via classe `.light` na tag `<html>` + variáveis CSS (`app/globals.css`), com script inline no
`<head>` (`app/layout.tsx`) que aplica o tema antes da hidratação (evita flash de tema errado).

## Responsividade

Mobile-first em todos os componentes, menu hambúrguer animado abaixo de `md`, grids bento que
colapsam para 1–2 colunas em telas pequenas.

## Estrutura

```
app/
  layout.tsx, page.tsx, globals.css, robots.ts, sitemap.ts
  api/diagnostico/route.ts     → endpoint do formulário (validação + segurança + grava CSV)
components/
  ui/                          → Button, Input, Textarea, Select, Accordion, Label (shadcn/ui)
  sections/                    → cada seção da página
  nav.tsx, theme-*.tsx, whatsapp-float.tsx, motion-reveal.tsx
lib/
  utils.ts, validation.ts, rate-limit.ts
  csv-storage.ts               → grava cada lead em data/leads.csv
public/images/                 → sua foto já otimizada
data/                          → criado automaticamente no primeiro envio (leads.csv)
```

## Pendências conhecidas

- [ ] Rodar `npm install` antes do primeiro `npm run dev`/`build`.
- [ ] Trocar domínio placeholder `tiagovaz.com.br` se for diferente do real.
- [ ] Gerar `/images/og-cover.jpg` definitivo (1200×630).
- [ ] Seção de depoimentos ("Provas") foi removida até você ter depoimentos reais — o componente
      `components/sections/provas.tsx` foi apagado; quando tiver depoimentos verdadeiros, é só
      recriar a seção e voltar a importá-la em `app/page.tsx`.
- [ ] Se for hospedar na Vercel (ou outro serverless), trocar `lib/csv-storage.ts` por um banco
      de dados antes de ir pra produção (ver aviso acima).
