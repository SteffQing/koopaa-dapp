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
toast.info(`Auth response: data ${data}`, error);
      if (error) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
        return;
      }

      if (!publicKey || publicKey && data !== publicKey.toBase58()) {
toast.info(`Should redirect if no pub key`);
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [publicKey, router, pathname]
)

  return <>{children}</>;
}