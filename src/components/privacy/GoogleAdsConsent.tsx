import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const GOOGLE_ADS_ID = "AW-18155793500";
const CONSENT_STORAGE_KEY = "debora-tonani-ad-consent";
const NOTICE_VERSION = "2026-09-23";
const CONSENT_REGIONS = new Set([
  "AT", "BE", "BG", "BR", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL",
  "NO", "PL", "PT", "RO", "SE", "SI", "SK",
]);

type ConsentChoice = "accepted" | "rejected";

type ConsentRecord = {
  choice: ConsentChoice;
  decidedAt: string;
  noticeVersion: string;
  purposes: ["advertising_measurement"];
  recipient: "Google Ads";
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let regionPromise: Promise<string | null> | null = null;

function readConsent(): ConsentRecord | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!value) return null;
    const record = JSON.parse(value) as Partial<ConsentRecord>;
    if (record.choice !== "accepted" && record.choice !== "rejected") return null;
    return record as ConsentRecord;
  } catch {
    return null;
  }
}

function writeConsent(choice: ConsentChoice) {
  const record: ConsentRecord = {
    choice,
    decidedAt: new Date().toISOString(),
    noticeVersion: NOTICE_VERSION,
    purposes: ["advertising_measurement"],
    recipient: "Google Ads",
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
}

function setGoogleConsent(granted: boolean) {
  ensureGtag();
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: "denied",
  });
}

function loadGoogleTag() {
  ensureGtag();
  if (!document.querySelector(`script[data-google-ads-id="${GOOGLE_ADS_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    script.dataset.googleAdsId = GOOGLE_ADS_ID;
    document.head.appendChild(script);
  }
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
}

function lookupRegion() {
  if (!regionPromise) {
    regionPromise = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2000);
      try {
        const response = await fetch("/cdn-cgi/trace", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) return null;
        const match = (await response.text()).match(/^loc=([^\r\n]+)$/m);
        const country = match?.[1]?.trim().toUpperCase();
        if (!country || country === "XX" || country === "T1") return null;
        return country;
      } catch {
        return null;
      } finally {
        window.clearTimeout(timeout);
      }
    })();
  }
  return regionPromise;
}

export function GoogleAdsConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    ensureGtag();
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });

    const applyChoice = (choice: ConsentChoice) => {
      setGoogleConsent(choice === "accepted");
      if (choice === "accepted") loadGoogleTag();
      setShowBanner(false);
    };

    const stored = readConsent();
    if (stored) {
      applyChoice(stored.choice);
    } else {
      void lookupRegion().then((country) => {
        if (!country || CONSENT_REGIONS.has(country)) {
          setShowBanner(true);
          return;
        }
        setGoogleConsent(true);
        loadGoogleTag();
      });
    }

    const openSettings = () => setShowBanner(true);
    const syncChoice = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY) return;
      const current = readConsent();
      if (current) applyChoice(current.choice);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    window.addEventListener("storage", syncChoice);
    return () => {
      window.removeEventListener("open-cookie-settings", openSettings);
      window.removeEventListener("storage", syncChoice);
    };
  }, []);

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    setGoogleConsent(choice === "accepted");
    if (choice === "accepted") loadGoogleTag();
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Preferências de privacidade"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:bottom-6 md:flex md:items-center md:gap-8 md:p-6"
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl leading-tight">Sua privacidade</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Podemos usar a tag do Google Ads para medir resultados de anúncios. Você pode aceitar ou
          recusar agora e mudar sua escolha depois. <Link to="/privacidade" className="underline underline-offset-4">Saiba mais</Link>.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:mt-0 md:shrink-0">
        <Button variant="outline" onClick={() => choose("rejected")}>Recusar</Button>
        <Button onClick={() => choose("accepted")}>Aceitar</Button>
      </div>
    </aside>
  );
}
