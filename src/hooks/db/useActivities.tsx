import query from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "../../../prisma-client";
import { useAuthUser } from "../useUser";

const KEY = "activities";

function useGetActivities() {
  const { user } = useAuthUser();
  const { data, isLoading } = useQuery({
    queryKey: [KEY, user?.id],
    queryFn: async () => query.get<Activity[]>(KEY),
    enabled: Boolean(user),
  });

  return { [KEY]: data?.data, meta: data?.meta, loading: isLoading };
}

export { useGetActivities };
