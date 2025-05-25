"use client";

import NavHeader from "@/views/Navigation/nav-header";
import Container from "@/components/container";
import { use } from "react";
import useGetAjoGroup from "@/hooks/blockchain/read/useFetchAjoGroup";
import ParticipantsListSkeleton from "./Skeleton";
import Participant from "./Participant";
import { useWallet } from "@solana/wallet-adapter-react";

export default function GroupMembersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetAjoGroup(id);
  const { publicKey } = useWallet();

  const you = data?.youParticipant(publicKey?.toBase58());
  return (
    <Container>
      <NavHeader path={`/savings/ajo/${id}`} header="Group Participants" />

      <div className="space-y-4">
        {isLoading || !data ? (
          <ParticipantsListSkeleton />
        ) : (
          data.participants.map(({ participant }, idx) => (
            <Participant
              participant={participant}
              nextPayoutDate={data.next_payout_date()}
              isNext={you?.nextPayout ?? false}
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
