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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
setLoading(false);

if (error) {
  toast.error("E-mail ou senha inválidos.");
  return;
}

navigate({ to: "/admin" });
  }
  async function resetPassword() {
    if (!email) {
      toast.error("Digite seu e-mail primeiro.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://pixel-perfect-render-9030.lovable.app/reset-password",
    });

    if (error) {
      toast.error("Não foi possível enviar o link.");
      return;
    }

    toast.success("Link de recuperação enviado para seu e-mail.");
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
          Acessar agenda
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
            {loading ? "Aguarde…" : "Entrar"}
          </button>
        </form>

           
      </div>
    </div>
  );
}
