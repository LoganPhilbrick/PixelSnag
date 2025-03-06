import { SupabaseProvider } from "../contexts/SupabaseContext";
import "./globals.css";

export const metadata = {
  title: "Screenshot Website",
};

export default function RootLayout({ children }) {
  // eslint-disable-next-line no-undef
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API;
  // eslint-disable-next-line no-undef
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
          <div id="root">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
