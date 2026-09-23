import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const SITE_URL = "https://especialistaeunhasdegedeboratonani.dev";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Privacidade — Débora Tonani Nail Designer" },
      { name: "description", content: "Informações sobre privacidade e medição de anúncios no site de Débora Tonani." },
      { property: "og:title", content: "Privacidade — Débora Tonani Nail Designer" },
      { property: "og:description", content: "Como o site utiliza dados para medir resultados de anúncios e como alterar sua escolha." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacidade` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidade` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main className="mx-auto min-h-[70vh] max-w-3xl px-6 pt-36 pb-24 md:px-10 md:pt-48">
        <p className="eyebrow">Privacidade</p>
        <h1 className="mt-6 font-display text-5xl leading-tight md:text-7xl">Medição de anúncios</h1>
        <div className="mt-10 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Este site utiliza a tag do Google Ads para medir ações realizadas após a visualização ou o clique em anúncios. O destinatário desses dados é o Google Ads.
          </p>
          <p>
            A medição pode envolver identificadores do navegador, informações do dispositivo, páginas visitadas e interações com o site. Não enviamos nome, telefone, e-mail ou observações do agendamento como parâmetros comuns de anúncios.
          </p>
          <p>
            Nas regiões em que o consentimento é necessário, a tag permanece bloqueada até a aceitação. A recusa não impede o uso do site nem o agendamento. Sua escolha fica registrada neste navegador com a data, a finalidade e a versão do aviso apresentado.
          </p>
          <p>
            Você pode retirar ou conceder o consentimento a qualquer momento. A alteração vale para novas interações e não envia retroativamente eventos bloqueados.
          </p>
        </div>
        <Button
          className="mt-10"
          onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
        >
          Alterar preferências
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
