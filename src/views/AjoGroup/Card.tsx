import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, RefreshCw, Share2 } from "lucide-react";
import { FormattedBalance } from "@/components/savings-and-wallet/card";
import useContribute from "@/hooks/blockchain/write/useContribute";
import { Button } from "@/components/ui/button";
import query from "@/lib/fetch";
import { Currency } from "@/components/savings-and-wallet/types";
import useGetRate from "@/hooks/useGetRate";

type Props = {
  progress: number;
  payout: number;
  contributionAmount: number;
  yourContribution: number;
  started: boolean;
  name: string;
  pda: string;
  you: string | undefined;
  disabled?: boolean;
  canTopUp: boolean;
  isParticipant: boolean;
};

export function Invite({ pda }: { pda: string }) {
  const [isInviting, setIsInviting] = useState(false);
  const invite = async () => {
    setIsInviting(true);
    try {
      const load = toast.loading("Please wait as we generate you a unique invite link");
      const { data, error } = await query.post<string>("", { body: { pda } });
      toast.dismiss(load);
      if (data) {
        await navigator.clipboard.writeText(data);
        toast.success(`Invite link copied! Share with friends to join ${name} Ajo Group`);
      } else {
        toast.error(error || "Failed to generate invite link");
      }
    } catch (err) {
      console.error("failed to copy invite link: ", err);
      toast.error("Failed to copy invite link");
    } finally {
      setIsInviting(false);
    }
  };
  return (
    <motion.button
      onClick={invite}
      disabled={isInviting}
      className="flex items-center gap-1 bg-white/50 hover:bg-white/80 px-2 py-1 rounded-full text-xs font-medium text-gray-700 transition-colors disabled:opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isInviting ? <RefreshCw size={12} className="animate-spin" /> : <Share2 size={12} />}
      Invite
    </motion.button>
  );
}

export default function GroupSavingsCard(props: Props) {
  const { name, pda, contributionAmount } = props;
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const [currency, setCurrency] = useState<Currency>("USDC");
  const [balance, setBalance] = useState(props.payout);

  const { contribute, isPending, loading } = useContribute();
  const rate = useGetRate();

  const handleTopUp = async () => await contribute(pda, name, contributionAmount);

  function convert() {
    if (currency === "USDC") {
      setBalance(props.payout * rate);
      setCurrency("NGN");
    } else {
      setBalance(props.payout);
      setCurrency("USDC");
    }
  }

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
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="text-gray-700 font-medium">Rotating Payout</p>
          <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>
        {!props.started && <Invite pda={pda} />}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline">
          <span className="text-sm mr-1">{currency}</span>
          <motion.span
            className="text-3xl font-bold"
            key={isBalanceVisible.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isBalanceVisible ? <FormattedBalance amount={balance} /> : "****"}
          </motion.span>
        </div>

        <div
          className="bg-white rounded-full px-2 py-1 flex items-center gap-1 text-xs cursor-pointer"
          onClick={convert}
        >
          <span>{currency}</span>
          <RefreshCw size={12} />
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
            animate={{ width: `${props.progress}%` }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>1%</span>
          <span>100%</span>
        </div>
      </div>

      {props.isParticipant && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">Amount you saved: ${props.yourContribution}</p>
        </div>
      )}

      <Button
        onClick={handleTopUp}
        disabled={!props.started || props.disabled || !props.canTopUp || !props.isParticipant}
        loading={isPending || loading}
      >
        Contribute
      </Button>
    </motion.div>
  );
}
