'use client'

import { motion } from 'framer-motion'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import CreateAjoGroupForm from './form'

export default function CreateAjoGroupPage() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings" header="Ajo Savings" />

      <motion.h1 variants={item} className="text-lg font-medium text-[#ff6600] mb-1">
        Let&#39;s create a public ajo group 😉
      </motion.h1>
      <motion.p variants={item} className="text-[#767676] font-normal text-[13px] mb-6">
        Kindly enter group details below
      </motion.p>
      <CreateAjoGroupForm />
    </Container>
  )
}
