'use client'

import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import Refresh from '@/assets/svgs/refresh.svg'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import ArrowDown from '@/assets/svgs/arrow-down.svg'
import { Currency, SavingsType, Tab } from './types'

interface CardProps {
  amount: number
  tab: Tab
  currency: Currency
  type?: SavingsType
  action?: {
    text: string
    handler: () => void
  }
}

const bgMap = {
  total: '/savings-card/total.png',
  individual: '/savings-card/individual.png',
  ajo: '/savings-card/ajo.png',
}

const titleMap = {
  total: 'Total Savings',
  individual: 'Individual Savings',
  ajo: 'Ajo Savings',
}

export default function Card({ amount, tab, currency, action, type = 'total' }: CardProps) {
  const [isVisible, setIsVisible] = useState(true)
  const isSavings = tab === 'Savings'

  return (
    <motion.div
      style={{ backgroundImage: `url(${bgMap[type]})` }}
      className="bg-cover bg-center rounded-xl p-3"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
    >
      <div className="flex items-center gap-2 mb-3 pt-4">
        <p className="text-gray-700 font-medium">{isSavings ? titleMap[type] : 'Wallet Balances'}</p>
        <button onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
          <Eye size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-3xl font-bold mb-4"
          key={isVisible.toString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-lg mr-2">{currency}</span>
          {isVisible ? <FormattedBalance amount={amount} /> : '****'}
        </motion.h1>
        <div className="flex bg-[#F9F4F1] rounded-[8px] px-2 py-1 items-center gap-1 text-xs text-[#333333] font-normal">
          <span>{currency}</span>
          <Refresh className="cursor-pointer" />
        </div>
      </div>
      {action ? (
        <motion.button
          className="bg-black w-full text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          whileTap={{ y: 0, boxShadow: 'none' }}
          onClick={action.handler}
        >
          {action.text}
        </motion.button>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-1">
          <motion.button
            className="bg-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
          >
            {isSavings ? 'Top Up' : 'Fund Wallet'} <ArrowDown />
          </motion.button>

          <motion.button
            className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
          >
            Withdraw <ArrowUp />
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

function FormattedBalance({ amount = 0 }) {
  const [whole, decimal] = amount
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split('.')

  return (
    <>
      {whole}
      <span className="text-xl">.{decimal}</span>
    </>
  )
}
