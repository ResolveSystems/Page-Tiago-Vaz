"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { diagnosticoSchema } from "@/lib/validation";

type FormState = {
  nome: string;
  empresa: string;
  segmento: string;
  whatsapp: string;
  email: string;
  funcionarios: string;
  desafio: string;
  objetivo: string;
  website: string; // honeypot
  consentimento: boolean;
};

const INITIAL_STATE: FormState = {
  nome: "",
  empresa: "",
  segmento: "",
  whatsapp: "",
  email: "",
  funcionarios: "1 a 5",
  desafio: "",
  objetivo: "",
  website: "",
  consentimento: false,
};

/**
 * Dispara o evento de conversão no dataLayer do GTM quando o diagnóstico é
 * concluído. IMPORTANTE: nunca envie nome, e-mail, WhatsApp ou qualquer outro
 * dado pessoal (PII) para o dataLayer/GA4 — é uma violação dos Termos de
 * Serviço do Google Analytics. Por isso só vão segmento e faixa de
 * funcionários, que descrevem o lead sem identificá-lo.
 *
 * Não redeclaramos `Window.dataLayer` globalmente aqui de propósito — o pacote
 * @next/third-parties (usado para o GTM em app/layout.tsx) já declara esse
 * tipo globalmente, e duas declarações do mesmo campo com tipos diferentes
 * quebram o build ("Subsequent property declarations must have the same
 * type"). Em vez disso, fazemos um cast local só pra este uso.
 */
function pushConversionEvent(segmento: string, funcionarios: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "diagnostico_submit",
    lead_segmento: segmento,
    lead_funcionarios: funcionarios,
  });
}

export function DiagnosticoForm() {
  const [data, setData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now()); // usado para detectar envio "rápido demais" (bot)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGlobalError(null);

    // Proteção simples contra bots: envio feito rápido demais para ser humano.
    // Não denunciamos a suspeita — mostramos a mesma tela de sucesso e simplesmente
    // não fazemos a requisição de verdade (mesmo princípio do honeypot).
    if (Date.now() - mountedAt.current < 2000) {
      setStatus("success");
      return;
    }

    // Validação de campos (ajuda a pessoa a corrigir a própria digitação —
    // isso continua aparecendo, é diferente de um erro de sistema/envio).
    const parsed = diagnosticoSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const [key, messages] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof FormState] = messages?.[0];
      }
      setErrors(fieldErrors);
      setGlobalError("Por favor, corrija os campos destacados antes de continuar.");
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) document.getElementById(firstKey)?.focus();
      return;
    }

    // A partir daqui, os dados já são válidos. Não importa o que acontecer na
    // requisição (falha de rede, servidor fora do ar, CSV não configurado etc.),
    // a pessoa sempre vê a confirmação de sucesso — nunca um erro de sistema.
    // Falhas reais ficam só no console, para você conseguir investigar depois;
    // o lead nunca fica sabendo que algo deu errado nos bastidores.
    setStatus("submitting");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        console.error("[diagnostico] envio retornou erro, mas exibindo sucesso ao usuário:", payload);
      }
    } catch (err) {
      console.error("[diagnostico] falha de rede, mas exibindo sucesso ao usuário:", err);
    } finally {
      pushConversionEvent(data.segmento, data.funcionarios);
      setStatus("success");
    }
  }

  if (status === "success") {
    const firstName = data.nome.trim().split(" ")[0] || data.nome;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-md border border-primary/30 p-10 text-center sm:p-16"
      >
        <div className="relative mx-auto mb-6 h-20 w-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
            className="relative h-20 w-20 overflow-hidden rounded-full border border-primary/30"
          >
            <Image
              src="/images/tiago-vaz-lg.jpg"
              alt="Tiago Vaz"
              fill
              sizes="80px"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 16 }}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary"
          >
            <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        </div>

        <h3 className="mb-4 font-display text-2xl">Obrigado, {firstName}.</h3>
        <p className="mx-auto max-w-[480px] text-foreground/65">
          Recebi seu pedido de Diagnóstico Estratégico para a{" "}
          <strong className="text-foreground">{data.empresa}</strong>. Vou analisar com calma o
          desafio comercial que você compartilhou.
        </p>
        <p className="mx-auto mt-3 max-w-[480px] font-semibold text-foreground">
          Em breve entraremos em contato pelo WhatsApp ou e-mail informado para alinharmos os
          próximos passos.
        </p>
        <p className="mt-6 font-display text-lg italic text-primary">
          Transformando dados em decisões. Transformando decisões em crescimento previsível.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2">
      {/* Honeypot — invisível para humanos, armadilha para bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <AnimatePresence>
        {globalError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="col-span-full rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-left text-[0.85rem] text-red-300"
          >
            {globalError}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" invalid={!!errors.nome} value={data.nome} onChange={(e) => update("nome", e.target.value)} />
        {errors.nome && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.nome}</p>}
      </div>

      <div>
        <Label htmlFor="empresa">Empresa</Label>
        <Input id="empresa" invalid={!!errors.empresa} value={data.empresa} onChange={(e) => update("empresa", e.target.value)} />
        {errors.empresa && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.empresa}</p>}
      </div>

      <div>
        <Label htmlFor="segmento">Segmento</Label>
        <Input id="segmento" invalid={!!errors.segmento} value={data.segmento} onChange={(e) => update("segmento", e.target.value)} />
        {errors.segmento && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.segmento}</p>}
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="(51) 99999-9999"
          invalid={!!errors.whatsapp}
          value={data.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
        />
        {errors.whatsapp && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.whatsapp}</p>}
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          invalid={!!errors.email}
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="funcionarios">Número de funcionários</Label>
        <Select value={data.funcionarios} onValueChange={(v) => update("funcionarios", v)}>
          <SelectTrigger id="funcionarios">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["1 a 5", "6 a 20", "21 a 50", "51 a 200", "+200"].map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="desafio">Principal desafio comercial hoje</Label>
        <Textarea
          id="desafio"
          invalid={!!errors.desafio}
          value={data.desafio}
          onChange={(e) => update("desafio", e.target.value)}
        />
        {errors.desafio && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.desafio}</p>}
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="objetivo">Objetivo com o diagnóstico</Label>
        <Textarea id="objetivo" value={data.objetivo} onChange={(e) => update("objetivo", e.target.value)} />
      </div>

      <div className="sm:col-span-2 flex items-start gap-3 pt-1">
        <Checkbox
          id="consentimento"
          invalid={!!errors.consentimento}
          checked={data.consentimento}
          onCheckedChange={(checked) => update("consentimento", checked === true)}
          className="mt-0.5"
        />
        <div>
          <Label
            htmlFor="consentimento"
            className="mb-0 cursor-pointer font-body text-[0.85rem] normal-case leading-relaxed tracking-normal text-foreground/70"
          >
            Li e concordo com a{" "}
            <Link href="/politica-de-privacidade" target="_blank" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            , e autorizo o uso dos meus dados para retorno do Diagnóstico Estratégico.
          </Label>
          {errors.consentimento && <p className="mt-1.5 text-[0.76rem] text-red-300">{errors.consentimento}</p>}
        </div>
      </div>

      <div className="sm:col-span-2 mt-2.5">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando..." : "Agendar Diagnóstico Estratégico"}
        </Button>
        <p className="mt-2 text-[0.8rem] text-foreground/40">
          Seus dados são usados apenas para retorno do diagnóstico.
        </p>
      </div>
    </form>
  );
}
