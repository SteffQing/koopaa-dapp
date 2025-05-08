'use client'

import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'
import SavingsCard from '@/components/savings-and-wallet/savings-card'
import { SavingsData } from '@/components/savings-and-wallet/types'
import { useRouter } from 'next/navigation'
import Savings from '@/views/Savings/savings'
import StartSaving from '@/views/Savings/start-saving'

export default function SavingsPage() {
  const router = useRouter()

  const savingsData: SavingsData[] = [
    { type: 'total', amount: 20456.76, currency: 'USDC' as const },
    { type: 'individual', amount: 12345.67, currency: 'USDC' as const },
    { type: 'ajo', amount: 8111.09, currency: 'USDC' as const },
  ]
  const savingsAction = [
    { text: 'Start Saving', handler: () => router.push('/savings/ajo') },
    { text: 'Start Saving', handler: () => router.push('/savings/individual') },
    { text: 'Start Saving', handler: () => router.push('/savings/ajo') },
  ]

  return (
    <Container>
      <NavHeader header="Savings" />

      <SavingsCard savingsData={savingsData} action={savingsAction} />

      <Savings savingsData={[savingsData[1], savingsData[2]]} />

      <StartSaving />
    </Container>
  )
}
