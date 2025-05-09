'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'

export const ConnectWalletModal: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-2">Connect a Wallet</h2>
      <p className="text-gray-500 text-center mb-8">Get started by connecting your preferred wallet below.</p>

      <div className="space-y-4 mb-8">
        <motion.button
          className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
          whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          whileTap={{ y: 0 }}
          onClick={() => {
            // Handle connect with Phantom
            toast.info('Connecting to Phantom...')
          }}
        >
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-xl">👻</span>
          </div>
          <span className="font-medium">Connect with Phantom</span>
        </motion.button>

        <motion.button
          className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          whileTap={{ y: 0 }}
          onClick={() => {
            // Handle connect with Solflare
            toast.info('Connecting to Solflare...')
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 font-bold">S</span>
            </div>
            <span className="font-medium">Connect with Solflare</span>
          </div>
          <ArrowUpRight size={20} className="text-gray-400" />
        </motion.button>
      </div>

      <div className="mb-8">
        <h3 className="font-medium mb-2">What is a wallet?</h3>
        <p className="text-gray-500 text-sm">
          A wallet is a digital tool that stores and manages your private keys, allowing you to access and control your
          cryptocurrency and other assets on the Solana blockchain. It&#39;s a crucial component for interacting with
          the Solana ecosystem, including decentralized applications (dApps) and managing your digital assets.
        </p>
      </div>

      <motion.button
        className="w-full border border-gray-300 rounded-xl py-4 font-medium"
        whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
        whileTap={{ y: 0 }}
        onClick={() => {
          // Open wallet download page
          window.open('https://solana.com/ecosystem/wallets', '_blank')
        }}
      >
        Get Wallet
      </motion.button>
    </div>
  )
}
