import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import query from "@/lib/fetch";

export function useWalletSync() {
  const { publicKey, connected, disconnect } = useWallet();
  const previousPublicKey = useRef<string | null>(null);

  useEffect(() => {
    const currentKey = publicKey?.toBase58().toLowerCase() ?? null;

    // Wallet disconnected
    if (!connected && previousPublicKey.current) {
      console.log("Wallet disconnected. Deleting session...");
      query.delete("auth").catch(console.error);
      previousPublicKey.current = null;
      sessionStorage.removeItem("splash_shown");
      return;
    }

    // Wallet changed
    if (
      connected &&
      currentKey &&
      previousPublicKey.current &&
      previousPublicKey.current !== currentKey
    ) {
      console.log("Wallet changed. Deleting previous session...");
      disconnect().then(() => query.delete("auth").catch(console.error));
      previousPublicKey.current = null;
      sessionStorage.removeItem("splash_shown");
      return;
    }

    // On first connect / login
    if (connected && currentKey && !previousPublicKey.current) {
      previousPublicKey.current = currentKey;
      console.log("New wallet connected. Awaiting login...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey]);
}
