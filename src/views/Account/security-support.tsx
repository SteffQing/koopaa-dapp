import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { VariantProps } from './types'

import HelpCenter from '@/assets/svgs/account/security-support/help-center.svg'
import ContactUs from '@/assets/svgs/account/security-support/contact-us.svg'
import LogOut from '@/assets/svgs/account/security-support/log-out.svg'

export default function SecurityAndSupport({ item }: VariantProps) {
  return (
    <motion.div variants={item} className="mb-6">
      <h2 className="font-medium text-sm text-[#333333] mb-3">Security & Support</h2>

      <div className="bg-[#FCFCFC] rounded-[8px] overflow-hidden box-shadow">
        <div className="px-3">
          <div className="py-3 flex justify-between items-center border-b border-[#E6E6E6]">
            <div className="flex items-center gap-2">
              <div className="bg-[#DADADA] p-[6px] rounded-[14px]">
                <ContactUs />
              </div>
              <span className="font-normal text-[#121212] text-xs">Contact us</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          <div className="py-3 flex justify-between items-center border-b border-[#E6E6E6]">
            <div className="flex items-center gap-2">
              <div className="bg-[#DADADA] p-[6px] rounded-[14px]">
                <HelpCenter />
              </div>
              <span className="font-normal text-[#121212] text-xs">Help center</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          <div className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#DADADA] p-[6px] rounded-[14px]">
                <LogOut />
              </div>
              <span className="font-normal text-[#FF0000] text-xs">Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
