'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import SavingsCard from '@/components/savings-and-wallet/savings-card'
import { SavingsData } from '@/components/savings-and-wallet/types'
import { useRouter } from 'next/navigation'
import Savings from '@/views/Savings/savings'
import StartSaving from '@/views/Savings/start-saving'

type SavingsDataAndAction = SavingsData & {
  text: string
  handler: () => void
}

export default function SavingsPage() {
  const router = useRouter()
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const savingsData: SavingsData[] = [
    { type: 'total', amount: 20456.76, currency: 'USDC' as const },
    { type: 'individual', amount: 12345.67, currency: 'USDC' as const },
    { type: 'ajo', amount: 8111.09, currency: 'USDC' as const },
  ]
  const savingsAction = [
    { text: 'Start Saving', handler: () => router.push('') },
    { text: 'Start Saving', handler: () => router.push('') },
    { text: 'Start Saving', handler: () => router.push('') },
  ]

  return (
    <Container>
      <NavHeader header="Savings" />

      <SavingsCard savingsData={savingsData} action={savingsAction} />

      {/* Savings Section */}
      <Savings savingsData={[savingsData[1], savingsData[2]]} />

      <StartSaving />
    </Container>
  )
}
