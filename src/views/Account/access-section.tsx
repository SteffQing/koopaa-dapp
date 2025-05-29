import { motion } from "framer-motion";
import { VariantProps } from "./types";
import { SwitchButton } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const AccessSection = ({ item }: VariantProps) => {
  const {
    emergencyExitState,
    interestEnabledState,
    showBalancesState,
    notificationsEnabledState,
  } = useUserSettings();

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
              setState={notificationsEnabledState.setState}
              state={notificationsEnabledState.state}
              key="notificationsEnabled"
              disabled
            />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">
              Show dashboard balances
            </span>

            <SwitchButton
              setState={showBalancesState.setState}
              state={showBalancesState.state}
              key="showBalances"
            />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">
              Interest enabled on DEFI yield
            </span>
            <SwitchButton
              setState={interestEnabledState.setState}
              state={interestEnabledState.state}
              key="interestEnabled"
              disabled
            />
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="font-normal text-[#121212] text-xs">
              Emergency exit preference
            </span>

            <SwitchButton
              setState={emergencyExitState.setState}
              state={emergencyExitState.state}
              key="emergencyExit"
              disabled
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
