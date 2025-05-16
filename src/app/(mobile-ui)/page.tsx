"use client";
// import { useState, useEffect } from "react";

import HomePage from "@/views/Home";
// import SplashScreen from "@/views/splash-screen";

export default function Home() {
  // const [showSplash, setShowSplash] = useState(false);

  // useEffect(() => {
  //   const splashShown = sessionStorage.getItem("splash_shown");

  //   if (!splashShown) {
  //     setShowSplash(true);
  //     sessionStorage.setItem("splash_shown", "true");

  //     setTimeout(() => setShowSplash(false), 3000);
  //   }
  // }, []);

  // if (showSplash) return <SplashScreen />;

  return <HomePage />;
}
