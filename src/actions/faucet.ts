"use server";

import
{
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import
{
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com");
const FAUCET_PRIVATE_KEY = process.env.FAUCET_PRIVATE_KEY;
const USDC = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

if (!FAUCET_PRIVATE_KEY) throw new Error("FAUCET_PRIVATE_KEY not found!");

function keypairFromBase58(): Keypair
{
  const secretKey = bs58.decode(FAUCET_PRIVATE_KEY!);
  return Keypair.fromSecretKey(secretKey);
}
// async function waitForAccount(pubkey: PublicKey, maxRetries = 10)
// {
//   for (let i = 0; i < maxRetries; i++) {
//     const info = await connection.getAccountInfo(pubkey);
//     if (info) return;
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   throw new Error("Account did not initialize in time.");
// }

async function getOrCreateATA(recipient: PublicKey, payer: Keypair)
{
  const ata = getAssociatedTokenAddressSync(USDC, recipient);

  const accountInfo = await connection.getAccountInfo(ata);
  if (accountInfo === null) {
    const createAtaIx = createAssociatedTokenAccountInstruction(
      payer.publicKey,
      ata,
      recipient,
      USDC,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const tx = new Transaction().add(createAtaIx);
    await sendAndConfirmTransaction(connection, tx, [payer]);
    // await waitForAccount(ata);
  }

  return ata;
}


const claimSOL = async (to: string, amount: number) =>
{
  const fromKeypair = keypairFromBase58();
  const toPubkey = new PublicKey(to);
  const amountLamports = amount * LAMPORTS_PER_SOL;

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey,
      lamports: amountLamports,
    })
  );

  const sig = await sendAndConfirmTransaction(connection, transaction, [
    fromKeypair,
  ]);
  return sig;
};

const claimUSDC = async (to: string, amount: number) =>
{
  const fromKeypair = keypairFromBase58();
  const toPubkey = new PublicKey(to);
  const amountUsdc = amount * 10 ** 6;

  const fromATA = getAssociatedTokenAddressSync(USDC, fromKeypair.publicKey);
  const toATA = await getOrCreateATA(toPubkey, fromKeypair);

  const transaction = new Transaction().add(
    createTransferInstruction(
      fromATA,
      toATA,
      fromKeypair.publicKey,
      amountUsdc,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  const sig = await sendAndConfirmTransaction(connection, transaction, [
    fromKeypair,
  ]);
  return sig;
};

export { claimSOL, claimUSDC };
