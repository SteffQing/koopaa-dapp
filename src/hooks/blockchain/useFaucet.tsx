"use client";
import { useQuery } from "@tanstack/react-query";
import useGetAccociatedTokenAccountAndAddress from "./helpers/useGetATA";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useSession } from "../useSession";
import query from "@/lib/fetch";

const NEXT_PUBLIC_FAUCET_PUBLIC_KEY = process.env.NEXT_PUBLIC_FAUCET_PUBLIC_KEY;

export default function useFaucetBalance() {
  const publicKey = new PublicKey(NEXT_PUBLIC_FAUCET_PUBLIC_KEY!);
  const { getATAandAccount } = useGetAccociatedTokenAccountAndAddress();
  const { connection } = useAnchorProvider();

  return useQuery({
    queryKey: ["faucet_balance", publicKey?.toBase58()],
    queryFn: async () => {
      const [{ tokenAccount }, lamports] = await Promise.all([
        getATAandAccount(publicKey),
        connection.getBalance(publicKey),
      ]);
      const usdcbalance = Number(tokenAccount.amount) / 10 ** 6;
      const solbalance = lamports / LAMPORTS_PER_SOL;

      return { usdcbalance, solbalance };
    },
  });
}

export function useATA() {
  const { session } = useSession();
  return useQuery({
    queryKey: ["user-ata", session],
    queryFn: () => query.patch<{ ok: boolean }>("faucet"),
    select: (data) => data.ok,
  });
}
