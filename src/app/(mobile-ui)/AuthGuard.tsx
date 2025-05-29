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
    const fullPath = `${pathname}?${searchParams.toString()}`;

    const checkAuth = async () => {
      if (!publicKey || !connected || checked) return;

      setChecked(true);
      const { error, data } = await query.get<string>("auth");

      const revalidate = !publicKey || error || data !== publicKey.toBase58();

      if (revalidate) {
        await query.delete("auth");
        const redirectUrl = `/login?redirect=${encodeURIComponent(fullPath)}`;
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [publicKey, router, pathname, searchParams, checked, connected]);

  return <>{children}</>;
}
