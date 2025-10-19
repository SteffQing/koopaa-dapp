"use client";

import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import { useCluster } from "@/components/cluster/cluster-data-access";
import { DEVNET_USDC, MAINNET_USDC } from "@/constants";

export default function useUSDCMint(): PublicKey {
  const { cluster } = useCluster();
  return useMemo(() => {
    return cluster.network === "mainnet-beta"
      ? new PublicKey(MAINNET_USDC) // Mainnet
      : new PublicKey(DEVNET_USDC); // Devnet
  }, [cluster.network]);
}
