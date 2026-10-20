import { useEffect } from "react";
import { canReportAdvertising, reportContactConversion } from "@/lib/google-ads-conversions";

export function GoogleAdsContactConversions() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || (event.type === "click" && event.button !== 0) || (event.type === "auxclick" && event.button !== 1)) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || !window.gtag) return;
      reportContactConversion(anchor.href, window.location.pathname, canReportAdvertising(), window.gtag);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, []);
  return null;
}