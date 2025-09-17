"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/providers/modal-provider";
import { Avatar } from "../avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useParticipant from "@/hooks/db/useParticipant";
import { InvitationModalSkeleton } from "../skeletons/invite-modal";
import useJoinAjoGroup from "@/hooks/blockchain/write/useJoinAjoGroup";

interface InvitationModalProps {
  inviter: string;
  groupName: string;
  id: string;
}

const trimText = (text: string, maxLength = 20): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const EnhancedInvitationModal: React.FC<InvitationModalProps> = ({ inviter, groupName, id }) => {
  const { hideModal } = useModal();
  const router = useRouter();
  const { data, isLoading } = useParticipant(inviter);
  const { joinAjoGroup, loading, isPending } = useJoinAjoGroup();

  const handleAccept = async () => {
    await joinAjoGroup(id, groupName);
    hideModal();
  };

  const handleDecline = () => {
    hideModal();
    router.replace("/");
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <InvitationModalSkeleton key="skeleton" />
      ) : (
        <motion.div
          key="content"
          className="p-6"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="flex justify-center mb-6 relative" variants={itemVariants}>
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Avatar size={96} number={data?.data?.avatar} />
              </motion.div>
              <motion.div
                className="absolute text-[#ff6b00] right-0 top-0"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            </div>
            <motion.div
              className="absolute left-[55%] top-[25%]"
              initial={{ scale: 0, x: -50 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <Avatar size={66} number={1} />
            </motion.div>
          </motion.div>

          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.span
                className="bg-orange-100 text-[#ff6b00] px-2 py-1 rounded-md whitespace-nowrap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                @{trimText(data?.data?.username || "KooPaa", 15)}
              </motion.span>{" "}
              is inviting you to join{" "}
              <motion.span
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md whitespace-nowrap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                {trimText(groupName, 18)}
              </motion.span>
              <br />
              KooPaa Squad in your savings journey
            </motion.p>
          </motion.div>

          <motion.div className="space-y-3" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button onClick={handleAccept} className="w-full" loading={loading || isPending}>
                Accept Invitation
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Button variant="outline" onClick={handleDecline} className="w-full" disabled={loading || isPending}>
                Decline
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
