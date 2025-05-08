'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from './card'
import SavingsCard from './savings-card'
import { SavingsData } from './types'

export type Tab = 'Savings' | 'Wallet'
const tabs: [Tab, Tab] = ['Savings', 'Wallet']

export default function SavingsAndWallet() {
  const [activeTab, setActiveTab] = useState<Tab>('Savings')

  // Sample data for different savings types
  const savingsData: SavingsData[] = [
    { type: 'total', amount: 20456.76, currency: 'USDC' as const },
    { type: 'individual', amount: 12345.67, currency: 'USDC' as const },
    { type: 'ajo', amount: 8111.09, currency: 'USDC' as const },
  ]

  // Wallet data
  const walletData = { amount: 5678.9, currency: 'USDC' as const }

  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex gap-2 mt-3 mb-5 justify-center">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            className={`py-2 px-6 rounded-full text-sm font-medium cursor-pointer ${
              activeTab === tab ? 'bg-[#ff6b00] text-white' : 'bg-white text-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {activeTab === 'Savings' ? (
        <SavingsCard savingsData={savingsData} />
      ) : (
        <Card tab={activeTab} currency={walletData.currency} amount={walletData.amount} />
      )}
    </motion.div>
  )
}
