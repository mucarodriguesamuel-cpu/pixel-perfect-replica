import { SITE } from "@/lib/site";

export const AD_CONSENT_STORAGE_KEY = "debora-tonani-ad-consent";
export const CONTACT_CONVERSION = "AW-18034410595/3YTVCLyw19ccEOOIvZdD";

let advertisingAllowed = false;

export function setAdvertisingPermission(allowed: boolean) {
  advertisingAllowed = allowed;
}

export function isClientWhatsAppLink(href: string, pathname: string): boolean {
  if (["/admin", "/auth", "/reset-password"].some((path) => pathname === path || pathname.startsWith(`${path}/`))) return false;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && url.hostname === "wa.me" && url.pathname === `/${SITE.whatsappNumber}`;
  } catch {
    return false;
  }
}

export function reportContactConversion(
  href: string,
  pathname: string,
  permitted: boolean,
  send: (...args: unknown[]) => void,
) {
  if (!permitted || !isClientWhatsAppLink(href, pathname)) return false;
  send("event", "conversion", {
    send_to: CONTACT_CONVERSION,
    transaction_id: crypto.randomUUID(),
  });
  return true;
}

export function canReportAdvertising(): boolean {
  if (!advertisingAllowed) return false;
  try {
    const saved = window.localStorage.getItem(AD_CONSENT_STORAGE_KEY);
    if (!saved) return advertisingAllowed;
    return JSON.parse(saved).choice === "accepted";
  } catch {
    return false;
  }
}