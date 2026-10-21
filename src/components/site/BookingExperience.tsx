import { Reveal } from "@/components/site/Reveal";
import { SITE, whatsappLink } from "@/lib/site";

const BOOKING_MESSAGE = "Olá, Débora! Vim pelo site e gostaria de agendar um horário.";

export function BookingExperience({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={embedded ? "mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28" : "mx-auto max-w-[1100px] px-6 pt-36 pb-24 md:px-10 md:pt-44"}>
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Agendamento</p>
        {embedded ? (
          <h2 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">Gostou do que viu? Reserve seu horário.</h2>
        ) : (
          <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">Reserve o seu horário</h1>
        )}
        <span className="hairline mx-auto mt-8 w-24" />
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Atendimento individual em {SITE.city}. Chame a Débora no WhatsApp {SITE.whatsappDisplay} e combine o melhor dia e horário para você.
        </p>
        <div className="mt-10 flex justify-center">
          <a className="btn-ink" href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer">
            Agendar pelo WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  );
}
