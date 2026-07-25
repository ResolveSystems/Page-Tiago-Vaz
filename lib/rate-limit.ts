/**
 * Rate limiter em memória (janela deslizante simples).
 *
 * IMPORTANTE: em ambientes serverless com múltiplas instâncias (Vercel, AWS Lambda),
 * esse Map não é compartilhado entre instâncias — funciona bem para conter picos
 * básicos de abuso/bots em um único processo, mas para proteção robusta em produção
 * de verdade, combine com um serviço externo (ex: Upstash Redis, Vercel KV) ou com
 * rate limiting na camada de borda/CDN (Cloudflare, WAF da Hostgator/hospedagem).
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // janela de 1 minuto
const MAX_REQUESTS = 5; // no máximo 5 envios por IP por minuto

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}

// Limpeza periódica para não vazar memória indefinidamente
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, WINDOW_MS);
  // Em runtime Node, evita que esse timer segure o processo vivo desnecessariamente.
  // Cast seguro: no ambiente Node (app/api/*), o retorno é NodeJS.Timeout, que tem .unref().
  (cleanupTimer as unknown as { unref?: () => void }).unref?.();
}
