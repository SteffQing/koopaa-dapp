"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getKoopaProgram } from "@/lib/solana/koopa-exports";
import { getKoopaProgramId } from "@/lib/solana/koopa-exports";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useTransactionToast } from "../../use-transaction-toast";
import useUSDCMint from "../helpers/useUSDCMint";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { toast } from "sonner";
import query from "@/lib/fetch";
import { AddActivityData } from "@/app/api/activities/schema";
import { ActivityType } from "../../../../prisma-client";
import { handleOnchainError } from "../helpers/errors";

export default function useContribute() {
  const provider = useAnchorProvider();
  const { publicKey: userPublicKey } = useWallet();
  const USDC = useUSDCMint();

  const transactionToast = useTransactionToast();
  const queryClient = useQueryClient();

  const programId = getKoopaProgramId();
  const program = useMemo(
    () => getKoopaProgram(provider, programId),
    [provider, programId]
  );

  const { mutateAsync: contributeOnchain, isPending } = useMutation({
    mutationFn: async (ajoGroup: string) => {
      if (!userPublicKey) throw new Error("Wallet not connected");

      const contributorTokenAccount = getAssociatedTokenAddressSync(
        USDC,
        userPublicKey
      );
      const ajoGroupPDA = new PublicKey(ajoGroup);
      const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
        programId
      );

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .contribute()
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            contributor: userPublicKey,
            tokenMint: USDC,
            contributorTokenAccount,
            groupTokenVault: groupTokenVaultPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // Show toast notification
        transactionToast(signature);

        // Invalidate queries to refresh data
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

  const { mutateAsync: contributeActivity, isPending: loading } = useMutation({
    mutationKey: ["contribute-activity-db-call"],
    mutationFn: async (data: AddActivityData) =>
      query.post("activities", { body: data }),
    onSuccess({ ok, error }) {
      if (ok) {
        toast.success("Successful contribution made");
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

  async function contribute(pda: string, name: string, amount: number) {
    const { signature } = await contributeOnchain(pda);
    const joinData: AddActivityData = {
      title: `Send money to ${name}`,
      type: ActivityType.transfer,
      sig: signature,
      amount,
      group_pda: pda,
    };
    await contributeActivity(joinData);
  }

  return { contribute, isPending, loading };
}
