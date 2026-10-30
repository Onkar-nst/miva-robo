import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/content/site";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  icons: "/media/MIVA_ROBOTICS_PitchDeck_Website-1-DARK-copy.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript><style>{".js [data-reveal]{opacity:1!important}"}</style></noscript>
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
