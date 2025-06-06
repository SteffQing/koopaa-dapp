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

export default function AjoSavingsPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const ajoSavings = useGetUserAjoSavings();
  const { data, isLoading, error, refetch } = useUserGroups();

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <Card amount={ajoSavings} tab="Savings" type="ajo" />

      {error ? (
        <AjoError message={error.message} onRetry={refetch} />
      ) : (
        <>
          <motion.div variants={item} className="mb-6 mt-3 flex flex-col gap-4">
            <h2 className="font-medium text-sm text-[#333333] mb-1">Your Active Groups</h2>

            {isLoading ? (
              <GroupCardSkeleton />
            ) : data && data.joined_groups.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.joined_groups.map((group) => (
                  <GroupCard group={group} key={group.pda} />
                ))}
              </div>
            ) : (
              <motion.div
                className="flex justify-between flex-col-reverse items-center"
                whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                <div className="py-2">
                  <p className="text-gray-500 text-center">No active Ajo Group found</p>
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

          <motion.div variants={item} className="mb-6 flex flex-col gap-4">
            <h2 className="font-medium text-sm text-[#333333] mb-1">Public Groups Available</h2>
            {isLoading ? (
              <GroupCardSkeleton />
            ) : data && data.avbl_groups.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.avbl_groups.map((group) => (
                  <GroupCard group={group} key={group.pda} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center">
                <p className="text-gray-500 text-center">No public groups available right now!</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </Container>
  );
}
