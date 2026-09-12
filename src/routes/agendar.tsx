import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/components/site/Reveal";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { useServices, useAvailableSlots, type Service } from "@/lib/booking";
import {
  SITE,
  whatsappLink,
  formatLongDate,
  formatPrice,
  formatTime,
  toISODate,
  WEEKDAY_SHORT,
} from "@/lib/site";

export const Route = createFileRoute("/agendar")({
  head: () => ({
    meta: [
      { title: "Agendar horário — Débora Tonani Nail Designer" },
      {
        name: "description",
        content:
          "Escolha o serviço, o dia e o horário disponível para o seu atendimento com Débora Tonani, nail designer no Ipiranga, São Paulo.",
      },
      { property: "og:title", content: "Agendar horário — Débora Tonani Nail Designer" },
      {
        property: "og:description",
       content: "Reserve seu horário de alongamento em gel, banho de gel ou manutenção.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/agendar" }],
  }),
  component: Agendar,
});

function nextDays(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    return d;
  });
}

function Agendar() {
  const days = useMemo(() => nextDays(30), []);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { date: string; time: string; service: string }>(null);

  const services = useServices();
  const slots = useAvailableSlots(date);

  const service: Service | undefined = services.data?.find((s) => s.id === serviceId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !date || !time) {
      toast.error("Escolha serviço, dia e horário.");
      return;
    }
    if (name.trim().length < 2 || whatsapp.trim().length < 8) {
      toast.error("Informe seu nome e WhatsApp para confirmarmos.");
      return;
    }
    setSending(true);

    if (isSupabaseConfigured()) {
      const { error } = await supabase.from("appointments").insert({
        client_name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || null,
        service_id: service.id,
        service_name: service.name,
        appointment_date: date,
        appointment_time: time,
        notes: notes.trim() || null,
      });
      setSending(false);

      if (error) {
        toast.error("Este horário acabou de ser reservado. Escolha outro, por favor.");
        setTime(null);
        slots.refetch();
        return;
      }
    } else {
      setSending(false);
      toast.success("Pedido preparado. Finalize a confirmação pelo WhatsApp.");
    }

    setDone({ date, time, service: service.name });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <WhatsAppButton />

      <main className="mx-auto max-w-[1100px] px-6 pt-36 pb-24 md:px-10 md:pt-44">
        {done ? (
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Pedido enviado</p>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">
              Seu horário está reservado para confirmação
            </h1>
            <span className="hairline mx-auto mt-8 w-24" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {done.service} — {formatLongDate(done.date)}, às {formatTime(done.time)}. Em breve
              você recebe a confirmação pelo WhatsApp.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                className="btn-ink"
                href={whatsappLink(
                  `Olá, Débora! Acabei de solicitar um horário pelo site: ${done.service}, ${formatLongDate(done.date)} às ${formatTime(done.time)}.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp
              </a>
              <Link to="/" className="btn-outline-ink">
                Voltar ao início
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Agendamento</p>
              <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">
                Reserve o seu horário
              </h1>
              <span className="hairline mt-8 w-24" />
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Atendimento individual em {SITE.city}. Escolha o serviço, o dia e o horário — a
                confirmação chega pelo WhatsApp {SITE.whatsappDisplay}.
              </p>
            </Reveal>

            <form onSubmit={submit} className="mt-16 space-y-16">
              <Reveal>
                <h2 className="eyebrow">01 — Serviço</h2>
                <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
                  {services.isLoading && (
                    <p className="bg-background p-6 text-sm text-muted-foreground">
                      Carregando serviços…
                    </p>
                  )}
                  {services.data?.map((s) => {
                    const active = s.id === serviceId;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`bg-background p-7 text-left transition-colors duration-300 ${
                          active ? "bg-nude" : "hover:bg-sand"
                        }`}
                      >
                        <span className="font-display text-2xl">{s.name}</span>
                        <span className="mt-2 block text-sm text-muted-foreground">
                          {s.description}
                        </span>
                        {formatPrice(s.price) && (
  <span className="mt-4 block text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
    {formatPrice(s.price)}
  </span>
)}
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal>
                <h2 className="eyebrow">02 — Dia</h2>
                <div className="mt-6 flex gap-3 overflow-x-auto pb-3">
                  {days.map((d) => {
                    const iso = toISODate(d);
                    const active = iso === date;
                    return (
                      <button
                        type="button"
                        key={iso}
                        onClick={() => {
                          setDate(iso);
                          setTime(null);
                        }}
                        className={`min-w-[4.5rem] border px-3 py-4 text-center transition-colors duration-300 ${
                          active
                            ? "border-gold bg-nude"
                            : "border-border hover:border-gold/60"
                        }`}
                      >
                        <span className="block text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground">
                          {WEEKDAY_SHORT[d.getDay()]}
                        </span>
                        <span className="mt-1 block font-display text-2xl">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal>
                <h2 className="eyebrow">03 — Horário</h2>
                <div className="mt-6">
                  {!date && (
                    <p className="text-sm text-muted-foreground">Escolha um dia acima.</p>
                  )}
                  {date && slots.isLoading && (
                    <p className="text-sm text-muted-foreground">Buscando horários…</p>
                  )}
                  {date && !slots.isLoading && (slots.data?.length ?? 0) === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Não há horários livres neste dia. Escolha outra data.
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {slots.data?.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setTime(s)}
                        className={`border px-6 py-3 text-sm tracking-[0.18em] transition-colors duration-300 ${
                          time === s ? "border-gold bg-nude" : "border-border hover:border-gold/60"
                        }`}
                      >
                        {formatTime(s)}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="eyebrow">04 — Seus dados</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <input
                    className="field-line"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    className="field-line"
                    placeholder="WhatsApp com DDD"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                  <input
                    className="field-line"
                    type="email"
                    placeholder="E-mail (opcional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="field-line"
                    placeholder="Observações (opcional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-6">
                  <button type="submit" className="btn-ink" disabled={sending}>
                    {sending ? "Enviando…" : "Solicitar horário"}
                  </button>
                  {service && date && time && (
                    <p className="text-sm text-muted-foreground">
                      {service.name} · {formatLongDate(date)} · {formatTime(time)}
                    </p>
                  )}
                </div>
              </Reveal>
            </form>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
