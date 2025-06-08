"use client";

import { motion } from "framer-motion";
import Clock from "@/assets/svgs/clock.svg";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../prisma-client";

export default function ActionItems({
  user,
  loading,
}: {
  user: User | null;
  loading: boolean;
}) {
  const PROGRESS = useMemo(() => {
    if (!user) return 0;
    let score = 0;
    if (user.username) score += 1;
    if (user.email) score += 1;
    return score;
  }, [user]);

  const router = useRouter();

  const items = [
    {
      title: "Add a username",
      description: "Get easily identified. Please add a username",
      action: () => router.push("/account/profile"),
    },
    {
      title: "Add an email",
      description: "Make it easier for us to notify you",
      action: () => router.push("/account/profile"),
    },
  ];

  return !loading && PROGRESS !== items.length ? (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Take Action</h2>
        <Clock />
      </div>

      <motion.div
        className="bg-white rounded-xl p-3 flex justify-between items-center box-shadow"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 * 0 + 0.3 }}
        whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
        onClick={items[PROGRESS].action}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm text-[#121212]">
            {items[PROGRESS].title}
          </h3>
          <p className="text-xs font-normal text-[#4C4C4C]">
            {items[PROGRESS].description}
          </p>
        </div>

        <HalfCircleProgress progress={PROGRESS} total={items.length} />
      </motion.div>
    </motion.div>
  ) : (
    <></>
  );
}

function HalfCircleProgress({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) {
  const radius = 45;
  const circumference = Math.PI * radius;
  const percentage = (progress / total) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center w-[70px] relative">
      <svg width="70" height="40" viewBox="0 0 100 50">
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="10"
        />
        <motion.path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1 }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6600" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-base text-[#333333] font-medium">
        {progress}/{total}
      </div>
    </div>
  );
}
