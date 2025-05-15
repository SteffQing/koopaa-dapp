'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import CreateAjoGroupForm from './form'
import type { CreateAjoGroupFormValues } from './schema'

export default function CreateAjoGroupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleSubmit = async (data: CreateAjoGroupFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      console.log('Form data:', data, isSubmitting)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success('Group created successfully!')
      // Redirect to the new group page or another appropriate page
      // router.push("/savings/ajo")
    } catch (error) {
      console.error('Error creating group:', error)
      toast.error('Failed to create group. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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

      <CreateAjoGroupForm onSubmit={handleSubmit} />
    </Container>
  )
}
