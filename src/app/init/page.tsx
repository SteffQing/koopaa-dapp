"use client";

import { Button } from "@/components/ui/button";
import { useGetAjoGroups } from "@/hooks/blockchain/read/useFetchAjoGroup";
import useInit from "@/hooks/blockchain/write/useInit";

export default function InitPage() {
  const { init, isPending } = useInit();
  const { data } = useGetAjoGroups();

  console.log(data);
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h3>This Page is used to initialize the app</h3>
      <Button onClick={init} loading={isPending}>
        Initialize
      </Button>
    </div>
  );
}
