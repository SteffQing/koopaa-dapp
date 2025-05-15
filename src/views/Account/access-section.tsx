import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'
import { VariantProps } from './types'
import { cn } from '@/lib/utils'

export const AccessSection = ({ item }: VariantProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showBalances, setShowBalances] = useState(false)
  const [interestEnabled, setInterestEnabled] = useState(false)
  const [emergencyExit, setEmergencyExit] = useState(true)

  // Store this data in localstorage for a user-id

  return (
    <motion.div variants={item}>
      <h2 className="font-medium text-sm text-[#333333] mb-3">Access</h2>

      <div className="bg-[#FCFCFC] rounded-[8px] overflow-hidden box-shado">
        <div className="px-3">
          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">Allow notification</span>

            <SwitchButton setState={setNotificationsEnabled} state={notificationsEnabled} key="notificationsEnabled" />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">Show dashboard balances</span>

            <SwitchButton setState={setShowBalances} state={showBalances} key="showBalances" />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#E6E6E6]">
            <span className="font-normal text-[#121212] text-xs">Interest enabled on DEFI yield</span>
            <SwitchButton setState={setInterestEnabled} state={interestEnabled} key="interestEnabled" />
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="font-normal text-[#121212] text-xs">Emergency exit preference</span>

            <SwitchButton setState={setEmergencyExit} state={emergencyExit} key="emergencyExit" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

type Props = {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
}

function SwitchButton({ setState, state }: Props) {
  return (
    <motion.div
      className={cn('w-8 h-[15px] rounded-full relative cursor-pointer', state ? 'bg-[#ff6600]' : 'bg-[#A4A4A4]')}
      onClick={() => setState(!state)}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={cn(
          'w-5 h-5 bg-[#FCFCFC] rounded-full border-2 absolute top-1/2 -translate-y-1/2',
          state ? 'border-[#FF6600]' : 'border-[#A4A4A4]',
        )}
        animate={{ x: state ? 12 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.div>
  )
}
