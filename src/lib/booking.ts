import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase-configured";

export type Service = {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number | null;
  active: boolean;
  sort_order: number;
};

export type BusinessHour = {
  id: string;
  weekday: number;
  is_open: boolean;
  start_time: string;
  end_time: string;
  slot_minutes: number;
};

export type BlockedSlot = {
  id: string;
  block_date: string;
  block_time: string | null;
  reason: string | null;
};

export const FALLBACK_SERVICES: Service[] = [
  {
    id: "alongamento-de-unhas",
    name: "Alongamento em gel",
    description:
      "Alongamentos personalizados que respeitam o formato das mãos e priorizam uma aparência natural, elegante e resistente.",
    duration_minutes: 120,
    price: null,
    active: true,
    sort_order: 1,
  },
  {
    id: "banho-de-gel",
    name: "Banho de gel",
    description:
      "Uma camada de estrutura e proteção sobre a unha natural, sem necessidade de alongar.",
    duration_minutes: 90,
    price: null,
    active: true,
    sort_order: 2,
  },
  {
    id: "manutencao",
    name: "Manutenção",
    description:
"Cuidados para preservar a estrutura e o acabamento conforme a unha natural cresce. A frequência varia de acordo com o crescimento e a rotina de cada cliente.",
      duration_minutes: 90,
    price: null,
    active: true,
    sort_order: 3,
  },
  
];

const FALLBACK_SLOTS = ["09:00:00", "10:30:00", "13:30:00", "15:00:00", "16:30:00"];

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      if (!isSupabaseConfigured()) return FALLBACK_SERVICES;

      const { data, error } = await supabase
        .from("services")
        .select("id,name,description,duration_minutes,price,active,sort_order")
        .eq("active", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAvailableSlots(date: string | null) {
  return useQuery({
    queryKey: ["available-slots", date],
    enabled: !!date,
    queryFn: async (): Promise<string[]> => {
      if (!isSupabaseConfigured()) return FALLBACK_SLOTS;

      const { data, error } = await supabase.rpc("available_slots", { _date: date! });
      if (error) throw error;
      return (data ?? []).map((r: { slot: string }) => r.slot);
    },
  });
}

export function useBusinessHours() {
  return useQuery({
    queryKey: ["business-hours"],
    queryFn: async (): Promise<BusinessHour[]> => {
      const { data, error } = await supabase
        .from("business_hours")
        .select("id,weekday,is_open,start_time,end_time,slot_minutes")
        .order("weekday");
      if (error) throw error;
      return (data ?? []) as BusinessHour[];
    },
  });
}

export function useBlockedSlots(from?: string) {
  return useQuery({
    queryKey: ["blocked-slots", from ?? "all"],
    queryFn: async (): Promise<BlockedSlot[]> => {
      let q = supabase
        .from("blocked_slots")
        .select("id,block_date,block_time,reason")
        .order("block_date");
      if (from) q = q.gte("block_date", from);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as BlockedSlot[];
    },
  });
}
