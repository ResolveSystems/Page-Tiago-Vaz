import { Reveal } from "@/components/motion-reveal";

const CARDS = [
  {
    num: "01 — Percebe",
    title: "Percebe",
    text: "Cada venda, cada atendimento, cada objeção e cada orçamento perdido gera informação. Nenhuma interação comercial deveria terminar sem deixar conhecimento para trás.",
    span: "md:col-span-3",
  },
  {
    num: "02 — Aprende",
    title: "Aprende",
    text: "A informação só tem valor quando é organizada de forma que o sistema — e as pessoas — consigam enxergar padrões nela.",
    span: "md:col-span-3",
  },
  {
    num: "03 — Decide",
    title: "Decide",
    text: "A IA identifica padrões, calcula probabilidades e prioriza oportunidades. Mas quem decide não é a IA sozinha — é a regra de negócio, construída a partir do nicho e do comportamento real do cliente.",
    span: "md:col-span-4",
  },
  {
    num: "04 — Evolui",
    title: "Evolui",
    text: "Cada decisão gera novos dados, que realimentam o sistema.",
    span: "md:col-span-2",
  },
];

export function Filosofia() {
  return (
    <section id="filosofia" className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Filosofia</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Como uma empresa aprende</h2>

        <div className="mt-14 grid grid-cols-1 gap-3.5 md:grid-cols-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.08}
              className={`rounded-md border border-border/10 bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/30 ${card.span}`}
            >
              <span className="font-mono text-[0.78rem] tracking-wide text-primary">{card.num}</span>
              <h3 className="mb-3 mt-4 font-display text-xl">{card.title}</h3>
              <p className="text-[0.95rem] text-foreground/65">{card.text}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-[720px] border-l-2 border-primary pl-6 text-[1.02rem] text-foreground/65">
          A IA apoia. O julgamento humano decide quando exige contexto, empatia e negociação. A regra de
          negócio garante que nenhuma automação atropele o que a empresa é.
        </p>
      </div>
    </section>
  );
}
