'use client'

import type React from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Avatar } from '../avatar'

function getTagColor(tag: string): string {
  switch (tag.toLowerCase()) {
    case 'lifestyle':
      return 'bg-purple-100 text-purple-800'
    case 'finance':
      return 'bg-green-100 text-green-800'
    case 'real estate':
      return 'bg-yellow-100 text-yellow-800'
    case 'friends':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface SquadCardProps {
  squad: {
    name: string
    members: number[]
    goal: number
    tag: string
  }
}

const SquadCard: React.FC<SquadCardProps> = ({ squad }) => {
  // Only show up to 4 members, the rest will be shown as +X
  const visibleMembers = squad.members.slice(0, 4)
  const extraMembers = squad.members.length > 4 ? squad.members.length - 4 : 0

  return (
    <motion.div className="flex flex-col items-center" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Link href={`/savings/ajo/${squad.name.toLowerCase().replace(/\s+/g, '-')}/join-ajo`}>
        <div className="bg-white rounded-full p-4 w-40 h-40 flex items-center justify-center relative shadow-sm">
          {/* Member Avatars */}
          <div className="relative w-full h-full">
            {visibleMembers.map((memberId, index) => {
              // Calculate positions for each avatar
              let position = {}

              switch (index) {
                case 0: // Top
                  position = { top: '5%', left: '50%', transform: 'translateX(-50%)' }
                  break
                case 1: // Bottom
                  position = { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
                  break
                case 2: // Left
                  position = { left: '5%', top: '50%', transform: 'translateY(-50%)' }
                  break
                case 3: // Right
                  position = { right: '5%', top: '50%', transform: 'translateY(-50%)' }
                  break
                default:
                  position = {}
              }

              return (
                <div key={index} className="absolute" style={position as React.CSSProperties}>
                  <Avatar number={memberId} />
                </div>
              )
            })}

            {/* Extra members badge */}
            {extraMembers > 0 && (
              <div className="absolute top-0 right-0 bg-[#ff6b00] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                +{extraMembers}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 text-center">
          <h3 className="font-semibold text-base">{squad.name}</h3>
          <p className="text-sm text-gray-600">${squad.goal.toLocaleString()} goal</p>

          <div
            className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(squad.tag)}`}
          >
            {squad.tag === 'real estate' ? (
              <span className="mr-1">🏠</span>
            ) : squad.tag === 'finance' ? (
              <span className="mr-1">💼</span>
            ) : squad.tag === 'lifestyle' ? (
              <span className="mr-1">🌴</span>
            ) : (
              <span className="mr-1">👥</span>
            )}
            {squad.tag.charAt(0).toUpperCase() + squad.tag.slice(1)}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default SquadCard
