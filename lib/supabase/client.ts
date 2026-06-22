import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Normalize project URL so PostgREST paths are not doubled (avoids "invalid path" errors). */
export function normalizeSupabaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1\/?$/i, "");
  return url;
}

export function describeSupabaseConfigIssue(): string | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const missing = [
    !rawUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !key ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
  ].filter(Boolean);

  if (missing.length > 0) {
    return `Missing ${missing.join(" and ")} in environment.`;
  }

  const url = normalizeSupabaseUrl(rawUrl!);
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return "Invalid NEXT_PUBLIC_SUPABASE_URL: expected an http(s) URL.";
    }
  } catch {
    return "Invalid NEXT_PUBLIC_SUPABASE_URL: expected an absolute Supabase project URL.";
  }

  return null;
}

export function getBrowserSupabase(): SupabaseClient | null {
  const configIssue = describeSupabaseConfigIssue();
  if (configIssue) return null;

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();
  const url = normalizeSupabaseUrl(rawUrl);
  return createClient(url, key);
}
