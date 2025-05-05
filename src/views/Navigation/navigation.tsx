'use client'

import { motion } from 'framer-motion'
import { Home, Wallet, Users, User } from 'lucide-react'
import { useState } from 'react'

export default function BottomNavbar() {
  const [activeTab, setActiveTab] = useState('Home')

  const tabs = [
    { name: 'Home', icon: Home, color: '#ff6b00' },
    { name: 'Savings', icon: Wallet, color: '#666' },
    { name: 'Squads', icon: Users, color: '#666' },
    { name: 'Account', icon: User, color: '#666' },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 max-w-[400px] mx-auto"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.7, type: 'spring', stiffness: 500, damping: 30 }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.name}
          className="flex flex-col items-center py-1 px-4"
          onClick={() => setActiveTab(tab.name)}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <tab.icon size={20} color={activeTab === tab.name ? tab.color : '#666'} />
          <span
            className={`text-xs mt-1 ${activeTab === tab.name ? `text-[${tab.color}] font-medium` : 'text-gray-600'}`}
          >
            {tab.name}
          </span>

          {activeTab === tab.name && (
            <motion.div
              className="absolute bottom-0 w-6 h-1 bg-[#ff6b00] rounded-t-full"
              layoutId="activeTab"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  )
}
