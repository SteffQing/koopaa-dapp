"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
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

export default function useClaimRefund() {
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

  const { mutateAsync: requestRefund, isPending } = useMutation({
    mutationFn: async (ajoGroup: string) => {
      if (!userPublicKey) throw new Error("Wallet not connected");

      const participantTokenAccount = getAssociatedTokenAddressSync(
        USDC,
        userPublicKey
      );
      const ajoGroupPDA = new PublicKey(ajoGroup);
      const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
        programId
      );
      try {
        const signature = await program.methods
          .claimRefund()
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            participant: userPublicKey,
            tokenMint: USDC,
            participantTokenAccount,
            groupTokenVault: groupTokenVaultPda,
            tokenProgram: TOKEN_PROGRAM_ID,
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

  const { mutateAsync: refundActivity, isPending: loading } = useMutation({
    mutationKey: ["refund-activity-db-call"],
    mutationFn: async (data: AddActivityData) =>
      query.post("activities", { body: data }),
    onSuccess({ ok, error }) {
      if (ok) {
        toast.success("Refund has been successfully claimed");
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

  async function claimRefund(pda: string, name: string, amount: number) {
    const { signature } = await requestRefund(pda);
    const joinData: AddActivityData = {
      title: `Received refunds from ${name}`,
      type: ActivityType.credit,
      sig: signature,
      amount,
      group_pda: pda,
    };
    await refundActivity(joinData);
  }

  return { claimRefund, isPending, loading };
}
