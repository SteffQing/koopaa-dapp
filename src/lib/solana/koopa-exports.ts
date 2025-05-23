// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import KoopaIDL from "./idl/koopa.json";
import type { Koopa } from "./types/koopa";

// Re-export the generated IDL and type
export { Koopa, KoopaIDL };

// The correct program ID
export const KOOPAA_PROGRAM_ID = new PublicKey(
  "33NAzyKNuayyqKNW6QMXbNT69CikAhCUhPbgwZn1LR3o"
);

// This is a helper function to get the Basic Anchor program.
export function getKoopaProgram(
  provider: AnchorProvider,
  address?: PublicKey
): Program<Koopa> {
  return new Program(
    {
      ...KoopaIDL,
      address: address ? address.toBase58() : KOOPAA_PROGRAM_ID.toBase58(),
    } as Koopa,
    provider
  );
}

// This is a helper function to get the program ID for the Basic program depending on the cluster.
export function getKoopaProgramId() {
  return KOOPAA_PROGRAM_ID;
}
