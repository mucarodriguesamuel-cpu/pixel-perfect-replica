import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/components/site/Reveal";

import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";
import hero from "@/assets/hero-maos.jpg";
export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
     { title: "Portfólio — Débora Tonani Nail Designer | Ipiranga" },
      {
        name: "description",
        content:
          "Galeria de alongamentos de unhas naturais, banho de gel e manutenção feitos por Débora Tonani, nail designer no Ipiranga, São Paulo.",
      },
      { property: "og:title", content: "Portfólio — Débora Tonani Nail Designer" },
      {
        property: "og:description",
        content:
          "Trabalhos de alongamento natural, resistente e elegante no Ipiranga, São Paulo.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

const ITENS = [
  { src: p3, alt: "Alongamento nude com francesinha delicada sobre veludo", span: "md:col-span-5", h: "md:h-[64vh]" },
  { src: p2, alt: "Alongamentos em branco leitoso sobre linho cru", span: "md:col-span-7", h: "md:h-[48vh]" },
  { src: hero, alt: "Mãos com alongamento natural sobre seda champagne", span: "md:col-span-6", h: "md:h-[70vh]" },
  { src: p4, alt: "Trabalho de unhas com acabamento natural", span: "md:col-span-6", h: "md:h-[46vh]" },
  { src: p5, alt: "Unhas naturais com acabamento delicado", span: "md:col-span-5", h: "md:h-[62vh]" },
  { src: p6, alt: "Trabalho de nail design realizado por Débora Tonani", span: "md:col-span-7", h: "md:h-[46vh]" },
  { src: p1, alt: "Trabalho de unhas com acabamento elegante", span: "md:col-span-5", h: "md:h-[58vh]" },
];

function Portfolio() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-[1400px] px-6 pt-36 pb-10 md:px-10 md:pt-48">
          <Reveal>
            <p className="eyebrow">Portfólio</p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.02]">
              Trabalhos que falam por si
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
Alongamentos, banho de gel e manutenção com acabamento delicado — pensados para
valorizar suas mãos com naturalidade.
            </p>
            <span className="hairline mt-10 w-24" />
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
          <div className="grid grid-cols-12 gap-4 md:gap-7">
            {ITENS.map((item, i) => (
              <Reveal
                key={item.alt}
                delay={(i % 2) * 100}
                className={`col-span-12 ${item.span} ${i % 3 === 1 ? "md:mt-14" : ""}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={`h-[40vh] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02] ${item.h}`}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-24 border-t border-border pt-14 text-center">
              <p className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight">
                Quer esse acabamento nas suas mãos?
              </p>
              <Link to="/agendar" className="btn-ink mt-9">
                Agendar horário
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
