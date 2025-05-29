import BottomNavbar from "@/views/Navigation/navigation";
import { Suspense, ReactNode } from "react";
import AuthGuard from "./AuthGuard";
import SplashScreen from "@/views/splash-screen";

export default function MobileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <AuthGuard>
        {children}
        <BottomNavbar />
      </AuthGuard>
    </Suspense>
  );
}
