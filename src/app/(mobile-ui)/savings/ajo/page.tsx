"use client";

import { motion } from "framer-motion";
import Container from "@/components/container";
import NavHeader from "@/views/Navigation/nav-header";
import Card from "@/components/savings-and-wallet/card";
import GroupCard from "@/views/Savings/group/card";
import { useGetUserAjoSavings } from "@/hooks/blockchain/read/useUserAjoGroups";
import useUserGroups from "@/hooks/db/useUserGroups";
import GroupCardSkeleton from "@/views/Savings/group/skeleton";
import AjoError from "@/components/error";
import Image from "next/image";
import Vault from "@/assets/empty-vault.png";
import { useState } from "react";

const TABS = [
  { id: "active", label: "Active", key: "activeGroupsIn" },
  { id: "pending", label: "Pending", key: "notStartedGroupsIn" },
  { id: "waiting", label: "Waiting", key: "inWaitingRoomGroups" },
] as const;

export default function AjoSavingsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "pending" | "waiting">(
    "active"
  );
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const ajoSavings = useGetUserAjoSavings();
  const { data, isLoading, error, refetch } = useUserGroups();

  const groupsMap = {
    active: data?.activeGroupsIn ?? [],
    pending: data?.notStartedGroupsIn ?? [],
    waiting: data?.inWaitingRoomGroups ?? [],
  };

  const currentGroups = groupsMap[activeTab];
  const emptyMessages = {
    active: "No groups in progress",
    pending: "No pending groups",
    waiting: "You are not waiting to join any groups",
  };

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <Card amount={ajoSavings} tab="Savings" type="ajo" />

      {error ? (
        <AjoError message={error.message} onRetry={refetch} />
      ) : (
        <>
          <motion.div variants={item} className="mt-6 mb-6">
            <div className="flex gap-2 bg-white rounded-lg p-1">
              {TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-[#ff6600] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="mb-6 flex flex-col gap-4">
            {isLoading ? (
              <GroupCardSkeleton />
            ) : currentGroups.length > 0 ? (
              <div className="flex flex-col gap-3">
                {currentGroups.map((group) => (
                  <GroupCard group={group} key={group.pda} />
                ))}
              </div>
            ) : (
              <motion.div
                className="flex justify-between flex-col-reverse items-center"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                <div className="py-2">
                  <p className="text-gray-500 text-center">
                    {emptyMessages[activeTab]}
                  </p>
                </div>
                <div className="flex-2 pt-[108px] w-[100px] relative">
                  <Image
                    src={Vault}
                    alt="You have not joined any groups"
                    className="object-contain mix-blend-luminosity"
                    fill
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </Container>
  );
}
