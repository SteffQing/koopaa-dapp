"use client";

import { motion, AnimatePresence } from "framer-motion";
import TelegramIcon from "@/assets/svgs/telegram.svg";
import Link from "next/link";

export default function Telegram() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 items-center mx-auto max-w-[400px] w-full"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          delay: 0.9,
          stiffness: 500,
          damping: 30,
        }}
      >
        <div className="max-w-[400px] bg-transparent absolute bottom-[140px] right-4">
          <div className="relative group">
            <Link href="https://t.me/+hxd5Ob1F78hkZTNk" target="_blank">
              <TelegramIcon />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
