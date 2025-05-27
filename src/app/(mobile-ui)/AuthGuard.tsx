"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import query from "@/lib/fetch";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    toast.info(`AuthGuard ran ${publicKey?.toBase58()}`);

    const checkAuth = async () => {
      const { error, data } = await query.get<string>("auth");

      if (error) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
        return;
      }

      if (!publicKey || publicKey && data !== publicKey.toBase58()) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [publicKey, router, pathname]);

  useEffect(() => {
    const handleAccountsChanged = () => {
      if (publicKey) {
        // Wallet changed - need to reauthenticate
        toast.info("Wallet changed - need to reauthenticate");
      } else {
        // Wallet disconnected - need to logout
        toast.info("Wallet disconnected - need to logout");
      }
    };

    // Listen for wallet changes
    window.addEventListener("accountChanged", handleAccountsChanged);

    return () => {
      window.removeEventListener("accountChanged", handleAccountsChanged);
    };
  }, [publicKey]);

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
