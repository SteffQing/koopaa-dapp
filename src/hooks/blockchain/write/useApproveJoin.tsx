"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getKoopaProgram } from "@/lib/solana/koopa-exports";
import { getKoopaProgramId } from "@/lib/solana/koopa-exports";
import { useAnchorProvider } from "@/providers/solana-provider";
import { useTransactionToast } from "../../use-transaction-toast";
import { toast } from "sonner";
import query, { type FetchResponse, withRetry } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import type { ApprovalJoinAjoGroup } from "@/app/api/group/schema";
import { handleOnchainError } from "../helpers/errors";

type ApproveJoinParams = {
  ajoGroup: string;
  participant: string;
  approved: boolean;
};

export default function useApproveJoin() {
  const provider = useAnchorProvider();
  const { publicKey: userPublicKey } = useWallet();

  const router = useRouter();
  const transactionToast = useTransactionToast();
  const queryClient = useQueryClient();

  const programId = getKoopaProgramId();
  const program = useMemo(() => getKoopaProgram(provider, programId), [provider, programId]);
  const [globalStatePDA] = useMemo(
    () => PublicKey.findProgramAddressSync([Buffer.from("global-state")], programId),
    [programId]
  );

  // Approve Join Ajo group
  const { mutateAsync: approveJoinOnchain, isPending } = useMutation({
    mutationFn: async (params: ApproveJoinParams) => {
      if (!userPublicKey) throw new Error("Wallet not connected");
      const { ajoGroup, participant, approved } = params;
      const ajoGroupPDA = new PublicKey(ajoGroup);

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .approveJoinRequest(approved)
          .accountsStrict({
            ajoGroup: ajoGroupPDA,
            participant: new PublicKey(participant),
            caller: userPublicKey,
            globalState: globalStatePDA,
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

  const { mutateAsync: dbJoin, isPending: loading } = useMutation<FetchResponse<unknown>, Error, ApprovalJoinAjoGroup>({
    mutationKey: ["approve-join-ajo-group-db-call"],
    mutationFn: withRetry(async (ajoGroupdata: ApprovalJoinAjoGroup) => query.patch("group", { body: ajoGroupdata })),
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

  async function approveJoinAjoGroup(params: ApproveJoinParams, name: string) {
    const { signature } = await approveJoinOnchain(params);
    const joinData: ApprovalJoinAjoGroup = {
      name,
      pda: params.ajoGroup,
      signature,
      approval: params.approved,
      participant: params.participant,
    };
    await dbJoin(joinData);
  }

  return { approveJoinAjoGroup, isPending, loading };
}
