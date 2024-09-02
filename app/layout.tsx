import type { Metadata } from "next";

import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { AgrandirRegular } from "@/styles/fonts";
import FooterComponent from "@/components/Footer/FooterComponent";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/components/providers/modal-provider";
import "./globals.css";
import { Header } from "@/components/Navbar/Header";
import { Toaster } from "sonner";

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
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
            defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="flovv-theme"
            >
              <div className="flex flex-col justify-between">
                <div className="flex min-h-screen flex-col">
                  {/* <Navbar /> */}
                  <Header />
                  <TooltipProvider>
                    <main className="flex-grow">{children}</main>
                  </TooltipProvider>
                  <ModalProvider />
                  <Toaster />
                </div>
              </div>
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
