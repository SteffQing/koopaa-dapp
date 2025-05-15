'use client'

import { motion } from 'framer-motion'
import Container from '@/components/container'
import ActionItems from '@/components/action-items'
import { Avatar } from '@/components/avatar'
import { AccessSection } from './access-section'
import SecurityAndSupport from './security-support'
import { PersonalSection } from './personal'

export default function AccountPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container className="p-0!">
      <motion.div
        className="bg-[url(/savings-card/total.png)] bg-cover bg-center relative w-full h-[200px]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center flex-col">
          <Avatar size={86} />
          <h1 className="text-[#ff6600] text-xl font-medium">Emola Shola</h1>
        </div>
      </motion.div>
      <section className="px-4 mt-4 flex flex-col gap-6">
        <ActionItems />

        <AccessSection item={item} />
        <PersonalSection item={item} />
        <SecurityAndSupport item={item} />

        <motion.div variants={item} className="text-center text-sm text-gray-500 mt-8 mb-20">
          @2025 koopa tech all rights reserved
        </motion.div>
      </section>
    </Container>
  )
}
