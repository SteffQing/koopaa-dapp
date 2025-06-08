import query from "@/lib/fetch";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Group, User } from "../../../prisma-client";

export type GroupAndParticipants = Group & { participants: User[] };

export default function useUserGroups() {
  const { publicKey } = useWallet();
  return useQuery({
    queryKey: ["ajo-groups", publicKey?.toBase58()],
    queryFn: async () =>
      await query.get<{
        avbl_groups: GroupAndParticipants[];
        joined_groups: GroupAndParticipants[];
      }>("group"),
    select: (data) => data.data,
    enabled: Boolean(publicKey?.toBase58()),
  });
}
