import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/components/site/Reveal";
import { SITE, whatsappLink } from "@/lib/site";
import heroImg from "@/assets/hero-maos.jpg";
import especialidadeImg from "@/assets/especialidade.jpg";
import estudioImg from "@/assets/estudio.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const BOOKING_MESSAGE = "Olá, Débora! Vim pelo site e gostaria de agendar um horário.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Débora Tonani — Nail Designer | Alongamento de unhas em Ipiranga" },
      {
        name: "description",
        content:
          "Alongamentos naturais, banho de gel, manutenção e esmaltação em gel com Débora Tonani, nail designer no Ipiranga, São Paulo, há 16 anos.",
      },
      {
        property: "og:title",
        content: "Débora Tonani — Nail Designer | Alongamento natural em São Paulo",
      },
      {
        property: "og:description",
        content:
          "Beleza sofisticada com acabamento delicado, natural e pensado para valorizar suas mãos. Atendimento em estúdio no Ipiranga.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main>
        {/* HERO — editorial, fotografia protagonista */}
        <section id="inicio" className="theme-wine relative overflow-hidden">
          <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-6 pt-32 pb-16 md:px-10 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
            <div className="lg:pb-10">
              <Reveal>
                <p className="eyebrow">
                  {SITE.name} — {SITE.role}
                </p>
                <span className="hairline mt-6 w-28" />
              </Reveal>

              <Reveal delay={120}>
                <h1 className="mt-8 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.98] tracking-[-0.02em]">
                  A arte do
                  <br />
                  alongamento
                  <br />
                  <em className="text-[color-mix(in_oklab,var(--gold)_78%,var(--espresso))]">
                    natural.
                  </em>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-8 max-w-md text-[0.98rem] leading-[1.9] text-muted-foreground">
                  Especialista em alongamento de unhas há 16 anos e criadora da
                  Técnica da Naturalidade. Atendimento individual em estúdio no
                  Ipiranga, São Paulo.
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <a
                    className="btn-ink"
                    href={whatsappLink(BOOKING_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar pelo WhatsApp
                  </a>
                  <Link
                    to="/"
                    hash="tecnica"
                    className="inline-flex items-center gap-3 border-b border-foreground/30 pb-1 text-[0.7rem] tracking-[0.24em] uppercase transition-colors hover:border-gold"
                  >
                    Conhecer a técnica <span aria-hidden="true">↓</span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <div className="absolute -top-8 right-6 hidden h-44 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" />
              <Reveal delay={180}>
                <figure className="relative">
                  <img
                    src={heroImg}
                    alt="Mãos com alongamento de unhas natural em tom nude sobre seda champagne"
                    width={1008}
                    height={1504}
                    className="h-[52vh] w-full object-cover object-center sm:h-[64vh] lg:h-[78vh]"
                  />
                  <figcaption className="absolute -bottom-5 -left-5 hidden bg-background px-7 py-5 lg:block">
                    <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                      Ipiranga · São Paulo
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* APRESENTAÇÃO — 16 anos como elemento editorial */}
        <section id="sobre" className="scroll-mt-24 bg-sand">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 md:px-10 md:py-40 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow">A especialista</p>
                <p className="mt-10 font-display text-[clamp(7rem,16vw,13rem)] leading-[0.85] text-gold/70">
                  16
                </p>
                <p className="mt-4 text-xs tracking-[0.28em] uppercase text-muted-foreground">
                  anos de experiência
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="max-w-2xl lg:pt-16">
                <h2 className="font-display text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.04]">
                  16 anos dedicados à arte de transformar unhas.
                </h2>

                <div className="mt-10 space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
                  <p>
                    Ao longo de 16 anos de carreira, fui aprimorando meu olhar, minha
                    técnica e a forma de construir cada unha.
                  </p>
                  <p>
                    Com o tempo, entendi que o verdadeiro luxo está naquilo que é bem
                    executado: uma unha elegante, leve, proporcional e resistente, sem
                    excessos.
                  </p>
                  <p>
                    Cada construção é pensada individualmente, respeitando o formato
                    das mãos, a estrutura das unhas e as proporções de cada cliente.
                  </p>
                </div>

                <blockquote className="mt-12 border-l border-gold pl-7 font-display text-2xl italic leading-relaxed md:text-3xl">
                  Sofisticação não está no excesso. Está na precisão, na leveza e na
                  qualidade de cada detalhe.
                </blockquote>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TÉCNICA DA NATURALIDADE — técnica autoral */}
        <section id="tecnica" className="scroll-mt-24 theme-wine">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
              <Reveal>
                <div>
                  <p className="eyebrow">Técnica autoral</p>
                  <h2 className="mt-7 font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.0]">
                    Técnica da
                    <br />
                    Naturalidade.
                  </h2>

                  <p className="mt-9 max-w-xl text-[0.98rem] leading-[1.9] text-muted-foreground">
                    Desenvolvida ao longo de anos de estudo, prática e
                    aperfeiçoamento, a Técnica da Naturalidade constrói unhas com
                    proporção, estrutura, leveza visual e acabamento refinado.
                  </p>

                  <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.9] text-muted-foreground">
                    Formato, comprimento, curvatura, estrutura e rotina da cliente
                    são considerados antes da construção. Não é reproduzir um modelo:
                    é criar uma estrutura que faça sentido para aquela mão.
                  </p>

                  <p className="mt-12 max-w-xl font-display text-2xl italic leading-relaxed md:text-3xl">
                    Uma unha bonita a ponto de parecer que sempre pertenceu àquela
                    mão.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="lg:mt-20">
                  <img
                    src={especialidadeImg}
                    alt="Detalhe de alongamento natural construído com a Técnica da Naturalidade"
                    loading="lazy"
                    className="h-[50vh] w-full object-cover md:h-[64vh]"
                  />
                  <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gold/50 pt-8">
                    {[
                      "Estrutura fina e elegante",
                      "Proporção adequada",
                      "Acabamento delicado",
                      "Resistência",
                      "Conforto",
                      "Respeito à unha natural",
                    ].map((item) => (
                      <p key={item} className="border-b border-border pb-4 font-display text-lg leading-tight">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* GALERIA — imagens grandes, composição editorial */}
        <section id="portfolio" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Portfólio</p>
                  <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02]">
                    Trabalhos que falam por si
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.24em] uppercase"
                >
                  <span className="border-b border-gold/60 pb-1">Ver mais trabalhos</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-12 gap-4 md:gap-7">
              <Reveal className="col-span-12 md:col-span-7">
                <img
                  src={p2}
                  alt="Alongamentos de unha em tom branco leitoso sobre linho cru"
                  loading="lazy"
                  className="h-[40vh] w-full object-cover md:h-[58vh]"
                />
              </Reveal>
              <Reveal delay={120} className="col-span-7 md:col-span-5 md:mt-20">
                <img
                  src={p3}
                  alt="Mãos com alongamento nude e francesinha delicada sobre veludo marrom"
                  loading="lazy"
                  className="h-[36vh] w-full object-cover md:h-[64vh]"
                />
              </Reveal>
              <Reveal delay={80} className="col-span-5 md:col-span-4 md:-mt-12">
                <img
                  src={p1}
                  alt="Fita de seda e esmalte nude sobre pedra bege"
                  loading="lazy"
                  className="h-[36vh] w-full object-cover md:h-[48vh]"
                />
              </Reveal>
              <Reveal delay={160} className="col-span-12 md:col-span-8">
                <img
                  src={p5}
                  alt="Unhas naturais em tom nude sobre tricô bege"
                  loading="lazy"
                  className="h-[44vh] w-full object-cover md:h-[62vh]"
                />
              </Reveal>
              <Reveal delay={100} className="col-span-6 md:col-span-5">
                <img
                  src={p4}
                  alt="Alongamento em gel com acabamento natural realizado por Débora Tonani"
                  loading="lazy"
                  className="h-[34vh] w-full object-cover md:h-[52vh]"
                />
              </Reveal>
              <Reveal delay={180} className="col-span-6 md:col-span-7 md:mt-14">
                <img
                  src={p6}
                  alt="Detalhe de unhas alongadas com acabamento sofisticado"
                  loading="lazy"
                  className="h-[34vh] w-full object-cover md:h-[56vh]"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCEDIMENTOS — lista editorial numerada, sem preços */}
        <section id="procedimentos" className="scroll-mt-24 theme-wine">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
            <Reveal>
              <p className="eyebrow">Procedimentos</p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
                Cada procedimento começa entendendo o que faz sentido para cada mão.
              </h2>
            </Reveal>

            <div className="mt-16 border-t border-border">
              {[
                {
                  title: "Alongamento em gel",
                  text: "Para quem deseja mais comprimento, estrutura e transformação, com uma construção personalizada, elegante e resistente.",
                },
                {
                  title: "Banho de gel",
                  text: "Para quem deseja manter o comprimento natural, acrescentando estrutura, resistência e acabamento.",
                },
                {
                  title: "Manutenção",
                  text: "Para preservar o equilíbrio, a estrutura e a beleza do alongamento conforme a unha natural cresce.",
                },
                {
                  title: "Esmaltação em gel",
                  text: "Disponível como complemento dos procedimentos de alongamento, manutenção e banho de gel.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <div className="group grid gap-4 border-b border-border py-10 transition-colors duration-500 md:grid-cols-[0.15fr_0.85fr_1fr] md:items-baseline md:gap-10 md:py-12">
                    <span className="text-[0.7rem] tracking-[0.25em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md text-sm leading-[1.85] text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-12">
                <a
                  href={whatsappLink(BOOKING_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border-b border-foreground/30 pb-1 text-[0.7rem] tracking-[0.24em] uppercase transition-colors hover:border-gold"
                >
                  Reservar horário pelo WhatsApp <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIÊNCIA — exclusividade e cuidado */}
        <section id="experiencia" className="scroll-mt-24 theme-cream bg-espresso text-espresso-foreground">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <Reveal>
                <img
                  src={estudioImg}
                  alt="Estúdio de atendimento da Débora Tonani no Ipiranga"
                  loading="lazy"
                  className="h-[52vh] w-full object-cover md:h-[74vh]"
                />
              </Reveal>

              <Reveal delay={120}>
                <p className="eyebrow text-espresso-foreground/50">A experiência</p>

                <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02]">
                  O seu horário é realmente seu.
                </h2>

                <div className="mt-9 space-y-6 text-[0.98rem] leading-[1.9] text-espresso-foreground/70">
                  <p>
                    Os atendimentos são realizados somente com horário previamente
                    agendado. Cada horário é reservado para uma cliente.
                  </p>
                  <p>
                    Durante seu horário, o foco está em você. Sem pressa, sem
                    atendimento simultâneo e sem excesso de pessoas.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-8 text-sm">
                  <p>Atendimento individual</p>
                  <p>Horário reservado</p>
                  <p>Ambiente tranquilo</p>
                  <p>Atenção aos detalhes</p>
                </div>

                <blockquote className="mt-14 max-w-xl font-display text-2xl italic leading-relaxed md:text-3xl">
                  Autocuidado também é escolher com quem você entrega as suas mãos.
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        {/* DÚVIDAS FREQUENTES */}
        <section id="duvidas" className="scroll-mt-24 bg-background">
          <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-36">
            <Reveal>
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.03]">
                Algumas dúvidas antes do seu atendimento.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-14 border-t border-border">
                {[
                  {
                    q: "O alongamento danifica a unha natural?",
                    a: "O cuidado depende da preparação, construção, produtos utilizados, manutenção e remoção correta. Meu trabalho busca respeitar a estrutura natural da unha e evitar desgastes desnecessários.",
                  },
                  {
                    q: "Qual a diferença entre alongamento e banho de gel?",
                    a: "O alongamento cria um novo comprimento. Já o banho de gel é realizado sobre a própria unha natural para oferecer mais estrutura, resistência e acabamento.",
                  },
                  {
                    q: "De quanto em quanto tempo devo fazer manutenção?",
                    a: "A frequência varia de acordo com o crescimento das unhas e com a rotina de cada cliente. A orientação é feita de forma individual.",
                  },
                  {
                    q: "Posso remover o alongamento em casa?",
                    a: "Não é recomendado. A remoção deve ser feita profissionalmente para evitar danos desnecessários à unha natural.",
                  },
                  {
                    q: "Posso fazer somente esmaltação em gel nas mãos?",
                    a: "Atualmente não ofereço esmaltação em gel isoladamente nas mãos. Ela pode ser realizada como complemento do alongamento, da manutenção ou do banho de gel.",
                  },
                  {
                    q: "O atendimento precisa ser agendado?",
                    a: "Sim. Todos os atendimentos são realizados com horário agendado e cada horário é reservado individualmente para uma cliente.",
                  },
                ].map((item) => (
                  <details key={item.q} className="group border-b border-border py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-8 font-display text-xl md:text-2xl">
                      {item.q}
                      <span className="text-gold transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-5 max-w-3xl pr-8 text-sm leading-[1.9] text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="localizacao" className="scroll-mt-24 theme-wine">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Onde encontrar</p>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08]">
                Ipiranga,
                <br />
                São Paulo
              </h2>
              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <p>
                  {SITE.name} — {SITE.role}
                </p>
                <p>Rua Doutor Elísio de Castro, 336 — Ipiranga, São Paulo</p>
                <p>Atendimento somente com horário agendado.</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={whatsappLink(BOOKING_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                >
                  Agendar pelo WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Elisio+de+Castro+336+Ipiranga+Sao+Paulo"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-ink"
                >
                  Como chegar
                </a>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="h-[38vh] w-full overflow-hidden border border-border md:h-[52vh]">
                <iframe
                  title="Mapa — Rua Doutor Elísio de Castro, 336"
                  src="https://www.google.com/maps?q=Rua%20Doutor%20El%C3%ADsio%20de%20Castro%2C%20336%20-%20Ipiranga%2C%20S%C3%A3o%20Paulo&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[35%]"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section id="contato" className="scroll-mt-24 theme-cream bg-espresso text-espresso-foreground">
          <div className="mx-auto max-w-[1100px] px-6 py-28 text-center md:px-10 md:py-44">
            <Reveal>
              <p className="eyebrow text-espresso-foreground/50">Agendamento</p>

              <h2 className="mt-8 font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.0]">
                Não faço apenas unhas.
                <br />
                Cuido de detalhes que fazem
                <br />
                uma mulher se sentir ainda mais bonita.
              </h2>

              <div className="mt-12">
                <p className="font-display text-2xl">Débora Tonani</p>
                <p className="mt-3 text-xs tracking-[0.22em] uppercase text-espresso-foreground/60">
                  Especialista em alongamento de unhas há 16 anos
                </p>
              </div>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={whatsappLink(BOOKING_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink bg-espresso-foreground text-espresso hover:bg-champagne"
                >
                  Agendar pelo WhatsApp
                </a>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-light"
                >
                  {SITE.instagramLabel}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
