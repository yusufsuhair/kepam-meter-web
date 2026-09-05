import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import NowPlayingBar from "@/components/NowPlayingBar";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KepamMeter",
  description: "A meter to evaluate your kepamism. Answer 5 questions, get diagnosed.",
  openGraph: {
    title: "KepamMeter",
    description: "How kepam are you? Take the test.",
  },
};

export const viewport: Viewport = { themeColor: "#05010f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <NowPlayingBar />
      </body>
    </html>
  );
}
