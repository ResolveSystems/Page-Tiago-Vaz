import { NextRequest, NextResponse } from "next/server";
import { diagnosticoSchema, sanitizeText } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { appendLeadToCsv } from "@/lib/csv-storage";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = [
  "https://tiagovaz.com.br",
  "https://www.tiagovaz.com.br",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
].filter(Boolean);

export async function POST(req: NextRequest) {
  // 1) Verificação de origem — bloqueia envios feitos via script externo/CSRF básico
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  const isAllowedOrigin = ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  if (!isAllowedOrigin) {
    return NextResponse.json({ ok: false, error: "Origem não permitida." }, { status: 403 });
  }

  // 2) Rate limiting por IP — contém picos de envio automatizado
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429, headers: rl.retryAfterSeconds ? { "Retry-After": String(rl.retryAfterSeconds) } : undefined }
    );
  }

  // 3) Parse + validação de schema (zod) — rejeita payloads malformados
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsedForm = diagnosticoSchema.safeParse(rawBody);
  if (!parsedForm.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos.", issues: parsedForm.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // 4) Honeypot — campo "website" é invisível para humanos; se vier preenchido, é bot.
  // Responde como se tivesse dado certo, para não ensinar o bot a se adaptar.
  if (parsedForm.data.website && parsedForm.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 5) Sanitização final de todos os campos de texto livre antes de qualquer uso
  const clean = {
    nome: sanitizeText(parsedForm.data.nome),
    empresa: sanitizeText(parsedForm.data.empresa),
    segmento: sanitizeText(parsedForm.data.segmento),
    whatsapp: sanitizeText(parsedForm.data.whatsapp),
    email: sanitizeText(parsedForm.data.email),
    funcionarios: parsedForm.data.funcionarios ?? "",
    desafio: sanitizeText(parsedForm.data.desafio),
    objetivo: sanitizeText(parsedForm.data.objetivo ?? ""),
  };

  // 6) Grava o lead em data/leads.csv (ver lib/csv-storage.ts para detalhes/limitações)
  try {
    await appendLeadToCsv({
      data_hora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      ...clean,
      consentimento_lgpd: "sim",
    });
  } catch (err) {
    console.error("[diagnostico] falha ao gravar lead no CSV:", err);
    console.log("[diagnostico] lead recebido (fallback, não gravado):", clean);
    return NextResponse.json(
      { ok: false, error: "Recebemos seus dados, mas houve uma falha ao registrá-los. Tente novamente em instantes." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

// Bloqueia qualquer método além de POST explicitamente
export async function GET() {
  return NextResponse.json({ ok: false, error: "Método não permitido." }, { status: 405 });
}
