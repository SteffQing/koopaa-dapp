import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { AppProviders } from "@/providers";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "KooPaa",
  description: "Save Smart with Your Circle, On-Chain",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <AppProviders>{children}</AppProviders>
        <Toaster position="bottom-center" closeButton />
        <Analytics />
      </body>
    </html>
  );
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};
