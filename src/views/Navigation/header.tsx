"use client";

import { Avatar } from "@/components/avatar";
import { motion } from "framer-motion";
import Bell from "@/assets/svgs/bell.svg";

interface HeaderProps {
  name?: string | null;
}

export default function Header({ name = "Anon" }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="sticky top-4 z-20 mt-4">
      <motion.div
        className="bg-[#FCFCFC] shadow-[0px_2px_14px_2px_#0000000d] rounded-[32px] mb-4 flex items-center justify-between p-2
"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar />
          </motion.div>
          <div>
            <h2 className="font-medium text-[#121212] text-base flex items-center gap-1">
              {getGreeting()}, {name} 😊
            </h2>
            <p className="text-xs font-normal text-[#767676]">
              How is your day going
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-[20px] p-2 bg-[#FFF0E0] flex items-center justify-center"
        >
          <Bell size={20} />
        </motion.button>
      </motion.div>
    </header>
  );
}
