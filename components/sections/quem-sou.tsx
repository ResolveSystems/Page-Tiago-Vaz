import Image from "next/image";
import { Reveal } from "@/components/motion-reveal";

export function QuemSou() {
  return (
    <section id="quemsou" className="border-t border-border/10 py-32">
      <div className="container grid grid-cols-1 items-start gap-16 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full md:mx-0">
          <Image
            src="/images/tiago-vaz-lg.jpg"
            alt="Tiago Vaz — consultor em inteligência empresarial"
            fill
            sizes="(max-width: 768px) 320px, 420px"
            className="object-cover"
            priority={false}
            loading="lazy"
          />
        </Reveal>

        <div>
          <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Quem sou</span>
          <h2 className="mb-7 mt-4 font-display text-3xl md:text-4xl">Tiago Vaz</h2>

          <div className="space-y-[18px] text-[1.02rem] text-foreground/65">
            <Reveal>
              <p>
                Meu nome é Tiago Vaz. Tenho formação em Análise e Desenvolvimento de Sistemas e mais de 15
                anos de experiência nas fronteiras entre Comercial, Marketing, Tecnologia e Dados.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Já trabalhei dentro de operações comerciais com bases superiores a 600 mil clientes —
                desenhando estratégias de dados, metas, previsibilidade de vendas e processos comerciais em
                escala.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Não me interesso por ferramentas isoladas. Me interesso pela arquitetura que conecta dado,
                decisão e ação humana dentro de uma empresa real.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Hoje, meu trabalho é ajudar empresários a enxergar a própria empresa como um sistema que
                pode — e deve — aprender continuamente.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
