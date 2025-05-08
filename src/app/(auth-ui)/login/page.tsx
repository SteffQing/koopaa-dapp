'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import SolanaCoin from '@/assets/coins/solana.png'
import USDCoin from '@/assets/coins/usdc.png'
import Disc1 from '@/assets/coins/disc-1.png'
import Disc2 from '@/assets/coins/disc-2.png'
import PiggyBank from '@/assets/coins/piggybank.png'

import Sol from '@/assets/coins/sol.svg'
import Koopaa0 from '@/assets/koopaa_0.svg'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectWallet = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      toast.success('Wallet connected successfully!')
      // Here you would redirect to the home page after successful connection
      // router.push('/home')
    }, 1500)
  }

  return (
    <motion.div
      className="splash-bg container relative pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-[50px]">
        <motion.div
          className="relative w-full min-h-64 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: 'easeInOut',
            }}
          >
            <Image src={USDCoin} alt="Floating USDCoin" width={60} height={60} className="object-contain" />
          </motion.div>

          <Image
            src={PiggyBank}
            alt="Piggy Bank"
            width={180}
            height={180}
            className="object-contain mx-auto pt-[20px]"
          />

          <motion.div
            className="absolute top-4 right-[1%] transform translate-x-1/2"
            // animate={{
            //   y: [0, 10, 0],
            //   rotate: [0, -10, 0],
            // }}
            // transition={{
            //   repeat: Number.POSITIVE_INFINITY,
            //   duration: 4,
            //   ease: 'easeInOut',
            //   delay: 0.5,
            // }}
          >
            <Image src={SolanaCoin} alt="Floating Solana Coin" width={100} height={100} className="object-contain" />
          </motion.div>

          <motion.div
            className="absolute -bottom-2 right-1/4 transform translate-x-1/2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: 'linear',
              },
              scale: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: 'easeInOut',
              },
            }}
          >
            <Image src={Disc2} alt="Disc 2" width={70} height={70} className="object-contain" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 -left-[40%] transform translate-x-1/2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: 'linear',
              },
              scale: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: 'easeInOut',
              },
            }}
          >
            <Image src={Disc1} alt="Disc 1" width={120} height={40} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-4 flex items-center flex-col"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 mb-6 gradient-border">
            <Sol />
            <span className="ml-2 text-sm font-medium">Secured by Solana</span>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">
            Saving Smart with <br />
            Your Circle
            <span className="inline-block w-[1em] h-[1em] align-middle ml-[10px] -mr-[6px]">
              <Koopaa0 />
            </span>
            n-Chain
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            Unlock smart, transparent and automated collective saving with your circle — powered by Solana and USDC.
          </p>
        </motion.div>

        <motion.div
          className="w-full pb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button onClick={handleConnectWallet} loading={isConnecting}>
            Connect Wallet
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
