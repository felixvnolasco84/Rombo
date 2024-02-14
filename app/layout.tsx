import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

import { AgrandirRegular } from "@/styles/fonts";
import FooterComponent from "@/components/Footer/FooterComponent";

export const metadata: Metadata = {
  title: "Rombo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${AgrandirRegular.className}`}>
        <div className="container">
          <Navbar />
          <main>{children}</main>
        </div>
        <FooterComponent />
      </body>
    </html>
  );
}
