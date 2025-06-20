"use client";

import { Avatar } from "@/components/avatar";
import { motion } from "framer-motion";
import NovuInbox from "@/components/inbox/NovuInbox";

interface HeaderProps {
  name: string | null | undefined;
  avatar: number | undefined;
  loading: boolean;
  address: string | undefined;
}

export default function Header({ name, loading, avatar, address }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const parseName = () => {
    if (loading) return "";
    else {
      if (name) {
        const firstName = name.split(" ")[0];
        return firstName.length > 10 ? `${firstName.slice(0, 7)}...` : firstName;
      } else return "Anon";
    }
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
            <Avatar number={avatar} />
          </motion.div>
          <div>
            <h2 className="font-medium text-[#121212] text-base flex items-center gap-1">
              {getGreeting()}, {parseName()} 😊
            </h2>
            <p className="text-xs font-normal text-[#767676]">How is your day going</p>
          </div>
        </div>

        {address && <NovuInbox subscriberId={address} />}
      </motion.div>
    </header>
  );
}
