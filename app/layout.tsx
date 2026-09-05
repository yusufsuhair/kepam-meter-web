import type { Metadata, Viewport } from "next";
import { Cherry_Bomb_One, Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const cherry = Cherry_Bomb_One({ variable: "--font-cherry", weight: "400", subsets: ["latin"] });

// Absolute URL for link-preview images. Set NEXT_PUBLIC_SITE_URL as a Cloudflare build variable once the
// custom domain exists; until then production falls back to the workers.dev address.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? "https://kepam-meter-web.yusufmohdsuhair.workers.dev" : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KepamMeter",
  description: "A meter to evaluate your kepamism. Answer 5 questions, get diagnosed.",
  openGraph: {
    title: "KepamMeter",
    description: "How kepam are you? Take the test.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#05010f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${cherry.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
