import { z } from "zod";

/**
 * Remove tags HTML e caracteres de controle de uma string.
 * Primeira linha de defesa contra XSS/HTML injection vindo do formulário,
 * aplicada ANTES de qualquer persistência ou envio (e-mail, CRM, webhook).
 */
export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>?/gm, "") // remove tags HTML
    .replace(/[\u0000-\u001F\u007F]/g, "") // remove caracteres de controle
    .trim();
}

export const diagnosticoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo.").max(120),
  empresa: z.string().trim().min(2, "Informe o nome da empresa.").max(120),
  segmento: z.string().trim().min(2, "Informe o segmento de atuação.").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido com DDD.")
    .max(20)
    .refine((v) => /^[\d\s()+-]+$/.test(v), "Use apenas números, espaços e símbolos de telefone."),
  email: z.string().trim().email("Informe um e-mail válido.").max(160),
  funcionarios: z.enum(["1 a 5", "6 a 20", "21 a 50", "51 a 200", "+200"]).optional(),
  desafio: z.string().trim().min(10, "Conte um pouco mais (mínimo 10 caracteres).").max(2000),
  objetivo: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot: campo invisível que só um bot preencheria.
  // Importante: NÃO restringimos o tamanho aqui — se restringíssemos, um bot que
  // preenchesse o campo receberia um erro de validação explícito (422), o que
  // denunciaria a armadilha. A detecção de fato acontece depois, em app/api/diagnostico/route.ts,
  // que responde como se o envio tivesse dado certo (sem revelar que foi bloqueado).
  website: z.string().max(200).optional().or(z.literal("")),
});

export type DiagnosticoInput = z.infer<typeof diagnosticoSchema>;
