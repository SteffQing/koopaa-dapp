'use client'

import { motion } from 'framer-motion'
import Copy from '@/assets/svgs/copy.svg'
import { useState } from 'react'
import { toast } from 'sonner'
import { Avatar } from '@/components/avatar'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import { ellipsify } from '@/lib/utils'

export default function ProfilePage() {
  const [userData] = useState({
    id: '@koopa12309',
    username: 'Shola',
    email: 'Emolashola@email.com',
    address: 'Den31aaDmQCL846DvtpBMwu1utQTPCM5rcNRfFDiS3jK',
  })

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(userData.address)
    toast.success('Wallet address copied to clipboard')
  }

  return (
    <Container className="p-0! bg-[#F2F2F2]!">
      <NavHeader path="/account" header="Profile Details" className="mx-4" />
      <div className="px-4 mt-4 flex flex-col items-center gap-6">
        <Avatar size={86} />

        {/* Wallet Address */}
        <motion.div
          className="flex gap-3 items-center w-[86.4%]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-3 py-2 px-4 bg-[#9D6D4C] backdrop-blur-[14px] rounded-[8px]">
            <p className="text-[#4C4C4C] font-medium text-sm">Wallet address</p>
            <span className="h-auto w-[1px] bg-[#4C4C4C]" />
            <p className="text-[#4C4C4C] font-medium text-sm">{ellipsify(userData.address, 7)}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyWalletAddress}>
            <Copy />
          </motion.button>
        </motion.div>

        {/* User Details */}
        <motion.div
          className="bg-[#FCFCFC] rounded-[8px] w-full px-3 py-[1px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="py-4 border-b border-[#C4C4C4] flex justify-between items-center">
            <p className="text-[#121212] font-medium text-xs">User id</p>
            <p className="font-normal text-[#4C4C4C] text-xs">{userData.id}</p>
          </div>

          <div className="py-4 border-b border-[#C4C4C4] flex justify-between items-center">
            <p className="text-[#121212] font-medium text-xs">Username</p>
            <p className="font-normal text-[#4C4C4C] text-xs">{userData.username}</p>
          </div>

          <div className="py-4 flex justify-between items-center">
            <p className="text-[#121212] font-medium text-xs">Email address</p>
            <p className="font-normal text-[#4C4C4C] text-xs">{userData.email}</p>
          </div>
        </motion.div>
      </div>
    </Container>
  )
}
