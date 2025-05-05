'use client'

import { motion } from 'framer-motion'

export default function ActionItems() {
  const items = [
    {
      title: 'Verify your details',
      description: 'Kindly verify your details to enjoy kopa',
      progress: 2,
      total: 5,
      action: 'Create Pin',
    },
    {
      title: 'Create transaction pin',
      description: 'Setup a pin for all your transactions',
      action: 'Create Pin',
    },
  ]

  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Take Action</h2>
        <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-4 flex justify-between items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          >
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>

              {item.progress && (
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.progress / item.total) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {item.progress}/{item.total}
                  </span>
                </div>
              )}
            </div>

            <motion.button
              className="bg-[#ff6b00] text-white px-4 py-2 rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.action}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
