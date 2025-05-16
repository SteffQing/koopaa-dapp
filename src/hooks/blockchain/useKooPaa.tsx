"use client";

import { useMemo } from "react";
import { useAnchorProvider } from "@/providers/solana-provider";
import { getKoopaProgram, getKoopaProgramId } from "@/lib/solana/koopa-exports";

export default function useKoopaProgram() {
  const provider = useAnchorProvider();

  const programId = getKoopaProgramId();

  const program = useMemo(() => {
    if (!provider || !programId) return null;
    return getKoopaProgram(provider, programId);
  }, [provider, programId]);

  return {
    program,
    programId,
  };
}
