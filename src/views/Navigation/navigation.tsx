'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import Home from '@/assets/svgs/navigation/home.svg'
import Savings from '@/assets/svgs/navigation/savings.svg'
import Squads from '@/assets/svgs/squad.svg'
import Account from '@/assets/svgs/navigation/account.svg'
import { cn } from '@/lib/utils'

const tabs = [
  { name: 'Home', icon: Home },
  { name: 'Savings', icon: Savings },
  { name: 'Squads', icon: Squads },
  { name: 'Account', icon: Account },
]

export default function BottomNavbar() {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#F2F2F2] flex gap-6 items-center mx-auto px-6 py-3 border border-[#CBD5E1] rounded-3xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.7, type: 'spring', stiffness: 500, damping: 30 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.name}
          className="flex flex-col items-center gap-[5px]"
          onClick={() => setActiveTab(tab.name)}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <tab.icon
            className={cn(activeTab === tab.name ? 'text-[#ff6600]' : 'text-[#767676]')}
            width={24}
            height={24}
          />
          <span
            className={cn('text-[#767676] text-xs font-normal', activeTab === tab.name && 'text-[#ff6600] font-medium')}
          >
            {tab.name}
          </span>
        </motion.button>
      ))}
    </motion.div>
  )
}
