"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">
        Algo deu errado
      </span>
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Essa página encontrou um erro.</h1>
      <p className="mt-5 max-w-[480px] text-foreground/65">
        Já foi registrado por aqui. Você pode tentar novamente ou voltar para o início.
      </p>
      <div className="mt-9 flex gap-4">
        <Button onClick={() => reset()}>Tentar de novo</Button>
        <Button asChild variant="outline">
          <a href="/">Voltar ao início</a>
        </Button>
      </div>
    </main>
  );
}
