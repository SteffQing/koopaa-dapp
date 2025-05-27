"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import query from "@/lib/fetch";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { error, data } = await query.get<string>("auth");

      if (error) {
        router.push("/login");
        return;
      }

      if (publicKey && data !== publicKey.toBase58()) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [publicKey, router]);

  return <>{children}</>;
}

/* 
useEffect(() => {
  const handleAccountsChanged = () => {
    if (publicKey) {
      // Wallet changed - need to reauthenticate
      createUserSession();
    } else {
      // Wallet disconnected - need to logout
      handleLogout();
    }
  };

  // Listen for wallet changes
  window.addEventListener('walletChange', handleAccountsChanged);
  
  return () => {
    window.removeEventListener('walletChange', handleAccountsChanged);
  };
}, [publicKey]);
*/
