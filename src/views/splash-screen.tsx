'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SplashScreenImage from '@/assets/splash-screen.png'

export default function SplashScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
      >
        <Image src={SplashScreenImage} alt="Koopaa Splash Screen" width={150} height={60} priority />
      </motion.div>
    </motion.div>
  )
}
