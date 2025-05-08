import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getDateHumanReadable } from '@/lib/date'
import { Avatar } from '@/components/avatar'

type Group = {
  name: string
  id: string
  period_amount: number
  member_ids: string[]
  created_at: Date
  duration: number
  minimum_members: number
  group_cover: number
}

export default function Card({ group }: { group: Group }) {
  return (
    <Link key={group.id} href={`/savings/ajo/${group.id}`}>
      <motion.div
        className="bg-white rounded-xl overflow-hidden"
        whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
      >
        <div className="h-20 bg-gray-300 relative">
          <Image
            src={`/group-cover/${group.group_cover}.png`}
            alt={group.name + ' Group cover'}
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
              <p className="font-semibold">${group.period_amount * group.minimum_members}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Created Date</p>
              <p className="font-semibold">{getDateHumanReadable(group.created_at)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-sm text-gray-500">Monthly contributions</p>
              <p className="font-semibold">${group.period_amount}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{group.duration} Months</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Members</p>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Avatar size={24} number={1} />
                  <Avatar size={24} number={2} />
                  <div className="w-6 h-6 rounded-full bg-green-200 border border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-200 border border-white"></div>
                </div>
                <p className="text-sm ml-2">+{group.member_ids.length} member</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p className="font-semibold">{group.member_ids.length - group.minimum_members} members</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
