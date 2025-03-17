import type { Metadata } from "next";
import "./globals.css";
import RelayProvider from "@/components/providers/relay-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

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
          </AuthProvider>
        </RelayProvider>
      </body>
    </html>
  );
}
