'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import NavHeader from '@/views/Navigation/nav-header'
import Container from '@/components/container'
import Card from '@/components/savings-and-wallet/card'
import EmptyVault from '@/assets/empty-vault.png'

export default function IndividualSavingsPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings" header="Individual savings" />
      <Card amount={1303} tab="Savings" type="individual" currency="USDC" />

      {/* Empty State */}
      <motion.div
        variants={item}
        className="flex flex-col items-center justify-center mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="mb-6"
        >
          <Image src={EmptyVault} alt="Empty vault" width={150} height={150} />
        </motion.div>
        <p className="text-gray-500 max-w-xs">
          You haven&#39;t created any solo saving goal. Click on the plus button to get started
        </p>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-15 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <Link href="/savings/create-goal">
          <motion.button
            className="w-16 h-16 bg-[#ff6b00] rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 8px 20px rgba(255,107,0,0.3)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={24} />
          </motion.button>
        </Link>
      </motion.div>
    </Container>
  )
}
