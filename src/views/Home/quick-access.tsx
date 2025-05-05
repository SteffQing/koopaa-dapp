'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function QuickAccess() {
  const items = [
    {
      title: 'My groups',
      image: '/placeholder.svg?height=80&width=80',
      color: 'bg-blue-100',
    },
    {
      title: 'Create solo savings',
      image: '/placeholder.svg?height=80&width=80',
      color: 'bg-green-100',
    },
    {
      title: 'Create public group',
      image: '/placeholder.svg?height=80&width=80',
      color: 'bg-pink-100',
    },
  ]

  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Quick Access</h2>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 10V3L4 14H11V21L20 10H13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FFB800"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`${item.color} rounded-xl p-3 flex flex-col items-center justify-center text-center`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.4 }}
            whileHover={{ y: -3, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
          >
            <div className="mb-2">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                width={80}
                height={80}
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs font-medium">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
