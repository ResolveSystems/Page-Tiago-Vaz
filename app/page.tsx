import dynamic from "next/dynamic";
import { Nav } from "@/components/nav";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { GrowthPath } from "@/components/sections/growth-path";
import { QuemSou } from "@/components/sections/quem-sou";

// Seções abaixo da dobra: carregadas sob demanda (code-splitting automático do Next.js),
// reduzindo o JS inicial enviado ao navegador e melhorando o Time to Interactive.
const Filosofia = dynamic(() => import("@/components/sections/filosofia").then((m) => m.Filosofia));
const ComoFunciona = dynamic(() => import("@/components/sections/como-funciona").then((m) => m.ComoFunciona));
const Solucoes = dynamic(() => import("@/components/sections/solucoes").then((m) => m.Solucoes));
const CasoReal = dynamic(() => import("@/components/sections/caso-real").then((m) => m.CasoReal));
const Beneficios = dynamic(() => import("@/components/sections/beneficios").then((m) => m.Beneficios));
const Provas = dynamic(() => import("@/components/sections/provas").then((m) => m.Provas));
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq));
const CtaFinal = dynamic(() => import("@/components/sections/cta-final").then((m) => m.CtaFinal));
const Footer = dynamic(() => import("@/components/sections/footer").then((m) => m.Footer));

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <GrowthPath />
        <QuemSou />
        <Filosofia />
        <ComoFunciona />
        <Solucoes />
        <CasoReal />
        <Beneficios />
        <Provas />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
