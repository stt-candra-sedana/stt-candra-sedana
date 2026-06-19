import type { Metadata } from "next";
import { EB_Garamond, Poppins } from "next/font/google";
import "../globals.css";

const ebgaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Login — Admin Candra Sedana",
  description: "Halaman login admin STT Candra Sedana",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${ebgaramond.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
