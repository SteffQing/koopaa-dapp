import type { CreateAjoGroupFormValues } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import { KOOPAA_PROGRAM_ID } from "../solana/koopa-exports";
import { BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { USDC, DECIMALS } from "@/constants";
import type {
  ApprovalJoinAjoGroup,
  CreatedAjoGroup,
  GridApproveJoinAjo,
  JoinAjoGroup,
} from "@/app/api/group/schema";
import { getProgram } from "./helpers";
import { approveJoin, createAjo, requestJoin } from "../qstash";
import { buildAndSendTx } from "./transaction.helper";

async function createAjoGroup(
  ajo: CreateAjoGroupFormValues,
  address: string,
  auth: string
) {
  const {
    name,
    contribution_amount,
    contribution_interval,
    payout_interval,
    max_participants,
    ...offchain
  } = ajo;

  const program = getProgram();

  const [globalStatePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("global-state")],
    KOOPAA_PROGRAM_ID
  );
  const [ajoGroupPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("ajo-group"), Buffer.from(name)],
    KOOPAA_PROGRAM_ID
  );
  const [groupTokenVaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("group-vault"), ajoGroupPDA.toBuffer()],
    KOOPAA_PROGRAM_ID
  );

  const contributionAmount = new BN(contribution_amount * DECIMALS);
  const instruction = await program.methods
    .createAjoGroup(
      name,
      contributionAmount,
      Number(contribution_interval),
      Number(payout_interval),
      max_participants
    )
    .accountsStrict({
      ajoGroup: ajoGroupPDA,
      creator: new PublicKey(address),
      globalState: globalStatePDA,
      tokenMint: USDC,
      groupTokenVault: groupTokenVaultPda,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();

  const { signature } = await buildAndSendTx(instruction, address);

  const pda = ajoGroupPDA.toBase58();

  const body: CreatedAjoGroup = {
    name,
    pda,
    signature,
    ...offchain,
  };
  const messageId = await createAjo(auth, body);

  return { signature, pda, messageId };
}

async function requestJoinAjoGroup(
  ajoPda: string,
  address: string,
  auth: string
) {
  const program = getProgram();

  const instruction = await program.methods
    .requestJoinAjoGroup()
    .accountsStrict({
      ajoGroup: new PublicKey(ajoPda),
      participant: new PublicKey(address),
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const { signature, ajoGroup } = await buildAndSendTx(
    instruction,
    address,
    ajoPda
  );
  if (!ajoGroup) throw new Error("Ajo group is undefined");

  const body: JoinAjoGroup = {
    name: ajoGroup.name,
    pda: ajoPda,
    signature,
  };
  const messageId = await requestJoin(auth, body);

  return { signature, name: ajoGroup.name, messageId };
}

async function approveJoinAjoGroup(
  params: GridApproveJoinAjo,
  address: string,
  auth: string
) {
  const program = getProgram();

  const [globalStatePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("global-state")],
    KOOPAA_PROGRAM_ID
  );

  const instruction = await program.methods
    .approveJoinRequest(params.approved)
    .accountsStrict({
      ajoGroup: new PublicKey(params.pda),
      participant: new PublicKey(params.participant),
      caller: new PublicKey(address),
      globalState: globalStatePDA,
    })
    .instruction();

  const { signature, ajoGroup } = await buildAndSendTx(
    instruction,
    address,
    params.pda
  );
  if (!ajoGroup) throw new Error("Ajo group is undefined");

  const body: ApprovalJoinAjoGroup = {
    name: ajoGroup.name,
    signature,
    approval: params.approved,
    ...params,
  };
  const messageId = await approveJoin(auth, body);

  return { signature, name: ajoGroup.name, messageId };
}

export { createAjoGroup, requestJoinAjoGroup, approveJoinAjoGroup };
