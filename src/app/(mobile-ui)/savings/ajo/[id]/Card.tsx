import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import ArrowUp from "@/assets/svgs/arrow-up.svg";
import ArrowDown from "@/assets/svgs/arrow-down.svg";
import { Eye, RefreshCw } from "lucide-react";
import { FormattedBalance } from "@/components/savings-and-wallet/card";

type Data = {
  contributionAmount: number;
  contributionRounds: number;
  contributionInterval: number;
  numParticipants: number;
  mccr: number;
  payoutRound: number;
  payoutInterval: number;
  currentRound: number;
};

type Props = {
  data: Data;
};

export default function GroupSavingsCard({ data }: Props) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const targetAmount = data.contributionAmount * data.numParticipants;
  const round = Math.ceil(data.payoutInterval / data.contributionInterval);
  const progress = Math.min((round / data.mccr) * 100, 55);

  const handleTopUp = () => {
    toast.success("Top up initiated");
    // Here you would handle the top up process
  };
  const handleWithdraw = () => {
    // if (true) {
    //   toast.success("Withdrawal in progress");
    //   // Trigger withdrawal flow
    // } else {
    toast.error("Not eligible for withdrawal yet");
    // }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={item}
      className="bg-[#e8ffcc] rounded-xl p-4 mb-6"
      whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <p className="text-gray-700 font-medium">Rotating Payout</p>
        <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
          <Eye size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-sm mr-1">USDC</span>
          <motion.span
            className="text-3xl font-bold"
            key={isBalanceVisible.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isBalanceVisible ? (
              <FormattedBalance amount={targetAmount} />
            ) : (
              "****"
            )}
          </motion.span>
        </div>
        <div className="flex justify-end">
          <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 text-xs">
            <span>USDC</span>
            <RefreshCw size={12} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Goal Tracker</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>1%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Amount you saved</p>
          <p className="font-semibold">
            ${data.contributionAmount * data.contributionRounds}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Contribution interval</p>
          <p className="font-semibold">{data.contributionInterval} days</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className="bg-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          whileTap={{ y: 0, boxShadow: "none" }}
          onClick={handleTopUp}
          disabled
        >
          Top Up <ArrowDown />
        </motion.button>

        <motion.button
          className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          whileTap={{ y: 0, boxShadow: "none" }}
          onClick={handleWithdraw}
          disabled
        >
          Withdraw <ArrowUp />
        </motion.button>
      </div>
    </motion.div>
  );
}
