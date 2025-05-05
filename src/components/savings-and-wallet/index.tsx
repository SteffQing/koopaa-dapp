'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SavingsAndWallet() {
  const [activeTab, setActiveTab] = useState('Savings')

  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex gap-2 mb-3">
        {['Savings', 'Wallet'].map((tab) => (
          <motion.button
            key={tab}
            className={`py-2 px-6 rounded-full text-sm font-medium ${
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
    </motion.div>
  )
}
