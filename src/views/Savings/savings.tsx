import { SavingsData } from '@/components/savings-and-wallet/types'
import { motion } from 'framer-motion'

import Solo from '@/assets/quick-access/solo.png'
import PublicGroup from '@/assets/quick-access/public-group.png'
import Image from 'next/image'

type Props = {
  savingsData: [SavingsData, SavingsData]
}

export default function Savings({ savingsData }: Props) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="mt-6 mb-6"
    >
      <h2 className="font-medium text-[#121212] text-sm mb-3">Savings</h2>

      <div className="bg-[#FCFCFC] rounded-[8px] overflow-hidden px-4">
        {savingsData.map((item, index) => (
          <motion.div
            key={index}
            className="py-4 flex justify-between items-center border-b border-[#E6E6E6] last:border-b-0"
            whileHover={{ backgroundColor: '#f9f9f9' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full relative overflow-hidden">
                <Image
                  src={item.type === 'individual' ? Solo : PublicGroup}
                  alt={item.type}
                  className="object-cover"
                  fill
                />
              </div>
              <p className="font-medium text-[#2E2E2E] text-sm">
                {item.type === 'individual' ? 'Individual Savings' : 'My Ajo Groups'}
              </p>
            </div>
            <div className="bg-[#E5FFDF] py-1 px-2 rounded-[8px]">
              <span className="font-normal text-[#008B05] text-sm">${item.amount.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
