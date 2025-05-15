'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Globe, Lock } from 'lucide-react'
import { useModal } from '@/providers/modal-provider'
import { useRouter } from 'next/navigation'

export const GroupTargetModal: React.FC = () => {
  const { hideModal } = useModal()
  const router = useRouter()

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20">
          <div className="absolute w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <div className="flex flex-wrap w-8 h-8">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6">Start a KooPaa Savings target</h2>

      <div className="space-y-4">
        <motion.div
          className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          whileTap={{ y: 0 }}
          onClick={() => {
            hideModal()
            router.push('/savings/create-ajo')
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Create a public group</h3>
              <p className="text-gray-500 text-sm">Use this option to create a public ajo for everyone.</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
          whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          whileTap={{ y: 0 }}
          onClick={() => {
            hideModal()
            // Navigate to create private group page
            router.push('/savings/create-goal')
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="font-medium text-lg">Create a solo group</h3>
              <p className="text-gray-500 text-sm">Use this option to create a private ajo for your close network.</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </motion.div>
      </div>
    </div>
  )
}
