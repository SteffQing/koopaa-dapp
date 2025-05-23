import { formatDate } from "@/lib/date";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

interface InfoProps {
  missedRounds: number;
  nextPayout: boolean;
  payoutDate: Date | null;
}

export function Info({ missedRounds, nextPayout, payoutDate }: InfoProps) {
  const hasMissedRounds = missedRounds > 0;
  const hasPayout = nextPayout && Boolean(payoutDate);
  const show = hasMissedRounds || hasPayout;
  return show ? (
    <motion.div variants={item} className="bg-orange-100 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-orange-200 rounded-full p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z"
              stroke="#ff6b00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-[#ff6b00]">
            {missedRounds > 0
              ? "Pay your contribution now"
              : nextPayout
                ? "Your payout is coming soon!"
                : ""}
          </p>
          <p className="text-sm text-gray-600">
            {hasMissedRounds
              ? `You are set back by ${missedRounds} contribution rounds. Endeavour to pay!`
              : nextPayout && payoutDate
                ? `🎉 You are next to receive the payout on ${formatDate(payoutDate)}`
                : ""}
          </p>
        </div>
      </div>
    </motion.div>
  ) : (
    <></>
  );
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
