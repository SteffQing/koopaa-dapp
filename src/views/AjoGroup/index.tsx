import { AjoGroupData } from "@/hooks/blockchain/read/classes";
import GroupSavingsCard from "./Card";
import { useAuthUser } from "@/hooks/useUser";
import { useMemo } from "react";
import { Info, NextSavingDate } from "./UserInfo";
import GroupInfo from "./GroupInfo";
import UserGroupActivities from "./Activities";

interface Props {
  id: string;
  data: AjoGroupData;
}

export default function AjoGroup({ data, id }: Props) {
  const { user } = useAuthUser();
  const you = useMemo(
    () => data.youParticipant(user?.address),
    [user?.address]
  );
  return (
    <>
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
      />
      <Info
        nextPayout={you?.nextPayout ?? false}
        missedRounds={you?.missingRounds ?? 0}
        payoutDate={data.next_payout_date()}
      />
      <GroupInfo
        payoutInterval={data.payoutInterval}
        contributionInterval={data.contributionInterval}
        pda={id}
        createdAt={data.created_at}
        startTimestamp={data.startTimestamp}
        participants={data.participants.map((p) => p.participant)}
      />
      <NextSavingDate date={data.next_contribution_date()} />
      <UserGroupActivities pda={id} />
    </>
  );
}
