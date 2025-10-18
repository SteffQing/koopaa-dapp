import BottomNavbar from "@/views/Navigation/navigation";
import { Suspense, ReactNode } from "react";
import SplashScreen from "@/views/splash-screen";
// import Faucet from "@/components/faucet";
import Telegram from "@/components/telegram";

export default function MobileLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<SplashScreen />}>
      {children}
      <BottomNavbar />
      {/* <Faucet /> */}
      <Telegram />
    </Suspense>
  );
}
