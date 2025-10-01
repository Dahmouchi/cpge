import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roboto = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="fr">
      <body className={`${Roboto.className} `}>
        <main className="">
          {children}
        </main>
        <ToastContainer />
        <GoogleAnalytics gaId="G-96LTYHDHM3" />
      </body>
    </html>
  );
}
