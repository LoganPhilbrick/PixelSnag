import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_API!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );
}
