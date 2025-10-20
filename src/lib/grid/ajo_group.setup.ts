import type { CreateAjoGroupFormValues } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import { KOOPAA_PROGRAM_ID } from "../solana/koopa-exports";
import { BN } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import gridClient from ".";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BASE_API_URL, USDC, DECIMALS } from "@/constants";
import { prisma, qstash } from "../db";
import type {
  ApprovalJoinAjoGroup,
  CreatedAjoGroup,
  GridApproveJoinAjo,
  JoinAjoGroup,
} from "@/app/api/group/schema";
import { getAuth, getProgram, getSecrets } from "./helpers";

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
  const publicKey = new PublicKey(address);

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
      creator: publicKey,
      globalState: globalStatePDA,
      tokenMint: USDC,
      groupTokenVault: groupTokenVaultPda,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();

  const [sessionSecrets, { blockhash }, authentication] = await Promise.all([
    getSecrets(address),
    program.provider.connection.getLatestBlockhash(),
    getAuth(address),
  ]);

  const transaction = new Transaction().add(instruction);
  transaction.feePayer = publicKey;
  transaction.recentBlockhash = blockhash;
  const serializedTx = transaction.serialize({ requireAllSignatures: false });

  console.log("prepareArbitraryTransaction");

  const { data, error } = await gridClient.prepareArbitraryTransaction(
    address,
    {
      transaction: serializedTx.toString("base64"),
      account_signers: [address],
      fee_config: { currency: "sol", payer_address: address },
    }
  );

  if (error) throw error;
  if (!data) throw new Error("Data is undefined");

  const { transaction_signature: signature } = await gridClient.signAndSend({
    sessionSecrets: sessionSecrets,
    transactionPayload: data,
    session: authentication,
    address,
  });

  const pda = ajoGroupPDA.toBase58();
  console.log(signature, pda, "final checklist");
  const body: CreatedAjoGroup = {
    name,
    pda,
    signature,
    ...offchain,
  };
  await qstash
    .queue({
      queueName: "create_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    });

  return { signature, pda };
}

async function requestJoinAjoGroup(
  ajoPda: string,
  address: string,
  auth: string
) {
  const program = getProgram();
  const publicKey = new PublicKey(address);

  const instruction = await program.methods
    .requestJoinAjoGroup()
    .accountsStrict({
      ajoGroup: new PublicKey(ajoPda),
      participant: publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const transaction = new Transaction().add(instruction);
  const serializedTx = transaction.serialize({ requireAllSignatures: false });

  const { data, error, ...payload } =
    await gridClient.prepareArbitraryTransaction(address, {
      transaction: serializedTx.toString("base64"),
      account_signers: [address],
    });

  console.log(payload, data, error);

  if (error) throw error;
  if (!data) throw new Error("Data is undefined");

  const [sessionSecrets, ajoGroup] = await Promise.all([
    getSecrets(address),
    prisma.group.findUniqueOrThrow({
      where: { pda: ajoPda },
      select: { name: true },
    }),
  ]);

  const { transaction_signature: signature } = await gridClient.signAndSend({
    sessionSecrets: sessionSecrets,
    transactionPayload: data,
    // session: authResult.data.authentication,
    address,
  });

  const body: JoinAjoGroup = {
    name: ajoGroup.name,
    pda: ajoPda,
    signature,
  };
  await qstash
    .queue({
      queueName: "request_join_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group/request-join",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    });

  return { signature, name: ajoGroup.name };
}

async function approveJoinAjoGroup(
  params: GridApproveJoinAjo,
  address: string,
  auth: string
) {
  const program = getProgram();
  const publicKey = new PublicKey(address);

  const [globalStatePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("global-state")],
    KOOPAA_PROGRAM_ID
  );

  const instruction = await program.methods
    .approveJoinRequest(params.approved)
    .accountsStrict({
      ajoGroup: new PublicKey(params.pda),
      participant: new PublicKey(params.participant),
      caller: publicKey,
      globalState: globalStatePDA,
    })
    .instruction();

  const transaction = new Transaction().add(instruction);
  const serializedTx = transaction.serialize({ requireAllSignatures: false });

  const { data, error, ...payload } =
    await gridClient.prepareArbitraryTransaction(address, {
      transaction: serializedTx.toString("base64"),
      account_signers: [address],
    });

  console.log(payload, data, error);

  if (error) throw error;
  if (!data) throw new Error("Data is undefined");

  const [sessionSecrets, ajoGroup] = await Promise.all([
    getSecrets(address),
    prisma.group.findUniqueOrThrow({
      where: { pda: params.pda },
      select: { name: true },
    }),
  ]);

  const { transaction_signature: signature } = await gridClient.signAndSend({
    sessionSecrets: sessionSecrets,
    transactionPayload: data,
    // session: authResult.data.authentication,
    address,
  });

  const body: ApprovalJoinAjoGroup = {
    name: ajoGroup.name,
    signature,
    approval: params.approved,
    ...params,
  };
  await qstash
    .queue({
      queueName: "approve_join_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group/approve-join",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    });

  return { signature, name: ajoGroup.name };
}

export { createAjoGroup, requestJoinAjoGroup, approveJoinAjoGroup };
