import React from 'react'
import { motion } from 'framer-motion'
import { VariantProps } from './types'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Profile from '@/assets/svgs/account/profile.svg'

export const PersonalSection = ({ item }: VariantProps) => {
  return (
    <motion.div variants={item}>
      <h2 className="font-medium text-sm text-[#333333] mb-3">Personal</h2>

      <div className="bg-[#FCFCFC] rounded-[8px] overflow-hidden box-shadow">
        <div className="px-3">
          <Link href="/account/profile">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#DADADA] p-[6px] rounded-[14px]">
                  <Profile />
                </div>
                <span className="font-normal text-[#121212] text-xs">Profile details</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
