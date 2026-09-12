import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="mt-6 font-display text-5xl">Esta página não existe</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          O endereço pode ter mudado. Volte ao início para continuar navegando.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn-ink">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">Esta página não carregou</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Algo saiu do lugar. Você pode tentar novamente ou voltar ao início.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-ink"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-outline-ink">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Débora Tonani — Nail Designer em Vila Mariana, São Paulo" },
      {
        name: "description",
        content:
          "Alongamento de unhas natural, resistente e elegante com Débora Tonani, nail designer em Vila Mariana, São Paulo. Atendimento em estúdio com horário agendado.",
      },
      { name: "author", content: "Débora Tonani" },
      { property: "og:site_name", content: "Débora Tonani — Nail Designer" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#faf7f2" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["BeautySalon", "LocalBusiness"],
          name: "Débora Tonani — Nail Designer",
          description:
      "Alongamento de unhas natural e resistente, banho de gel, manutenção e blindagem em Vila Mariana, São Paulo.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vila Mariana",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          areaServed: "Vila Mariana, São Paulo",
          telephone: "+5511930089735",
          priceRange: "$$",
          makesOffer: [
            "Alongamento de unhas",
            "Banho de gel",
            "Manutenção",
         "Blindagem",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
