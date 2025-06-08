"use server";

import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
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

if (!FAUCET_PRIVATE_KEY) throw new Error("FAUCET_PRIVATE_KEY not found!");

function keypairFromBase58(): Keypair {
  const secretKey = bs58.decode(FAUCET_PRIVATE_KEY!);
  return Keypair.fromSecretKey(secretKey);
}

const claimSOL = async (to: string, amount: number) => {
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

const claimUSDC = async (to: string, amount: number) => {
  const fromKeypair = keypairFromBase58();
  const toPubkey = new PublicKey(to);
  const amountUsdc = amount * 10 ** 6;
  const USDC = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

  const fromATA = getAssociatedTokenAddressSync(USDC, fromKeypair.publicKey);
  const toATA = getAssociatedTokenAddressSync(USDC, toPubkey);

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
