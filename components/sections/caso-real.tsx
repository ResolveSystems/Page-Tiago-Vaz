import { Reveal } from "@/components/motion-reveal";

export function CasoReal() {
  return (
    <section id="caso" className="border-t border-border/10 py-32">
      <div className="container">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Caso real</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">
          Quando o dado aponta para onde ninguém estava olhando
        </h2>

        <Reveal className="mt-12 max-w-[820px] rounded-md border border-primary/30 bg-gradient-to-br from-background-soft to-background p-11">
          <span className="mb-4 block font-mono text-[0.75rem] uppercase tracking-[0.1em] text-primary">
            Varejo · Análise de base de clientes
          </span>
          <div className="space-y-[18px] text-[1.04rem] text-foreground/65">
            <p>
              Um supermercado de médio porte queria crescer vendendo mais. O caminho óbvio seria investir
              mais em mídia. Mas a análise da base de clientes e do comportamento de compra revelou outra
              coisa: uma parcela relevante do faturamento e da margem vinha de um único insumo de alto giro
              — água mineral — carregando um custo operacional desproporcional dentro da própria loja.
            </p>
            <p>
              A decisão não foi comprar mais anúncio. Foi reorganizar a operação: o supermercado passou a
              operar também como distribuidora de água mineral, reduzindo estrutura interna e capturando uma
              margem que antes estava escondida dentro dos próprios números.
            </p>
            <p className="text-foreground">
              O crescimento não veio de mais marketing. Veio de uma decisão que só foi possível porque os
              dados foram, de fato, escutados.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
