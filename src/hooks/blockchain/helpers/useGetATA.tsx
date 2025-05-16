import { useConnection } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import useUSDCMint from "./useUSDCMint";
import { PublicKey } from "@solana/web3.js";

export default function useGetAccociatedTokenAccountAndAddress() {
  const { connection } = useConnection();
  const usdcMint = useUSDCMint();

  const getATAandAccount = async (publicKey: PublicKey) => {
    const ata = await getAssociatedTokenAddress(usdcMint, publicKey);
    const tokenAccount = await getAccount(connection, ata);

    return {
      ata,
      tokenAccount,
    };
  };

  return { usdcMint, getATAandAccount };
}
