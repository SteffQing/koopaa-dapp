'use client'

import { motion } from 'framer-motion'
import QuickAccess from './quick-access'
import RecentActivities from './recent-activities'
import Header from '../Navigation/header'
import SavingsAndWallet from '@/components/savings-and-wallet'
import SquadDisplay from '@/components/squads'
import ActionItems from '@/components/action-items'

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div className="flex flex-col min-h-screen pb-20" variants={container} initial="hidden" animate="show">
      <Header name="Shola" />

      <SavingsAndWallet />
      <ActionItems />
      <QuickAccess />
      <SquadDisplay />
      <RecentActivities />
    </motion.div>
  )
}
