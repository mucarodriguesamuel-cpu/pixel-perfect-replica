import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { BookingExperience } from "@/components/site/BookingExperience";
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

function Agendar() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <WhatsAppButton />
      <main><BookingExperience /></main>
      <SiteFooter />
    </div>
  );
}
