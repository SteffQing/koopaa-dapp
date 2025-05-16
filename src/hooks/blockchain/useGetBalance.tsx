"use client";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import useGetAccociatedTokenAccountAndAddress from "./helpers/useGetATA";

export default function useUSDCBalance() {
  const { publicKey } = useWallet();
  const { getATAandAccount } = useGetAccociatedTokenAccountAndAddress();

  return useQuery({
    queryKey: ["usdcBalance", publicKey?.toBase58()],
    enabled: !!publicKey,
    queryFn: async () => {
      if (!publicKey) throw new Error("Wallet not connected");

      const { tokenAccount } = await getATAandAccount(publicKey);
      const balance = Number(tokenAccount.amount) / 10 ** 6;

      return balance;
    },
  });
}
