import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Absolute URL for link-preview images. Set NEXT_PUBLIC_SITE_URL once the custom domain exists;
// Cloudflare Pages exposes CF_PAGES_URL at build time as the fallback.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? "http://localhost:3000";

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
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
