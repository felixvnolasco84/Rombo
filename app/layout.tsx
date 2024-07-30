import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
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
    <html lang="es-Mx">
      <body className={`${AgrandirRegular.className}`}>
        <AuthProvider>
          <div className="flex flex-col justify-between">
            <div className="container flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow py-4">{children}</main>
              <Toaster />
            </div>
            <FooterComponent />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
