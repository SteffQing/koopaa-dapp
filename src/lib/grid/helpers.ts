import { type Commitment, Connection } from "@solana/web3.js";
import { prisma } from "../db";
import { decryptKey } from "./security";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { getKoopaProgram } from "../solana/koopa-exports";
import { AuthenticationProvider } from "@sqds/grid";

async function getSecrets(address: string) {
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

  if (secrets.length === 0) throw new Error("No secrets found");

  const sessionSecrets = secrets.map(({ privateKey, ...rest }) => ({
    ...rest,
    privateKey: decryptKey(privateKey),
  }));

  return sessionSecrets;
}

async function getAuth(address: string) {
  const auth = await prisma.gridAccount.findUnique({
    where: {
      userAddress: address,
    },
    select: {
      authentication: true,
    },
  });

  if (!auth) throw new Error("Auth not found!");

  const authentication = JSON.parse(auth.authentication);

  return authentication as AuthenticationProvider[];
}

function getProgram() {
  //   const connection = new Connection(process.env.SOLANA_RPC_URL!, "confirmed");

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed" as Commitment
  );

  const provider = new AnchorProvider(connection, {} as unknown as Wallet, {
    commitment: "confirmed",
  });
  const program = getKoopaProgram(provider);

  return program;
}

export { getSecrets, getProgram, getAuth };
