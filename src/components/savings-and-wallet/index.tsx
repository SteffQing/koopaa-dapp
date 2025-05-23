"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Card from "./card";
import SavingsCard from "./savings-card";
import { SavingsData, Tab } from "./types";
import useUSDCBalance from "@/hooks/blockchain/useGetBalance";
import { useGetUserAjoSavings } from "@/hooks/blockchain/write/useUserAjoGroups";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const tabs: [Tab, Tab] = ["Savings", "Wallet"];

export default function SavingsAndWallet() {
  const [activeTab, setActiveTab] = useState<Tab>("Savings");
  const { data, isLoading, refetch } = useUSDCBalance();
  const ajoSavings = useGetUserAjoSavings();

  const router = useRouter();

  const savingsAction = [
    { text: "Start Saving", handler: () => router.push("/savings") },
    {
      text: "Coming Soon",
      handler: () => toast.info("Individual Savings is coming soon"),
    },
    { text: "Topup Savings", handler: () => router.push("/savings/ajo") },
  ];

  const savingsData: SavingsData[] = [
    { type: "total", amount: ajoSavings + 0 },
    { type: "individual", amount: 0 },
    { type: "ajo", amount: ajoSavings },
  ];

  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex gap-2 mt-3 mb-5 justify-center">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            className={`py-2 px-6 rounded-full text-sm font-medium cursor-pointer ${
              activeTab === tab
                ? "bg-[#ff6b00] text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {activeTab === "Savings" ? (
        <SavingsCard savingsData={savingsData} action={savingsAction} />
      ) : (
        <Card
          tab={activeTab}
          amount={data || 0}
          loading={isLoading}
          onRefresh={refetch}
        />
      )}
    </motion.div>
  );
}
