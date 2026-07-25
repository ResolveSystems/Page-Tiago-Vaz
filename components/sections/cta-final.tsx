import { DiagnosticoForm } from "@/components/sections/diagnostico-form";

export function CtaFinal() {
  return (
    <section id="diagnostico" className="border-y border-border/10 py-28 text-center">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">
          Diagnóstico Estratégico
        </span>
        <h2 className="mx-auto mt-4 max-w-[680px] font-display text-3xl md:text-4xl">
          O primeiro passo não é implementar. É diagnosticar.
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-lg text-foreground/65">
          Antes de qualquer ferramenta, existe uma pergunta: o que os dados da sua empresa já estão tentando
          dizer? O Diagnóstico Estratégico é o ponto de partida para responder isso.
        </p>

        <div className="mx-auto max-w-[640px] text-left">
          <DiagnosticoForm />
        </div>

        <p className="mt-14 font-display text-lg italic text-primary">
          Transformando dados em decisões. Transformando decisões em crescimento previsível.
        </p>
      </div>
    </section>
  );
}
