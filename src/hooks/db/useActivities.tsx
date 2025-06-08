import query from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "../useUser";
import { Activity } from "../../../prisma-client";

const KEY = "activities";

function useGetActivities() {
  const { user } = useAuthUser();
  const { data, isLoading } = useQuery({
    queryKey: [KEY, user?.address],
    queryFn: async () => query.get<Activity[]>(KEY),
    enabled: Boolean(user),
  });

  return { [KEY]: data?.data, meta: data?.meta, loading: isLoading };
}

function useGetUserInAjoGroupActivities(pda: string) {
  const { user } = useAuthUser();
  const { data, isLoading } = useQuery({
    queryKey: [KEY, user?.address, pda],
    queryFn: async () => query.get<Activity[]>(`group/${pda}/${KEY}`),
    enabled: Boolean(user),
  });

  return { [KEY]: data?.data, meta: data?.meta, loading: isLoading };
}

export { useGetActivities, useGetUserInAjoGroupActivities };
