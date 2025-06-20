import { formatDate } from "@/lib/date";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Invite } from "./Card";
import Outstanding from "@/assets/svgs/user-info/outstanding-contribution.svg";
import PayoutComing from "@/assets/svgs/user-info/payout-coming.svg";
import { useModal } from "@/providers/modal-provider";
import { EnhancedInvitationModal } from "@/components/modal/enhanced-invite";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

interface InfoProps {
  missedRounds: number;
  nextPayout: boolean;
  payoutDate: Date | null;
  slots: number;
  pda: string;
  isParticipant: boolean;
  name: string;
  fee: number;
}

function JoinAjoGroup({ pda, name, fee }: Pick<InfoProps, "pda" | "name" | "fee">) {
  const { showModal } = useModal();

  const openInvitationModal = () => {
    showModal(<EnhancedInvitationModal inviter="KooPaa" groupName={name} id={pda} fee={fee} />, {
      position: "center",
      showCloseButton: true,
      closeOnClickOutside: true,
    });
  };
  return (
    <motion.div variants={item} className="bg-[#121212] rounded-xl p-4 mb-6">
      <div className="flex items-left cursor-pointer flex-col" onClick={openInvitationModal}>
        <p className="font-medium text-[#FCFCFC]">Click to Join this group</p>
        <p className="text-sm text-[#767676]">Join this saving group and start saving</p>
      </div>
    </motion.div>
  );
}

function OpenSlotsInvite({ slots, pda }: Pick<InfoProps, "slots" | "pda">) {
  return (
    <motion.div variants={item} className="bg-[#121212] rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium text-[#FCFCFC]">{slots} Open Slots</p>
          <p className="text-sm text-[#767676]">Generate the link and invite people to join this saving group</p>
        </div>
        <Invite pda={pda} />
      </div>
    </motion.div>
  );
}

function MissingRounds({ missedRounds }: Pick<InfoProps, "missedRounds">) {
  return (
    <motion.div variants={item} className="bg-orange-100 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-orange-200 rounded-full p-2">
          <Outstanding />
        </div>
        <div>
          <p className="font-medium text-[#ff6b00]">Pay your contribution now</p>
          <p className="text-sm text-gray-600">
            You are set back by {missedRounds} contribution rounds. Endeavour to pay!
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function NextPayout({ payoutDate }: { payoutDate: Date }) {
  return (
    <motion.div variants={item} className="bg-[#e8ffcc] rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#F9F4F1] rounded-full p-2">
          <PayoutComing />
        </div>
        <div>
          <p className="font-medium text-[#ff6b00]">Your payout is coming soon!</p>
          <p className="text-sm text-gray-600">You are next to receive the payout on {formatDate(payoutDate)}</p>
        </div>
      </div>
    </motion.div>
  );
}

// #D4FFAB
export function Info({ missedRounds, nextPayout, payoutDate, slots, isParticipant, ...props }: InfoProps) {
  const hasMissedRounds = missedRounds > 0;
  const hasPayout = nextPayout && Boolean(payoutDate);
  const hasSlots = slots > 0;

  if (hasMissedRounds) return <MissingRounds missedRounds={missedRounds} />;

  if (hasPayout) return <NextPayout payoutDate={payoutDate as Date} />;

  if (isParticipant && hasSlots) return <OpenSlotsInvite slots={slots} pda={props.pda} />;

  if (!isParticipant && hasSlots) return <JoinAjoGroup {...props} />;

  return <></>;
}

export function NextSavingDate({ date }: { date: Date | null }) {
  return (
    <motion.div variants={item} className="bg-blue-50 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Calendar size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Your next saving date is</p>
          <p className="font-medium">{date ? formatDate(date) : "Not set"}</p>
        </div>
      </div>
    </motion.div>
  );
}
