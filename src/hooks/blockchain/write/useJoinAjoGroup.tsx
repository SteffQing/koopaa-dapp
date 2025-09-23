"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getKoopaProgram } from "@/lib/solana/koopa-exports";
import { getKoopaProgramId } from "@/lib/solana/koopa-exports";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useTransactionToast } from "../../use-transaction-toast";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { toast } from "sonner";
import query, { type FetchResponse, withRetry } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import type { JoinAjoGroup } from "@/app/api/group/schema";
import { handleOnchainError } from "../helpers/errors";

export default function useJoinAjoGroup() {
  const provider = useAnchorProvider();
  const { publicKey: userPublicKey } = useWallet();

  const router = useRouter();
  const transactionToast = useTransactionToast();
  const queryClient = useQueryClient();

  const programId = getKoopaProgramId();
  const program = useMemo(() => getKoopaProgram(provider, programId), [provider, programId]);

  // Join an existing Ajo group
  const { mutateAsync: joinOnchain, isPending } = useMutation({
    mutationFn: async (ajoGroup: string) => {
      if (!userPublicKey) throw new Error("Wallet not connected");
      const ajoGroupPDA = new PublicKey(ajoGroup);

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .requestJoinAjoGroup()
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            participant: userPublicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // Show toast notification
        transactionToast(signature);
        queryClient.invalidateQueries({
          queryKey: ["ajo-group", ajoGroup],
        });

        return { signature };
      } catch (error) {
        handleOnchainError(error);
        throw error;
      }
    },
  });

  const { mutateAsync: dbJoin, isPending: loading } = useMutation<FetchResponse<unknown>, Error, JoinAjoGroup>({
    mutationKey: ["join-ajo-group-db-call"],
    mutationFn: withRetry(async (ajoGroupdata: JoinAjoGroup) => query.put("group", { body: ajoGroupdata })),
    onSuccess({ message, error }, { pda }) {
      if (message) {
        toast.success(message);
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["ajo-group", pda] }),
          queryClient.invalidateQueries({ queryKey: ["ajo-group-members", pda] }),
        ]).then(() => router.replace(`/savings/ajo/${pda}`));
      } else {
        toast.error(error);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function joinAjoGroup(pda: string, name: string) {
    const { signature } = await joinOnchain(pda);
    const joinData: JoinAjoGroup = {
      name,
      pda,
      signature,
    };
    await dbJoin(joinData);
  }

  return { joinAjoGroup, isPending, loading };
}
