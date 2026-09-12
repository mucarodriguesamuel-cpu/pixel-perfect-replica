export const SITE = {
  name: "Débora Tonani",
  role: "Nail Designer",
city: "Ipiranga — São Paulo",
  neighborhood: "Ipiranga",
  whatsappNumber: "5511930089735",
  whatsappDisplay: "(11) 93008-9735",
instagramUrl: "https://www.instagram.com/unhadegel.sp/",
instagramLabel: "@unhadegel.sp",
} as const;

export function whatsappLink(message: string) {
return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Débora! Vim pelo site e gostaria de tirar uma dúvida sobre meu atendimento.";

const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const WEEKDAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const WEEKDAY_LONG = WEEKDAYS;
export const MONTH_NAMES = MONTHS;

/** "2026-09-11" -> Date local (sem fuso deslocado) */
export function parseISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

export function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatLongDate(iso: string) {
  const d = parseISODate(iso);
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
}

export function formatShortDate(iso: string) {
  const d = parseISODate(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function formatTime(time: string) {
  return time.slice(0, 5).replace(":", "h");
}

export function formatPrice(value: number | null | undefined) {
  if (value === null || value === undefined) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
