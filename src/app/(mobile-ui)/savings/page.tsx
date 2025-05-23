"use client";

import Container from "@/components/container";
import NavHeader from "@/views/Navigation/nav-header";
import SavingsCard from "@/components/savings-and-wallet/savings-card";
import { SavingsData } from "@/components/savings-and-wallet/types";
import { useRouter } from "next/navigation";
import Savings from "@/views/Savings/savings";
import StartSaving from "@/views/Savings/start-saving";
import { useModal } from "@/providers/modal-provider";
import { GroupTargetModal } from "@/components/modal/start-saving";
import { toast } from "sonner";
import { useGetUserAjoSavings } from "@/hooks/blockchain/write/useUserAjoGroups";

export default function SavingsPage() {
  const router = useRouter();
  const { showModal } = useModal();
  const ajoSavings = useGetUserAjoSavings();

  const openGroupTargetModal = () => {
    showModal(<GroupTargetModal />, { position: "bottom" });
  };

  const savingsData: SavingsData[] = [
    { type: "total", amount: ajoSavings + 0 },
    { type: "individual", amount: 0 },
    { type: "ajo", amount: ajoSavings },
  ];

  const savingsAction = [
    { text: "Start Saving", handler: openGroupTargetModal },
    {
      text: "Coming Soon",
      handler: () => toast.info("Individual Savings is coming soon"),
    },
    { text: "Topup Saving", handler: () => router.push("/savings/ajo") },
  ];

  return (
    <Container>
      <NavHeader header="Savings" />

      <SavingsCard savingsData={savingsData} action={savingsAction} />

      <Savings savingsData={[savingsData[1], savingsData[2]]} />

      <StartSaving />
    </Container>
  );
}
