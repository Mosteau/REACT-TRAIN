import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./assets/scss/main.scss";
import "./assets/scss/auth.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./contexts/UserContext";

// Configuration des polices Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées de l'application (titre, description pour SEO)
export const metadata: Metadata = {
  title: "Fenêtres Pro - Gestion de catalogue",
  description: "Application de gestion de catalogue de fenêtres avec authentification",
};

// Layout racine de l'application - structure commune à toutes les pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {/* Provider d'authentification pour toute l'application */}
        <UserProvider>
          {/* En-tête fixe sur toutes les pages */}
          <Header />
          {/* Contenu principal qui change selon la page */}
          <main style={{ flex: 1 }}>
            {children}
          </main>
          {/* Pied de page fixe sur toutes les pages */}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
