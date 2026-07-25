import { Reveal } from "@/components/motion-reveal";

const STEPS = ["Dados", "Inteligência", "Decisões", "Processos", "Crescimento previsível"];

export function GrowthPath() {
  return (
    <section className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">
          A nova forma de crescer
        </span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">
          Dados geram inteligência. Inteligência gera decisões.
        </h2>

        <div className="relative mt-16 mb-10 grid grid-cols-1 gap-7 md:grid-cols-5 md:gap-0">
          <div className="absolute left-[10%] right-[10%] top-[11px] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 0.08} className="relative flex items-center gap-4 md:flex-col md:text-center">
              <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-background md:mb-5" />
              <span className="font-mono text-[0.82rem] uppercase tracking-wide text-foreground">{step}</span>
            </Reveal>
          ))}
        </div>

        <p className="max-w-[640px] text-lg text-foreground/65">
          Cada etapa depende da anterior. Pular uma etapa é o motivo pelo qual tanta empresa investe em
          tecnologia e não vê resultado. Não existe atalho entre dado bruto e crescimento — existe
          arquitetura.
        </p>
      </div>
    </section>
  );
}
