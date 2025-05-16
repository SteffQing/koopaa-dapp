"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Home from "@/assets/svgs/navigation/home.svg";
import Savings from "@/assets/svgs/navigation/savings.svg";
import Squads from "@/assets/svgs/squad.svg";
import Account from "@/assets/svgs/navigation/account.svg";
import { cn } from "@/lib/utils";
// import { useEffect, useState } from "react";

const tabs = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Savings", icon: Savings, path: "/savings" },
  { name: "Squads", icon: Squads, path: "/squads" },
  { name: "Account", icon: Account, path: "/account" },
];

function useActiveTab() {
  const pathname = usePathname();

  // Find the tab that matches the current path
  const activeTab = tabs.find(
    (tab) =>
      pathname === tab.path ||
      (tab.path !== "/" && pathname.startsWith(tab.path))
  );

  return { activeTab: activeTab?.name || "Home", pathname };
}

export default function BottomNavbar() {
  const { activeTab } = useActiveTab();
  // const [isSplashScreen, setIsSplashScreen] = useState(true);

  // useEffect(() => {
  //   const splashShown = sessionStorage.getItem("splash_shown");

  //   if ((pathname === "/" && splashShown) || pathname !== "/") {
  //     setIsSplashScreen(false);
  //   } else if (pathname === "/" && !splashShown) {
  //     setIsSplashScreen(true);

  //     const timer = setTimeout(() => {
  //       setIsSplashScreen(false);
  //     }, 3500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [pathname]);

  // if (isSplashScreen) {
  //   return null;
  // }

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#F2F2F2] flex gap-6 items-center mx-auto px-6 py-3 border border-[#CBD5E1] rounded-3xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 500, damping: 30 }}
    >
      {tabs.map((tab) => (
        <Link href={tab.path} key={tab.name}>
          <motion.span
            className="flex flex-col items-center gap-[5px]"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <tab.icon
              className={cn(
                activeTab === tab.name ? "text-[#ff6600]" : "text-[#767676]"
              )}
              width={24}
              height={24}
            />
            <span
              className={cn(
                "text-[#767676] text-xs font-normal",
                activeTab === tab.name && "text-[#ff6600] font-medium"
              )}
            >
              {tab.name}
            </span>
          </motion.span>
        </Link>
      ))}
    </motion.div>
  );
}
