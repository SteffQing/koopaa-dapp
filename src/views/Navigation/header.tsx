'use client'

import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  name: string
}

export default function Header({ name }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <motion.div
      className="p-4 bg-white rounded-b-2xl mb-4 flex items-center justify-between"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-200"
          />
        </motion.div>
        <div>
          <h2 className="font-semibold text-lg flex items-center gap-1">
            {getGreeting()}, {name} <span className="text-xl">😊</span>
          </h2>
          <p className="text-sm text-gray-500">How is your day going</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <Bell size={20} />
      </motion.button>
    </motion.div>
  )
}
