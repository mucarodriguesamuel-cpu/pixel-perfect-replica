import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      toast.error("Não foi possível alterar a senha.");
      return;
    }

    toast.success("Senha alterada com sucesso.");
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <Link to="/auth" className="eyebrow">
          ← Voltar
        </Link>

        <h1 className="mt-8 font-display text-4xl">
          Criar nova senha
        </h1>

        <span className="hairline mt-6 w-20" />

        {!ready ? (
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            Link inválido ou expirado. Solicite um novo link de recuperação.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-8">
            <input
              className="field-line"
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              className="field-line"
              type="password"
              placeholder="Confirmar nova senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button type="submit" className="btn-ink w-full" disabled={loading}>
              {loading ? "Salvando…" : "Alterar senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
