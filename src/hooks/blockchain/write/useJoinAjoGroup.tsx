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
import { useRouter } from "next/navigation";
import { JoinAjoGroup } from "@/app/api/group/schema";
import { handleOnchainError } from "../helpers/errors";

export default function useJoinAjoGroup() {
  const provider = useAnchorProvider();
  const { publicKey: userPublicKey } = useWallet();
  const USDC = useUSDCMint();

  const router = useRouter();
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

  // Join an existing Ajo group
  const { mutateAsync: joinOnchain, isPending } = useMutation({
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
        // Using the direct Anchor pattern
        const signature = await program.methods
          .joinAjoGroup()
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            participant: userPublicKey,
            globalState: globalStatePDA,
            tokenMint: USDC,
            participantTokenAccount,
            groupTokenVault: groupTokenVaultPda,
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

  const { mutateAsync: dbJoin, isPending: loading } = useMutation({
    mutationKey: ["join-ajo-group-db-call"],
    mutationFn: async (ajoGroupdata: JoinAjoGroup) =>
      query.put("group", { body: ajoGroupdata }),
    onSuccess({ message, error }, { pda }) {
      if (message) {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["ajo-group", pda] });
        queryClient.invalidateQueries({ queryKey: ["ajo-group-members", pda] });
        router.replace(`/savings/ajo/${pda}`);
      } else {
        toast.error(error);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function joinAjoGroup(pda: string, name: string, amount: number) {
    const { signature } = await joinOnchain(pda);
    const joinData: JoinAjoGroup = {
      name,
      pda,
      signature,
      security_deposit: amount,
    };
    await dbJoin(joinData);
  }

  return { joinAjoGroup, isPending, loading };
}
