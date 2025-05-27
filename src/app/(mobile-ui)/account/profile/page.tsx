"use client";

import { motion } from "framer-motion";
import Copy from "@/assets/svgs/copy.svg";
import { toast } from "sonner";
import { Avatar, AvatarPicker } from "@/components/avatar";
import Container from "@/components/container";
import NavHeader from "@/views/Navigation/nav-header";
import { ellipsify } from "@/lib/utils";
import { useAuthUser } from "@/hooks/useUser";
import { EditField } from "./EditField";
import { Skeleton } from "@/components/skeletons";
import { Camera } from "lucide-react";
import { useModal } from "@/providers/modal-provider";

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuthUser();

  const { showModal } = useModal();

  const copyWalletAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address);
      toast.success("Wallet address copied to clipboard");
    }
  };

  const handleUpdateUsername = async (newUsername: string) => {
    await updateUserProfile({ username: newUsername });
  };

  const handleUpdateEmail = async (newEmail: string) => {
    await updateUserProfile({ email: newEmail });
  };

  const handleUpdateAvatar = async (newAvatar: number) => {
    await updateUserProfile({ avatar: newAvatar });
  };

  const handleAvatarPicker = () =>
    showModal(
      <AvatarPicker
        onSelect={handleUpdateAvatar}
        currentAvatar={user?.avatar}
      />,
      {
        position: "center",
      }
    );

  return (
    <Container className="p-0! bg-[#F2F2F2]!">
      <NavHeader path="/account" header="Profile Details" className="mx-4" />
      <div className="px-4 mt-4 flex flex-col items-center gap-6">
        <div className="w-fit relative">
          <Avatar size={86} number={user?.avatar} />
          <Camera
            size={18}
            className="absolute text-[#9D6D4C] cursor-pointer bottom-2 right-2"
            onClick={handleAvatarPicker}
          />
        </div>

        <motion.div
          className="flex gap-3 items-center w-[86.4%] overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-3 py-2 px-4 bg-[#9D6D4C] backdrop-blur-[14px] rounded-[8px] overflow-hidden whitespace-nowrap">
            <p className="text-[#4C4C4C] font-medium text-sm shrink-0">
              Wallet Address
            </p>
            <span className="h-auto w-[1px] bg-[#4C4C4C]" />
            <p className="text-[#4C4C4C] font-medium text-sm truncate max-w-[160px]">
              {!loading && user?.address ? ellipsify(user.address, 7) : "~ ~ ~"}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyWalletAddress}
            className="shrink-0"
          >
            <Copy />
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-[#FCFCFC] rounded-[8px] w-full px-3 py-[1px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <>
              <div className="py-4 border-b border-[#C4C4C4]">
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="py-4">
                <Skeleton className="h-6 w-full" />
              </div>
            </>
          ) : (
            <>
              <EditField
                label="Username"
                value={user?.username || "Not set"}
                onSave={handleUpdateUsername}
              />

              <EditField
                label="Email address"
                value={user?.email || "Not set"}
                onSave={handleUpdateEmail}
                last
              />
            </>
          )}
        </motion.div>
      </div>
    </Container>
  );
}
