import { Reveal } from "@/components/motion-reveal";

const BENEFITS = [
  "Maior previsibilidade de vendas",
  "Processos comerciais mais inteligentes",
  "Equipes que sabem onde focar energia",
  "Decisões apoiadas em evidência, não em urgência",
  "Redução de desperdício de mídia e de tempo comercial",
  "Uma empresa que continua melhorando depois da consultoria",
];

export function Beneficios() {
  return (
    <section className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Benefícios</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">O que muda quando a empresa aprende</h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <Reveal
              key={benefit}
              delay={i * 0.05}
              className={`flex gap-4 border-t border-border/10 py-5 ${i % 2 === 0 ? "sm:pr-8" : ""}`}
            >
              <span className="font-mono text-primary">—</span>
              <p className="text-foreground/65">{benefit}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
