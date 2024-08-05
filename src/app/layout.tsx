import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cuerpo from "./components/body";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoftWave-Innovate",
  description: "Empresa dedicada al desarrollo de Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Cuerpo children={children}></Cuerpo>
      </body>
    </html>
  );
}
