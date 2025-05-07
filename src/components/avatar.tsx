'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
const avatarImage = (number: number) => {
  return require(`@/assets/avatars/${number}.png`).default
}

const avatarColors: Record<number, string> = {
  1: '#71927C',
  2: '#FFB1AB',
  3: '#D4FFAB',
  4: '#D2ABFF',
  5: '#534DFF',
  6: '#DCDDDA',
  7: '#FFE95A',
  8: '#FB9A2C',
  9: '#ABFFFC',
}

const Avatar = ({ number = 1 }) => {
  const src = avatarImage(number)
  const bgColor = avatarColors[number] || '#ddd'

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center border-2 border-[#FCFCFC]"
      style={{ backgroundColor: bgColor, width: 40, height: 40 }}
    >
      <Image src={src} alt={`Avatar ${number}`} />
    </div>
  )
}

const AvatarPicker = ({ onSelect }: { onSelect: (n: number) => void }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }, (_, i) => (
        <button key={i + 1} onClick={() => onSelect(i + 1)}>
          <Avatar number={i + 1} />
        </button>
      ))}
    </div>
  )
}

const randomPos = () => ({
  top: `${Math.random() * 80}%`,
  left: `${Math.random() * 80}%`,
})

export const AvatarGlob = () => {
  return (
    <div className="relative w-full h-96 bg-gray-100 overflow-hidden rounded-xl">
      {Array.from({ length: 9 }, (_, i) => {
        const style = randomPos()
        return (
          <motion.div
            key={i + 1}
            className="absolute"
            style={style}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: 'easeInOut' }}
          >
            <Avatar number={i + 1} />
          </motion.div>
        )
      })}
    </div>
  )
}

export { Avatar, AvatarPicker }
