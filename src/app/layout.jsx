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
<<<<<<< Updated upstream
=======
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
>>>>>>> Stashed changes
      <body>
        <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
          <div id="root">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
