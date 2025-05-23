import query from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../prisma-client";

export default function useParticipant(address: string) {
  return useQuery({
    queryKey: ["user", address],
    queryFn: async () =>
      query.get<User>("participant", { params: { address } }),
  });
}
