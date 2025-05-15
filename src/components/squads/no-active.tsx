import { motion } from 'framer-motion'
import { Avatar } from '../avatar'

export default function NoActiveSquad() {
  return (
    <motion.div
      className="rounded-xl p-6 flex flex-col items-center"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-[#FCFCFC] rounded-full p-7 mb-4 box-shadow">
        <motion.div
          className="relative w-16 h-16"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Avatar number={6} />
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full">
            <Avatar number={9} />
          </div>

          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full">
            <Avatar number={5} />
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full">
            <Avatar number={3} />
          </div>
        </motion.div>
      </div>

      <p className="text-[#767676] text-sm font-normal">No squad active, your active squad will appear here.</p>
    </motion.div>
  )
}
