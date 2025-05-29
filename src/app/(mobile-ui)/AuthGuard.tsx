"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import query from "@/lib/fetch";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return;
    const fullPath = `${pathname}?${searchParams.toString()}`;
    const redirectUrl = `/login?redirect=${encodeURIComponent(fullPath)}`;

    const timeout = setTimeout(() => {
      if (!publicKey || !connected) {
        query.delete("auth").then(() => router.replace(redirectUrl));
      }
    }, 2000);

    const checkAuth = async () => {
      if (!publicKey || !connected) return;

      setChecked(true);
      clearTimeout(timeout);
      const { error, data } = await query.get<string>("auth");

      if (error || data !== publicKey.toBase58()) {
        await query.delete("auth");
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [publicKey, router, pathname, searchParams, checked, connected]);

  return <>{children}</>;
}
