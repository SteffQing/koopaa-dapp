'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import NoActiveSquad from './no-active'

export default function SquadDisplay() {
  // This would be populated from your API/database
  const hasActiveSquad = false
  const squadMembers = []

  return (
    <motion.div
      className="mb-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-3">
        <h2 className="font-semibold text-left">Kop</h2>
      </div>

      {hasActiveSquad ? (
        <div className="bg-white rounded-xl p-4">{/* Active squad content would go here */}</div>
      ) : (
        <NoActiveSquad />
      )}
    </motion.div>
  )
}
