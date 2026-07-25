"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GrowthCycle } from "@/components/sections/growth-cycle";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono text-2xl tabular-nums text-primary">
      {value}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-32 pt-[200px] md:pt-[220px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-52 -top-52 h-[700px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(171,139,83,0.16), transparent 70%)" }}
      />
      <div className="container relative grid grid-cols-1 items-center gap-16 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary before:h-px before:w-3.5 before:bg-primary">
            Estratégia Comercial · Ciência de Dados · IA
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-[2.5rem] font-normal leading-[1.05] md:text-[3.5rem] lg:text-[4.5rem]"
          >
            Empresas não crescem com mais marketing.
            <br />
            Crescem <span className="italic text-primary-bright">aprendendo</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-[640px] text-lg text-foreground/65"
          >
            Há 15 anos desenho sistemas que transformam dados comerciais em decisões — e decisões em
            crescimento previsível. Não vendo ferramentas. Projeto a inteligência que conecta todas elas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-7"
          >
            <Button asChild>
              <a href="#diagnostico">Agendar Diagnóstico Estratégico</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="px-0">
              <a href="#manifesto">Entender a filosofia ↓</a>
            </Button>
          </motion.div>

          <div className="mt-14 flex flex-wrap border-t border-border/10 pt-0">
            <div className="mr-7 border-r border-border/10 pr-7 pt-6">
              <Counter target={15} suffix="+" />
              <p className="mt-1 font-mono text-[0.72rem] text-foreground/40">anos de mercado</p>
            </div>
            <div className="mr-7 border-r border-border/10 pr-7 pt-6">
              <Counter target={600} suffix="mil+" />
              <p className="mt-1 font-mono text-[0.72rem] text-foreground/40">clientes já analisados</p>
            </div>
            <div className="pt-6">
              <Counter target={4} suffix="" />
              <p className="mt-1 font-mono text-[0.72rem] text-foreground/40">
                áreas integradas: dados, CRM, IA, processos
              </p>
            </div>
          </div>
        </div>

        <GrowthCycle />
      </div>
    </section>
  );
}
