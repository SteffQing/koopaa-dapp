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
import query from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { JoinAjoGroup } from "@/app/api/group/schema";
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

  // Join an existing Ajo group
  const { mutateAsync: joinOnchain, isPending } = useMutation({
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

  const { mutateAsync: dbJoin, isPending: loading } = useMutation({
    mutationKey: ["join-ajo-group-db-call"],
    mutationFn: async (ajoGroupdata: JoinAjoGroup) => query.put("group", { body: ajoGroupdata }),
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

  async function approveJoinAjoGroup(params: ApproveJoinParams, name: string) {
    const { signature } = await joinOnchain(params);
    const joinData: JoinAjoGroup = {
      name,
      pda: params.ajoGroup,
      signature,
    };
    await dbJoin(joinData);
  }

  return { approveJoinAjoGroup, isPending, loading };
}
