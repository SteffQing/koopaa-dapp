'use client'

import { motion, useMotionValue, useSpring, useAnimationControls } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Card from './card'

export type Tab = 'Savings' | 'Wallet'
const tabs: [Tab, Tab] = ['Savings', 'Wallet']

export default function SavingsAndWallet() {
  const [activeTab, setActiveTab] = useState<Tab>('Savings')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  // Sample data for different savings types
  const savingsData = [
    { type: 'total', amount: 20456.76, currency: 'USDC' as const },
    { type: 'individual', amount: 12345.67, currency: 'USDC' as const },
    { type: 'ajo', amount: 8111.09, currency: 'USDC' as const },
  ]

  // Wallet data
  const walletData = { amount: 5678.9, currency: 'USDC' as const }

  // Motion values for tracking scroll
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })

  // Handle navigation between cards
  const navigateToCard = (index: number) => {
    if (index < 0 || index >= savingsData.length) return

    setActiveCardIndex(index)

    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth
      const newX = -index * cardWidth

      controls.start({
        x: newX,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
    }
  }

  // Set up drag constraints
  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth

      x.set(-activeCardIndex * cardWidth)
    }
  }, [activeCardIndex, savingsData.length, x])

  // Handle drag end - snap to nearest card
  const handleDragEnd = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth
      const currentX = x.get()
      const targetIndex = Math.round(Math.abs(currentX) / cardWidth)

      console.log(cardWidth, currentX, targetIndex)

      navigateToCard(targetIndex)
    }
  }

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
        <div className="relative overflow-hidden">
          {/* Cards container */}
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: -(savingsData.length - 1) * 100, right: 0 }}
              dragElastic={0.1}
              animate={controls}
              style={{ x: springX }}
              onDragEnd={handleDragEnd}
              // onDragStart={handleDragStart}
            >
              {savingsData.map((data, index) => {
                // Calculate distance from active card for opacity
                const distance = Math.abs(index - activeCardIndex)
                const opacity = distance === 0 ? 1 : 0.5

                return (
                  <motion.div
                    key={index}
                    className="w-full flex-shrink-0 snap-start"
                    custom={index}
                    style={{ opacity }}
                    transition={{ opacity: { duration: 0.3 } }}
                  >
                    <Card tab={activeTab} currency={data.currency} amount={data.amount} type={data.type as any} />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {savingsData.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  index === activeCardIndex ? 'bg-[#ff6b00]' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateToCard(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card tab={activeTab} currency={walletData.currency} amount={walletData.amount} />
      )}
    </motion.div>
  )
}
