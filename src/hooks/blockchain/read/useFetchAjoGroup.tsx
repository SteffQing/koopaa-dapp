import query from "@/lib/fetch";
import { getKoopaProgram } from "@/lib/solana/koopa-exports";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useQuery } from "@tanstack/react-query";
import { findAjoGroupPDA } from "../helpers";
import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import { Group } from "../../../../prisma-client";
import { AjoGroupData } from "./classes";

type AjoParams = {
  pda: string;
  name: string;
};

export function useGetAjoGroupOnchain(params: Partial<AjoParams>) {
  const provider = useAnchorProvider();
  const program = getKoopaProgram(provider);

  const pda = useMemo(() => {
    try {
      if (params.pda) return new PublicKey(params.pda);
      if (params.name) return findAjoGroupPDA(params.name)[0];
      return undefined;
    } catch (e) {
      console.error("Invalid PDA or name input:", e);
      return undefined;
    }
  }, [params.pda, params.name]);

  return useQuery({
    queryKey: ["ajo-group-onchain", pda?.toBase58()],
    queryFn: async () => {
      if (!pda) throw new Error("No valid PDA for the ajo group was found");
      const ajoGroup = await program.account.ajoGroup.fetch(pda);
      return { ...ajoGroup, pda: pda.toBase58() };
    },
    enabled: !!pda,
  });
}

export default function useGetAjoGroup(params: Partial<AjoParams>) {
  const { data } = useGetAjoGroupOnchain(params);
  console.log("onchain data", data);

  const pda = useMemo(() => {
    try {
      if (params.pda) return params.pda;
      if (data) return data.pda;
      return undefined;
    } catch (e) {
      console.error("Invalid PDA or name input:", e);
      return undefined;
    }
  }, [params.pda, data]);

  return useQuery({
    queryKey: ["ajo-group", pda],
    queryFn: async () => query.get<Group>("group", { params: { id: pda } }),
    select: (group) => new AjoGroupData(data!, group.data!),
    enabled: !!pda,
  });
}
