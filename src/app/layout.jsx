import { SupabaseProvider } from "../contexts/SupabaseProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  // eslint-disable-next-line no-undef
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API;
  // eslint-disable-next-line no-undef
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  RootLayout.metadata = {
    title: "PixelSnag",
  };

  if (!supabaseUrl || !supabaseKey) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
          <div id="root">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
