import { describe, expect, test } from "bun:test";
import { isClientWhatsAppLink, reportContactConversion } from "./google-ads-conversions";

const link = "https://wa.me/5511926195646?text=Ol%C3%A1";

describe("WhatsApp contact conversion", () => {
  test("uses the client's exact conversion destination once per permitted click", () => {
    const calls: unknown[][] = [];
    expect(reportContactConversion(link, "/agendar", true, (...args) => calls.push(args))).toBe(true);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.slice(0, 2)).toEqual(["event", "conversion"]);
    expect(calls[0]?.[2]).toMatchObject({ send_to: "AW-18034410595/3YTVCLyw19ccEOOIvZdD" });
  });
  test("does not report refused or unresolved advertising permission", () => {
    let count = 0;
    expect(reportContactConversion(link, "/", false, () => count++)).toBe(false);
    expect(count).toBe(0);
  });
  test("covers client links on home, booking and portfolio", () => {
    for (const path of ["/", "/agendar", "/portfolio"]) expect(isClientWhatsAppLink(link, path)).toBe(true);
  });
  test("does not count professional administration contacts", () => {
    for (const path of ["/admin", "/auth", "/reset-password"]) expect(isClientWhatsAppLink(link, path)).toBe(false);
  });
  test("does not count navigation or other recipients", () => {
    for (const href of ["https://example.com/agendar", "https://wa.me/5511000000000", "https://wa.me.example.com/5511926195646"]) expect(isClientWhatsAppLink(href, "/")).toBe(false);
  });
});