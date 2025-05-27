import Image from "next/image";
import { CreateAjoGroupFormValues } from "./schema";
import { Button, SwitchButton } from "@/components/ui/button";
import { useState } from "react";
import useCreateAjoGroup from "@/hooks/blockchain/write/useCreateAjoGroup";

export default function ViewAndSubmitForm(data: CreateAjoGroupFormValues) {
  const interval =
    Number(data.payout_interval) / Number(data.contribution_interval);
  const goal =
    data.contribution_amount * data.max_participants * Math.ceil(interval);

  const [agree, setAgree] = useState(false);
  const { createAjoGroup, isPending, loading } = useCreateAjoGroup();

  async function create() {
    await createAjoGroup(data);
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="mb-4 rounded-xl overflow-hidden">
        <Image
          src={`/group-cover/${data.group_cover_photo}.png`}
          alt={`Cover photo for the ${data.name} Ajo group`}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </div>
      <aside className="flex flex-col rounded-lg bg-[#FCFCFC] py-4 px-3">
        <Entry title="Group Name" content={data.name} />
        <Entry title="Group Description" content={data.description} />
        <Entry title="Est. Saving Goal" content={`$${goal}`} />
        <Entry
          title="Participants Slots"
          content={data.max_participants.toString()}
        />
        <Entry
          title="Saving Interval"
          content={`${data.contribution_interval} day(s)`}
        />
        <Entry
          title="Payout Interval"
          content={`${data.payout_interval} days`}
        />
        <Entry
          title="Security Deposit"
          content={data.security_deposit.toString()}
        />
        <Entry
          title="Contribution Amount"
          content={`$${data.contribution_amount}`}
          isLast
        />
      </aside>
      <aside className="flex gap-2">
        <div className="flex flex-col gap-3">
          <h3 className="text-[#121212] font-medium text-xs">
            Kindly read carefully
          </h3>
          <p className="text-[#4C4C4C] font-normal text-xs">
            I agree that i adhere to all the rules of the group and making
            payments when due.
          </p>
        </div>
        <div>
          <SwitchButton setState={setAgree} state={agree} />
        </div>
      </aside>
      <Button loading={isPending || loading} disabled={!agree} onClick={create}>
        Create Ajo Group
      </Button>
    </section>
  );
}

type EntryProps = {
  title: string;
  content: string;
  isLast?: boolean;
};

function Entry({ title, content, isLast }: EntryProps) {
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <h4 className="text-[#4C4C4C] text-sm font-medium">{title}</h4>
        <p className="text-[#121212] text-xs font-medium">{content}</p>
      </div>
      {!isLast && <div className="w-full h-[1px] bg-[#E6E6E6] my-2" />}
    </>
  );
}
