"use client";

// import { useWalletSync } from "@/hooks/useWalletSync";
import BottomNavbar from "@/views/Navigation/navigation";
import React from "react";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // useWalletSync();
  return (
    <>
      {children}
      <BottomNavbar />
    </>
  );
}
