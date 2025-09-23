"use client";
import { useMutation } from "@tanstack/react-query";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactionToast } from "../../use-transaction-toast";
import useKoopaProgram from "../useKooPaaProgram";
import { handleOnchainError } from "../helpers/errors";

export default function useInit() {
  const { programId, program } = useKoopaProgram();
  const { publicKey: userPublicKey } = useWallet();
  const transactionToast = useTransactionToast();

  const [globalStatePDA] = useMemo(
    () => PublicKey.findProgramAddressSync([Buffer.from("global-state")], programId),
    [programId]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      if (!userPublicKey) throw new Error("Wallet not connected");
      if (!program) throw new Error("Program not found");

      try {
        const signature = await program.methods
          .initialize()
          .accountsStrict({
            globalState: globalStatePDA,
            admin: userPublicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        transactionToast(signature);
      } catch (error) {
        handleOnchainError(error);
        throw error;
      }
    },
    mutationKey: ["init"],
  });

  async function init() {
    await mutateAsync();
  }

  return { init, isPending };
}
