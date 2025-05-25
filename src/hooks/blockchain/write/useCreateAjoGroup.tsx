"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactionToast } from "../../use-transaction-toast";
import useUSDCMint from "../helpers/useUSDCMint";
import useKoopaProgram from "../useKooPaaProgram";
import { CreateAjoGroupFormValues } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import query from "@/lib/fetch";
import { CreatedAjoGroup } from "@/app/api/group/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { handleOnchainError } from "../helpers/errors";

const DECIMALS = 10 ** 6;

export default function useCreateAjoGroup() {
  const { programId, program } = useKoopaProgram();
  const { publicKey: userPublicKey } = useWallet();
  const transactionToast = useTransactionToast();
  const USDC = useUSDCMint();

  const queryClient = useQueryClient();
  const router = useRouter();

  const [globalStatePDA] = useMemo(
    () =>
      PublicKey.findProgramAddressSync(
        [Buffer.from("global-state")],
        programId
      ),
    [programId]
  );

  const findAjoGroupPDA = useCallback(
    (name: string) => {
      return PublicKey.findProgramAddressSync(
        [Buffer.from("ajo-group"), Buffer.from(name)],
        programId
      );
    },
    [programId]
  );

  const { mutateAsync: blockCreate, isPending } = useMutation({
    mutationFn: async (params: CreateAjoGroupFormValues) => {
      if (!userPublicKey) throw new Error("Wallet not connected");
      if (!program) throw new Error("Program not found");

      const {
        name,
        contribution_amount,
        security_deposit,
        max_participants,
        contribution_interval,
        payout_interval,
      } = params;

      const [ajoGroupPDA] = findAjoGroupPDA(name);
      const contributionAmount = new BN(contribution_amount * DECIMALS);
      const securityDeposit = new BN(security_deposit * DECIMALS);

      const creatorTokenAccount = getAssociatedTokenAddressSync(
        USDC,
        userPublicKey
      );

      const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
        programId
      );

      try {
        const signature = await program.methods
          .createAjoGroup(
            name,
            securityDeposit,
            contributionAmount,
            Number(contribution_interval),
            Number(payout_interval),
            max_participants
          )
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            creator: userPublicKey,
            globalState: globalStatePDA,
            tokenMint: USDC,
            creatorTokenAccount,
            groupTokenVault: groupTokenVaultPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
          })
          .rpc();

        transactionToast(signature);

        return { signature, ajoGroupPDA };
      } catch (error) {
        handleOnchainError(error);
        throw error;
      }
    },
    mutationKey: ["create-ajo-group-block-call", userPublicKey?.toBase58()],
  });

  const { mutateAsync: dbCreate, isPending: loading } = useMutation({
    mutationKey: ["create-ajo-group-db-call"],
    mutationFn: async (createdAjoGroup: CreatedAjoGroup) =>
      query.post("group", { body: createdAjoGroup }),
    onSuccess({ message, error }, { pda }) {
      if (message) {
        toast.success(message);
        queryClient.invalidateQueries({
          queryKey: ["activities", userPublicKey?.toBase58()],
        });
        router.replace(`/savings/ajo/${pda}`);
      } else {
        toast.error(error);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function createAjoGroup(data: CreateAjoGroupFormValues) {
    const { ajoGroupPDA, signature } = await blockCreate(data);
    const createdData = { ...data, pda: ajoGroupPDA.toBase58(), signature };
    await dbCreate(createdData);
  }

  return { createAjoGroup, isPending, loading };
}
