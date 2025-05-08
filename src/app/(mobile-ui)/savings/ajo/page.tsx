'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import Card from '@/components/savings-and-wallet/card'

export default function AjoSavingsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const publicGroups = [
    {
      id: 1,
      name: 'Funmi asoebi',
      targetAmount: 250.0,
      createdDate: '07-May-2025',
      monthlyContribution: 50,
      duration: '5 Months',
      remainingMembers: 2,
      members: 2,
    },
    {
      id: 2,
      name: 'Travel Fund',
      targetAmount: 250.0,
      createdDate: '10-May-2025',
      monthlyContribution: 50,
      duration: '5 Months',
      remainingMembers: 3,
      members: 1,
    },
  ]

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <motion.div className="px-4 pb-4" variants={container} initial="hidden" animate="show">
        <Card amount={2304} tab="Savings" type="ajo" currency="USDC" />

        <motion.div variants={item} className="mb-6">
          <h2 className="font-medium text-sm text-[#333333] mb-3">Your Active Groups</h2>

          <div className="space-y-4">
            {publicGroups.map((group) => (
              <Link key={group.id} href={`/savings/ajo/${group.id}`}>
                <motion.div
                  className="bg-white rounded-xl overflow-hidden"
                  whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                >
                  <div className="h-20 bg-gray-300 relative">
                    <Image
                      src="/group-cover/1.png"
                      alt="Group cover"
                      width={300}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 text-white font-semibold">{group.name}</div>
                  </div>

                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-sm text-gray-500">Target Amount</p>
                        <p className="font-semibold">${group.targetAmount.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Created Date</p>
                        <p className="font-semibold">{group.createdDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-sm text-gray-500">Monthly contributions:</p>
                        <p className="font-semibold">${group.monthlyContribution}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Duration:</p>
                        <p className="font-semibold">{group.duration}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-green-200 border border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-blue-200 border border-white"></div>
                          </div>
                          <p className="text-sm ml-2">+{group.members} member</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Remaining:</p>
                        <p className="font-semibold">{group.remainingMembers} members</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Public Groups Savings */}
        <motion.div variants={item} className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Public Groups Savings</h2>
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-center">No public groups joined yet</p>
          </div>
        </motion.div>

        {/* Private Groups Savings */}
        <motion.div variants={item}>
          <h2 className="font-semibold text-lg mb-3">Private Groups Savings</h2>
          <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-center">No private groups joined yet</p>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  )
}
