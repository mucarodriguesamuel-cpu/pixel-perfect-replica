import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import {
  formatLongDate,
  formatShortDate,
  formatTime,
  toISODate,
  whatsappLink,
} from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Agenda — Débora Tonani Nail Designer" },
      { name: "description", content: "Painel de agendamentos do estúdio de Débora Tonani." },
      { property: "og:title", content: "Agenda — Débora Tonani" },
      { property: "og:description", content: "Painel de agendamentos do estúdio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Status = "pendente" | "confirmado" | "concluido" | "cancelado";

type Appointment = {
  id: string;
  client_name: string;
  whatsapp: string;
  email: string | null;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: Status;
};

const STATUS_LABEL: Record<Status, string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

function Admin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<"proximos" | "todos" | Status>("proximos");
  const [blockDate, setBlockDate] = useState("");
const [blockTime, setBlockTime] = useState("");
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("is_admin");
      if (!isAdmin) {
        toast.error("Esta conta não tem acesso à agenda.");
        await supabase.auth.signOut();
        navigate({ to: "/auth" });
        return;
      }
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const appointments = useQuery({
    queryKey: ["appointments", filter],
    enabled: ready,
    queryFn: async (): Promise<Appointment[]> => {
      let q = supabase
        .from("appointments")
        .select(
          "id,client_name,whatsapp,email,service_name,appointment_date,appointment_time,notes,status",
        )
        .order("appointment_date")
        .order("appointment_time");

      if (filter === "proximos") q = q.gte("appointment_date", toISODate(new Date()));
      else if (filter !== "todos") q = q.eq("status", filter);

      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Appointment[];
    },
  });

  const blocks = useQuery({
    queryKey: ["blocked_slots"],
    enabled: ready,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blocked_slots")
        .select("id,block_date,block_time,reason")
        .gte("block_date", toISODate(new Date()))
        .order("block_date");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) {
      toast.error("Não foi possível atualizar.");
      return;
    }
    toast.success(`Agendamento ${STATUS_LABEL[status].toLowerCase()}.`);
    qc.invalidateQueries({ queryKey: ["appointments"] });
  }

 async function addBlock() {
  if (!blockDate) return;

  const { error } = await supabase.from("blocked_slots").insert({
    block_date: blockDate,
    block_time: blockTime || null,
  });

  if (error) {
    toast.error("Este dia ou horário já está bloqueado.");
    return;
  }

  setBlockDate("");
  setBlockTime("");
  toast.success(blockTime ? "Horário bloqueado." : "Dia bloqueado.");
  qc.invalidateQueries({ queryKey: ["blocked_slots"] });
}
  async function removeBlock(id: string) {
    await supabase.from("blocked_slots").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["blocked_slots"] });
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <Link to="/" className="eyebrow">
            ← Voltar ao site
          </Link>
          <h1 className="mt-8 font-display text-4xl">Agenda indisponível</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            A área administrativa precisa do Supabase conectado para carregar e gerenciar os
            agendamentos.
          </p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="eyebrow">Carregando agenda…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6 md:px-10">
          <div>
            <p className="eyebrow">Painel</p>
            <h1 className="mt-2 font-display text-3xl">Agenda</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Ver site
            </Link>
            <button
              className="text-xs tracking-[0.2em] text-muted-foreground uppercase"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:px-10">
        <div className="flex flex-wrap gap-3">
          {(["proximos", "pendente", "confirmado", "concluido", "cancelado", "todos"] as const).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-5 py-2 text-[0.68rem] tracking-[0.2em] uppercase transition-colors ${
                  filter === f ? "border-gold bg-nude" : "border-border hover:border-gold/60"
                }`}
              >
                {f === "proximos" ? "Próximos" : f === "todos" ? "Todos" : STATUS_LABEL[f]}
              </button>
            ),
          )}
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {appointments.isLoading && (
            <p className="py-8 text-sm text-muted-foreground">Carregando…</p>
          )}
          {appointments.data?.length === 0 && (
            <p className="py-8 text-sm text-muted-foreground">Nenhum agendamento aqui.</p>
          )}
          {appointments.data?.map((a) => (
            <article key={a.id} className="grid gap-4 py-7 md:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">
                  {formatLongDate(a.appointment_date)} · {formatTime(a.appointment_time)}
                </p>
                <h2 className="mt-2 font-display text-2xl">{a.client_name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.service_name} · {a.whatsapp}
                  {a.email ? ` · ${a.email}` : ""}
                </p>
                {a.notes && <p className="mt-2 text-sm text-muted-foreground">{a.notes}</p>}
                <p className="mt-3 text-[0.68rem] tracking-[0.2em] uppercase text-gold">
                  {STATUS_LABEL[a.status]}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                <a
                  className="border border-border px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase hover:border-gold/60"
                  href={whatsappLink(
                    `Olá, ${a.client_name}! Aqui é a Débora. Confirmando seu horário de ${a.service_name} em ${formatLongDate(a.appointment_date)} às ${formatTime(a.appointment_time)}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                {a.status !== "confirmado" && (
                  <button
                    className="border border-border px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase hover:border-gold/60"
                    onClick={() => setStatus(a.id, "confirmado")}
                  >
                    Confirmar
                  </button>
                )}
                {a.status !== "concluido" && (
                  <button
                    className="border border-border px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase hover:border-gold/60"
                    onClick={() => setStatus(a.id, "concluido")}
                  >
                    Concluir
                  </button>
                )}
                {a.status !== "cancelado" && (
                  <button
                    className="border border-border px-4 py-2 text-[0.68rem] tracking-[0.2em] uppercase hover:border-gold/60"
                    onClick={() => setStatus(a.id, "cancelado")}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16">
        <h2 className="eyebrow">Bloquear agenda</h2>
<div className="mt-6 flex flex-wrap items-end gap-6">
  <input
    type="date"
    className="field-line max-w-[14rem]"
    value={blockDate}
    min={toISODate(new Date())}
    onChange={(e) => setBlockDate(e.target.value)}
  />

  <input
    type="time"
    className="field-line max-w-[10rem]"
    value={blockTime}
    onChange={(e) => setBlockTime(e.target.value)}
  />

  <button className="btn-outline-ink" onClick={addBlock} type="button">
    {blockTime ? "Bloquear horário" : "Bloquear dia"}
  </button>
</div>
          <div className="mt-6 flex flex-wrap gap-3">
            {blocks.data?.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => removeBlock(b.id)}
                className="border border-border px-4 py-2 text-sm hover:border-gold/60"
                title="Remover bloqueio"
              >
                {formatShortDate(b.block_date)}
                {b.block_time ? ` · ${formatTime(b.block_time)}` : ""} ×
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
