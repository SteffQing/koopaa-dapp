"use client";

import QuickAccess from "./quick-access";
import Header from "../Navigation/header";
import SavingsAndWallet from "@/components/savings-and-wallet";
import SquadDisplay from "@/components/squads";
import ActionItems from "@/components/action-items";
import RecentActivities from "@/components/activities";
import Container from "@/components/container";
import { useAuthUser } from "@/hooks/useUser";
import { useGetActivities } from "@/hooks/db/useActivities";

export default function HomePage() {
  const { user, loading: pending } = useAuthUser();
  const { activities, loading } = useGetActivities();

  return (
    <Container>
      <Header name={user?.username} loading={pending} />
      <SavingsAndWallet />
      <ActionItems user={user} loading={pending} />
      <QuickAccess />
      <SquadDisplay />
      <RecentActivities data={activities} loading={loading} />
    </Container>
  );
}
