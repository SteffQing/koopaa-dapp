'use client'

import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

import Avatar1 from '@/assets/avatars/1.png'
import Avatar2 from '@/assets/avatars/2.png'
import Avatar3 from '@/assets/avatars/3.png'
import Avatar4 from '@/assets/avatars/4.png'
import Avatar5 from '@/assets/avatars/5.png'
import Avatar6 from '@/assets/avatars/6.png'
import Avatar7 from '@/assets/avatars/7.png'
import Avatar8 from '@/assets/avatars/8.png'
import Avatar9 from '@/assets/avatars/9.png'

const avatarImage: Record<number, StaticImageData> = {
  1: Avatar1,
  2: Avatar2,
  3: Avatar3,
  4: Avatar4,
  5: Avatar5,
  6: Avatar6,
  7: Avatar7,
  8: Avatar8,
  9: Avatar9,
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

const Avatar = ({ number = 1, size = 40 }) => {
  const src = avatarImage[number] || Avatar1
  const bgColor = avatarColors[number] || '#ddd'

  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center border-2 border-[#FCFCFC]"
      style={{ backgroundColor: bgColor, width: size, height: size }}
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
