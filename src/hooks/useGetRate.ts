import { useQuery } from "@tanstack/react-query";

export default function useGetRate() {
  const { data } = useQuery({
    queryKey: ["naira"],
    queryFn: async () =>
      fetch("https://open.er-api.com/v6/latest/USD")
        .then((res) => res.json())
        .then((data) => data.rates.NGN),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false, // avoid auto-refetch on tab switch
  });
  return data ?? 0;
}
