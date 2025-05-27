import { useState } from "react";
import { motion } from "framer-motion";
import { VariantProps } from "./types";
import { SwitchButton } from "@/components/ui/button";

export const AccessSection = ({ item }: VariantProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showBalances, setShowBalances] = useState(false);
  const [interestEnabled, setInterestEnabled] = useState(false);
  const [emergencyExit, setEmergencyExit] = useState(true);

  // Store this data in localstorage for a user-id

  return (
    <motion.div variants={item}>
      <h2 className="font-medium text-sm text-[#333333] mb-3">Access</h2>

      <div className="bg-[#FCFCFC] rounded-[8px] overflow-hidden box-shado">
        <div className="px-3">
          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">
              Allow notification
            </span>

            <SwitchButton
              setState={setNotificationsEnabled}
              state={notificationsEnabled}
              key="notificationsEnabled"
            />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">
              Show dashboard balances
            </span>

            <SwitchButton
              setState={setShowBalances}
              state={showBalances}
              key="showBalances"
            />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">
              Interest enabled on DEFI yield
            </span>
            <SwitchButton
              setState={setInterestEnabled}
              state={interestEnabled}
              key="interestEnabled"
            />
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="font-normal text-[#121212] text-xs">
              Emergency exit preference
            </span>

            <SwitchButton
              setState={setEmergencyExit}
              state={emergencyExit}
              key="emergencyExit"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
