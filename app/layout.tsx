import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

import { AgrandirRegular } from "@/styles/fonts";
import FooterComponent from "@/components/Footer/FooterComponent";
import AuthProvider from "@/Providers/AuthProvider";

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
        <AuthProvider>
          <div className="container">
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </div>
          <FooterComponent />
        </AuthProvider>
      </body>
    </html>
  );
}
