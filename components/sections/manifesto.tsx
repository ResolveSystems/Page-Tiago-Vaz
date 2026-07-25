import { Reveal } from "@/components/motion-reveal";

export function Manifesto() {
  return (
    <section id="manifesto" className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Manifesto</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">O problema nunca foi falta de marketing</h2>

        <div className="mt-9 max-w-[760px] space-y-6">
          <Reveal>
            <p className="text-lg text-foreground/65">
              A maioria das empresas que procuram ajuda já investe em anúncios. Já tem CRM. Já testou IA. E
              mesmo assim, os resultados continuam imprevisíveis.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/65">
              Porque marketing não é anúncio. CRM não é cadastro. IA não é chatbot. São ferramentas — e
              ferramentas, sozinhas, não pensam.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-foreground/65">
              O que separa uma empresa estagnada de uma empresa que cresce de forma previsível não é o
              orçamento de mídia. É a capacidade de aprender continuamente sobre o próprio mercado, os
              próprios clientes e o próprio processo comercial.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg text-foreground">
              Toda empresa gera dados todos os dias. Poucas os transformam em inteligência.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
