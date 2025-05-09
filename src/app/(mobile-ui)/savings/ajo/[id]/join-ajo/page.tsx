'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
import NavHeader from '@/views/Navigation/nav-header'
import Container from '@/components/container'
import { useModal } from '@/providers/modal-provider'
import { InvitationModal } from '@/components/modal/invite'

export default function JoinAjoGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const [isAgreed, setIsAgreed] = useState(false)
  const { id } = use(params)

  const { showModal } = useModal()

  const openInvitationModal = () => {
    showModal(<InvitationModal inviter="EmolaShola" groupName="Friends" groupType="koopa squad" />, {
      position: 'center',
      showCloseButton: false,
    })
  }

  useEffect(() => {
    openInvitationModal()
  }, [])

  const groupData = {
    id,
    name: 'Funmi asoebi',
    description: 'This group is to help us raise funds for the upcoming party',
    savingGoal: 150.0,
    numberOfSlots: 6,
    savingsPerMonth: 50.0,
    latePaymentFee: 2,
    gracePeriod: '2 days',
    securityFee: 50.0,
    duration: '3 Months',
    savingFrequency: 'Monthly',
    payoutFrequency: '2 Weeks interval',
    startDate: '07-May-2025',
    endDate: '07-August-2025',
    coverImage: 1,
  }

  const handleContinue = () => {
    if (!isAgreed) {
      toast.error('Please agree to the group rules')
      return
    }
    toast.success('Successfully joined the group')
    // Here you would handle the form submission
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

      {/* Group Details */}
      <motion.div variants={item} className="bg-white rounded-xl overflow-hidden mb-6">
        <div className="divide-y">
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Group Name</span>
            <span className="font-medium">{groupData.name}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Group Description</span>
            <span className="font-medium text-right max-w-[60%]">{groupData.description}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Saving Goal</span>
            <span className="font-medium">${groupData.savingGoal.toFixed(2)}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Number of Slots</span>
            <span className="font-medium">{groupData.numberOfSlots}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Savings Per Month</span>
            <span className="font-medium">${groupData.savingsPerMonth.toFixed(2)}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Late Payment Fee</span>
            <span className="font-medium">${groupData.latePaymentFee}</span>
          </div>

          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-600">Grace Period</span>
            <div className="flex items-center">
              <span className="font-medium mr-1">{groupData.gracePeriod}</span>
              <Info size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Security Fee</span>
            <span className="font-medium">${groupData.securityFee.toFixed(2)}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{groupData.duration}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Saving Frequency</span>
            <span className="font-medium">{groupData.savingFrequency}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Payout Frequency</span>
            <span className="font-medium">{groupData.payoutFrequency}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Start Date</span>
            <span className="font-medium">{groupData.startDate}</span>
          </div>

          <div className="p-4 flex justify-between">
            <span className="text-gray-600">End Date</span>
            <span className="font-medium">{groupData.endDate}</span>
          </div>
        </div>
      </motion.div>

      {/* Agreement */}
      <motion.div variants={item} className="mb-6">
        <div className="flex items-start mb-4">
          <div className="flex items-center h-5 mt-1">
            <motion.div
              className={`w-6 h-6 rounded border ${
                isAgreed ? 'bg-[#ff6b00] border-[#ff6b00]' : 'border-gray-300'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setIsAgreed(!isAgreed)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAgreed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </motion.div>
          </div>
          <label className="ml-2 text-sm text-gray-600">
            I agree that I adhere to all the rules of the group and making payments when due.
          </label>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        variants={item}
        className="w-full bg-[#ff6b00] text-white py-4 px-6 rounded-lg font-medium"
        whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(255,107,0,0.3)' }}
        whileTap={{ y: 0, boxShadow: 'none' }}
        onClick={handleContinue}
      >
        Continue
      </motion.button>
    </Container>
  )
}
