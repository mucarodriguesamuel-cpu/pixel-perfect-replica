import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-maos.jpg";
import estudioImg from "@/assets/portfolio-6.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p5 from "@/assets/portfolio-5.jpg";
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
        {/* HERO */}
        <section id="inicio" className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 pb-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
            <div className="lg:pr-10">
              <Reveal>
                <p className="eyebrow">
                  {SITE.name} — {SITE.role}
                </p>
                <span className="hairline mt-5 w-28" />
              </Reveal>

   <Reveal delay={120}>
  <h1 className="mt-8 max-w-4xl font-display text-[clamp(3rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.025em]">
    A beleza de uma unha
    <br />
    bem construída está
    <br />
    <em className="text-[color-mix(in_oklab,var(--gold)_78%,var(--espresso))]">
      nos detalhes.
    </em>
  </h1>
</Reveal>

<Reveal delay={220}>
  <p className="mt-8 text-xs font-medium tracking-[0.22em] uppercase text-foreground/70">
    Especialista em alongamento de unhas há 16 anos
  </p>

  <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
    Uma técnica desenvolvida através de experiência, estudo e aperfeiçoamento para criar
    unhas elegantes, leves, resistentes e em harmonia com cada mão.
  </p>
</Reveal>

<Reveal delay={320}>
  <div className="mt-10">
    <Link to="/agendar" className="btn-ink">
      Agendar meu horário
    </Link>
  </div>
</Reveal>
              <Reveal delay={420}>
                <div className="mt-12 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold/70" />
                  <span className="text-[0.7rem] tracking-[0.28em] text-muted-foreground uppercase">
                    Atendimento em estúdio
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <div className="absolute -top-6 right-4 hidden h-40 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" />
              <Reveal delay={180}>
                <figure className="relative">
                  <img
                    src={heroImg}
                    alt="Mãos com alongamento de unhas natural em tom nude sobre seda champagne"
                    width={1008}
                    height={1504}
                    className="h-[58vh] w-full object-cover object-center sm:h-[70vh] lg:h-[86vh]"
                  />
                  <figcaption className="absolute -bottom-4 -left-4 hidden bg-background px-6 py-4 lg:block">
                    <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                      Ipiranga · São Paulo
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

   {/* SOBRE DÉBORA */}
<section id="sobre" className="scroll-mt-24 bg-sand">
  <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
    <Reveal>
      <div className="lg:sticky lg:top-32">
        <p className="eyebrow">Sobre Débora</p>
        <p className="mt-8 font-display text-[clamp(5rem,12vw,9rem)] leading-none text-gold/70">
          16
        </p>
        <p className="mt-3 text-xs tracking-[0.25em] uppercase text-muted-foreground">
          anos de experiência
        </p>
      </div>
    </Reveal>

    <Reveal delay={120}>
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
          16 anos dedicados à arte de transformar unhas.
        </h2>

        <div className="mt-10 space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
          <p>
            Há 16 anos, comecei minha trajetória no universo das unhas. Ao longo desse tempo,
            meu trabalho foi sendo aperfeiçoado através da prática, do estudo e, principalmente,
            da observação de cada tipo de unha e das necessidades de cada cliente.
          </p>

          <p>
            Com o passar dos anos, percebi que meu trabalho não deveria estar simplesmente
            relacionado a deixar as unhas mais longas. Eu queria desenvolver uma técnica em que
            o alongamento pudesse ser bonito, estruturado e resistente, mas sem perder a delicadeza.
          </p>

          <p>
            Foi assim que minha forma de trabalhar foi se tornando cada vez mais voltada para
            aquilo que hoje chamo de <strong className="font-normal text-foreground">Técnica da Naturalidade</strong>.
          </p>

          <p>
            Uma construção pensada para respeitar o formato das mãos, a estrutura das unhas e
            a proporção de cada cliente.
          </p>
        </div>

        <blockquote className="mt-12 border-l border-gold pl-7 font-display text-2xl italic leading-relaxed md:text-3xl">
          Porque uma unha bem feita não precisa chamar atenção pelo excesso.
          Ela chama atenção pela qualidade do acabamento.
        </blockquote>
      </div>
    </Reveal>
  </div>
</section>
        {/* TÉCNICA DA NATURALIDADE */}
<section id="tecnica" className="scroll-mt-24 bg-background">
  <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Técnica da Naturalidade</p>
      <div className="mt-7 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.02]">
            Quando o alongamento passa a fazer parte da sua mão.
          </h2>

          <p className="mt-8 max-w-2xl text-[0.98rem] leading-[1.9] text-muted-foreground">
            A Técnica da Naturalidade é resultado de anos de experiência e aperfeiçoamento.
            O objetivo é construir uma unha com proporção, estrutura, leveza visual e
            acabamento refinado.
          </p>

          <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.9] text-muted-foreground">
            Formato, comprimento, curvatura, estrutura e rotina da cliente são considerados
            antes da construção. Não existe um único formato que funcione da mesma maneira
            para todas as mulheres.
          </p>

          <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.9] text-muted-foreground">
            Não é simplesmente reproduzir um modelo. É construir uma estrutura que faça
            sentido para aquela mão.
          </p>
        </div>

        <div className="border-t border-gold/50 pt-8 lg:mt-16">
          <p className="eyebrow">O resultado que buscamos</p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7">
            {[
              "Estrutura fina e elegante",
              "Proporção adequada",
              "Acabamento delicado",
              "Resistência",
              "Conforto",
              "Harmonia com as mãos",
              "Aparência sofisticada",
              "Respeito à unha natural",
            ].map((item) => (
              <div key={item} className="border-b border-border pb-5">
                <p className="font-display text-xl leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-16 max-w-4xl font-display text-2xl italic leading-relaxed md:text-4xl">
        A proposta não é criar uma unha exagerada. É criar uma unha bonita a ponto de
        parecer que sempre pertenceu àquela mão.
      </p>
    </Reveal>
  </div>
</section>
        {/* PROCEDIMENTOS */}
<section id="procedimentos" className="scroll-mt-24 bg-sand">
  <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Procedimentos</p>
      <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.03]">
        Cada procedimento começa entendendo o que faz sentido para cada mão.
      </h2>
    </Reveal>

    <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
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
        <Reveal key={item.title} delay={i * 80}>
          <div className="h-full bg-background p-8 md:p-12">
            <span className="text-[0.7rem] tracking-[0.25em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-6 font-display text-3xl md:text-4xl">
              {item.title}
            </h3>

            <p className="mt-5 max-w-md text-sm leading-[1.8] text-muted-foreground">
              {item.text}
            </p>

            <Link
              to="/agendar"
              className="mt-8 inline-flex border-b border-foreground/30 pb-1 text-[0.7rem] tracking-[0.2em] uppercase"
            >
              Conhecer o procedimento
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
      {/* ALONGAMENTO EM GEL */}
<section className="bg-background">
  <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
    <Reveal>
      <img
        src={p3}
        alt="Alongamento em gel realizado por Débora Tonani"
        loading="lazy"
        className="h-[55vh] w-full object-cover md:h-[78vh]"
      />
    </Reveal>

    <Reveal delay={120}>
      <div className="lg:py-10">
        <p className="eyebrow">Alongamento em gel</p>

        <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.03]">
          Leveza visual também precisa de estrutura.
        </h2>

        <div className="mt-9 space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
          <p>
            O alongamento é indicado para mulheres que desejam transformar o comprimento
            e a estrutura das unhas, corrigir pequenas diferenças ou simplesmente ter
            unhas mais uniformes e elegantes.
          </p>

          <p>
            Antes da construção, a unha natural é observada para definir a estrutura,
            o comprimento e o formato mais adequados para cada cliente.
          </p>

          <p>
            Meu trabalho não é simplesmente acrescentar produto sobre a unha.
            Existe uma construção: espessura, curvatura, ponto de tensão,
            equilíbrio e acabamento precisam trabalhar juntos.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="eyebrow">O que busco em cada construção</p>

          <div className="mt-6 grid grid-cols-2 gap-5 font-display text-xl">
            <p>Leveza</p>
            <p>Estrutura</p>
            <p>Resistência</p>
            <p>Estética</p>
          </div>
        </div>

        <p className="mt-10 font-display text-2xl italic leading-relaxed">
          Naturalidade não significa fragilidade.
        </p>
      </div>
    </Reveal>
  </div>
</section>
        {/* BANHO DE GEL */}
<section className="bg-sand">
  <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-24">
    <Reveal>
      <div>
        <p className="eyebrow">Banho de gel</p>

        <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.03]">
          Estrutura e cuidado para quem prefere manter o comprimento natural.
        </h2>

        <div className="mt-9 space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
          <p>
            O banho de gel é indicado para mulheres que gostam do comprimento das próprias
            unhas, mas desejam uma estrutura mais resistente e um acabamento mais uniforme.
          </p>

          <p>
            Diferentemente do alongamento, o banho de gel não tem como objetivo criar um
            novo comprimento. O trabalho é realizado sobre a unha natural, acompanhando
            seu crescimento e sua rotina.
          </p>

          <p>
            É uma escolha para quem deseja manter as próprias unhas e, ao mesmo tempo,
            ter mais resistência, estrutura e um acabamento bonito e bem cuidado.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="eyebrow">Pode ser interessante para quem</p>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <p>Prefere o comprimento natural</p>
            <p>Deseja mais resistência</p>
            <p>Quer deixar as unhas crescerem</p>
            <p>Busca acabamento uniforme</p>
            <p>Quer praticidade no dia a dia</p>
            <p>Prefere uma estética discreta</p>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={120}>
      <img
        src={p2}
        alt="Banho de gel realizado por Débora Tonani"
        loading="lazy"
        className="h-[55vh] w-full object-cover md:h-[75vh]"
      />
    </Reveal>
  </div>
</section>
{/* MANUTENÇÃO */}
<section className="bg-background">
  <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
    <Reveal>
      <img
        src={p1}
        alt="Manutenção de alongamento realizada por Débora Tonani"
        loading="lazy"
        className="h-[55vh] w-full object-cover md:h-[72vh]"
      />
    </Reveal>

    <Reveal delay={120}>
      <div>
        <p className="eyebrow">Manutenção</p>

        <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.03]">
          A beleza do alongamento também depende da manutenção correta.
        </h2>

        <div className="mt-9 space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
          <p>
            A manutenção não deve ser vista simplesmente como “refazer a unha”.
            Conforme a unha natural cresce, toda a estrutura se desloca.
          </p>

          <p>
            Por isso, é necessário acompanhar esse crescimento e realizar os ajustes
            necessários para preservar o equilíbrio da estrutura.
          </p>

          <p>
            Durante a manutenção, a unha é preparada novamente e a construção é
            reorganizada de acordo com o crescimento natural.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="eyebrow">O objetivo é manter</p>

          <div className="mt-6 grid grid-cols-2 gap-5 font-display text-xl">
            <p>Equilíbrio</p>
            <p>Resistência</p>
            <p>Conforto</p>
            <p>Proporção</p>
            <p>Acabamento</p>
            <p>Segurança</p>
          </div>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          A frequência ideal varia de acordo com o crescimento das unhas e com a rotina
          de cada cliente. Cada cliente recebe orientação conforme a própria necessidade.
        </p>
      </div>
    </Reveal>
  </div>
</section>
        {/* ESMALTAÇÃO EM GEL */}
<section className="bg-sand">
  <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Esmaltação em gel</p>

      <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.3rem)] leading-[1.03]">
        Uma decisão baseada em experiência e cuidado.
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
          <p>
            Nas mãos, atualmente não ofereço a esmaltação em gel como procedimento isolado.
            Essa é uma escolha construída ao longo dos meus anos de experiência profissional.
          </p>

          <p>
            Procedimentos frequentes de aplicação e remoção sobre a unha natural exigem
            atenção e técnica para evitar desgastes desnecessários da superfície.
          </p>

          <p>
            Por isso, minha prioridade é trabalhar pensando não apenas na aparência imediata,
            mas também no cuidado com a estrutura natural das unhas ao longo do tempo.
          </p>
        </div>

        <div className="border-l border-gold/50 pl-8 md:pl-12">
          <p className="eyebrow">Como funciona</p>

          <p className="mt-7 font-display text-2xl leading-relaxed md:text-3xl">
            A esmaltação em gel pode ser realizada como complemento do alongamento,
            da manutenção ou do banho de gel.
          </p>

          <p className="mt-7 text-sm leading-[1.9] text-muted-foreground">
            Dessa forma, ela faz parte de uma estrutura de trabalho pensada para unir
            acabamento, resistência e cuidado com a unha natural.
          </p>

          <p className="mt-9 font-display text-xl italic leading-relaxed">
            Não é sobre fazer mais procedimentos. É sobre fazer aquilo que considero
            mais coerente com a forma como cuido das unhas das minhas clientes.
          </p>
        </div>
      </div>
    </Reveal>
  </div>
</section>
        {/* CUIDADO COM A UNHA NATURAL */}
<section className="bg-background">
  <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
    <Reveal>
      <div>
        <p className="eyebrow">Cuidado com a unha natural</p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.03]">
          Beleza começa com cuidado.
        </h2>
      </div>
    </Reveal>

    <Reveal delay={120}>
      <div className="space-y-6 text-[0.98rem] leading-[1.9] text-muted-foreground">
        <p>
          A unha natural não deve ser tratada apenas como uma superfície para receber produto.
          Ela é a base de todo o trabalho.
        </p>

        <p>
          Antes de cada procedimento, observo as condições da unha e da região ao redor dela,
          buscando uma construção que respeite sua estrutura e evite excessos desnecessários.
        </p>

        <p>
          Também trabalho com produtos profissionais cuidadosamente selecionados,
          priorizando qualidade, desempenho e segurança. Quando indicado, são utilizadas
          opções de produtos hipoalergênicos.
        </p>

        <p>
          O cuidado continua depois do atendimento. Cada cliente recebe orientações para
          preservar o resultado e manter as unhas bonitas e bem cuidadas.
        </p>

        <blockquote className="mt-10 border-l border-gold pl-7 font-display text-2xl italic leading-relaxed">
          A unha natural é a base de todo o meu trabalho.
        </blockquote>
      </div>
    </Reveal>
  </div>
</section>
        {/* O MEU DIFERENCIAL */}
<section className="bg-espresso text-espresso-foreground">
  <div className="mx-auto max-w-[1300px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">O meu diferencial</p>

      <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <h2 className="font-display text-[clamp(2.7rem,5.5vw,4.8rem)] leading-[1.02]">
            Experiência não é apenas tempo.
            <br />
            É tudo o que se aprende durante ele.
          </h2>

          <p className="mt-9 max-w-2xl text-[0.98rem] leading-[1.9] opacity-75">
            São 16 anos trabalhando com unhas. Nesse período, aprendi que cada mão é
            diferente, cada unha possui uma estrutura e cada mulher tem uma rotina.
          </p>

          <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.9] opacity-75">
            Por isso, meu diferencial não está apenas no alongamento. Está na maneira
            como observo, planejo e adapto cada construção para cada cliente.
          </p>
        </div>

        <div className="border-t border-white/20 pt-8">
          <p className="text-xs tracking-[0.25em] uppercase opacity-60">
            O que busco entregar
          </p>

          <div className="mt-8 space-y-0">
            {[
              "Bem estruturadas",
              "Proporcionais",
              "Leves",
              "Resistentes",
              "Elegantes",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-5 border-b border-white/15 py-5"
              >
                <span className="text-xs opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-2xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-16 max-w-4xl font-display text-2xl italic leading-relaxed md:text-3xl">
        Não sigo simplesmente um padrão pronto. A técnica é adaptada para cada cliente.
      </p>
    </Reveal>
  </div>
</section>
        {/* PARA QUEM + 3 PILARES */}
<section className="bg-sand">
  <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Para quem é o meu trabalho</p>

      <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.4rem)] leading-[1.03]">
        Para mulheres que valorizam qualidade nos detalhes.
      </h2>
    </Reveal>

    <Reveal delay={120}>
      <div className="mt-14 grid gap-px bg-border md:grid-cols-2">
        {[
          "Valorizam naturalidade",
          "Gostam de unhas elegantes",
          "Buscam acabamento refinado",
          "Não gostam de unhas grossas",
          "Querem resistência no dia a dia",
          "Preferem atendimento individualizado",
          "Valorizam experiência profissional",
          "Gostam de ambientes tranquilos",
        ].map((item) => (
          <div key={item} className="bg-background p-6 md:p-8">
            <p className="font-display text-xl">{item}</p>
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal delay={160}>
      <div className="mt-24">
        <p className="eyebrow">Os três pilares</p>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="border-t border-gold pt-7">
            <h3 className="font-display text-3xl">Naturalidade</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Proporções, formatos e características individuais de cada mão.
            </p>
          </div>

          <div className="border-t border-gold pt-7">
            <h3 className="font-display text-3xl">Resistência</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Estrutura planejada para oferecer equilíbrio e acompanhar a rotina.
            </p>
          </div>

          <div className="border-t border-gold pt-7">
            <h3 className="font-display text-3xl">Leveza</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Visual delicado e elegante, sem excesso de espessura.
            </p>
          </div>
        </div>

        <p className="mt-12 font-display text-2xl italic">
          Tudo isso aliado a 16 anos de experiência.
        </p>
      </div>
    </Reveal>
  </div>
</section>
        {/* PORTFÓLIO */}
        <section id="portfolio" className="scroll-mt-24">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Portfólio</p>
                  <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
                    Trabalhos que falam por si
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.24em] uppercase"
                >
                  <span className="border-b border-gold/60 pb-1">Ver mais trabalhos</span>
                  <span>→</span>
                </Link>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-12 gap-4 md:gap-7">
              <Reveal className="col-span-12 md:col-span-7">
                <img
                  src={p2}
                  alt="Alongamentos de unha em tom branco leitoso sobre linho cru"
                  loading="lazy"
                  className="h-[38vh] w-full object-cover md:h-[52vh]"
                />
              </Reveal>
              <Reveal delay={120} className="col-span-7 md:col-span-5 md:mt-16">
                <img
                  src={p3}
                  alt="Mãos com alongamento nude e francesinha delicada sobre veludo marrom"
                  loading="lazy"
                  className="h-[34vh] w-full object-cover md:h-[60vh]"
                />
              </Reveal>
              <Reveal delay={80} className="col-span-5 md:col-span-4 md:-mt-10">
                <img
                  src={p1}
                  alt="Fita de seda e esmalte nude sobre pedra bege"
                  loading="lazy"
                  className="h-[34vh] w-full object-cover md:h-[46vh]"
                />
              </Reveal>
              <Reveal delay={160} className="col-span-12 md:col-span-8">
                <img
                  src={p5}
                  alt="Unhas naturais em tom nude sobre tricô bege"
                  loading="lazy"
                  className="h-[42vh] w-full object-cover md:h-[58vh]"
                />
              </Reveal>
            </div>
          </div>
        </section>

    {/* ATENDIMENTO EXCLUSIVO + EXPERIÊNCIA */}
<section id="experiencia" className="scroll-mt-24 bg-espresso text-espresso-foreground">
  <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
      <Reveal>
        <img
          src={estudioImg}
          alt="Experiência de atendimento Débora Tonani"
          loading="lazy"
          className="h-[55vh] w-full object-cover md:h-[72vh]"
        />
      </Reveal>

      <Reveal delay={120}>
        <p className="eyebrow text-espresso-foreground/50">Atendimento exclusivo</p>

        <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.3rem)] leading-[1.03]">
          O seu horário é realmente seu.
        </h2>

        <div className="mt-9 space-y-6 text-[0.98rem] leading-[1.9] text-espresso-foreground/70">
          <p>
            Os atendimentos são realizados somente com horário previamente agendado.
            Cada horário é reservado para uma cliente.
          </p>

          <p>
            Isso permite realizar cada procedimento com atenção, tranquilidade e sem
            a sensação de atendimento em linha de produção.
          </p>

          <p>
            Durante seu horário, o foco está em você. Sem pressa, sem atendimento
            simultâneo e sem excesso de pessoas.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-8">
          <p>Atendimento individual</p>
          <p>Horário reservado</p>
          <p>Ambiente tranquilo</p>
          <p>Atenção aos detalhes</p>
        </div>
      </Reveal>
    </div>

    <Reveal delay={160}>
      <div className="mt-24 border-t border-white/15 pt-16 md:mt-32 md:pt-20">
        <p className="eyebrow text-espresso-foreground/50">
          A experiência Débora Tonani
        </p>

        <h3 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
          Mais do que um procedimento.
        </h3>

        <p className="mt-8 max-w-3xl text-[0.98rem] leading-[1.9] text-espresso-foreground/70">
          Quero que a cliente perceba a diferença desde o primeiro contato. Do agendamento
          ao atendimento, tudo deve transmitir organização, cuidado e profissionalismo.
        </p>

        <p className="mt-6 max-w-3xl text-[0.98rem] leading-[1.9] text-espresso-foreground/70">
          O ambiente deve ser tranquilo. O atendimento, individualizado. O procedimento,
          realizado com calma e precisão. E o resultado deve refletir todo esse cuidado.
        </p>

        <blockquote className="mt-12 max-w-4xl font-display text-2xl italic leading-relaxed md:text-4xl">
          Porque autocuidado também é escolher com quem você entrega as suas mãos.
        </blockquote>
      </div>
    </Reveal>
  </div>
</section>
        {/* DÚVIDAS FREQUENTES */}
<section id="duvidas" className="scroll-mt-24 bg-background">
  <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Dúvidas frequentes</p>

      <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.03]">
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
        <section id="localizacao" className="scroll-mt-24">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Onde encontrar</p>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08]">
                Ipiranga,
                <br />
                São Paulo
              </h2>
              <span className="hairline mt-8 w-20" />
              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <p>{SITE.name} — {SITE.role}</p>
                <p>Atendimento em estúdio, somente com horário agendado.</p>
                <p>
                  O endereço completo é enviado no WhatsApp após a confirmação do seu agendamento.
                </p>
              </div>
              <Link to="/agendar" className="btn-outline-ink mt-10">
                Agendar horário
              </Link>
            </Reveal>

            <Reveal delay={150}>
              <div className="h-[38vh] w-full overflow-hidden border border-border md:h-[52vh]">
                <iframe
               title="Mapa da região do Ipiranga, São Paulo"
            src="https://www.google.com/maps?q=Ipiranga%2C%20S%C3%A3o%20Paulo&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[35%]"
                />
              </div>
            </Reveal>
          </div>
        </section>
        {/* CONTATO + FINAL */}
<section id="contato" className="scroll-mt-24 bg-sand">
  <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:px-10 md:py-36">
    <Reveal>
      <p className="eyebrow">Contato</p>

      <h2 className="mt-6 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.98]">
        Vamos cuidar das suas unhas?
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-[0.98rem] leading-[1.9] text-muted-foreground">
        Se você busca experiência, técnica, naturalidade e atenção aos detalhes,
        será um prazer cuidar das suas unhas.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
            "Olá, Débora! Vim pelo site e gostaria de agendar meu horário."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="btn-ink"
        >
          Falar pelo WhatsApp
        </a>

        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-outline-ink"
        >
          {SITE.instagramLabel}
        </a>
      </div>
    </Reveal>
  </div>
</section>

{/* FRASE FINAL */}
<section className="bg-espresso text-espresso-foreground">
  <div className="mx-auto max-w-[1100px] px-6 py-24 text-center md:px-10 md:py-36">
    <Reveal>
      <p className="font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.05]">
        Não faço apenas unhas.
        <br />
        Cuido de detalhes que fazem uma mulher se sentir ainda mais bonita.
      </p>

      <div className="mt-12">
        <p className="font-display text-2xl">Débora Tonani</p>
        <p className="mt-3 text-xs tracking-[0.22em] uppercase text-espresso-foreground/60">
          Especialista em alongamento de unhas há 16 anos
        </p>
      </div>

      <Link
        to="/agendar"
        className="btn-ink mt-10 bg-espresso-foreground text-espresso hover:bg-champagne"
      >
        Agendar meu horário
      </Link>
    </Reveal>
  </div>
</section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
