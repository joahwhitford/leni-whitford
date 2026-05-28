import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Léni Whitford — Artiste Peintre Illustratrice",
    template: "%s | Léni Whitford",
  },
  description:
    "Léni Whitford est une artiste peintre et illustratrice autodidacte. Découvrez ses collections — Marianne, Portraits de Soignants, Coronapéro — et ses expositions internationales.",
  keywords: [
    "Léni Whitford",
    "artiste peintre",
    "illustratrice",
    "peinture",
    "art contemporain",
    "portraits",
    "UNESCO",
    "JO Paris 2024",
  ],
  openGraph: {
    title: "Léni Whitford — Artiste Peintre Illustratrice",
    description: "Art contemporain, portraits et illustrations. Expositions internationales.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} grain-overlay`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
