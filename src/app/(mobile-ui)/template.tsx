import BottomNavbar from "@/views/Navigation/navigation";
import { Suspense, ReactNode } from "react";
// import AuthGuard from "./AuthGuard";
import SplashScreen from "@/views/splash-screen";
// import Faucet from "@/components/faucet";
import Telegram from "@/components/telegram";

export default function MobileLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<SplashScreen />}>
      {/* <AuthGuard> */}
      {children}
      <BottomNavbar />
      {/* <Faucet /> */}
      <Telegram />
      {/* </AuthGuard> */}
    </Suspense>
  );
}
