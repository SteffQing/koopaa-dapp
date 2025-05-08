'use client'

import QuickAccess from './quick-access'
import Header from '../Navigation/header'
import SavingsAndWallet from '@/components/savings-and-wallet'
import SquadDisplay from '@/components/squads'
import ActionItems from '@/components/action-items'
import RecentActivities from '@/components/activities'
import Container from '@/components/container'

export default function HomePage() {
  return (
    <Container>
      <Header name="Shola" />

      <SavingsAndWallet />
      <ActionItems />
      <QuickAccess />
      <SquadDisplay />
      <RecentActivities />
    </Container>
  )
}
