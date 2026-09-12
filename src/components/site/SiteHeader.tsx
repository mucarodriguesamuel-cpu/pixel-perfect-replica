import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Início", to: "/", hash: "inicio" },
  { label: "Sobre", to: "/", hash: "sobre" },
  { label: "Técnica", to: "/", hash: "tecnica" },
  { label: "Procedimentos", to: "/", hash: "procedimentos" },
  { label: "Experiência", to: "/", hash: "experiencia" },
  { label: "Dúvidas", to: "/", hash: "duvidas" },
  { label: "Contato", to: "/", hash: "contato" },
] as const;
export function SiteHeader({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const solid = scrolled || open;
  // Sobre fundo escuro (hero): texto claro. Quando fixa com fundo, texto escuro.
  const overDark = tone === "dark" && !solid && pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid ? "bg-background/95 shadow-[0_10px_40px_-20px_rgba(60,30,30,0.25)] backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link to="/" hash="inicio" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span
            className={`font-display text-xl tracking-[0.16em] uppercase md:text-2xl ${
              overDark ? "text-[#fff8f4]" : "text-foreground"
            }`}
          >
            Débora Tonani
          </span>
          <span
            className={`mt-1.5 text-[0.6rem] tracking-[0.42em] uppercase ${
              overDark ? "text-rose" : "text-muted-foreground"
            }`}
          >
            {SITE.role}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              className={`text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                overDark ? "text-[#fff8f4]/75 hover:text-[#fff8f4]" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/agendar" className="btn-ink min-h-0 px-7 py-3.5 text-[0.68rem]">
            Agendar horário <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-px w-7 transition-transform duration-300 ${overDark ? "bg-[#fff8f4]" : "bg-foreground"} ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-7 transition-transform duration-300 ${overDark ? "bg-[#fff8f4]" : "bg-foreground"} ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border/60 bg-background transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[85vh]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              onClick={() => setOpen(false)}
              className="border-b border-border/50 py-5 font-display text-2xl"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/agendar" onClick={() => setOpen(false)} className="btn-ink mt-7 mb-6 w-full">
            Agendar horário <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
