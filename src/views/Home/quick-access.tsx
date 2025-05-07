'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import MyGroups from '@/assets/quick-access/my-groups.png'
import Solo from '@/assets/quick-access/solo.png'
import PublicGroup from '@/assets/quick-access/public-group.png'

import Bolt from '@/assets/svgs/bolt.svg'
const items = [
  {
    title: 'My groups',
    image: MyGroups,
    color: '#D3D0FF',
  },
  {
    title: 'Create solo savings',
    image: Solo,
    color: '#B6DEC6',
  },
  {
    title: 'Create public group',
    image: PublicGroup,
    color: '#FEC1BE',
  },
]
export default function QuickAccess() {
  return (
    <motion.div
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Quick Access</h2>
        <Bolt />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={'rounded-[8px] flex flex-col items-center justify-center'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.4 }}
            whileHover={{ y: -3, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            whileTap={{ y: 0, boxShadow: 'none' }}
            style={{ background: item.color, border: `1px solid ${item.color}` }}
          >
            <div className="mb-2">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                width={80}
                height={80}
                className="w-[120px]"
              />
            </div>
            <p className="text-[10px] text-[#121212] font-medium">{item.title}</p>
          </motion.div>
        ))}
      </div> */}

      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold">Quick Access</h2>
        <Bolt />
      </div>

      <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap -mx-4 px-4">
        <div className="flex gap-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-[8px] flex-shrink-0 w-[140px] flex flex-col items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.4 }}
              whileHover={{ y: -3, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              whileTap={{ y: 0, boxShadow: 'none' }}
              style={{ background: item.color, border: `1px solid ${item.color}` }}
            >
              <div className="mb-2">
                <Image src={item.image} alt={item.title} width={120} height={120} className="w-[120px]" />
              </div>
              <p className="text-[10px] text-[#121212] font-medium text-center px-1">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
