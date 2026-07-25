"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "#filosofia", label: "Filosofia" },
  { href: "#quemsou", label: "Quem sou" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#caso", label: "Caso real" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/10 bg-background/80 backdrop-blur-md backdrop-saturate-150">
        <div className="container flex items-center justify-between py-4">
          <Link href="#top" className="flex items-baseline gap-2 font-display text-2xl">
            <span>Tiago</span>
            <span className="relative top-[1px] text-[1.75rem] italic text-primary">Vaz</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[0.87rem] text-foreground/65 transition-colors hover:text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3.5">
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#diagnostico">Agendar Diagnóstico</a>
            </Button>
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="flex flex-col gap-[5px] p-2 md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-[22px] bg-foreground"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[1.5px] w-[22px] bg-foreground"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-[22px] bg-foreground"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-black/50 md:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(78vw,320px)] flex-col gap-7 border-l border-border/10 bg-background-soft px-8 pb-10 pt-24 md:hidden"
            >
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[1.05rem] text-foreground/65 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 justify-center">
                <a href="#diagnostico" onClick={() => setOpen(false)}>
                  Agendar Diagnóstico
                </a>
              </Button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
