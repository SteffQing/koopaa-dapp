import query from "@/lib/fetch";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Group, User } from "../../../prisma-client";

export type GroupAndParticipants = (Group & { participants: User[] })[];
export type GroupCategories = {
  activeGroupsIn: GroupAndParticipants;
  notStartedGroupsIn: GroupAndParticipants;
  inWaitingRoomGroups: GroupAndParticipants;
};

export default function useUserGroups() {
  const { publicKey } = useWallet();
  return useQuery({
    queryKey: ["ajo-groups-summary", publicKey?.toBase58()],
    queryFn: async () =>
      await query.get<GroupCategories>("group/my-groups-full-summary"),
    select: (data) => data.data,
    enabled: Boolean(publicKey?.toBase58()),
  });
}
