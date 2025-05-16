"use client";

import { useMemo } from "react";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useCluster } from "@/components/cluster/cluster-data-access";
import { getKoopaProgram, getKoopaProgramId } from "@/lib/solana/koopa-exports";

export default function useKoopaProgram() {
  const provider = useAnchorProvider();
  const { cluster } = useCluster();

  const programId = useMemo(() => getKoopaProgramId(), [cluster]);

  const program = useMemo(() => {
    if (!provider || !programId) return null;
    return getKoopaProgram(provider, programId);
  }, [provider, programId]);

  return {
    program,
    programId,
  };
}
