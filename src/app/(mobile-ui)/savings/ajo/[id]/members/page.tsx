'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import NavHeader from '@/views/Navigation/nav-header'
import Container from '@/components/container'
import { use } from 'react'
import { Avatar } from '@/components/avatar'

export default function GroupMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const members = [
    {
      id: 1,
      name: 'Emola Shola',
      isAdmin: true,
      position: '1st',
      collectionDate: '21 May 2025',
      status: 'next',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      name: 'Khalid Momoh',
      position: '1st',
      collectionDate: '04 June 2025',
      status: 'outstanding',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 3,
      name: 'Fathia Balogun',
      position: '1st',
      collectionDate: '18 June 2025',
      status: 'outstanding',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 4,
      name: 'Adeleke David',
      position: '1st',
      collectionDate: '02 July 2025',
      status: 'outstanding',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 5,
      name: 'You',
      position: '1st',
      collectionDate: '16 July 2025',
      status: 'outstanding',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 6,
      name: 'Simon Kingsley',
      position: '1st',
      collectionDate: '03 August 2025',
      status: 'outstanding',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path={`/savings/ajo/${id}/details`} header="Group members" />

      <div className="space-y-4">
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={item}
            className="bg-white rounded-xl p-4"
            whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Avatar number={member.id} />
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{member.name}</p>
                    {member.isAdmin && (
                      <span className="ml-2 text-xs bg-orange-100 text-[#ff6b00] px-2 py-0.5 rounded">Admin</span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="text-orange-500 font-medium">@{member.position}</span>
                    <span className="ml-1">to collect contribution</span>
                  </div>
                </div>
              </div>
              {member.status === 'next' ? (
                <motion.button
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium">
                  Outstanding
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">Date of collection: {member.collectionDate}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  )
}
