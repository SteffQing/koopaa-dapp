"use client";

import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-[url(/splash-screen.png)] bg-contain bg-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
      ></motion.div>
    </motion.div>
  );
}
