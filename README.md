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

## Planilha do Google (armazenamento dos leads)

Cada envio do formulário é validado, sanitizado e gravado como uma linha em uma Planilha Google
de sua escolha (`lib/google-sheets.ts`), usando a API oficial do Google via uma *service account*
(conta de serviço). Isso funciona normalmente na Vercel (ao contrário de gravar em CSV local, que
não é confiável em ambientes serverless).

### Passo a passo para configurar

**1. Criar a planilha**

Crie uma planilha nova no Google Sheets. Renomeie a primeira aba para `Leads` (ou o nome que
preferir — só precisa bater com a variável `GOOGLE_SHEETS_TAB_NAME`). Na primeira linha, adicione
o cabeçalho, exatamente nesta ordem:

```
data_hora | nome | empresa | segmento | whatsapp | email | funcionarios | desafio | objetivo | consentimento_lgpd
```

**2. Criar a Service Account no Google Cloud**

1. Acesse [console.cloud.google.com](https://console.cloud.google.com/) e crie um projeto (ou
   use um existente).
2. Vá em **APIs e Serviços → Biblioteca**, busque por "Google Sheets API" e clique em **Ativar**.
3. Vá em **APIs e Serviços → Credenciais → Criar Credenciais → Conta de serviço**.
4. Dê um nome (ex: `tiagovaz-leads`) e conclua a criação (não precisa atribuir papéis/roles de
   projeto para isso funcionar).
5. Clique na service account criada → aba **Chaves** → **Adicionar chave → Criar nova chave →
   JSON**. Um arquivo `.json` será baixado — **guarde-o com segurança e nunca o compartilhe ou
   suba para o Git**.

**3. Compartilhar a planilha com a Service Account**

Abra o arquivo `.json` baixado e copie o valor do campo `"client_email"` (algo como
`tiagovaz-leads@seu-projeto.iam.gserviceaccount.com`). Na sua Planilha Google, clique em
**Compartilhar** e adicione esse e-mail como **Editor**. Sem esse passo, a API retorna erro de
permissão.

**4. Configurar as variáveis de ambiente**

Do mesmo arquivo `.json`, você vai usar dois campos:

| Variável | De onde vem |
|---|---|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | campo `client_email` do JSON |
| `GOOGLE_SHEETS_PRIVATE_KEY` | campo `private_key` do JSON (cole o valor inteiro, incluindo `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | está na URL da planilha: `docs.google.com/spreadsheets/d/`**`ESTE_TRECHO`**`/edit` |
| `GOOGLE_SHEETS_TAB_NAME` | opcional — nome da aba, padrão `Leads` |

- **Localmente**: copie `.env.example` para `.env.local` e preencha.
- **Na Vercel**: vá em *Project Settings → Environment Variables* e adicione as 3-4 variáveis
  acima para o ambiente de **Production** (e Preview, se quiser testar por lá também). A Vercel
  aceita colar o valor de `GOOGLE_SHEETS_PRIVATE_KEY` com quebras de linha reais — não precisa
  escapar manualmente como `\n`.

**⚠️ Nunca cole sua chave privada (`private_key`) diretamente numa conversa de chat/IA, e-mail ou
qualquer lugar fora do gerenciador de variáveis de ambiente da sua hospedagem** — é equivalente a
uma senha com acesso à planilha.

- Depois do envio, a pessoa vê uma mensagem de agradecimento na própria página (não há envio de
  e-mail de confirmação nesta versão).
- Proteção contra "Sheets injection": a gravação usa `valueInputOption: "RAW"`, que insere os
  valores exatamente como estão, sem o Google Sheets tentar interpretá-los como fórmula — isso
  neutraliza por completo o risco de alguém digitar algo como `=CMD(...)` num campo do formulário.

## Card de compartilhamento (WhatsApp / redes sociais)

Quando o link do site é colado no WhatsApp (ou compartilhado no LinkedIn, Facebook etc.), o
preview que aparece vem das tags Open Graph em `app/layout.tsx`, que apontam para
`public/images/og-cover.jpg` — um card de 1200×630 desenhado especificamente para isso: sua
foto à direita, o gancho "Empresas não crescem com mais marketing. Crescem aprendendo." em
destaque, a frase-guia da marca como subtexto, e uma chamada para o Diagnóstico Estratégico.

- **Testar antes de divulgar**: o WhatsApp cacheia o preview por URL. Se você trocar a imagem
  depois, o link já compartilhado antes pode continuar mostrando o card antigo por um tempo.
  Para forçar a atualização, use o [Sharing Debugger do Meta](https://developers.facebook.com/tools/debug/)
  (o WhatsApp usa a mesma base de cache do Facebook/Instagram).
- Se quiser um card novo (outra foto, outro texto), é só pedir — ele foi desenhado sob medida,
  não é gerado automaticamente pelo projeto.

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

## Política de Privacidade + consentimento (LGPD)

- `app/politica-de-privacidade/page.tsx` — **é um rascunho**, redigido para orientar o que
  costuma constar em uma política compatível com a LGPD. Não é aconselhamento jurídico; peça
  para um advogado revisar antes de publicar de vez, principalmente os prazos de retenção
  (marcados como `[a definir]` no texto) e a lista de ferramentas de terceiros.
- O formulário agora tem um **checkbox de consentimento obrigatório**, validado tanto no
  navegador quanto no servidor (`lib/validation.ts`) — sem marcar, o envio não passa.
- Cada lead gravado na Planilha Google inclui uma coluna `consentimento_lgpd` como registro de
  prova de que o consentimento foi dado naquele envio.
- Link para a política adicionado no rodapé do site.

## Tema claro/escuro

Via classe `.light` na tag `<html>` + variáveis CSS (`app/globals.css`), com script inline no
`<head>` (`app/layout.tsx`) que aplica o tema antes da hidratação (evita flash de tema errado).
**O site sempre carrega no tema escuro por padrão** — a preferência de tema do sistema
operacional do visitante é ignorada de propósito; só muda para claro se a pessoa clicar no
botão de alternância (e a escolha fica salva no `localStorage` para as próximas visitas).

## Responsividade

Mobile-first em todos os componentes, menu hambúrguer animado abaixo de `md`, grids bento que
colapsam para 1–2 colunas em telas pequenas.

## Estrutura

```
app/
  layout.tsx, page.tsx, globals.css, robots.ts, sitemap.ts
  api/diagnostico/route.ts     → endpoint do formulário (validação + segurança + grava na planilha)
components/
  ui/                          → Button, Input, Textarea, Select, Accordion, Label (shadcn/ui)
  sections/                    → cada seção da página
  nav.tsx, theme-*.tsx, whatsapp-float.tsx, motion-reveal.tsx
lib/
  utils.ts, validation.ts, rate-limit.ts
  google-sheets.ts             → grava cada lead na Planilha Google (Sheets API)
public/images/                 → sua foto já otimizada
```

## Pendências conhecidas

- [ ] Rodar `npm install` antes do primeiro `npm run dev`/`build`.
- [ ] Trocar domínio placeholder `tiagovaz.com.br` se for diferente do real.
- [ ] Gerar `/images/og-cover.jpg` definitivo (1200×630).
- [ ] Seção de depoimentos ("Provas") foi removida até você ter depoimentos reais — o componente
      `components/sections/provas.tsx` foi apagado; quando tiver depoimentos verdadeiros, é só
      recriar a seção e voltar a importá-la em `app/page.tsx`.
- [ ] Configurar a Service Account do Google Sheets e as variáveis de ambiente na Vercel (ver
      seção "Planilha do Google" acima) — sem isso, o formulário continua mostrando "obrigado"
      normalmente, mas os leads não são registrados em lugar nenhum.
