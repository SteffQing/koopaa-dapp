"use client";

// import { useWalletSync } from "@/hooks/useWalletSync";
import BottomNavbar from "@/views/Navigation/navigation";
import React from "react";
import AuthGuard from "./AuthGuard";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      {children}
      <BottomNavbar />
    </AuthGuard>
  );
}
