import { Reveal } from "@/components/motion-reveal";

const SOLUTIONS = [
  { idx: "01", title: "Inteligência Comercial", text: "Transformar o histórico comercial em previsibilidade de vendas.", big: true },
  { idx: "02", title: "Arquitetura de Crescimento", text: "Conecta aquisição, conversão e retenção.", big: false },
  { idx: "03", title: "Estratégia Digital", text: "Onde investir atenção e orçamento em mídia.", big: false },
  { idx: "04", title: "Aquisição de Clientes", text: "Funis que geram leads qualificados, não apenas volume.", big: false },
  { idx: "05", title: "CRM Inteligente", text: "Tratado como sistema de aprendizagem, não cadastro.", big: false },
  { idx: "06", title: "IA aplicada aos negócios", text: "Modelos e agentes que identificam padrões e priorizam oportunidades reais.", big: true },
  { idx: "07", title: "Automação Comercial", text: "Elimina tarefas repetitivas sem eliminar o julgamento humano.", big: false },
  { idx: "08", title: "Marketing orientado por dados", text: "Decisões apoiadas em evidência, não em achismo.", big: false },
];

export function Solucoes() {
  return (
    <section id="solucoes" className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Soluções</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Soluções, não ferramentas</h2>
        <p className="mt-5 max-w-[640px] text-lg text-foreground/65">
          Google Ads, Meta Ads, CRM, sites e automações são ativos — peças de uma arquitetura maior. O valor
          não está em nenhuma peça isolada, está na forma como elas se conectam.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((sol, i) => (
            <Reveal
              key={sol.idx}
              delay={(i % 4) * 0.06}
              className={`group relative overflow-hidden rounded-md border border-border/10 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 ${
                sol.big ? "lg:col-span-2" : ""
              }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <span className="font-mono text-[0.72rem] text-primary">{sol.idx}</span>
              <h3 className="mb-2 mt-2 text-[1.02rem] font-semibold">{sol.title}</h3>
              <p className="text-[0.86rem] text-foreground/65">{sol.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
