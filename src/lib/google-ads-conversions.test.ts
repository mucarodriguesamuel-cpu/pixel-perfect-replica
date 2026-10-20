import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isClientWhatsAppLink, reportContactConversion } from "./google-ads-conversions";

const link = "https://wa.me/5511926195646?text=Ol%C3%A1";

describe("WhatsApp contact conversion", () => {
  test("uses the client's exact conversion destination once per permitted click", () => {
    const calls: unknown[][] = [];
    assert.equal(reportContactConversion(link, "/agendar", true, (...args) => calls.push(args)), true);
    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0]?.slice(0, 2), ["event", "conversion"]);
    assert.equal((calls[0]?.[2] as { send_to: string }).send_to, "AW-18034410595/3YTVCLyw19ccEOOIvZdD");
  });
  test("does not report refused or unresolved advertising permission", () => {
    let count = 0;
    assert.equal(reportContactConversion(link, "/", false, () => count++), false);
    assert.equal(count, 0);
  });
  test("covers client links on home, booking and portfolio", () => {
    for (const path of ["/", "/agendar", "/portfolio"]) assert.equal(isClientWhatsAppLink(link, path), true);
  });
  test("does not count professional administration contacts", () => {
    for (const path of ["/admin", "/auth", "/reset-password"]) assert.equal(isClientWhatsAppLink(link, path), false);
  });
  test("does not count navigation or other recipients", () => {
    for (const href of ["https://example.com/agendar", "https://wa.me/5511000000000", "https://wa.me.example.com/5511926195646"]) assert.equal(isClientWhatsAppLink(href, "/"), false);
  });
});