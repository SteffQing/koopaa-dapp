"use client";

import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import { use } from "react";
import useGetAjoGroup from "@/hooks/blockchain/read/useFetchAjoGroup";
import ParticipantsListSkeleton from "./Skeleton";
import Participant from "./Participant";
import { useWallet } from "@solana/wallet-adapter-react";
import AjoError from "@/components/error";

function calculatePayoutDate(
  date: Date | null,
  interval: number,
  nextPayoutIndex: number,
  position: number,
  totalMembers: number
) {
  if (!date) return null;
  const roundsAway = (position - nextPayoutIndex + totalMembers) % totalMembers;
  const daysUntilPayout = roundsAway * interval;

  const payoutDate = new Date(date);
  payoutDate.setDate(payoutDate.getDate() + daysUntilPayout);
  return payoutDate;
}

export default function GroupMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = useGetAjoGroup(id);
  const { publicKey } = useWallet();

  return (
    <Container className="bg-[#F2F2F2]">
      <NavHeader path={`/savings/ajo/${id}`} header="Group Participants" />

      <div className="space-y-4">
        {isLoading || !data ? (
          <ParticipantsListSkeleton />
        ) : error ? (
          <AjoError message={error.message} onRetry={refetch} />
        ) : (
          data.participants.map(({ participant }, idx) => (
            <Participant
              participant={participant}
              nextPayoutDate={calculatePayoutDate(
                data.next_payout_date(),
                data.payoutInterval,
                data.payoutRound % data.numParticipants,
                idx,
                data.numParticipants
              )}
              isNext={data.payoutRound % data.numParticipants === idx}
              isYou={publicKey?.toBase58() === participant}
              index={idx}
              key={participant}
            />
          ))
        )}
      </div>
    </Container>
  );
}
