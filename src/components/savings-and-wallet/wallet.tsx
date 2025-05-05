'use client'

import { motion } from 'framer-motion'
import { Eye, RotateCw } from 'lucide-react'
import { useState } from 'react'

export default function SavingsCard() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <motion.div
      className="bg-orange-50 rounded-xl p-4"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="text-gray-700 font-medium">Wallet Balances</p>
          <button onClick={() => setIsVisible(!isVisible)}>
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>USDC</span>
          <RotateCw size={16} className="text-gray-600" />
        </div>
      </div>

      <motion.h1
        className="text-3xl font-bold mb-4"
        key={isVisible.toString()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isVisible ? (
          <>
            <span className="text-lg">USDC</span> 20,456<span className="text-xl">.76</span>
          </>
        ) : (
          '••••••'
        )}
      </motion.h1>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className="bg-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          whileTap={{ y: 0, boxShadow: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
          Fund Wallet
        </motion.button>

        <motion.button
          className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          whileTap={{ y: 0, boxShadow: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8V16M8 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              transform="rotate(45 12 12)"
            />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
          Withdraw
        </motion.button>
      </div>
    </motion.div>
  )
}
