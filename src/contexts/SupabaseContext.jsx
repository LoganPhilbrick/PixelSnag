import { createClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const SupabaseContext = createContext(null);

export function SupabaseProvider({ children, supabaseUrl, supabaseKey }) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storage: window.localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
}
