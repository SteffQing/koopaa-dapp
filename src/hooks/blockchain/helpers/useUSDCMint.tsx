"use client";

import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import { useCluster } from "@/components/cluster/cluster-data-access";

export default function useUSDCMint(): PublicKey {
  const { cluster } = useCluster();
  return useMemo(() => {
    return cluster.network === "mainnet-beta"
      ? new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") // Mainnet
      : new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"); // Devnet
  }, [cluster.network]);
}
