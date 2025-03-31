import { SupabaseProvider } from "../contexts/SupabaseProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

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
        <link rel="manifest" href="/site.webmanifest" />
        <title>PixelSnag – Effortless Screenshot Sharing</title>
        <meta
          name="title"
          content="PixelSnag – Effortless Screenshot Sharing"
        />
        <meta
          name="description"
          content="Capture, annotate, and share screenshots instantly. PixelSnag makes feedback and bug reporting a breeze."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixelsnag.it.com/" />
        <meta
          property="og:title"
          content="PixelSnag – Effortless Screenshot Sharing"
        />
        <meta
          property="og:description"
          content="Capture, annotate, and share screenshots instantly. PixelSnag makes feedback and bug reporting a breeze."
        />
        <meta
          property="og:image"
          content="https://pixelsnag.it.com/og-image.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pixelsnag.it.com/" />
        <meta
          property="twitter:title"
          content="PixelSnag – Effortless Screenshot Sharing"
        />
        <meta
          property="twitter:description"
          content="Capture, annotate, and share screenshots instantly. PixelSnag makes feedback and bug reporting a breeze."
        />
        <meta
          property="twitter:image"
          content="https://pixelsnag.it.com/og-image.png"
        />
      </head>
      <body className={poppins.className}>
        <SupabaseProvider supabaseUrl={supabaseUrl} supabaseKey={supabaseKey}>
          <div id="root">{children}</div>
        </SupabaseProvider>
        <Analytics />
      </body>
    </html>
  );
}
