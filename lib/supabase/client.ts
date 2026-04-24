import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Normalize project URL so PostgREST paths are not doubled (avoids "invalid path" errors). */
export function normalizeSupabaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1\/?$/i, "");
  return url;
}

export function getBrowserSupabase(): SupabaseClient | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!rawUrl || !key) return null;
  const url = normalizeSupabaseUrl(rawUrl);
  if (!url) return null;
  return createClient(url, key);
}
