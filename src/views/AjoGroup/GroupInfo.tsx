import { GetAvatar } from "@/components/avatar";
import { formatDate, formatDateTS } from "@/lib/date";
import { getPosition } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

interface Props {
  payoutRound: number;
  payoutInterval: number;
  contributionInterval: number;
  contributionAmount: number;
  pda: string;
  participants: string[];
  createdAt: Date;
  startTimestamp: null | number;
  disabled?: boolean;
}

export default function GroupInfo(props: Props) {
  const participantsCount = props.participants.length;
  const participantsShown = props.participants.slice(0, 3);
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Creation Date</p>
          <p className="font-medium">{formatDate(props.createdAt)}</p>
        </div>
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Start Date</p>
          <p className="font-medium">
            {props.startTimestamp
              ? formatDateTS(props.startTimestamp)
              : "Not yet!"}
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Contribution Amount</p>
          <p className="font-medium">{props.contributionAmount} USDC</p>
        </div>
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Contribution interval</p>
          <p className="font-medium">{props.contributionInterval} days</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Payout Round</p>
          <p className="font-medium">
            {getPosition(props.payoutRound + 1)} round
          </p>
        </div>
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Payout interval</p>
          <p className="font-medium">{props.payoutInterval} days</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#FCFCFC] rounded-xl p-4 border border-[#CBD5E1]">
          <p className="text-sm text-gray-500 mb-1">Group Type</p>
          <p className="font-medium">Public Group</p>
        </div>
        <Link
          href={props.disabled ? "#" : `/savings/ajo/${props.pda}/participants`}
        >
          <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-1">Group Members</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {participantsShown.map((address, idx) => (
                  <GetAvatar address={address} size={24} key={idx + address} />
                ))}
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-1">
                  {participantsCount > 3 ? `+ ${participantsCount - 3}` : ""}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
