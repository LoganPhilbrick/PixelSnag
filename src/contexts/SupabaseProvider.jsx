"use client";
import { createClient } from "@supabase/supabase-js";
import { SupabaseContext } from "./SupabaseContext";

export function SupabaseProvider({ children, supabaseUrl, supabaseKey }) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return (
    <SupabaseContext.Provider value={{ client: supabase, auth: supabase.auth }}>
      {children}
    </SupabaseContext.Provider>
  );
}
