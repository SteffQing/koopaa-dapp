"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import { Clock, Users, CheckCircle } from "lucide-react";

interface WaitingRoomStatusModalProps {
  groupName: string;
  groupId: string;
  status: "pending" | "approved" | "rejected";
  position?: number;
  totalWaiting?: number;
  estimatedWaitTime?: string;
}

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

export const WaitingRoomStatusModal: React.FC<WaitingRoomStatusModalProps> = ({
  groupName,
  status,
  position,
  totalWaiting,
  estimatedWaitTime,
}) => {
  const { hideModal } = useModal();

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="w-12 h-12 text-[#ff6b00]" />,
          title: "You're in the Waiting Room!",
          description: `Your request to join ${groupName} is being reviewed by the admin.`,
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        };
      case "approved":
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-600" />,
          title: "Welcome to the Group!",
          description: `Your request to join ${groupName} has been approved!`,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "rejected":
        return {
          icon: <Users className="w-12 h-12 text-red-600" />,
          title: "Request Not Approved",
          description: `Unfortunately, your request to join ${groupName} was not approved this time.`,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      default:
        return {
          icon: <Clock className="w-12 h-12 text-gray-600" />,
          title: "Status Unknown",
          description: "Please try again later.",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="p-6 max-w-md w-full"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          variants={itemVariants}
          className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-6 mb-6`}
        >
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {statusConfig.icon}
            </motion.div>

            <motion.h2 className="text-lg font-semibold text-foreground mb-2" variants={itemVariants}>
              {statusConfig.title}
            </motion.h2>

            <motion.p className="text-sm text-muted-foreground mb-4" variants={itemVariants}>
              {statusConfig.description}
            </motion.p>

            {status === "pending" && (
              <motion.div variants={itemVariants} className="space-y-2">
                {position && totalWaiting && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      Position {position} of {totalWaiting} in queue
                    </span>
                  </div>
                )}
                {estimatedWaitTime && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Estimated wait: {estimatedWaitTime}</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button onClick={hideModal} className="w-full">
            {status === "approved" ? "Continue to Group" : "Okay"}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
