"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import query from "@/lib/fetch";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { error, data } = await query.get<string>("auth");

const revalidate = !publicKey || error || data !== publicKey.toBase58()

      if (revalidate) {
await query.delete("auth")
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [publicKey, router, pathname]
)

  return <>{children}</>;
}