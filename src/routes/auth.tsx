import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase-configured";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso da profissional — Débora Tonani" },
      {
        name: "description",
        content: "Área restrita para gerenciar os agendamentos do estúdio de Débora Tonani.",
      },
      { property: "og:title", content: "Acesso da profissional — Débora Tonani" },
      { property: "og:description", content: "Área restrita de agendamentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      toast.error("Área administrativa indisponível até conectar o Supabase.");
      return;
    }
    setLoading(true);
    if (mode === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error("E-mail ou senha inválidos.");
        return;
      }
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Conta criada. Você já pode entrar.");
      setMode("entrar");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="eyebrow">
          ← Voltar ao site
        </Link>
        {!isSupabaseConfigured() && (
          <div className="mt-8 border border-border bg-sand/60 p-5 text-sm leading-relaxed text-muted-foreground">
            A área administrativa precisa do Supabase conectado para liberar login e gestão de
            agendamentos.
          </div>
        )}
        <h1 className="mt-8 font-display text-4xl">
          {mode === "entrar" ? "Acessar agenda" : "Criar acesso"}
        </h1>
        <span className="hairline mt-6 w-20" />

        <form onSubmit={submit} className="mt-10 space-y-8">
          <input
            className="field-line"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="field-line"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit" className="btn-ink w-full" disabled={loading}>
            {loading ? "Aguarde…" : mode === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          className="mt-8 text-xs tracking-[0.2em] text-muted-foreground uppercase"
          onClick={() => setMode(mode === "entrar" ? "criar" : "entrar")}
        >
          {mode === "entrar" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
        </button>
      </div>
    </div>
  );
}
