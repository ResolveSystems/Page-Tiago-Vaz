import { Reveal } from "@/components/motion-reveal";

const TESTIMONIALS = [
  {
    quote:
      "Eu vivia apagando incêndio: hora contratava vendedor, hora cortava anúncio, e nada mudava de verdade. Quando vi os dados dos nossos próprios clientes organizados pela primeira vez, entendi por que a gente perdia tanta venda para o mesmo motivo, todo mês. Foi como acender a luz de uma sala em que eu trabalhava no escuro há anos.",
    who: "Marcos Adami — Distribuidora de Película Automotiva",
  },
  {
    quote:
      "Na indústria a gente confia no que vê no chão de fábrica, não em relatório bonito. Fiquei desconfiado no início. Mas quando o processo comercial passou a mostrar exatamente onde a gente perdia orçamento para o concorrente, parei de discordar. Foi a primeira vez que decisão comercial e realidade da fábrica bateram.",
    who: "Eduardo Cristofoli — Indústria Metalúrgica",
  },
  {
    quote:
      "Eu achava que meu problema era falta de gente para atender no WhatsApp. Descobri que o problema era eu não saber, de fato, em qual etapa cada paciente parava de responder. Isso mudou a forma como eu enxergo minha própria clínica — hoje eu decido com informação, não mais com aflição.",
    who: "Bruna Zanotelli — Clínica de Estética",
  },
];

export function Provas() {
  return (
    <section className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Provas</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Resultado é o que sobra depois da estratégia</h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.who}
              delay={i * 0.1}
              className="rounded-md border border-border/10 bg-card p-8 transition-colors hover:border-primary/30"
            >
              <p className="mb-4 font-display text-[1.15rem] italic text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-mono text-[0.78rem] text-foreground/40">{t.who}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-14">
          <div>
            <div className="font-display text-4xl text-primary">+600 mil</div>
            <div className="mt-1 font-mono text-[0.75rem] text-foreground/40">clientes em bases já analisadas</div>
          </div>
          <div>
            <div className="font-display text-4xl text-primary">15+</div>
            <div className="mt-1 font-mono text-[0.75rem] text-foreground/40">anos de mercado</div>
          </div>
        </div>
      </div>
    </section>
  );
}
