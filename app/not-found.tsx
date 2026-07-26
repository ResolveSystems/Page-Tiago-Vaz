import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">Erro 404</span>
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Essa página não foi encontrada.</h1>
      <p className="mt-5 max-w-[480px] text-foreground/65">
        O link pode ter mudado ou não existe mais. Que tal voltar para a página inicial?
      </p>
      <Button asChild className="mt-9">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  );
}
