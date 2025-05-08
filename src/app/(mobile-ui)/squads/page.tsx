'use client'

import { Avatar } from '@/components/avatar'
import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SquadsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Sample squad members data
  const squadMembers = [
    { id: 1, position: 'top', color: 'bg-green-400' },
    { id: 2, position: 'topRight', color: 'bg-purple-400' },
    { id: 3, position: 'right', color: 'bg-blue-400' },
    { id: 4, position: 'bottomRight', color: 'bg-orange-400' },
    { id: 5, position: 'bottom', color: 'bg-gray-400' },
    { id: 6, position: 'bottomLeft', color: 'bg-red-400' },
    { id: 7, position: 'left', color: 'bg-yellow-400' },
    { id: 8, position: 'topLeft', color: 'bg-pink-400' },
    { id: 9, position: 'center', color: 'bg-white' },
  ]

  // Get position styles based on position name
  const getPositionStyles = (position: string) => {
    switch (position) {
      case 'top':
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      case 'topRight':
        return 'absolute top-1/4 right-0 transform translate-x-1/4 -translate-y-1/4'
      case 'right':
        return 'absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2'
      case 'bottomRight':
        return 'absolute bottom-1/4 right-0 transform translate-x-1/4 translate-y-1/4'
      case 'bottom':
        return 'absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2'
      case 'bottomLeft':
        return 'absolute bottom-1/4 left-0 transform -translate-x-1/4 translate-y-1/4'
      case 'left':
        return 'absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2'
      case 'topLeft':
        return 'absolute top-1/4 left-0 transform -translate-x-1/4 -translate-y-1/4'
      case 'center':
        return 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      default:
        return ''
    }
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <motion.div
        className="pt-16 pb-8 flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-64 h-64">
          {/* Background glow */}
          <div className="absolute inset-0 bg-orange-100 rounded-full opacity-30 blur-xl"></div>

          {/* Squad members */}
          {squadMembers.map((member) => (
            <motion.div
              key={member.id}
              className={`${getPositionStyles(member.position)} ${member.color} rounded-full w-12 h-12 flex items-center justify-center border-2 border-white`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: member.position === 'center' ? 0 : [0, 10, 0, -10, 0],
              }}
              transition={{
                delay: 0.2 + member.id * 0.1,
                duration: 0.5,
                rotate: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5 + (member.id % 3),
                  ease: 'easeInOut',
                },
              }}
            >
              <Avatar size={48} number={member.id} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="px-4 text-center" variants={container} initial="hidden" animate="show">
        <motion.h1 className="text-2xl font-bold mb-3" variants={item}>
          Join a KooPaa squad
        </motion.h1>

        <motion.p className="text-gray-600 mb-8" variants={item}>
          No available koopa squad, create one or join existing squads and start saving
        </motion.p>

        <motion.div className="space-y-4" variants={item}>
          <Button>Join a Squad</Button>

          <Button variant="outline">Create a New Squad</Button>
        </motion.div>
      </motion.div>
    </Container>
  )
}
