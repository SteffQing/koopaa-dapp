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
toast.info(`Auth response: data ${data} and error ${error}`);

const revalidate = !publicKey || error || data!== publicKey.toBase58()

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