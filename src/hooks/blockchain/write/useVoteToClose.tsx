"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getKoopaProgram } from "@/lib/solana/koopa-exports";
import { getKoopaProgramId } from "@/lib/solana/koopa-exports";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useTransactionToast } from "../../use-transaction-toast";
import { toast } from "sonner";
import query from "@/lib/fetch";
import { AddActivityData } from "@/app/api/activities/schema";
import { ActivityType } from "../../../../prisma-client";
import { handleOnchainError } from "../helpers/errors";

export default function useVoteToClose() {
  const provider = useAnchorProvider();
  const { publicKey: userPublicKey } = useWallet();

  const transactionToast = useTransactionToast();
  const queryClient = useQueryClient();

  const programId = getKoopaProgramId();
  const program = useMemo(
    () => getKoopaProgram(provider, programId),
    [provider, programId]
  );

  const [globalStatePDA] = useMemo(
    () =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("global-state")],
        programId
      ),
    [programId]
  );

  const { mutateAsync: vote, isPending } = useMutation({
    mutationFn: async (ajoGroup: string) => {
      if (!userPublicKey) throw new Error("Wallet not connected");

      const ajoGroupPDA = new PublicKey(ajoGroup);

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .closeAjoGroup()
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            participant: userPublicKey,
            globalState: globalStatePDA,
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

  const { mutateAsync: voteActivity, isPending: loading } = useMutation({
    mutationKey: ["vote-activity-db-call"],
    mutationFn: async (data: AddActivityData) =>
      query.post("activities", { body: data }),
    onSuccess({ ok, error }) {
      if (ok) {
        toast.success(
          "Vote, to close the Ajo group has been successful. Please look out for when these votes reach minimum threshold to claim a refund"
        );
        queryClient.invalidateQueries({
          queryKey: ["activities", userPublicKey?.toBase58()],
        });
      } else {
        toast.error(error);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function closeAjoGroup(pda: string, name: string) {
    const { signature } = await vote(pda);
    const joinData: AddActivityData = {
      title: `Voted to close ${name}`,
      type: ActivityType.create,
      sig: signature,
      group_pda: pda,
    };
    await voteActivity(joinData);
  }

  return { closeAjoGroup, isPending, loading };
}
