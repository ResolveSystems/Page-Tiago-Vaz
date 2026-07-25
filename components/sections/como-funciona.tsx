import { Reveal } from "@/components/motion-reveal";

const STEPS = [
  { num: "01", title: "Diagnóstico", text: "Entendimento real da operação: dados disponíveis, processos existentes, gargalos comerciais." },
  { num: "02", title: "Mapeamento", text: "Reconstrução do caminho do cliente e do lead dentro da empresa — do primeiro contato à recompra." },
  { num: "03", title: "Estratégia", text: "Definição de que dados importam, que decisões podem ser automatizadas e onde o julgamento humano é insubstituível." },
  { num: "04", title: "Implementação", text: "Construção da arquitetura: CRM, automações, IA aplicada e integrações — como ativos, não como vitrine tecnológica." },
  { num: "05", title: "Mensuração", text: "Acompanhamento do que de fato muda no resultado comercial, não apenas no painel." },
  { num: "06", title: "Evolução contínua", text: "O sistema realimenta a estratégia. A empresa continua aprendendo depois que o projeto termina." },
];

export function ComoFunciona() {
  return (
    <section className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Como funciona</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Um processo, não um pacote de serviços</h2>

        <div className="mt-14 flex flex-col">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              delay={i * 0.05}
              className={`grid grid-cols-[50px_1fr] gap-6 border-t border-border/10 py-7 transition-[padding] hover:pl-2.5 md:grid-cols-[70px_1fr] ${
                i === STEPS.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="pt-0.5 font-mono text-[0.85rem] text-primary">{step.num}</span>
              <div>
                <h3 className="mb-2 font-display text-xl">{step.title}</h3>
                <p className="max-w-[640px] text-[0.98rem] text-foreground/65">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
