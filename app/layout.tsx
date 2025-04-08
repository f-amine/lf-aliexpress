import type { Metadata } from "next";
import "./globals.css";
import RelayProvider from "@/components/providers/relay-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Lf-aliexpress",
  description: "Lightfunnels aliexpress integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen self-stretch flex flex-col`}
      >
        <RelayProvider>
          <AuthProvider>   
            {children}
            <div id="modals"></div>
            <Toaster />
          </AuthProvider>
        </RelayProvider>
      </body>
    </html>
  );
}
