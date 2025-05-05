'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function RecentActivities() {
  const activities = [
    {
      type: 'credit',
      title: 'Savings account credited',
      time: '5mins ago',
      amount: '$2,500.84',
      icon: '💰',
    },
    {
      type: 'credit',
      title: 'Wallet account funded',
      time: '5mins ago',
      amount: '$2,500.84',
      icon: '💰',
    },
    {
      type: 'info',
      title: 'Created & launched squad',
      time: '7:24am',
      icon: '🎯',
    },
    {
      type: 'transfer',
      title: 'Funds transferred from wallet to family',
      time: '6:34pm',
      amount: '$2,500.84',
      icon: '💸',
    },
    {
      type: 'debit',
      title: 'Family saving debited',
      time: '5mins ago',
      amount: '-$2,500.84',
      icon: '💰',
    },
  ]

  const getIconBg = (type: string) => {
    switch (type) {
      case 'credit':
        return 'bg-green-100'
      case 'debit':
        return 'bg-red-100'
      case 'transfer':
        return 'bg-yellow-100'
      case 'info':
        return 'bg-blue-100'
      default:
        return 'bg-gray-100'
    }
  }

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'text-green-600'
      case 'debit':
        return 'text-red-600'
      default:
        return 'text-gray-900'
    }
  }

  return (
    <motion.div
      className="mb-20"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Recent Activities</h2>
        <button className="text-[#ff6b00] text-sm font-medium flex items-center">
          See all <ChevronRight size={16} />
        </button>
      </div>

      <div className="bg-white rounded-xl p-2">
        <div className="mb-2 px-2">
          <p className="text-xs font-medium text-gray-500">Today</p>
        </div>

        <div className="space-y-1">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.6 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${getIconBg(activity.type)} rounded-full flex items-center justify-center`}>
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>

              {activity.amount && <p className={`font-semibold ${getAmountColor(activity.type)}`}>{activity.amount}</p>}
            </motion.div>
          ))}
        </div>

        <div className="mt-3 px-2 pt-2 border-t text-xs text-gray-500">16 - 04 2025</div>
      </div>
    </motion.div>
  )
}
