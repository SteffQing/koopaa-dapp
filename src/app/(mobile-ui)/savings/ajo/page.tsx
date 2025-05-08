'use client'

import { motion } from 'framer-motion'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import Card from '@/components/savings-and-wallet/card'
import GroupCard from '@/views/Savings/group/card'
import { staticJoinedGroups } from '@/lib/static'

export default function AjoSavingsPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <Card amount={2304} tab="Savings" type="ajo" currency="USDC" />

      <motion.div variants={item} className="mb-6 mt-3">
        <h2 className="font-medium text-sm text-[#333333] mb-3">Your Active Groups</h2>

        <div className="space-y-4">
          {staticJoinedGroups.map((group) => (
            <GroupCard group={group} key={group.id} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-6">
        <h2 className="font-medium text-sm text-[#333333] mb-3">Public Groups Available</h2>
        <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-center">No public groups joined yet</p>
        </div>
      </motion.div>
    </Container>
  )
}
