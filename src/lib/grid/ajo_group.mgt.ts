import { KOOPAA_PROGRAM_ID } from "../solana/koopa-exports";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { USDC as USDC_String } from "@/constants";
import { getProgram } from "./helpers";
import { buildAndSendTx } from "./transaction.helper";
import { AddActivityData } from "@/app/api/activities/schema";
import { ActivityType } from "../../../prisma-client";
import { contributeAction } from "../qstash";

async function contribute(ajoPda: string, address: string, auth: string) {
  const program = getProgram();
  const userPublicKey = new PublicKey(address);
  const USDC = new PublicKey(USDC_String);

  const ajoGroupPDA = new PublicKey(ajoPda);
  const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
    KOOPAA_PROGRAM_ID
  );

  const contributorTokenAccount = getAssociatedTokenAddressSync(
    USDC,
    userPublicKey
  );
  const instruction = await program.methods
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
    .instruction();

  const { signature, ajoGroup } = await buildAndSendTx(
    instruction,
    address,
    ajoPda
  );

  const body: AddActivityData = {
    title: `Made contribution to ${ajoGroup?.name}`,
    type: ActivityType.transfer,
    sig: signature,
    amount: 0, // Let the backend update this value
    group_pda: ajoPda,
  };
  const messageId = await contributeAction(auth, body);

  return { signature, messageId };
}

export { contribute };
