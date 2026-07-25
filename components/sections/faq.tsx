import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Isso é consultoria de marketing?",
    a: "Não. Marketing é uma das ferramentas. O trabalho é sobre arquitetura de dados, decisão e processo — o marketing é consequência disso, não o ponto de partida.",
  },
  {
    q: "Vocês implementam CRM e automações também?",
    a: "Sim, mas como parte de um sistema maior — nunca como venda isolada de ferramenta.",
  },
  {
    q: "Preciso já ter uma equipe comercial estruturada?",
    a: "Ajuda, mas não é obrigatório. O diagnóstico inicial mostra exatamente o que existe hoje e o que precisa ser construído.",
  },
  {
    q: "Quanto tempo leva para ver resultado?",
    a: "Depende da maturidade dos dados e processos existentes. O diagnóstico estratégico é o momento em que isso fica claro, caso a caso.",
  },
  {
    q: "Isso funciona para qualquer segmento?",
    a: "Os princípios são os mesmos — dados, decisão, aprendizado. A aplicação muda conforme o nicho, o processo e o comportamento do cliente de cada empresa.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">FAQ</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Perguntas antes de decidir</h2>

        <Accordion type="single" collapsible className="mt-12 max-w-[820px] border-b border-border/10">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
