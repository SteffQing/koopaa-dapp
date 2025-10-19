"use client";

import { WalletError } from "@solana/wallet-adapter-base";
import {
  type AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode, useCallback, useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { AnchorProvider } from "@coral-xyz/anchor";
import { useCluster } from "@/components/cluster/cluster-data-access";
import {
  createDefaultAuthorizationCache,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
  registerMwa,
} from "@solana-mobile/wallet-standard-mobile";

registerMwa({
  appIdentity: {
    name: "KooPaa",
    uri: "https://app.koopaa.fun",
    icon: "logo.png",
  },
  authorizationCache: createDefaultAuthorizationCache(),
  chains: ["solana:devnet" /* "solana:mainnet" */],
  chainSelector: createDefaultChainSelector(),
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
  // remoteHostAuthority: "<REPLACE_WITH_URL_>", // Include to enable remote connection option.
});

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster();
  const endpoint = useMemo(() => cluster.endpoint, [cluster]);
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  });
}
