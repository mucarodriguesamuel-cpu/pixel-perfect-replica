import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_MESSAGE, SITE, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-[1.15] md:text-6xl">
              Vamos cuidar
              <br />
              das suas mãos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/agendar"
                className="btn-ink bg-espresso-foreground text-espresso hover:bg-champagne"
              >
                Agendar horário
              </Link>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink border-espresso-foreground/30 text-espresso-foreground"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-3 text-sm text-espresso-foreground/70">
            <p className="eyebrow text-espresso-foreground/50">Contato</p>
            <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} className="hover:text-champagne">
              {SITE.whatsappDisplay}
            </a>
            <p>Atendimento em estúdio</p>
            <p>{SITE.city}</p>
            <p>Horário agendado</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-espresso-foreground/15 pt-8 text-[0.7rem] tracking-[0.16em] text-espresso-foreground/50 uppercase md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name} — {SITE.role}
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacidade" className="hover:text-champagne">
              Privacidade
            </Link>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-[0.7rem] font-light tracking-[0.16em] text-espresso-foreground/50 uppercase hover:text-champagne"
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
            >
              Preferências de cookies
            </Button>
            <Link to="/auth" className="hover:text-champagne">
              Acesso da Débora
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
