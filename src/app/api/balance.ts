import { Connection, PublicKey } from "@solana/web3.js";
import { DEVNET_USDC } from "@/constants";

async function fetchBalances(address: string) {
  const connection = new Connection(process.env.SOLANA_RPC_URL!, "confirmed");
  const pubkey = new PublicKey(address);

  const solBalanceLamports = await connection.getBalance(pubkey);
  const solBalance = solBalanceLamports / 1e9;

  const usdcMint = new PublicKey(DEVNET_USDC);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
    mint: usdcMint,
  });
  const usdcBalance =
    tokenAccounts.value[0]?.account?.data?.parsed?.info?.tokenAmount
      ?.uiAmount || 0;

  return { solBalance, usdcBalance };
}

export default fetchBalances;
