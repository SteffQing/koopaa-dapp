import { useGetAjoGroupOnchain } from "./useFetchAjoGroup";

type OnChainAjoGroupQuery = ReturnType<typeof useGetAjoGroupOnchain>;
export type OnChainAjoGroupData = NonNullable<OnChainAjoGroupQuery["data"]>;
