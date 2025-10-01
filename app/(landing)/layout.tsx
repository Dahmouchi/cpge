import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Nav2/page";
import Footer from "./components/footer";



export const metadata: Metadata = {
  title: "CPGE Rabat Ibn EL Khatib - Classes préparatoires Maroc",
  description: "CPGE Rabat Ibn El Khatib - Préparez-vous aux concours des Grandes Ecoles dans un environnement d'excellence, découvrez notre CPGE à Rabat Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <div className="fixed w-full top-0 left-0 z-50">
        <Header />
      </div>
      <div className="mt-16">
        {children}
      </div>
      <Footer />

      </main>

  );
}