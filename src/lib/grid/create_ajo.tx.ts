import type { CreateAjoGroupFormValues } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import { getKoopaProgram, KOOPAA_PROGRAM_ID } from "../solana/koopa-exports";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import gridClient from ".";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BASE_API_URL, USDC } from "@/constants";
import { prisma, qstash } from "../db";
import { decryptKey } from "./security";
import type { CreatedAjoGroup } from "@/app/api/group/schema";

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

  const connection = new Connection(process.env.SOLANA_RPC_URL!, "confirmed");
  const publicKey = new PublicKey(address);

  const wallet = {
    publicKey,
    signTransaction: () => Promise.reject("Not implemented"),
    signAllTransactions: () => Promise.reject("Not implemented"),
  };
  const provider = new AnchorProvider(connection, wallet);
  const program = getKoopaProgram(provider);

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

  const instruction = await program.methods
    .createAjoGroup(
      name,
      contribution_amount,
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

  const secrets = await prisma.sessionSecrets.findMany({
    where: {
      GridAccount: { userAddress: address },
    },
    select: {
      publicKey: true,
      privateKey: true,
      provider: true,
      tag: true,
    },
  });

  const sessionSecrets = secrets.map(({ privateKey, ...rest }) => ({
    ...rest,
    privateKey: decryptKey(privateKey),
  }));

  const { transaction_signature, confirmed_at } = await gridClient.signAndSend({
    sessionSecrets: sessionSecrets,
    transactionPayload: data,
    // session: authResult.data.authentication,
    address,
  });

  const body: CreatedAjoGroup = {
    name,
    pda: ajoGroupPDA.toBase58(),
    signature: transaction_signature,
    ...offchain,
  };
  await qstash.publish({
    url: BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });

  return transaction_signature;
}

export { createAjoGroup };
