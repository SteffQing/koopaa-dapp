import { Avatar } from "@/components/avatar";
import useParticipant from "@/hooks/db/useParticipant";
import { formatDate } from "@/lib/date";
import { getPosition } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  participant: string;
  index: number;
  isNext: boolean;
  nextPayoutDate: Date | null;
  isYou: boolean;
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Participant({
  participant,
  index,
  isNext,
  nextPayoutDate,
  isYou,
}: Props) {
  const { data, isLoading } = useParticipant(participant);
  return (
    <motion.div
      key={participant}
      variants={item}
      className="bg-[#FCFCFC] rounded-xl p-4"
      whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Avatar number={data?.data?.avatar} />
          <div>
            <div className="flex items-center">
              {isLoading || !data?.data ? (
                <div className="h-5 bg-gray-200 rounded w-24" />
              ) : (
                <p className="font-medium">
                  {isYou ? "You" : data.data.username}
                </p>
              )}

              {index === 0 && (
                <span className="ml-2 text-xs bg-orange-100 text-[#ff6b00] px-2 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span className="text-orange-500 font-medium">
                @{getPosition(index + 1)}
              </span>
              <span className="ml-1">to collect contribution</span>
            </div>
          </div>
        </div>
        {isNext ? (
          <motion.button
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        ) : (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium">
            Outstanding
          </span>
        )}
      </div>
      <div className="bg-[#E6E6E6] h-[1px] w-full my-2" />
      {isNext && nextPayoutDate && (
        <p className="text-sm text-gray-500 ml-[52px]">
          Date of collection: {formatDate(nextPayoutDate)}
        </p>
      )}
    </motion.div>
  );
}
