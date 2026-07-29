import Link from "next/link";
import { Mail, Instagram, Youtube, Linkedin, ArrowUp } from "lucide-react";

const NAV_COLUMN = [
  { href: "#filosofia", label: "Filosofia" },
  { href: "#quemsou", label: "Quem sou" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#caso", label: "Caso real" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/10">
      <div className="container py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <Link href="#top" className="flex items-baseline gap-2 font-display text-2xl">
              <span>Tiago</span>
              <span className="relative top-[1px] text-[1.75rem] italic text-primary">Vaz</span>
            </Link>
            <p className="mt-5 max-w-[320px] text-[0.92rem] text-foreground/50">
              Transformando dados em decisões. Transformando decisões em crescimento previsível.
            </p>
          </div>

          <div>
            <span className="font-mono text-[0.72rem] uppercase tracking-wider text-foreground/40">
              Navegação
            </span>
            <ul className="mt-5 space-y-3">
              {NAV_COLUMN.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.92rem] text-foreground/65 hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[0.72rem] uppercase tracking-wider text-foreground/40">
              Contato
            </span>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href="mailto:tiago@tiagovaz.com.br"
                  className="flex items-center gap-2.5 text-[0.92rem] text-foreground/65 hover:text-primary"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.8} />
                  tiago@tiagovaz.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/tiago_vaz_br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[0.92rem] text-foreground/65 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.8} />
                  @tiago_vaz_br
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCd0qkBo3sKV83pdMdZjK5kw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[0.92rem] text-foreground/65 hover:text-primary"
                >
                  <Youtube className="h-4 w-4" strokeWidth={1.8} />
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tiago-vaz-9b126a192/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[0.92rem] text-foreground/65 hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.8} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-border/10 pt-8 sm:flex-row">
          <p className="flex flex-wrap items-center gap-x-2 text-[0.8rem] text-foreground/40">
            <span>
              © {new Date().getFullYear()} Tiago Vaz. Inteligência empresarial, dados e IA aplicada aos
              negócios.
            </span>
            <Link href="/politica-de-privacidade" className="underline decoration-foreground/20 hover:text-primary">
              Política de Privacidade
            </Link>
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 font-mono text-[0.78rem] uppercase tracking-wide text-foreground/50 hover:text-primary"
          >
            Voltar ao topo
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
