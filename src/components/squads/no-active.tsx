import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NoActiveSquad() {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 flex flex-col items-center"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="relative w-32 h-32 mb-4"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      >
        {/* Placeholder for squad avatars in a circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0 bg-blue-400 rounded-full w-10 h-10 flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Member"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0 bg-green-400 rounded-full w-10 h-10 flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Member"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-0 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Member"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-0 bg-purple-400 rounded-full w-10 h-10 flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Member"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center">
          <Image src="/placeholder.svg?height=48&width=48" alt="You" width={48} height={48} className="rounded-full" />
        </div>
      </motion.div>

      <p className="text-gray-600 text-sm">No squad active, your active squad will appear here.</p>
    </motion.div>
  )
}
