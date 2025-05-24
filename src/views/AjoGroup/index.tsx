import { AjoGroupData } from "@/hooks/blockchain/read/classes";
import GroupSavingsCard from "./Card";
import { useAuthUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { Info, NextSavingDate } from "./UserInfo";
import GroupInfo from "./GroupInfo";
import UserGroupActivities from "./Activities";
import {
  GroupInfoSkeleton,
  GroupSavingsCardSkeleton,
  NextSavingDateSkeleton,
} from "./Skeleton";

interface Props {
  id: string;
  data: AjoGroupData | undefined;
  loading: boolean;
  disabled?: boolean;
}

export default function AjoGroup({ data, id, loading, disabled }: Props) {
  const { user } = useAuthUser();
  const you = useMemo(
    () => data?.youParticipant(user?.address),
    [user?.address, data]
  );
  return (
    <>
      {loading || !data ? (
        <GroupSavingsCardSkeleton />
      ) : (
        <GroupSavingsCard
          progress={data.goal()}
          payout={data.payout()}
          contributionAmount={data.contributionAmount}
          yourContribution={you?.amountSaved ?? 0}
          you={user?.address}
          started={Boolean(data.startTimestamp)}
          name={data.name}
          pda={id}
          canWithdraw={you?.nextPayout ?? false}
          disabled={disabled}
        />
      )}
      <Info
        nextPayout={you?.nextPayout ?? false}
        missedRounds={you?.missingRounds ?? 0}
        payoutDate={data?.next_payout_date() ?? null}
      />
      {loading || !data ? (
        <GroupInfoSkeleton />
      ) : (
        <GroupInfo
          payoutInterval={data.payoutInterval}
          contributionInterval={data.contributionInterval}
          pda={id}
          createdAt={data.created_at}
          startTimestamp={data.startTimestamp}
          participants={data.participants.map((p) => p.participant)}
          disabled={disabled}
        />
      )}
      {loading || !data ? (
        <NextSavingDateSkeleton />
      ) : (
        <NextSavingDate date={data.next_contribution_date()} />
      )}
      <UserGroupActivities pda={id} />
    </>
  );
}
