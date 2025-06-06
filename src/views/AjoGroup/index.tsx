import { AjoGroupData } from "@/hooks/blockchain/read/classes";
import GroupSavingsCard from "./Card";
import { useAuthUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { Info, NextSavingDate } from "./UserInfo";
import GroupInfo from "./GroupInfo";
import UserGroupActivities from "./Activities";
import { GroupInfoSkeleton, GroupSavingsCardSkeleton, NextSavingDateSkeleton } from "./Skeleton";

interface Props {
  id: string;
  data: AjoGroupData | undefined;
  loading: boolean;
  disabled?: boolean;
}

export default function AjoGroup({ data, id, loading, disabled }: Props) {
  const { user } = useAuthUser();
  const you = useMemo(() => data?.youParticipant(user?.address), [user?.address, data]);

  return (
    <>
      {loading || !data ? (
        <GroupSavingsCardSkeleton />
      ) : (
        <GroupSavingsCard
          progress={data.goal()}
          payout={data.payout()}
          contributionAmount={data.contributionAmount * (you?.missingRounds ?? 0)}
          canTopUp={data.get_current_contribution_round() > (you?.contributionRound ?? 0)}
          yourContribution={you?.amountSaved ?? 0}
          you={user?.address}
          started={Boolean(data.startTimestamp)}
          name={data.name}
          pda={id}
          disabled={disabled}
          isParticipant={Boolean(you)}
        />
      )}
      <Info
        nextPayout={you?.nextPayout ?? false}
        missedRounds={you?.missingRounds ?? 0}
        payoutDate={data?.next_payout_date() ?? null}
        slots={data ? Math.max(0, data.numParticipants - data.participants.length) : 0}
        pda={id}
        isParticipant={Boolean(you)}
        name={data?.name ?? ""}
        fee={data?.securityDeposit ?? 0}
      />
      {loading || !data ? (
        <GroupInfoSkeleton />
      ) : (
        <GroupInfo
          payoutRound={data.payoutRound}
          payoutInterval={data.payoutInterval}
          contributionInterval={data.contributionInterval}
          contributionAmount={data.contributionAmount}
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
        Boolean(you) && <NextSavingDate date={data.next_contribution_date()} />
      )}
      <UserGroupActivities pda={id} />
    </>
  );
}
