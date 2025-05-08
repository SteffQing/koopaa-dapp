'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, RefreshCw, ChevronRight, Calendar } from 'lucide-react'
import { use, useState } from 'react'
import { toast } from 'sonner'
import NavHeader from '@/views/Navigation/nav-header'
import Container from '@/components/container'

export default function AjoGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  const { id } = use(params)

  const groupData = {
    id,
    name: 'Funmi asoebi',
    openSlots: 4,
    inviteLink: 'Koopa45t.f',
    nextContribution: '1st',
    collectionDate: '21 May 2025',
    startDate: '08 - May - 2025',
    endDate: '08 - August - 2025',
    savingFrequency: '$50.00 monthly',
    daysLeft: 90,
    groupType: 'Public group',
    memberCount: 3,
    nextSavingDate: '07 June 2025',
    hasTransactions: false,
    savingGoal: 5000,
    amountSaved: 50,
    savingsDuration: '5 Months',
    progress: 1,
    coverImage: 1,
  }

  //   const copyInviteLink = () => {
  //     navigator.clipboard.writeText(groupData.inviteLink)
  //     toast.success('Invite link copied to clipboard')
  //   }

  const handleTopUp = () => {
    toast.success('Top up initiated')
    // Here you would handle the top up process
  }

  const handleWithdraw = () => {
    toast.error('Insufficient funds for withdrawal')
    // Here you would handle the withdrawal process
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings" header={groupData.name} />

      <motion.div variants={item} className="mb-4 rounded-xl overflow-hidden">
        <Image
          src={`/group-cover/${groupData.coverImage}.png`}
          alt={groupData.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </motion.div>

      {/* Saving Goal Card */}
      <motion.div
        variants={item}
        className="bg-[#e8ffcc] rounded-xl p-4 mb-6"
        whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-700 font-medium">Saving Goal</p>
          <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-sm mr-1">USDC</span>
            <motion.span
              className="text-3xl font-bold"
              key={isBalanceVisible.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isBalanceVisible ? (
                <>
                  5,000<span className="text-xl">.00</span>
                </>
              ) : (
                '****'
              )}
            </motion.span>
          </div>
          <div className="flex justify-end">
            <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 text-xs">
              <span>USDC</span>
              <RefreshCw size={12} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Goal Tracker</span>
            <span className="text-sm">Savings duration: ${groupData.amountSaved * 99}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${groupData.progress}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>1%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Amount saved:</p>
            <p className="font-semibold">${groupData.amountSaved}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Savings duration:</p>
            <p className="font-semibold">{groupData.savingsDuration}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            className="bg-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
            onClick={handleTopUp}
          >
            Top Up
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(180 12 12)"
              />
            </svg>
          </motion.button>

          <motion.button
            className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
            onClick={handleWithdraw}
          >
            Withdraw
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 5L19 12M12 5L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Warning */}
      <motion.div variants={item} className="bg-orange-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-200 rounded-full p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z"
                stroke="#ff6b00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-[#ff6b00]">Fund your wallet now</p>
            <p className="text-sm text-gray-600">You have insufficient funds for this goal</p>
          </div>
        </div>
      </motion.div>

      {/* Group Info */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Start Date</p>
          <p className="font-medium">{groupData.startDate}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">End Date</p>
          <p className="font-medium">{groupData.endDate}</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Saving Frequency</p>
          <p className="font-medium">{groupData.savingFrequency}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Days Left</p>
          <p className="font-medium">{groupData.daysLeft}</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Group Type</p>
          <p className="font-medium">{groupData.groupType}</p>
        </div>
        <Link href={`/savings/ajo/${id}/members`}>
          <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-1">Group Members</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-green-200 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-blue-200 border border-white"></div>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-1">+{groupData.memberCount}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Next Saving Date */}
      <motion.div variants={item} className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <Calendar size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Your next saving date is</p>
            <p className="font-medium">{groupData.nextSavingDate}</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={item} className="mb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Activities</h2>
          <button className="text-[#ff6b00] text-sm font-medium flex items-center">
            See all <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500">No transaction history</p>
        </div>
      </motion.div>
    </Container>
  )
}
