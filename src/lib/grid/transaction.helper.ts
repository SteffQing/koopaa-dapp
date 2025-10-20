import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import gridClient from "./index";
import { getAuth, getConnection, getSecrets } from "./helpers";
import { prisma } from "../db";

async function getExecutionContext(address: string, ajoPda?: string) {
  const connection = getConnection();

  const basePromises = [
    getSecrets(address),
    connection.getLatestBlockhash(),
    getAuth(address),
  ] as const;

  const promises = ajoPda
    ? ([
        ...basePromises,
        prisma.group.findUniqueOrThrow({
          where: { pda: ajoPda },
          select: { name: true },
        }),
      ] as const)
    : basePromises;

  const [secrets, { blockhash }, auth, ajoGroup] = await Promise.all(promises);

  return { secrets, blockhash, auth, ajoGroup };
}

async function buildAndSendTx(
  instruction: TransactionInstruction,
  address: string,
  pda?: string
) {
  const { secrets, blockhash, ajoGroup, auth } = await getExecutionContext(
    address,
    pda
  );
  const publicKey = new PublicKey(address);

  const transaction = new Transaction().add(instruction);
  transaction.feePayer = publicKey;
  transaction.recentBlockhash = blockhash;
  const serializedTx = transaction.serialize({ requireAllSignatures: false });

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
    sessionSecrets: secrets,
    transactionPayload: data,
    session: auth,
    address,
  });

  return { signature, ajoGroup };
}

export { buildAndSendTx };
