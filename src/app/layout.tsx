import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationSystemClient from "./components/NotificationSystemClient";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "D-COD MARKETPLACE — Premium COD Mobile Accounts";
const siteDescription =
  "Buy and sell elite Call of Duty: Mobile accounts. Legendary skins, max-rank profiles, and rare blueprints — secured and verified.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "COD Mobile",
    "Call of Duty Mobile",
    "account trading",
    "gaming marketplace",
    "CODM accounts",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "D-COD MARKETPLACE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "D-COD MARKETPLACE — Premium COD Mobile Accounts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="gradient-bar" />
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <NotificationSystemClient />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
