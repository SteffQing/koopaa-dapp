"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useModal } from "@/providers/modal-provider";
import { Avatar } from "../avatar";
import { Button } from "../ui/button";
import { Check, X, UserPlus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useParticipant from "@/hooks/db/useParticipant";
import { ellipsify } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import query from "@/lib/fetch";
import useApproveJoin from "@/hooks/blockchain/write/useApproveJoin";
import { useDebounce } from "@/hooks/blockchain/useDebounce";

interface AdminApprovalModalProps {
  groupName: string;
  pda: string;
  waitingRoomUsers: string[];
  participants: string[];
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const UserCard: React.FC<{
  user: string;
  ajoGroup: string;
  groupName: string;
}> = ({ user, ajoGroup, groupName }) => {
  const { data } = useParticipant(user);
  const { approveJoinAjoGroup, isPending, loading } = useApproveJoin();
  const params = { ajoGroup, participant: user, approved: true };

  const approve = async () => approveJoinAjoGroup(params, groupName);
  const reject = async () => approveJoinAjoGroup({ ...params, approved: false }, groupName);

  return (
    <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar size={48} number={data?.data?.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground truncate">@{data?.data?.username || "No Username"}</p>
          </div>
          <p className="text-sm text-muted-foreground truncate">{ellipsify(data?.data?.address)}</p>{" "}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={approve}
            disabled={isPending || loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="w-4 h-4 mr-1" />
          </Button>
          <Button size="sm" variant="destructive" onClick={reject} disabled={isPending || loading} className="flex-1">
            <X className="w-4 h-4 mr-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({ groupName, pda, waitingRoomUsers, participants }) => {
  // const { hideModal } = useModal();
  const [query_, setQuery] = useState("");
  const [users, setUsers] = useState<string[]>(waitingRoomUsers);

  const q = useDebounce(query_, 400);

  const { mutate } = useMutation({
    mutationKey: ["waiting-room-users", pda],
    mutationFn: () => query.get<string[]>("", { params: { q } }),
    onSuccess: (data) => {
      const users_ = data.data || [];
      const participants_ = users_.filter((user) => !participants.includes(user));
      setUsers(participants_);
    },
  });

  useEffect(() => {
    if (q) mutate();
    else setUsers(waitingRoomUsers);
  }, [q]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Manage Join Requests</h2>
          <p className="text-sm text-muted-foreground">
            Add or approve users waiting to join <span className="font-medium text-[#ff6b00]">{groupName}</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={query_}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto">
          {users.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-12 text-muted-foreground">
              {waitingRoomUsers.length === 0 ? (
                <>
                  <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No users in the waiting room</p>
                  <p className="text-sm mt-1">Users will appear here when they request to join</p>
                </>
              ) : (
                <p>No users match your search</p>
              )}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="space-y-3">
              {users.map((user) => (
                <UserCard key={user} user={user} ajoGroup={pda} groupName={groupName} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminApprovalModal;
