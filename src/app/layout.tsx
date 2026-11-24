import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_TAGLINE } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  description:
    "Matroxx is a founder-led, AI-assisted software studio in Colombo, Sri Lanka. Full-stack web apps, AI agent integration, and system-level software — built to endure.",
  metadataBase: new URL("https://sujanthan242.github.io/matroxx-website"),
  openGraph: {
    description:
      "Matroxx is a founder-led, AI-assisted software studio in Colombo, Sri Lanka.",
    siteName: "Matroxx",
    title: `Matroxx — ${SITE_TAGLINE}`,
    type: "website",
  },
  title: `Matroxx — ${SITE_TAGLINE}`,
};

/**
 * Root layout: fonts, global metadata, header + footer on every page.
 * Page content renders between them. Full Home sections land in Branch 2.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen bg-obsidian font-sans text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
